"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Check localStorage session persistence on component mount (prevents SSR mismatch)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLogged = localStorage.getItem("isml_admin_logged") === "true";
      if (isLogged) {
        setIsLoggedIn(true);
      }
      setSessionLoading(false);
    }
  }, []);

  const [leads, setLeads] = useState<any[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [dbSource, setDbSource] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Affiliates & Payouts dynamic states
  const [affiliates, setAffiliates] = useState<any[]>([]);
  const [loadingAffiliates, setLoadingAffiliates] = useState(false);
  const [payouts, setPayouts] = useState<any[]>([]);
  const [loadingPayouts, setLoadingPayouts] = useState(false);

  const [activeTab, setActiveTab] = useState<"leads" | "affiliates" | "payouts">("leads");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Affiliate Form State
  const [affiliateName, setAffiliateName] = useState("");
  const [affiliateEmail, setAffiliateEmail] = useState("");
  const [affiliatePhone, setAffiliatePhone] = useState("");
  const [ameCode, setAmeCode] = useState("");
  const [apCode, setApCode] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const res = await fetch("/api/leads");
      const result = await res.json();
      if (res.ok && result.success) {
        setLeads(result.data || []);
        setDbSource(result.source || "Unknown");
      } else {
        console.error("Failed to load leads from backend:", result.error);
      }
    } catch (err) {
      console.error("Error connecting to leads endpoint:", err);
    } finally {
      setLoadingLeads(false);
    }
  };

  const fetchAffiliates = async () => {
    setLoadingAffiliates(true);
    try {
      const res = await fetch("/api/affiliates");
      const result = await res.json();
      if (res.ok && result.success) {
        setAffiliates(result.data || []);
      }
    } catch (err) {
      console.error("Error fetching affiliates:", err);
    } finally {
      setLoadingAffiliates(false);
    }
  };

  const fetchPayouts = async () => {
    setLoadingPayouts(true);
    try {
      const res = await fetch("/api/payouts");
      const result = await res.json();
      if (res.ok && result.success) {
        setPayouts(result.data || []);
      }
    } catch (err) {
      console.error("Error fetching payouts:", err);
    } finally {
      setLoadingPayouts(false);
    }
  };

  const handleApprovePayout = async (payoutId: string) => {
    try {
      const res = await fetch("/api/payouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: payoutId, status: "Completed" })
      });
      const result = await res.json();
      if (res.ok && result.success) {
        fetchPayouts();
      } else {
        alert(result.error || "Failed to approve payout commission.");
      }
    } catch (err) {
      console.error("Failed to approve payout:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchLeads();
      fetchAffiliates();
      fetchPayouts();
    }
  }, [isLoggedIn]);

  const handleGenerateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!affiliateName || !affiliateEmail || !affiliatePhone) {
      alert("Please fill all required (*) fields!");
      return;
    }
        const shortCode = affiliateName.trim().slice(0, 3).toUpperCase() + Math.floor(100 + Math.random() * 900);
    const origin = typeof window !== "undefined" ? window.location.origin : "https://indianschoolsformodernlanguages.com";
    const link = `${origin}?ref=${shortCode}&ame=${ameCode || "None"}&ap=${apCode || "None"}`;
    
    try {
      const response = await fetch("/api/affiliates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: affiliateName,
          email: affiliateEmail,
          phone: affiliatePhone,
          ame_code: ameCode || null,
          ap_code: apCode || null,
          affiliate_code: shortCode
        })
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setGeneratedLink(link);
        fetchAffiliates(); // refresh affiliates list!
        // reset form inputs
        setAffiliateName("");
        setAffiliateEmail("");
        setAffiliatePhone("");
        setAmeCode("");
        setApCode("");
      } else {
        alert(result.error || "Failed to register affiliate partner.");
      }
    } catch (err) {
      console.error("Error onboarding affiliate:", err);
      alert("Failed to connect to affiliate registration server.");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    alert("Referral Link copied successfully!");
  };

  const handleCopyTableLink = (link: string, index: number) => {
    navigator.clipboard.writeText(link);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isml_admin_logged");
    }
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setErrorMessage("");
  };

  if (sessionLoading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#0F172A", color: "#FFFFFF", fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div className="spinner" style={{ width: 36, height: 36, border: "3px solid rgba(34, 211, 238, 0.1)", borderTopColor: "#22D3EE", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#94A3B8" }}>Verifying Secure Session...</span>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)", fontFamily: "system-ui, -apple-system, sans-serif", padding: 24 }}>
        <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", backdropFilter: "blur(20px)", borderRadius: 32, padding: "48px 40px", width: "100%", maxWidth: 440, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)", textAlign: "center", display: "flex", flexDirection: "column", gap: 32 }}>
          
          {/* Logo Brand */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ width: 60, height: 60, borderRadius: 18, background: "linear-gradient(135deg, #22D3EE, #1D4ED8)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 28, color: "#FFFFFF", boxShadow: "0 8px 24px rgba(34, 211, 238, 0.3)" }}>
              I
            </div>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: "#FFFFFF", margin: 0, letterSpacing: "0.02em" }}>ISML Immersion</h2>
              <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 600 }}>Admin Portal Secure Access</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={(e) => {
            e.preventDefault();
            if (username === "admin" && password === "ismladmin2026") {
              if (typeof window !== "undefined") {
                localStorage.setItem("isml_admin_logged", "true");
              }
              setIsLoggedIn(true);
              setErrorMessage("");
            } else {
              setErrorMessage("⚠️ Invalid Admin Credentials!");
            }
          }} style={{ display: "flex", flexDirection: "column", gap: 20, textAlign: "left" }}>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 11, fontWeight: 800, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.05em" }}>Username</label>
              <input 
                type="text" 
                required 
                placeholder="Enter username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ padding: "14px 18px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#FFFFFF", fontSize: 14, outline: "none", transition: "all 0.3s" }} 
                className="login-input"
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 11, fontWeight: 800, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.05em" }}>Password</label>
              <input 
                type="password" 
                required 
                placeholder="••••••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ padding: "14px 18px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#FFFFFF", fontSize: 14, outline: "none", transition: "all 0.3s" }} 
                className="login-input"
              />
            </div>

            {errorMessage && (
              <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, padding: "10px 14px", color: "#F87171", fontSize: 12.5, fontWeight: 700, textAlign: "center" }}>
                {errorMessage}
              </div>
            )}

            <button 
              type="submit" 
              style={{ background: "linear-gradient(135deg, #22D3EE, #1D4ED8)", color: "#FFFFFF", border: "none", padding: 14, borderRadius: 14, fontWeight: 800, fontSize: 15, cursor: "pointer", marginTop: 10, transition: "all 0.3s", boxShadow: "0 8px 20px rgba(34, 211, 238, 0.2)" }}
              className="login-btn"
            >
              Sign In to Dashboard
            </button>
          </form>

          {/* Hint/Helper for easy testing */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 20, fontSize: 11, color: "#64748B", display: "flex", flexDirection: "column", gap: 4 }}>
            <span>🔑 Hint for testing:</span>
            <span>Username: <strong style={{ color: "#E2E8F0" }}>admin</strong> &nbsp;|&nbsp; Password: <strong style={{ color: "#E2E8F0" }}>ismladmin2026</strong></span>
          </div>

        </div>

        <style jsx>{`
          .login-input:focus {
            border-color: #22D3EE !important;
            background: rgba(255,255,255,0.08) !important;
            box-shadow: 0 0 10px rgba(34, 211, 238, 0.2);
          }
          .login-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 24px rgba(34, 211, 238, 0.3) !important;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8FAFF", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      {/* Backdrop overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(4px)",
            zIndex: 150,
            display: "none"
          }}
          className="admin-overlay"
        />
      )}

      {/* SIDEBAR */}
      <aside style={{
        width: 280,
        background: "#0F172A",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "32px 24px",
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 200,
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)"
      }} className="admin-sidebar">
        
        <div>
          {/* Header & Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
            {/* Styled Logo Emblem */}
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, #22D3EE, #1D4ED8)", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 20 }}>
              I
            </div>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 800, margin: 0, letterSpacing: "0.02em" }}>ISML Immersion</h2>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px #10B981" }}></span>
                <span style={{ fontSize: 11, color: "#10B981", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Live</span>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button 
              onClick={() => { setActiveTab("leads"); setSidebarOpen(false); }}
              style={{
                display: "flex", alignItems: "center", gap: 14, width: "100%", padding: "14px 20px", borderRadius: 14, border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700, transition: "all 0.25s",
                background: activeTab === "leads" ? "rgba(34, 211, 238, 0.15)" : "transparent",
                color: activeTab === "leads" ? "#22D3EE" : "#94A3B8"
              }}
            >
              <span style={{ fontSize: 18 }}>📋</span> Leads
            </button>
            <button 
              onClick={() => { setActiveTab("affiliates"); setSidebarOpen(false); }}
              style={{
                display: "flex", alignItems: "center", gap: 14, width: "100%", padding: "14px 20px", borderRadius: 14, border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700, transition: "all 0.25s",
                background: activeTab === "affiliates" ? "rgba(34, 211, 238, 0.15)" : "transparent",
                color: activeTab === "affiliates" ? "#22D3EE" : "#94A3B8"
              }}
            >
              <span style={{ fontSize: 18 }}>🔗</span> Affiliates
            </button>
            <button 
              onClick={() => { setActiveTab("payouts"); setSidebarOpen(false); }}
              style={{
                display: "flex", alignItems: "center", gap: 14, width: "100%", padding: "14px 20px", borderRadius: 14, border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700, transition: "all 0.25s",
                background: activeTab === "payouts" ? "rgba(34, 211, 238, 0.15)" : "transparent",
                color: activeTab === "payouts" ? "#22D3EE" : "#94A3B8"
              }}
            >
              <span style={{ fontSize: 18 }}>💰</span> Payouts
            </button>
          </nav>
        </div>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          style={{
            display: "flex", alignItems: "center", gap: 14, width: "100%", padding: "14px 20px", borderRadius: 14, border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700, transition: "all 0.25s",
            background: "rgba(239, 68, 68, 0.1)", color: "#EF4444"
          }}
        >
          <span style={{ fontSize: 18 }}>🚪</span> Logout
        </button>

      </aside>

      {/* MOBILE HEADER FOR SIDEBAR TOGGLE */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 70, background: "#0F172A", color: "#FFF", display: "none", alignItems: "center", justifyContent: "space-between", padding: "0 24px", zIndex: 110
      }} className="mobile-admin-header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #22D3EE, #1D4ED8)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14 }}>I</div>
          <h2 style={{ fontSize: 14, fontWeight: 800, margin: 0 }}>ISML Admin</h2>
        </div>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ background: "none", border: "none", color: "#FFF", fontSize: 24, cursor: "pointer" }}
        >
          {sidebarOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MAIN CONTAINER */}
      <main style={{
        flex: 1,
        marginLeft: 280,
        padding: "48px clamp(16px, 4vw, 48px)",
        minHeight: "100vh",
        transition: "margin-left 0.3s ease"
      }} className="admin-main">

        {/* LEADS TAB VIEW */}
        {activeTab === "leads" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 36 }}>
              <div>
                <h1 style={{ fontSize: 28, fontWeight: 900, color: "#0F172A", margin: 0, display: "flex", alignItems: "center", gap: 12 }}>
                  📋 Leads Portal
                  {dbSource && (
                    <span style={{ fontSize: 11, fontWeight: 800, background: dbSource === "supabase" ? "rgba(34, 211, 238, 0.15)" : "rgba(245, 158, 11, 0.15)", color: dbSource === "supabase" ? "#06B6D4" : "#D97706", padding: "4px 10px", borderRadius: 50, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      🔗 {dbSource === "supabase" ? "Supabase Active" : "Google Sheets Backup"}
                    </span>
                  )}
                </h1>
                <p style={{ fontSize: 14, color: "#64748B", marginTop: 4 }}>Manage and track all new registrations from the landing page.</p>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button 
                  onClick={fetchLeads}
                  style={{ background: "rgba(15, 23, 42, 0.05)", color: "#0F172A", border: "none", padding: "12px 20px", borderRadius: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
                >
                  🔄 Refresh
                </button>
                <button 
                  onClick={() => {
                    const csvContent = "data:text/csv;charset=utf-8," 
                      + ["Name,Email,Phone,Language,Level,Mode,Date,Status"].join(",") + "\n"
                      + leads.map(l => `"${l.name}","${l.email}","${l.phone}","${l.language}","${l.level}","${l.mode}","${l.date}","${l.status}"`).join("\n");
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", `isml_leads_${new Date().toISOString().slice(0, 10)}.csv`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  style={{ background: "linear-gradient(135deg, #4F6FE8, #7C5CFC)", color: "#FFF", border: "none", padding: "12px 24px", borderRadius: 12, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 15px rgba(79,111,232,0.2)" }}
                >
                  📥 Export CSV
                </button>
              </div>
            </div>

            {/* Quick KPI Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24, marginBottom: 36 }}>
              <div style={{ background: "#FFF", padding: 24, borderRadius: 24, border: "1px solid #E2E8F0", boxShadow: "0 4px 10px rgba(0,0,0,0.01)" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#64748B" }}>Total Leads</span>
                <h3 style={{ fontSize: 32, fontWeight: 900, color: "#0F172A", margin: "8px 0 4px" }}>{leads.length}</h3>
                <span style={{ fontSize: 12, color: "#10B981", fontWeight: 700 }}>↑ Live Real-time Synced</span>
              </div>
              <div style={{ background: "#FFF", padding: 24, borderRadius: 24, border: "1px solid #E2E8F0", boxShadow: "0 4px 10px rgba(0,0,0,0.01)" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#64748B" }}>Languages Track</span>
                <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                  <div>🇫🇷 <span style={{ fontWeight: 800 }}>{leads.filter(l => l.language?.toLowerCase() === "french").length}</span></div>
                  <div>🇩🇪 <span style={{ fontWeight: 800 }}>{leads.filter(l => l.language?.toLowerCase() === "german").length}</span></div>
                  <div>🇯🇵 <span style={{ fontWeight: 800 }}>{leads.filter(l => l.language?.toLowerCase() === "japanese").length}</span></div>
                </div>
              </div>
              <div style={{ background: "#FFF", padding: 24, borderRadius: 24, border: "1px solid #E2E8F0", boxShadow: "0 4px 10px rgba(0,0,0,0.01)" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#64748B" }}>Enrolled / Active Pipeline</span>
                <h3 style={{ fontSize: 32, fontWeight: 900, color: "#10B981", margin: "8px 0 4px" }}>
                  {leads.filter(l => l.status?.toLowerCase() === "enrolled").length}
                </h3>
                <span style={{ fontSize: 12, color: "#64748B", fontWeight: 600 }}>Official registrations converted</span>
              </div>
            </div>

            {/* Leads Table Container */}
            <div style={{ background: "#FFF", borderRadius: 28, border: "1px solid #E2E8F0", overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.02)" }}>
              <div style={{ padding: "24px 32px", borderBottom: "1px solid #F1F5F9", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", margin: 0 }}>Registered Students</h3>
                <input 
                  type="text" 
                  placeholder="Search by name, email, phone..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ padding: "8px 16px", borderRadius: 10, border: "1px solid #CBD5E1", fontSize: 13, width: 220 }} 
                />
              </div>
              <div style={{ overflowX: "auto" }}>
                {loadingLeads ? (
                  <div style={{ padding: 60, textAlign: "center", color: "#64748B", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                    <div className="spinner" style={{ width: 40, height: 40, border: "3px solid rgba(79,111,232,0.1)", borderTopColor: "#4F6FE8", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>Fetching Live Records...</span>
                  </div>
                ) : leads.length === 0 ? (
                  <div style={{ padding: 60, textAlign: "center", color: "#64748B" }}>
                    <span style={{ fontSize: 40, display: "block", marginBottom: 12 }}>📭</span>
                    <span style={{ fontSize: 15, fontWeight: 700 }}>No leads recorded yet.</span>
                    <p style={{ fontSize: 13, margin: "4px 0 0" }}>Registrations will appear here in real-time.</p>
                  </div>
                ) : (
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: 800 }}>
                    <thead>
                      <tr style={{ background: "#F8FAFF", borderBottom: "1px solid #F1F5F9" }}>
                        <th style={{ padding: "16px 32px", fontSize: 12, fontWeight: 800, color: "#64748B" }}>STUDENT</th>
                        <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 800, color: "#64748B" }}>PHONE</th>
                        <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 800, color: "#64748B" }}>LANGUAGE TRACK</th>
                        <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 800, color: "#64748B" }}>LEVEL</th>
                        <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 800, color: "#64748B" }}>MODE</th>
                        <th style={{ padding: "16px 32px", fontSize: 12, fontWeight: 800, color: "#64748B" }}>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads
                        .filter(l => 
                          l.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.phone?.includes(searchQuery) ||
                          l.language?.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((l) => (
                          <tr key={l.id} style={{ borderBottom: "1px solid #F1F5F9", transition: "background 0.2s" }} className="table-row">
                            <td style={{ padding: "20px 32px" }}>
                              <div style={{ fontWeight: 700, color: "#0F172A" }}>{l.name}</div>
                              <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>{l.email}</div>
                            </td>
                            <td style={{ padding: "20px 20px", fontSize: 13, fontWeight: 600, color: "#475569" }}>{l.phone}</td>
                            <td style={{ padding: "20px 20px" }}>
                              <span style={{ 
                                padding: "4px 10px", borderRadius: 8, fontSize: 12, fontWeight: 800,
                                background: l.language?.toLowerCase() === "french" ? "rgba(79,111,232,0.1)" : l.language?.toLowerCase() === "german" ? "rgba(124,92,252,0.1)" : "rgba(56,189,248,0.1)",
                                color: l.language?.toLowerCase() === "french" ? "#4F6FE8" : l.language?.toLowerCase() === "german" ? "#7C5CFC" : "#0284C7",
                                textTransform: "capitalize"
                              }}>{l.language}</span>
                            </td>
                            <td style={{ padding: "20px 20px", fontSize: 13, fontWeight: 600, color: "#475569", textTransform: "capitalize" }}>{l.level}</td>
                            <td style={{ padding: "20px 20px", fontSize: 13, fontWeight: 600, color: "#475569" }}>{l.mode}</td>
                            <td style={{ padding: "20px 32px" }}>
                              <span style={{ 
                                padding: "6px 12px", borderRadius: 50, fontSize: 11, fontWeight: 800,
                                background: l.status === "New" ? "rgba(16,185,129,0.1)" : l.status === "Contacted" ? "rgba(245,158,11,0.1)" : "rgba(79,111,232,0.1)",
                                color: l.status === "New" ? "#10B981" : l.status === "Contacted" ? "#F59E0B" : "#4F6FE8"
                              }}>{l.status}</span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}

        {/* AFFILIATES TAB VIEW */}
        {activeTab === "affiliates" && (
          <div>
            <div style={{ marginBottom: 36 }}>
              <h1 style={{ fontSize: 28, fontWeight: 900, color: "#0F172A", margin: 0 }}>🔗 Affiliate Management</h1>
              <p style={{ fontSize: 14, color: "#64748B", marginTop: 4 }}>Add new affiliates, generate marketing tracks, and view referrals.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="affiliate-layout-grid">
              
              {/* Left Column: Form & Guide */}
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                
                {/* Form: Add New Affiliate */}
                <div style={{ background: "#FFF", padding: 32, borderRadius: 28, border: "1px solid #E2E8F0", boxShadow: "0 10px 40px rgba(0,0,0,0.02)" }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
                    <span>➕</span> Add New Affiliate
                  </h3>
                  
                  <form onSubmit={handleGenerateLink} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <label style={{ fontSize: 12, fontWeight: 800, color: "#475569" }}>Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Full Name" 
                        value={affiliateName}
                        onChange={(e) => setAffiliateName(e.target.value)}
                        style={{ padding: "12px 16px", borderRadius: 12, border: "1px solid #CBD5E1", fontSize: 14 }} 
                      />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <label style={{ fontSize: 12, fontWeight: 800, color: "#475569" }}>Email *</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="email@example.com" 
                        value={affiliateEmail}
                        onChange={(e) => setAffiliateEmail(e.target.value)}
                        style={{ padding: "12px 16px", borderRadius: 12, border: "1px solid #CBD5E1", fontSize: 14 }} 
                      />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <label style={{ fontSize: 12, fontWeight: 800, color: "#475569" }}>Phone *</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="Phone Number" 
                        value={affiliatePhone}
                        onChange={(e) => setAffiliatePhone(e.target.value)}
                        style={{ padding: "12px 16px", borderRadius: 12, border: "1px solid #CBD5E1", fontSize: 14 }} 
                      />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <label style={{ fontSize: 12, fontWeight: 800, color: "#475569" }}>AME Code — Internal employee hiring this affiliate</label>
                      <input 
                        type="text" 
                        placeholder="e.g. AME001" 
                        value={ameCode}
                        onChange={(e) => setAmeCode(e.target.value)}
                        style={{ padding: "12px 16px", borderRadius: 12, border: "1px solid #CBD5E1", fontSize: 14 }} 
                      />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <label style={{ fontSize: 12, fontWeight: 800, color: "#475569" }}>AP Code — Existing affiliate who recommended them</label>
                      <input 
                        type="text" 
                        placeholder="e.g. RAJ456" 
                        value={apCode}
                        onChange={(e) => setApCode(e.target.value)}
                        style={{ padding: "12px 16px", borderRadius: 12, border: "1px solid #CBD5E1", fontSize: 14 }} 
                      />
                    </div>

                    <button 
                      type="submit" 
                      style={{ 
                        background: "linear-gradient(135deg, #4F6FE8, #7C5CFC)", color: "#FFF", border: "none", padding: "14px", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 8, transition: "all 0.25s"
                      }}
                      className="btn-glow"
                    >
                      🚀 Generate Link
                    </button>
                  </form>
                </div>

                {/* Info Guide */}
                <div style={{ background: "#F1F5F9", border: "1px solid #E2E8F0", padding: 24, borderRadius: 24 }}>
                  <h4 style={{ fontSize: 13, fontWeight: 800, color: "#334155", margin: "0 0 12px" }}>💡 Code Dictionary Guide</h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12, fontSize: 12.5, color: "#475569", lineHeight: 1.5 }}>
                    <li style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ fontWeight: 800, color: "#4F6FE8" }}>• AME Code:</span>
                      <span><strong>"Account Manager Employee"</strong>: the internal staff member who onboarded this affiliate partner.</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ fontWeight: 800, color: "#7C5CFC" }}>• AP Code:</span>
                      <span><strong>"Affiliate Partner"</strong>: an existing active affiliate who referred / recommended this new partner.</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Right Column: Generated Output & Table List */}
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                
                {/* Real-time Link Generation Output Card */}
                {generatedLink && (
                  <div style={{ background: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)", border: "1px solid #A7F3D0", padding: 28, borderRadius: 28, boxShadow: "0 10px 30px rgba(16,185,129,0.05)" }}>
                    <h4 style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 800, color: "#065F46" }}>✅ Referral Link Generated!</h4>
                    <p style={{ margin: "0 0 16px", fontSize: 12.5, color: "#047857" }}>Provide this custom link to the affiliate to track registrations.</p>
                    
                    <div style={{ display: "flex", gap: 10 }}>
                      <input 
                        type="text" 
                        readOnly 
                        value={generatedLink}
                        style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "1px solid #A7F3D0", background: "#FFF", fontSize: 12, fontWeight: 700, color: "#0F172A" }}
                      />
                      <button 
                        onClick={handleCopyLink}
                        style={{ padding: "10px 18px", borderRadius: 10, background: "#059669", color: "#FFF", border: "none", fontWeight: 700, fontSize: 12, cursor: "pointer" }}
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                )}

                {/* Affiliate List */}
                <div style={{ background: "#FFF", borderRadius: 28, border: "1px solid #E2E8F0", padding: 28, boxShadow: "0 10px 40px rgba(0,0,0,0.02)", display: "flex", flexDirection: "column", gap: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", margin: 0 }}>Active Affiliate Network</h3>
                    <button 
                      onClick={fetchAffiliates}
                      disabled={loadingAffiliates}
                      style={{ background: "rgba(79,111,232,0.08)", color: "#4F6FE8", border: "none", padding: "8px 16px", borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
                    >
                      🔄 {loadingAffiliates ? "Loading..." : "Load Affiliates"}
                    </button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {affiliates.length === 0 ? (
                      <div style={{ textAlign: "center", padding: "36px 0", color: "#64748B", fontSize: 13, fontWeight: 600 }}>
                        No active affiliate partners onboarded.
                      </div>
                    ) : (
                      affiliates.map((a, index) => {
                        const origin = typeof window !== "undefined" ? window.location.origin : "https://indianschoolsformodernlanguages.com";
                        const trackLink = `${origin}?ref=${a.affiliate_code}&ame=${a.ame_code || "None"}&ap=${a.ap_code || "None"}`;
                        return (
                          <div key={a.id || index} style={{ border: "1px solid #F1F5F9", borderRadius: 20, padding: 18, background: "#F8FAFF" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                              <div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                  <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#0F172A" }}>{a.name}</h4>
                                  <span style={{ fontSize: 10, background: "#E2E8F0", padding: "2px 6px", borderRadius: 4, fontWeight: 700, color: "#475569" }}>{a.affiliate_code}</span>
                                </div>
                                <span style={{ fontSize: 12, color: "#64748B" }}>{a.email} • {a.phone}</span>
                              </div>
                              <span style={{ fontSize: 11, fontWeight: 800, color: "#10B981", background: "rgba(16,185,129,0.1)", padding: "4px 10px", borderRadius: 50 }}>{a.status || "Active"}</span>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0", padding: "10px 0", margin: "12px 0" }}>
                              <div>
                                <span style={{ fontSize: 11, color: "#64748B", display: "block" }}>AME / ONBOARDER</span>
                                <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>{a.ame_code || "None"}</span>
                              </div>
                              <div>
                                <span style={{ fontSize: 11, color: "#64748B", display: "block" }}>AP / REFERRER</span>
                                <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>{a.ap_code || "None"}</span>
                              </div>
                              <div>
                                <span style={{ fontSize: 11, color: "#64748B", display: "block" }}>REFERRED LEADS</span>
                                <span style={{ fontSize: 13, fontWeight: 700, color: "#4F6FE8" }}>{a.leads_count || 0} leads</span>
                              </div>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <input 
                                type="text" 
                                readOnly 
                                value={trackLink} 
                                style={{ flex: 1, padding: "8px 12px", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: 11, background: "#FFF", color: "#64748B" }}
                              />
                              <button 
                                onClick={() => handleCopyTableLink(trackLink, index)}
                                style={{ 
                                  padding: "8px 12px", borderRadius: 8, background: copiedIndex === index ? "#10B981" : "#0F172A", color: "#FFF", border: "none", fontSize: 11, fontWeight: 700, cursor: "pointer", width: 70, transition: "background 0.2s"
                                }}
                              >
                                {copiedIndex === index ? "Copied" : "Copy"}
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                </div>

              </div>

            </div>
          </div>
        )}

        {/* PAYOUTS TAB VIEW */}
        {activeTab === "payouts" && (
          <div>
            <div style={{ marginBottom: 36 }}>
              <h1 style={{ fontSize: 28, fontWeight: 900, color: "#0F172A", margin: 0 }}>💰 Commissions & Payouts</h1>
              <p style={{ fontSize: 14, color: "#64748B", marginTop: 4 }}>Approve pending payouts and track commission logs for active affiliates.</p>
            </div>

            {/* Financial Overview Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginBottom: 36 }}>
              <div style={{ background: "#FFF", padding: 24, borderRadius: 24, border: "1px solid #E2E8F0" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#64748B" }}>Pending Commissions</span>
                <h3 style={{ fontSize: 32, fontWeight: 900, color: "#F59E0B", margin: "8px 0 4px" }}>
                  ₹{payouts.filter(p => p.status === "Pending").reduce((sum, p) => sum + parseInt(p.amount.replace(/\D/g, "") || "0"), 0).toLocaleString('en-IN')}
                </h3>
                <span style={{ fontSize: 12, color: "#64748B", fontWeight: 600 }}>
                  {payouts.filter(p => p.status === "Pending").length} payouts waiting approval
                </span>
              </div>
              <div style={{ background: "#FFF", padding: 24, borderRadius: 24, border: "1px solid #E2E8F0" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#64748B" }}>Total Disbursed</span>
                <h3 style={{ fontSize: 32, fontWeight: 900, color: "#10B981", margin: "8px 0 4px" }}>
                  ₹{payouts.filter(p => p.status === "Completed").reduce((sum, p) => sum + parseInt(p.amount.replace(/\D/g, "") || "0"), 0).toLocaleString('en-IN')}
                </h3>
                <span style={{ fontSize: 12, color: "#10B981", fontWeight: 700 }}>Successfully paid out</span>
              </div>
              <div style={{ background: "#FFF", padding: 24, borderRadius: 24, border: "1px solid #E2E8F0" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#64748B" }}>Affiliate Rate</span>
                <h3 style={{ fontSize: 32, fontWeight: 900, color: "#0F172A", margin: "8px 0 4px" }}>₹600 <span style={{ fontSize: 14, fontWeight: 500, color: "#64748B" }}>/ lead</span></h3>
                <span style={{ fontSize: 12, color: "#4F6FE8", fontWeight: 700 }}>Flat success incentive</span>
              </div>
            </div>

            {/* Payouts Table */}
            <div style={{ background: "#FFF", borderRadius: 28, border: "1px solid #E2E8F0", overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.02)" }}>
              <div style={{ padding: "24px 32px", borderBottom: "1px solid #F1F5F9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", margin: 0 }}>Payout Ledger Log</h3>
                <button 
                  onClick={fetchPayouts}
                  disabled={loadingPayouts}
                  style={{ background: "rgba(79,111,232,0.08)", color: "#4F6FE8", border: "none", padding: "6px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer" }}
                >
                  🔄 {loadingPayouts ? "Refreshing..." : "Refresh Logs"}
                </button>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: 800 }}>
                  <thead>
                    <tr style={{ background: "#F8FAFF", borderBottom: "1px solid #F1F5F9" }}>
                      <th style={{ padding: "16px 32px", fontSize: 12, fontWeight: 800, color: "#64748B" }}>PAYOUT ID</th>
                      <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 800, color: "#64748B" }}>AFFILIATE PARTNER</th>
                      <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 800, color: "#64748B" }}>AMOUNT</th>
                      <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 800, color: "#64748B" }}>DATE LOG</th>
                      <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 800, color: "#64748B" }}>TRANSFER DETAILS</th>
                      <th style={{ padding: "16px 32px", fontSize: 12, fontWeight: 800, color: "#64748B" }}>ACTION / STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payouts.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ padding: "32px", textAlign: "center", color: "#64748B", fontSize: 13, fontWeight: 600 }}>
                          No payout transactions logged.
                        </td>
                      </tr>
                    ) : (
                      payouts.map((p) => (
                        <tr key={p.id} style={{ borderBottom: "1px solid #F1F5F9", transition: "background 0.2s" }} className="table-row">
                          <td style={{ padding: "20px 32px", fontSize: 13, fontWeight: 700, color: "#0F172A" }}>{p.id}</td>
                          <td style={{ padding: "20px 20px", fontSize: 13, fontWeight: 700, color: "#475569" }}>{p.affiliate}</td>
                          <td style={{ padding: "20px 20px", fontSize: 14, fontWeight: 900, color: "#0F172A" }}>{p.amount}</td>
                          <td style={{ padding: "20px 20px", fontSize: 13, fontWeight: 600, color: "#64748B" }}>{p.date}</td>
                          <td style={{ padding: "20px 20px", fontSize: 13, fontWeight: 600, color: "#64748B" }}>{p.method}</td>
                          <td style={{ padding: "20px 32px" }}>
                            {p.status === "Pending" ? (
                              <div style={{ display: "flex", gap: 8 }}>
                                <button 
                                  onClick={() => handleApprovePayout(p.id)}
                                  style={{ background: "#10B981", color: "#FFF", border: "none", padding: "6px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer" }}
                                >
                                  Approve UPI
                                </button>
                                <span style={{ fontSize: 11, fontWeight: 800, color: "#F59E0B", background: "rgba(245,158,11,0.1)", padding: "6px 12px", borderRadius: 8 }}>Pending</span>
                              </div>
                            ) : (
                              <span style={{ fontSize: 11, fontWeight: 800, color: "#10B981", background: "rgba(16,185,129,0.1)", padding: "6px 12px", borderRadius: 8 }}>{p.status}</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Embedded Global Styles for custom UI hover effects */}
      <style jsx global>{`
        .nav-link-hover:hover {
          background: rgba(34, 211, 238, 0.08) !important;
          color: #22D3EE !important;
        }
        .table-row:hover {
          background: #F8FAFF !important;
        }
        .btn-glow {
          box-shadow: 0 4px 15px rgba(124,92,252,0.2);
        }
        .btn-glow:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(124,92,252,0.3) !important;
        }
        
        /* Loading Spinner Animation */
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        /* Desktop Locked Sidebar overrides */
        @media (min-width: 969px) {
          .admin-sidebar {
            transform: translateX(0) !important;
          }
        }

        /* Mobile & Tablet responsiveness overrides */
        @media (max-width: 968px) {
          .admin-sidebar {
            box-shadow: 10px 0 40px rgba(0, 0, 0, 0.25) !important;
            height: 100vh !important;
          }
          .admin-overlay {
            display: block !important;
          }
          .mobile-admin-header {
            display: flex !important;
          }
          .admin-main {
            margin-left: 0 !important;
            padding-top: 110px !important;
          }
          .affiliate-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
}
