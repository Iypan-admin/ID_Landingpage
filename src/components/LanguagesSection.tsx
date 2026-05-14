"use client";

const languages = [
  {
    code: "FR",
    name: "French",
    desc: "Master the language of diplomacy and culture. Prep for DELF/DALF certifications.",
    color: "#4F6FE8",
    lightBg: "#F0F4FF",
    border: "rgba(79, 111, 232, 0.15)",
    flag: (
      <svg width="40" height="26" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="40" fill="#002395"/>
        <rect x="20" width="20" height="40" fill="white"/>
        <rect x="40" width="20" height="40" fill="#ED2939"/>
      </svg>
    )
  },
  {
    code: "GR",
    name: "German",
    desc: "Unlock opportunities in Europe's economic powerhouse. Prep for Goethe-Zertifikat.",
    color: "#7C5CFC",
    lightBg: "#F5F3FF",
    border: "rgba(124, 92, 252, 0.15)",
    flag: (
      <svg width="40" height="26" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="13.33" fill="black"/>
        <rect y="13.33" width="60" height="13.33" fill="#DD0000"/>
        <rect y="26.66" width="60" height="13.33" fill="#FFCE00"/>
      </svg>
    )
  },
  {
    code: "JP",
    name: "Japanese",
    desc: "Navigate the world of tech and tradition. Focused preparation for JLPT N5-N2.",
    color: "#0284C7",
    lightBg: "#F0F9FF",
    border: "rgba(2, 132, 199, 0.15)",
    flag: (
      <svg width="40" height="26" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="40" fill="white"/>
        <circle cx="30" cy="20" r="10" fill="#BC002D"/>
      </svg>
    )
  }
];

export default function LanguagesSection() {
  return (
    <section id="languages" className="section-padding" style={{ background: "#FFFFFF" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="section-tag animate-fade-in-up" style={{ marginBottom: "16px" }}><span>🗺️</span> Global Languages</div>
          <h2 className="animate-fade-in-up delay-100" style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, color: "#0F172A", marginBottom: 12 }}>
            International <span className="gradient-text">Certifications</span>
          </h2>
          <p className="animate-fade-in-up delay-200" style={{ fontSize: "16px", color: "#475569", maxWidth: 600, margin: "0 auto" }}>
            Specialized tracks for the most in-demand global certifications.
          </p>
        </div>

        <div className="side-by-side-grid">
          {languages.map((l, i) => (
            <div 
              key={i} 
              className="side-by-side-card animate-fade-in-up"
              style={{ 
                animationDelay: `${0.1 * i}s`,
                background: `linear-gradient(135deg, #FFFFFF 0%, ${l.lightBg} 100%)`,
                borderColor: l.border
              }}
            >
              {/* Header: Flag + Info */}
              <div className="card-header-flex">
                <div className="flag-square-small" style={{ background: "#ffffff", boxShadow: `0 4px 12px ${l.color}15` }}>
                  {l.flag}
                </div>
                <div className="header-info">
                  <div className="code-badge-tiny" style={{ background: l.color }}>{l.code}</div>
                  <h3 className="name-heading-bold">{l.name}</h3>
                </div>
              </div>

              {/* Content Below */}
              <div className="card-content-below">
                <p className="desc-text-small">{l.desc}</p>
                <div className="divider-soft"></div>
                <div className="bottom-stats">
                  <span style={{ color: l.color }}>Certification Prep</span>
                  <span>•</span>
                  <span>Immersive Track</span>
                </div>
              </div>
              
              {/* Corner Glow */}
              <div className="corner-glow" style={{ background: l.color }}></div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .side-by-side-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .side-by-side-card {
          padding: 32px;
          border-radius: 28px;
          border: 1px solid;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .side-by-side-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.08);
          border-color: rgba(0, 0, 0, 0.08);
        }

        .card-header-flex {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 24px;
          position: relative;
          z-index: 2;
        }

        .flag-square-small {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(0, 0, 0, 0.05);
          flex-shrink: 0;
          transition: transform 0.3s;
        }

        .side-by-side-card:hover .flag-square-small {
          transform: scale(1.1) rotate(-3deg);
        }

        .header-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .code-badge-tiny {
          display: inline-block;
          align-self: flex-start;
          padding: 2px 10px;
          border-radius: 50px;
          font-size: 9px;
          font-weight: 900;
          color: #ffffff;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .name-heading-bold {
          font-size: 22px;
          font-weight: 900;
          color: #0f172a;
          letter-spacing: -0.01em;
        }

        .card-content-below {
          position: relative;
          z-index: 2;
          text-align: left;
        }

        .desc-text-small {
          font-size: 14.5px;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .divider-soft {
          height: 1px;
          background: rgba(0, 0, 0, 0.05);
          margin-bottom: 16px;
        }

        .bottom-stats {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 700;
          color: #94a3b8;
          letter-spacing: 0.02em;
        }

        .corner-glow {
          position: absolute;
          top: -20px;
          right: -20px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.15;
          pointer-events: none;
        }

        @media (max-width: 1100px) {
          .side-by-side-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 680px) {
          .side-by-side-grid {
            grid-template-columns: 1fr;
            max-width: 450px;
          }
        }
      `}</style>
    </section>
  );
}
