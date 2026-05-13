"use client";
import { useEffect, useRef } from "react";

const programs = [
  { flag: "🇫🇷", name: "French", cert: "DELF Certification", color: "#4F6FE8" },
  { flag: "🇩🇪", name: "German", cert: "Goethe Zertifikat", color: "#7C5CFC" },
  { flag: "🇯🇵", name: "Japanese", cert: "JLPT N5-N1", color: "#38BDF8" }
];

interface HeroSectionProps {
  onBookDemo: () => void;
}

export default function HeroSection({ onBookDemo }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.classList.add("revealed");
  }, []);

  return (
    <section
      ref={heroRef}
      className="reveal-child"
      style={{
        minHeight: "100vh",
        paddingTop: 100,
        paddingBottom: 80,
        background: "linear-gradient(145deg, #FFFFFF 0%, #F8FAFF 35%, #F5F3FF 65%, #F0F9FF 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background blobs */}
      <div className="bg-blob animate-blob1" style={{ width: 600, height: 600, background: "rgba(79,111,232,0.08)", top: -120, right: -100 }} />
      <div className="bg-blob animate-blob2" style={{ width: 450, height: 450, background: "rgba(124,92,252,0.06)", bottom: -100, left: -80 }} />

      <div className="container" style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <div className="hero-grid">

          {/* Left: Text Content */}
          <div className="hero-text-content">
            <div className="animate-fade-in-up" style={{ marginBottom: 20 }}>
              <span className="badge" style={{ fontSize: 12, background: "rgba(79,111,232,0.06)", color: "#4F6FE8", border: "1px solid rgba(79,111,232,0.15)", padding: "6px 14px" }}>
                ✨ International Diploma Program by ISML
              </span>
            </div>

            <h1
              className="animate-fade-in-up delay-100"
              style={{
                fontSize: "clamp(32px, 4.5vw, 52px)",
                fontWeight: 900,
                lineHeight: 1.15,
                marginBottom: 20,
                letterSpacing: "-0.03em",
                color: "#0F172A",
              }}
            >
              Master Languages with <br />
              <span className="gradient-text">Immersive Learning</span>
            </h1>

            <p
              className="animate-fade-in-up delay-200"
              style={{
                fontSize: "clamp(16px, 1.2vw, 18px)",
                color: "#475569",
                lineHeight: 1.7,
                marginBottom: 36,
                maxWidth: 540,
              }}
            >
              ISML presents the <strong>International Diploma (ID)</strong> — a premium language program for French, German, and Japanese, focused on global certification and real-world fluency.
            </p>

            <div className="animate-fade-in-up delay-300 hero-btns">
              <button 
                onClick={onBookDemo}
                className="btn-primary animate-pulse-glow" 
                style={{ padding: "14px 28px", border: 'none', cursor: 'pointer' }}
              >
                Book Free Demo
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <a href="#languages" className="btn-secondary" style={{ padding: "14px 28px" }}>
                Explore Programs
              </a>
            </div>
          </div>

          {/* Right: Clean, Instant-Understand Visual */}
          <div className="hero-visual animate-fade-in-right delay-300">
            <div className="program-showcase">
              {programs.map((p, i) => (
                <div 
                  key={i} 
                  className="showcase-card animate-float" 
                  style={{ 
                    animationDelay: `${i * 0.5}s`,
                    borderLeft: `4px solid ${p.color}`
                  }}
                >
                  <div className="showcase-icon">{p.flag}</div>
                  <div className="showcase-info">
                    <div className="showcase-name">{p.name}</div>
                    <div className="showcase-cert">{p.cert}</div>
                  </div>
                  <div className="showcase-status">
                    <span className="dot" style={{ background: p.color }}></span>
                    Enrolment Open
                  </div>
                </div>
              ))}

              {/* Decorative Diploma Badge */}
              <div className="diploma-badge animate-scale-in delay-500">
                <div className="diploma-icon">🎓</div>
                <div className="diploma-text">
                  <strong>International Diploma</strong>
                  <span>Official Certification Path</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 60px;
          align-items: center;
        }

        .hero-btns {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .hero-visual {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .program-showcase {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
          max-width: 400px;
          position: relative;
        }

        .showcase-card {
          background: #ffffff;
          padding: 20px 24px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
          display: flex;
          align-items: center;
          gap: 16px;
          border: 1px solid rgba(0, 0, 0, 0.03);
          transition: all 0.3s;
          position: relative;
        }

        .showcase-card:hover {
          transform: translateX(10px);
          box-shadow: 0 15px 40px rgba(79, 111, 232, 0.12);
        }

        .showcase-icon {
          font-size: 32px;
          background: #f8fafc;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          flex-shrink: 0;
        }

        .showcase-info {
          flex: 1;
        }

        .showcase-name {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 2px;
        }

        .showcase-cert {
          font-size: 13px;
          color: #64748b;
          font-weight: 600;
        }

        .showcase-status {
          font-size: 10px;
          font-weight: 800;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .showcase-status .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .diploma-badge {
          position: absolute;
          bottom: -40px;
          right: -20px;
          background: #0f172a;
          color: #fff;
          padding: 16px 24px;
          border-radius: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.2);
          z-index: 5;
        }

        .diploma-icon {
          font-size: 24px;
          background: rgba(255,255,255,0.1);
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
        }

        .diploma-text {
          display: flex;
          flex-direction: column;
        }

        .diploma-text strong {
          font-size: 14px;
          letter-spacing: 0.02em;
        }

        .diploma-text span {
          font-size: 10px;
          opacity: 0.6;
          font-weight: 600;
        }

        @media (max-width: 968px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 48px;
            text-align: center;
            padding-top: 40px;
          }

          .hero-text-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .hero-btns {
            justify-content: center;
          }

          .hero-visual {
            order: -1;
            padding-bottom: 40px;
          }

          .program-showcase {
            max-width: 100%;
          }
          
          .diploma-badge {
            bottom: 20px;
            right: 0;
            transform: scale(0.9);
          }
        }

        @media (max-width: 480px) {
          .showcase-card {
            padding: 16px;
          }
          .showcase-icon {
            width: 44px;
            height: 44px;
            font-size: 24px;
          }
          .showcase-name {
            font-size: 16px;
          }
          .diploma-badge {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
