"use client";

export default function Footer() {
  return (
    <footer style={{ background: "#0F172A", color: "#FFFFFF", padding: "80px 0 60px" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 60, marginBottom: 60 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
              {/* ISML SVG Logo */}
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <rect width="100" height="100" rx="12" fill="#0F172A"/>
                <text x="5" y="25" fill="#FFFFFF" style={{ fontSize: '24px', fontWeight: 900, fontFamily: 'sans-serif' }}>I</text>
                <text x="25" y="25" fill="#FFFFFF" style={{ fontSize: '14px', fontWeight: 800, fontFamily: 'sans-serif' }}>NDIAN</text>
                <text x="5" y="48" fill="#14B8A6" style={{ fontSize: '24px', fontWeight: 900, fontFamily: 'sans-serif' }}>S</text>
                <text x="25" y="48" fill="#FFFFFF" style={{ fontSize: '14px', fontWeight: 800, fontFamily: 'sans-serif' }}>CHOOL FOR</text>
                <text x="5" y="71" fill="#14B8A6" style={{ fontSize: '24px', fontWeight: 900, fontFamily: 'sans-serif' }}>M</text>
                <text x="25" y="71" fill="#FFFFFF" style={{ fontSize: '14px', fontWeight: 800, fontFamily: 'sans-serif' }}>ODERN</text>
                <text x="5" y="94" fill="#14B8A6" style={{ fontSize: '24px', fontWeight: 900, fontFamily: 'sans-serif' }}>L</text>
                <text x="25" y="94" fill="#FFFFFF" style={{ fontSize: '14px', fontWeight: 800, fontFamily: 'sans-serif' }}>ANGUAGES</text>
              </svg>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 18, fontWeight: 900, color: "#FFFFFF", lineHeight: 1.1 }}>ISML</span>
                <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.05em" }}>INDIAN SCHOOL FOR MODERN LANGUAGES</span>
              </div>
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
