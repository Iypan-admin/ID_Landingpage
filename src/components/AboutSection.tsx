"use client";

const highlights = [
  {
    icon: "🌍",
    title: "International Diploma",
    desc: "A premium program designed for students and professionals aiming for globally recognized certifications.",
    color: "#4F6FE8"
  },
  {
    icon: "🎙️",
    title: "Speaking Focused",
    desc: "We prioritize verbal communication and real-world fluency over traditional textbook grammar.",
    color: "#7C5CFC"
  },
  {
    icon: "🎭",
    title: "Cultural Immersion",
    desc: "Learn the context, etiquette, and culture behind the language for true mastery.",
    color: "#38BDF8"
  },
  {
    icon: "🎓",
    title: "Exam Readiness",
    desc: "Dedicated prep for DELF (FR), Goethe (GR), and JLPT (JP) international exams.",
    color: "#4F6FE8"
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding" style={{ background: "#F8FAFF", position: "relative" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "clamp(48px, 8vw, 72px)" }}>
          <div className="section-tag animate-fade-in-up"><span>🏛️</span> About ISML</div>
          <h2 className="animate-fade-in-up delay-100" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: "#0F172A", marginBottom: 20 }}>
            What is <span className="gradient-text">International Diploma?</span>
          </h2>
          <p className="animate-fade-in-up delay-200" style={{ fontSize: "clamp(16px, 1.2vw, 18px)", color: "var(--color-text-secondary)", maxWidth: 700, margin: "0 auto", lineHeight: 1.7 }}>
            The Indian School for Modern Languages (ISML) presents a dedicated focus on our 
            flagship <strong>International Diploma (ID)</strong> program.
          </p>
        </div>

        <div className="highlights-single-row">
          {highlights.map((h, i) => (
            <div 
              key={i} 
              className="modern-highlight-card animate-fade-in-up" 
              style={{ 
                animationDelay: `${0.1 * i}s`,
              }}
            >
              <div className="icon-container" style={{ background: `${h.color}10`, color: h.color }}>
                {h.icon}
              </div>
              <h3 className="card-title">{h.title}</h3>
              <p className="card-desc">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .highlights-single-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .modern-highlight-card {
          background: #ffffff;
          padding: 40px 30px;
          border-radius: 32px;
          border: 1px solid rgba(79, 111, 232, 0.1);
          box-shadow: 0 10px 30px rgba(79, 111, 232, 0.08);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: left;
          position: relative;
          overflow: hidden;
        }

        .modern-highlight-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 30px 60px rgba(79, 111, 232, 0.15);
          border-color: rgba(79, 111, 232, 0.3);
        }

        /* Subtle top border accent on hover */
        .modern-highlight-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #4F6FE8, #7C5CFC);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .modern-highlight-card:hover::after {
          opacity: 1;
        }

        .icon-container {
          width: 64px;
          height: 64px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          margin-bottom: 28px;
          border: 1px solid rgba(0, 0, 0, 0.03);
          transition: all 0.3s;
        }

        .modern-highlight-card:hover .icon-container {
          transform: scale(1.1);
          background: rgba(79, 111, 232, 0.08);
        }

        .card-title {
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 14px;
          letter-spacing: -0.01em;
          line-height: 1.3;
        }

        .card-desc {
          font-size: 15px;
          color: #475569;
          line-height: 1.6;
        }

        @media (max-width: 1100px) {
          .highlights-single-row {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }

        @media (max-width: 640px) {
          .highlights-single-row {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .modern-highlight-card {
            padding: 32px 24px;
          }
        }
      `}</style>
    </section>
  );
}
