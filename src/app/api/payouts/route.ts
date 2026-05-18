import { NextResponse } from "next/server";

// Fallback Mock Payouts memory state for offline resilience
let mockPayoutsMemory: any[] = [];

export async function GET() {
  try {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      let baseUrl = SUPABASE_URL.trim().replace(/\/+$/, "");
      if (baseUrl.endsWith("/rest/v1")) {
        baseUrl = baseUrl.replace(/\/rest\/v1$/, "");
      }

      const res = await fetch(`${baseUrl}/rest/v1/payouts?select=*&order=created_at.desc`, {
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
        // Map database fields to UI keys if needed
        const mapped = data.map((item: any) => ({
          id: item.id || `PAY00${item.uid || 0}`,
          affiliate: item.affiliate_name,
          amount: `₹${item.amount.toLocaleString('en-IN')}`,
          date: item.date_log || new Date(item.created_at).toISOString().split('T')[0],
          method: item.transfer_details || "UPI Direct",
          status: item.status
        }));
        return NextResponse.json({
          success: true,
          source: "Supabase Database",
          data: mapped && mapped.length > 0 ? mapped : mockPayoutsMemory
        });
      }
    }

    return NextResponse.json({
      success: true,
      source: "Mock Memory (Offline)",
      data: mockPayoutsMemory
    });

  } catch (error: any) {
    console.error("GET Payouts Error:", error);
    return NextResponse.json({
      success: true,
      source: "Mock Memory Fallback (Error)",
      data: mockPayoutsMemory
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

    let supabaseUpdated = false;

    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      let baseUrl = SUPABASE_URL.trim().replace(/\/+$/, "");
      if (baseUrl.endsWith("/rest/v1")) {
        baseUrl = baseUrl.replace(/\/rest\/v1$/, "");
      }

      const res = await fetch(`${baseUrl}/rest/v1/payouts?id=eq.${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        supabaseUpdated = true;
      }
    }

    // Always mirror the status change in memory fallback for UX testing
    const foundIdx = mockPayoutsMemory.findIndex(p => p.id === id);
    if (foundIdx !== -1) {
      mockPayoutsMemory[foundIdx].status = status;
    }

    return NextResponse.json({
      success: true,
      supabaseUpdated,
      message: `Payout successfully updated to ${status}.`
    });

  } catch (error: any) {
    console.error("POST Payout Update Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
