"use client";

const modes = [
  {
    title: "ID Regular",
    duration: "6 Months",
    days: "2 Days / Week",
    subtitle: "Flexible Learning",
    description: "Designed for students and working professionals who need a balanced pace without compromising on depth.",
    features: [
      "Weekly 2 days of class",
      "Flexible learning schedule",
      "Step-by-step mastery",
      "Ideal for multi-taskers",
      "Full certification prep"
    ],
    color: "#4F6FE8",
    bg: "rgba(79,111,232,0.03)",
    tag: "Balanced"
  },
  {
    title: "ID Fast Track",
    duration: "3 Months",
    days: "5 Days / Week",
    subtitle: "Intensive Training",
    description: "The ultimate learning experience for those who want to achieve fluency and certification in record time.",
    features: [
      "Monday to Friday classes",
      "Weekly 5 days of class",
      "Intensive fast-track training",
      "Faster certification path",
      "Daily speaking practice"
    ],
    color: "#7C5CFC",
    bg: "rgba(124,92,252,0.03)",
    tag: "Recommended",
    isPopular: true
  }
];

interface ProgramModesSectionProps {
  onSelect: () => void;
}

export default function ProgramModesSection({ onSelect }: ProgramModesSectionProps) {
  return (
    <section id="modes" className="section-padding" style={{ background: "linear-gradient(180deg, #FFFFFF, #F8FAFF)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "clamp(48px, 8vw, 64px)" }}>
          <div className="section-tag animate-fade-in-up"><span>⚡</span> Learning Modes</div>
          <h2 className="animate-fade-in-up delay-100" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: "#0F172A", marginBottom: 20 }}>
            Choose Your <span className="gradient-text">Learning Pace</span>
          </h2>
          <p className="animate-fade-in-up delay-200" style={{ fontSize: "clamp(16px, 1.2vw, 18px)", color: "var(--color-text-secondary)", maxWidth: 600, margin: "0 auto" }}>
            Whether you need flexibility or intensity, we have a mode that fits your lifestyle.
          </p>
        </div>

        <div className="modes-grid">
          {modes.map((m, i) => (
            <div 
              key={i} 
              className="glass-card animate-fade-in-up"
              style={{ 
                padding: "clamp(32px, 5vw, 48px) clamp(24px, 4vw, 40px)", 
                borderRadius: 40, 
                background: m.isPopular ? "#FFFFFF" : m.bg,
                border: m.isPopular ? `2px solid ${m.color}30` : "1px solid rgba(79,111,232,0.1)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                animationDelay: `${0.2 * i}s`,
                boxShadow: m.isPopular ? "0 30px 60px rgba(79,111,232,0.12)" : "var(--shadow-md)"
              }}
            >
              {m.isPopular && (
                <div className="popular-tag">
                  {m.tag}
                </div>
              )}

              <div style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <h3 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 900, color: "#0F172A" }}>{m.title}</h3>
                  <div style={{ 
                    background: `${m.color}10`, color: m.color, 
                    padding: "6px 14px", borderRadius: 12, 
                    fontSize: 14, fontWeight: 800, border: `1px solid ${m.color}20`
                  }}>
                    {m.duration}
                  </div>
                </div>
                <div style={{ fontSize: "clamp(16px, 2vw, 18px)", fontWeight: 700, color: m.color, marginBottom: 8 }}>{m.days}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{m.subtitle}</div>
              </div>

              <p style={{ fontSize: "clamp(14px, 1.1vw, 16px)", color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: 32 }}>
                {m.description}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40, flex: 1 }}>
                {m.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ 
                      width: 22, height: 22, borderRadius: "50%", 
                      background: `${m.color}15`, display: "flex", 
                      alignItems: "center", justifyContent: "center",
                      color: m.color, fontSize: 12, fontWeight: 800, flexShrink: 0, marginTop: 2
                    }}>✓</div>
                    <span style={{ fontSize: "clamp(14px, 1vw, 15px)", color: "#0F172A", fontWeight: 500 }}>{f}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={onSelect}
                className="btn-primary" 
                style={{ 
                  background: m.isPopular ? "linear-gradient(135deg, #4F6FE8, #7C5CFC)" : "rgba(15,23,42,0.05)",
                  color: m.isPopular ? "#fff" : "#0F172A",
                  boxShadow: m.isPopular ? "0 10px 30px rgba(79,111,232,0.3)" : "none",
                  justifyContent: "center",
                  width: "100%",
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Choose {m.title}
              </button>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .modes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
          max-width: 1000px;
          margin: 0 auto;
        }
        .popular-tag {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #4F6FE8, #7C5CFC);
          color: #fff;
          padding: 8px 24px;
          borderRadius: 50px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          box-shadow: 0 8px 20px rgba(79,111,232,0.3);
          z-index: 5;
        }
        @media (max-width: 768px) {
          .modes-grid {
            grid-template-columns: 1fr;
            max-width: 500px;
          }
          .popular-tag {
            padding: 6px 18px;
            font-size: 10px;
          }
        }
      `}</style>
    </section>
  );
}
