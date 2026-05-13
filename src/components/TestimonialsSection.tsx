"use client";

const testimonials = [
  {
    name: "Arjun Kumar",
    role: "ID Fast Track Graduate",
    quote: "The 5-day intensive program was exactly what I needed. I cleared my Goethe B1 exam in record time thanks to the constant immersion at ISML.",
    avatar: "AK",
    lang: "German",
    color: "#7C5CFC",
    lightBg: "#F5F3FF"
  },
  {
    name: "Priya Sharma",
    role: "ID Regular Student",
    quote: "Being a working professional, the 2-day weekly schedule is perfect. The trainers at ISML focus so much on speaking that I already feel confident in French.",
    avatar: "PS",
    lang: "French",
    color: "#4F6FE8",
    lightBg: "#F0F4FF"
  },
  {
    name: "Rahul V.",
    role: "JLPT N3 Candidate",
    quote: "ISML's approach to Japanese is unique. They don't just teach kanji; they teach you how to think in Japanese. The immersion workshops are life-changing.",
    avatar: "RV",
    lang: "Japanese",
    color: "#0284C7",
    lightBg: "#F0F9FF"
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding" style={{ background: "#FFFFFF" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "clamp(48px, 8vw, 72px)" }}>
          <div className="section-tag animate-fade-in-up"><span>💬</span> Success Stories</div>
          <h2 className="animate-fade-in-up delay-100" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: "#0F172A", marginBottom: 20 }}>
            Hear From Our <span className="gradient-text">Students</span>
          </h2>
          <p className="animate-fade-in-up delay-200" style={{ fontSize: "clamp(16px, 1.2vw, 18px)", color: "var(--color-text-secondary)", maxWidth: 650, margin: "0 auto" }}>
            Real stories from our students who achieved their global certification goals with ISML.
          </p>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="animate-fade-in-up testimonial-card"
              style={{ 
                animationDelay: `${0.1 * i}s`,
                background: `linear-gradient(135deg, #FFFFFF 0%, ${t.lightBg} 100%)`,
                border: `1px solid ${t.color}20`
              }}
            >
              <div className="quote-icon" style={{ color: `${t.color}20` }}>"</div>
              
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} style={{ color: "#FBBF24" }}>★</span>
                ))}
              </div>

              <p className="testimonial-quote">
                {t.quote}
              </p>

              <div className="student-profile">
                <div className="student-avatar" style={{ background: t.color }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="student-name">{t.name}</div>
                  <div className="student-role" style={{ color: t.color }}>{t.role}</div>
                </div>
              </div>

              <div className="lang-tag-footer" style={{ background: `${t.color}10`, color: t.color }}>
                {t.lang.toUpperCase()} PROGRAM
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .testimonial-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
        }

        .testimonial-card {
          padding: 40px;
          border-radius: 40px;
          position: relative;
          display: flex;
          flex-direction: column;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
          overflow: hidden;
        }

        .testimonial-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1) !important;
          border-color: rgba(0,0,0,0.1) !important;
        }

        .quote-icon {
          position: absolute;
          top: -10px;
          right: 20px;
          font-size: 120px;
          font-family: serif;
          line-height: 1;
          pointer-events: none;
          z-index: 1;
        }

        .rating-stars {
          margin-bottom: 20px;
          font-size: 18px;
          position: relative;
          z-index: 2;
        }

        .testimonial-quote {
          font-size: 16px;
          color: #475569;
          line-height: 1.8;
          font-style: italic;
          margin-bottom: 32px;
          position: relative;
          z-index: 2;
        }

        .student-profile {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: auto;
          position: relative;
          z-index: 2;
        }

        .student-avatar {
          width: 52px;
          height: 52px;
          border-radius: 18px;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 18px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }

        .student-name {
          font-weight: 800;
          color: #0F172A;
          font-size: 16px;
          margin-bottom: 2px;
        }

        .student-role {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .lang-tag-footer {
          position: absolute;
          bottom: 0;
          right: 0;
          padding: 8px 20px;
          border-top-left-radius: 24px;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.1em;
        }

        @media (max-width: 480px) {
          .testimonial-card {
            padding: 32px 24px;
          }
          .quote-icon {
            font-size: 80px;
          }
        }
      `}</style>
    </section>
  );
}
