"use client";

export default function Footer() {
  return (
    <footer style={{ background: "#0F172A", color: "#FFFFFF", padding: "80px 0 60px" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 60, marginBottom: 60 }}>
          {/* Brand */}
          <div>
            <div style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              marginBottom: 24,
              background: "#FFFFFF",
              padding: "16px 20px",
              borderRadius: "16px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
            }}>
              {/* Custom Typographic Logo matching screenshot */}
              <div style={{ display: "flex", flexDirection: "column", fontFamily: "sans-serif" }}>
                <div style={{ fontSize: 18, fontWeight: 900, lineHeight: 1.1, letterSpacing: "0.02em" }}>
                  <span style={{ color: "#22D3EE" }}>I</span><span style={{ color: "#1D4ED8" }}>NDIAN</span>
                </div>
                <div style={{ fontSize: 18, fontWeight: 900, lineHeight: 1.1, letterSpacing: "0.02em" }}>
                  <span style={{ color: "#22D3EE" }}>S</span><span style={{ color: "#1D4ED8" }}>CHOOL FOR</span>
                </div>
                <div style={{ fontSize: 18, fontWeight: 900, lineHeight: 1.1, letterSpacing: "0.02em" }}>
                  <span style={{ color: "#22D3EE" }}>M</span><span style={{ color: "#1D4ED8" }}>ODERN</span>
                </div>
                <div style={{ fontSize: 18, fontWeight: 900, lineHeight: 1.1, letterSpacing: "0.02em" }}>
                  <span style={{ color: "#22D3EE" }}>L</span><span style={{ color: "#1D4ED8" }}>ANGUAGES</span>
                </div>
                <div style={{ fontSize: 7, fontWeight: 700, color: "#1D4ED8", marginTop: 4, letterSpacing: "0.05em" }}>
                  IYPAN Educational Centre Pvt.Ltd
                </div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, maxWidth: 320 }}>
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
              <li>Email: enquiry.isml@gmail.com</li>
              <li>Phone: 7338881781 / 7338880780</li>
              <li>Location: 8/3, Athreyapuram 2nd Street, Choolaimedu, Chennai - 600094</li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 40, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
            © 2026 IYPAN Educational Centre Private Limited. All rights reserved.
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
