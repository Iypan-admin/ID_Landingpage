import { NextResponse } from "next/server";

export async function GET() {
  try {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

    // 1. TRY SUPABASE FIRST
    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      let baseUrl = SUPABASE_URL.trim().replace(/\/+$/, "");
      if (baseUrl.endsWith("/rest/v1")) {
        baseUrl = baseUrl.replace(/\/rest\/v1$/, "");
      }

      try {
        const response = await fetch(`${baseUrl}/rest/v1/leads?order=created_at.desc`, {
          method: "GET",
          headers: {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json"
          },
          next: { revalidate: 0 } // Disable fetch cache so it always fetches fresh data!
        });

        if (response.ok) {
          const data = await response.json();
          // Map dates elegantly
          const mapped = data.map((item: any) => ({
            id: item.id || `L-${Math.random().toString(36).substr(2, 9)}`,
            name: item.name || "N/A",
            email: item.email || "N/A",
            phone: item.phone || "N/A",
            language: item.language || "N/A",
            level: item.level || "N/A",
            mode: item.mode || "ID Fast Track",
            date: item.created_at ? new Date(item.created_at).toLocaleDateString('en-IN', {
              day: '2-digit', month: 'short', year: 'numeric'
            }) : "N/A",
            status: item.status || "New"
          }));

          return NextResponse.json({ success: true, source: "supabase", data: mapped });
        } else {
          console.warn("Supabase returned error status:", response.status);
        }
      } catch (supabaseError) {
        console.error("Failed to fetch from Supabase:", supabaseError);
      }
    }

    // 2. FALLBACK TO GOOGLE SHEETS (SheetDB)
    try {
      const sheetRes = await fetch("https://sheetdb.io/api/v1/y4odbljzg3dxt", {
        method: "GET",
        headers: {
          "Accept": "application/json"
        },
        next: { revalidate: 0 }
      });

      if (sheetRes.ok) {
        const data = await sheetRes.json();
        const mapped = data.map((item: any, idx: number) => ({
          id: `G-${idx}`,
          name: item.Name || "N/A",
          email: item.Email || "N/A",
          phone: item.Phone || "N/A",
          language: item.Language || "N/A",
          level: item.Level || "N/A",
          mode: "ID Fast Track",
          date: item.Date || "N/A",
          status: "New"
        })).reverse(); // Newest first

        return NextResponse.json({ success: true, source: "google-sheets", data: mapped });
      }
    } catch (sheetError) {
      console.error("Failed to fetch from Google Sheets backup:", sheetError);
    }

    return NextResponse.json({ success: false, error: "Failed to connect to any backend database." }, { status: 500 });

  } catch (err: any) {
    console.error("Internal Server Error in GET Leads API:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
