"use client";

const steps = [
  {
    icon: "🗺️",
    title: "Pick Your Language",
    desc: "Choose French, German, or Japanese based on your goals.",
    color: "#4F6FE8",
    lightBg: "#F0F4FF"
  },
  {
    icon: "⚡",
    title: "Select Your Pace",
    desc: "Enrol in ID Regular or ID Fast Track classes at ISML.",
    color: "#7C5CFC",
    lightBg: "#F5F3FF"
  },
  {
    icon: "🎙️",
    title: "Start Learning",
    desc: "Join daily speaking sessions and cultural workshops.",
    color: "#0D9488",
    lightBg: "#F0FDFA"
  },
  {
    icon: "📝",
    title: "Ace Your Exams",
    desc: "Get targeted prep for DELF, Goethe, or JLPT exams.",
    color: "#0284C7",
    lightBg: "#F0F9FF"
  },
  {
    icon: "🎓",
    title: "Get Certified",
    desc: "Receive your International Diploma and go global.",
    color: "#8B5CF6",
    lightBg: "#F5F3FF"
  }
];

export default function HowItWorksSection() {
  return (
    <section id="journey" className="section-padding" style={{ background: "#FFFFFF", overflow: "hidden" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "clamp(60px, 10vw, 80px)" }}>
          <div className="section-tag animate-fade-in-up"><span>🚀</span> The Roadmap</div>
          <h2 className="animate-fade-in-up delay-100" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: "#0F172A", marginBottom: 20 }}>
            Your Learning <span className="gradient-text">Journey</span>
          </h2>
          <p className="animate-fade-in-up delay-200" style={{ fontSize: "clamp(16px, 1.2vw, 18px)", color: "var(--color-text-secondary)", maxWidth: 650, margin: "0 auto" }}>
            A proven 5-step roadmap to achieving international fluency and global recognition.
          </p>
        </div>

        <div style={{ position: "relative" }}>
          {/* Desktop Connecting Line */}
          <div className="journey-path-line"></div>

          <div className="journey-grid">
            {steps.map((s, i) => (
              <div key={i} className="animate-fade-in-up journey-card" style={{ animationDelay: `${0.1 * i}s` }}>
                <div className="journey-icon-wrap" style={{ 
                  background: `linear-gradient(135deg, #FFFFFF, ${s.lightBg})`,
                  borderColor: `${s.color}30`,
                  boxShadow: `0 15px 30px ${s.color}10`
                }}>
                  <div className="step-count" style={{ background: s.color }}>{i + 1}</div>
                  <span className="step-emoji">{s.icon}</span>
                </div>
                
                <div className="journey-text-box" style={{ background: `linear-gradient(180deg, #FFFFFF, ${s.lightBg}20)` }}>
                  <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0F172A", marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        .journey-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
          position: relative;
          z-index: 2;
        }

        .journey-path-line {
          position: absolute;
          top: 60px;
          left: 5%;
          right: 5%;
          height: 3px;
          background: repeating-linear-gradient(90deg, #E2E8F0 0, #E2E8F0 10px, transparent 10px, transparent 20px);
          z-index: 1;
        }

        .journey-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .journey-icon-wrap {
          width: 100px;
          height: 100px;
          border-radius: 30px;
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          position: relative;
          z-index: 3;
          background: #fff;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .journey-card:hover .journey-icon-wrap {
          transform: translateY(-10px) rotate(5deg);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1) !important;
        }

        .step-count {
          position: absolute;
          top: -10px;
          right: -10px;
          width: 28px;
          height: 28px;
          border-radius: 10px;
          color: #fff;
          font-size: 12px;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .step-emoji {
          font-size: 40px;
        }

        .journey-text-box {
          padding: 24px 20px;
          border-radius: 24px;
          border: 1px solid rgba(0,0,0,0.03);
          box-shadow: 0 4px 15px rgba(0,0,0,0.02);
          width: 100%;
        }

        @media (max-width: 1100px) {
          .journey-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 40px;
          }
          .journey-path-line { display: none; }
        }

        @media (max-width: 768px) {
          .journey-grid {
            grid-template-columns: 1fr;
            max-width: 350px;
            margin: 0 auto;
            gap: 40px;
          }
          .journey-card {
            flex-direction: row;
            text-align: left;
            gap: 20px;
          }
          .journey-icon-wrap {
            margin-bottom: 0;
            flex-shrink: 0;
            width: 80px;
            height: 80px;
          }
          .step-emoji { font-size: 32px; }
          .journey-text-box { padding: 20px; }
        }
      `}</style>
    </section>
  );
}
