import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, language, level, date, mode, affiliate_code, ame_code, ap_code } = body;

    if (!name || !email || !phone || !language || !level) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. SUPABASE DATABASE STORAGE (Secure Server Fetch)
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

    let baseUrl = "";
    if (SUPABASE_URL) {
      baseUrl = SUPABASE_URL.trim().replace(/\/+$/, "");
      if (baseUrl.endsWith("/rest/v1")) {
        baseUrl = baseUrl.replace(/\/rest\/v1$/, "");
      }
    }

    // CHECK FOR DUPLICATE EMAIL TO PREVENT RE-REGISTRATION
    if (baseUrl && SUPABASE_ANON_KEY) {
      try {
        const checkRes = await fetch(`${baseUrl}/rest/v1/leads?email=eq.${encodeURIComponent(email)}&select=id`, {
          method: "GET",
          headers: {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
          }
        });
        if (checkRes.ok) {
          const existing = await checkRes.json();
          if (existing && existing.length > 0) {
            return NextResponse.json(
              { success: false, error: "already-exists", message: "This email has already registered." },
              { status: 400 }
            );
          }
        }
      } catch (checkErr) {
        console.error("Error verifying duplicates in Supabase:", checkErr);
      }
    } else {
      try {
        const sheetCheck = await fetch(`https://sheetdb.io/api/v1/y4odbljzg3dxt/search?Email=${encodeURIComponent(email)}`, {
          method: "GET",
          headers: { "Accept": "application/json" }
        });
        if (sheetCheck.ok) {
          const existing = await sheetCheck.json();
          if (existing && existing.length > 0) {
            return NextResponse.json(
              { success: false, error: "already-exists", message: "This email has already registered." },
              { status: 400 }
            );
          }
        }
      } catch (sheetCheckErr) {
        console.error("Error verifying duplicates in SheetDB:", sheetCheckErr);
      }
    }

    let supabaseSaved = false;

    if (baseUrl && SUPABASE_ANON_KEY) {
      try {
        const supabaseRes = await fetch(`${baseUrl}/rest/v1/leads`, {
          method: "POST",
          headers: {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json",
            "Prefer": "return=minimal"
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            language,
            level,
            mode: mode || "ID Fast Track",
            status: "New",
            affiliate_code: affiliate_code || null,
            ame_code: ame_code || null,
            ap_code: ap_code || null
          })
        });

        if (supabaseRes.ok) {
          supabaseSaved = true;
          console.log("Lead successfully stored in Supabase.");
        } else {
          console.warn("Supabase returned an error status:", supabaseRes.status);
        }
      } catch (supaError) {
        console.error("Failed to connect to Supabase:", supaError);
      }
    } else {
      console.warn("Supabase keys missing. Skipping Supabase storage.");
    }

    // 2. NON-BLOCKING GOOGLE SHEETS STORAGE (SheetDB Backup - Fired in background for zero latency!)
    let sheetSaved = false;
    try {
      fetch('https://sheetdb.io/api/v1/y4odbljzg3dxt', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: [{
            Date: date || new Date().toISOString(),
            Name: name,
            Email: email,
            Phone: phone,
            Language: language,
            Level: level,
            Affiliate_Code: affiliate_code || "",
            AME_Code: ame_code || "",
            AP_Code: ap_code || ""
          }]
        })
      }).then(res => {
        if (res.ok) {
          console.log("Background Google Sheets backup successful.");
        } else {
          console.warn("Background Google Sheets backup returned error:", res.status);
        }
      }).catch(err => {
        console.error("Asynchronous background Google Sheets backup failed:", err);
      });
      sheetSaved = true; // Mark as initiated
    } catch (sheetError) {
      console.error("Failed to initiate background Google Sheets backup:", sheetError);
    }

    return NextResponse.json({
      success: true,
      supabaseSaved,
      sheetSaved,
      message: "Lead processed successfully"
    });

  } catch (err: any) {
    console.error("Internal Server Error in Registration API:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
