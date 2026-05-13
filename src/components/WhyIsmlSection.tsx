"use client";

const reasons = [
  {
    title: "Expert Trainers",
    desc: "Learn from certified native-level speakers with years of international teaching experience.",
    icon: "👨‍🏫",
    color: "#4F6FE8",
    lightBg: "#F0F4FF"
  },
  {
    title: "International Certification",
    desc: "Comprehensive guidance for DELF, Goethe, and JLPT exams with a high success rate.",
    icon: "🏆",
    color: "#7C5CFC",
    lightBg: "#F5F3FF"
  },
  {
    title: "Interactive Learning",
    desc: "Small batch sizes and high engagement levels to ensure every student participates.",
    icon: "💬",
    color: "#0D9488",
    lightBg: "#F0FDFA"
  },
  {
    title: "Student-Focused",
    desc: "Training tailored to your individual learning pace and professional goals.",
    icon: "🎯",
    color: "#0284C7",
    lightBg: "#F0F9FF"
  },
  {
    title: "Speaking Practice",
    desc: "Daily emphasis on verbal communication to build confidence in real-world scenarios.",
    icon: "🗣️",
    color: "#6366F1",
    lightBg: "#EEF2FF"
  },
  {
    title: "Global Opportunities",
    desc: "Open doors to international careers and study abroad programs with ease.",
    icon: "🚀",
    color: "#8B5CF6",
    lightBg: "#F5F3FF"
  }
];

export default function WhyIsmlSection() {
  return (
    <section id="why" className="section-padding" style={{ background: "#FFFFFF" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "clamp(48px, 8vw, 72px)" }}>
          <div className="section-tag animate-fade-in-up"><span>⭐</span> The ISML Edge</div>
          <h2 className="animate-fade-in-up delay-100" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: "#0F172A", marginBottom: 20 }}>
            Why Choose <span className="gradient-text">ISML?</span>
          </h2>
          <p className="animate-fade-in-up delay-200" style={{ fontSize: "clamp(16px, 1.2vw, 18px)", color: "var(--color-text-secondary)", maxWidth: 650, margin: "0 auto" }}>
            We provide the most comprehensive immersive language training in India, designed for global success.
          </p>
        </div>

        <div className="why-grid">
          {reasons.map((r, i) => (
            <div 
              key={i} 
              className="animate-fade-in-up why-card"
              style={{ 
                padding: "clamp(24px, 4vw, 32px)", 
                borderRadius: 32, 
                background: `linear-gradient(135deg, #FFFFFF 0%, ${r.lightBg} 100%)`,
                border: `1px solid ${r.color}20`,
                display: "flex",
                gap: "clamp(16px, 3vw, 24px)",
                alignItems: "flex-start",
                animationDelay: `${0.1 * i}s`,
                boxShadow: `0 10px 30px ${r.color}08`
              }}
            >
              <div className="why-icon-box" style={{ background: `${r.color}15`, color: r.color }}>
                {r.icon}
              </div>
              <div>
                <h3 style={{ fontSize: "clamp(18px, 2vw, 20px)", fontWeight: 800, color: "#0F172A", marginBottom: 8 }}>{r.title}</h3>
                <p style={{ fontSize: "clamp(14px, 1.1vw, 15px)", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
        }
        .why-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .why-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08) !important;
          border-color: rgba(0, 0, 0, 0.1) !important;
        }
        .why-icon-box {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
          transition: transform 0.3s;
          border: 1px solid rgba(0, 0, 0, 0.02);
        }
        .why-card:hover .why-icon-box {
          transform: scale(1.1) rotate(5deg);
        }
        @media (max-width: 480px) {
          .why-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .why-card {
            padding: 24px !important;
          }
          .why-icon-box {
            width: 48px;
            height: 48px;
            font-size: 20px;
          }
        }
      `}</style>
    </section>
  );
}
