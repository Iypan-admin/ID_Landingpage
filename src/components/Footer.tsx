"use client";

export default function Footer() {
  return (
    <footer style={{ background: "#0F172A", color: "#FFFFFF", padding: "80px 0 60px" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 60, marginBottom: 60 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ 
                width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, #4F6FE8, #7C5CFC)",
                display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18
              }}>ID</div>
              <span style={{ fontSize: 22, fontWeight: 900 }}>International Diploma</span>
            </div>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, maxWidth: 300 }}>
              The premium International Diploma (ID) program by the Indian School for Modern Languages (ISML). Immersive education for a global future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 800, marginBottom: 24 }}>Program</h4>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12, fontSize: 15, color: "rgba(255,255,255,0.6)" }}>
              <li><a href="#about" style={{ color: "inherit", textDecoration: "none" }}>About ID</a></li>
              <li><a href="#languages" style={{ color: "inherit", textDecoration: "none" }}>Languages</a></li>
              <li><a href="#modes" style={{ color: "inherit", textDecoration: "none" }}>Learning Modes</a></li>
              <li><a href="#why" style={{ color: "inherit", textDecoration: "none" }}>ISML Edge</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 800, marginBottom: 24 }}>Contact</h4>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12, fontSize: 15, color: "rgba(255,255,255,0.6)" }}>
              <li>Email: contact@isml.in</li>
              <li>Phone: +91 98765 43210</li>
              <li>Location: Chennai, Bangalore, Coimbatore</li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 40, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
            © 2026 ISML — Indian School for Modern Languages. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 24, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
