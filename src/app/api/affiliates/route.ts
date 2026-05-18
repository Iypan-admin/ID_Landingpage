import { NextResponse } from "next/server";

// Fallback Mock Affiliates for offline resilience
let mockAffiliatesMemory: any[] = [];

export async function GET() {
  try {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      let baseUrl = SUPABASE_URL.trim().replace(/\/+$/, "");
      if (baseUrl.endsWith("/rest/v1")) {
        baseUrl = baseUrl.replace(/\/rest\/v1$/, "");
      }

      const res = await fetch(`${baseUrl}/rest/v1/affiliates?select=*&order=created_at.desc`, {
        method: "GET",
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Cache-Control": "no-cache"
        },
        next: { revalidate: 0 } as any
      });

      if (res.ok) {
        const data = await res.json();
        return NextResponse.json({
          success: true,
          source: "Supabase Database",
          data: data && data.length > 0 ? data : mockAffiliatesMemory
        });
      }
    }

    return NextResponse.json({
      success: true,
      source: "Mock Memory (Offline)",
      data: mockAffiliatesMemory
    });

  } catch (error: any) {
    console.error("GET Affiliates Error:", error);
    return NextResponse.json({
      success: true,
      source: "Mock Memory Fallback (Error)",
      data: mockAffiliatesMemory
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, ame_code, ap_code, affiliate_code } = body;

    if (!name || !email || !phone || !affiliate_code) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

    let supabaseSaved = false;

    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      let baseUrl = SUPABASE_URL.trim().replace(/\/+$/, "");
      if (baseUrl.endsWith("/rest/v1")) {
        baseUrl = baseUrl.replace(/\/rest\/v1$/, "");
      }

      // Check if affiliate_code already exists in Supabase
      try {
        const checkRes = await fetch(`${baseUrl}/rest/v1/affiliates?affiliate_code=eq.${encodeURIComponent(affiliate_code)}&select=id`, {
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
              { success: false, error: "already-exists", message: "This affiliate code is already taken!" },
              { status: 400 }
            );
          }
        }
      } catch (checkErr) {
        console.error("Error verifying duplicate affiliate code in Supabase:", checkErr);
      }

      // Insert new affiliate
      const res = await fetch(`${baseUrl}/rest/v1/affiliates`, {
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
          ame_code: ame_code || null,
          ap_code: ap_code || null,
          affiliate_code,
          leads_count: 0,
          status: "Active"
        })
      });

      if (res.ok) {
        supabaseSaved = true;
      }
    }

    if (!supabaseSaved) {
      // Offline fallback: save in-memory
      const newMock = {
        id: `AFF00${mockAffiliatesMemory.length + 1}`,
        name,
        email,
        phone,
        ame_code: ame_code || "None",
        ap_code: ap_code || "None",
        affiliate_code,
        leads_count: 0,
        status: "Active"
      };
      mockAffiliatesMemory = [newMock, ...mockAffiliatesMemory];
    }

    return NextResponse.json({
      success: true,
      supabaseSaved,
      message: "Affiliate partner onboarded successfully."
    });

  } catch (error: any) {
    console.error("POST Affiliate Onboard Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
