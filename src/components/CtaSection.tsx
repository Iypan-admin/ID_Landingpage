"use client";

interface CtaSectionProps {
  onApply: () => void;
}

export default function CtaSection({ onApply }: CtaSectionProps) {
  return (
    <section id="cta" className="section-padding" style={{ background: "linear-gradient(135deg, #F8FAFF 0%, #FFFFFF 100%)", position: "relative", overflow: "hidden" }}>
      {/* Decorative background elements */}
      <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "rgba(79,111,232,0.05)", filter: "blur(60px)" }} />
      <div style={{ position: "absolute", bottom: -100, left: -100, width: 400, height: 400, borderRadius: "50%", background: "rgba(124,92,252,0.05)", filter: "blur(60px)" }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div 
          className="glass-card animate-fade-in-up" 
          style={{ 
            padding: "80px 40px", 
            borderRadius: 48, 
            background: "linear-gradient(135deg, #4F6FE8, #7C5CFC)",
            textAlign: "center",
            color: "#FFFFFF",
            boxShadow: "0 40px 100px rgba(79,111,232,0.25)",
            border: "none",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Shine effect */}
          <div style={{ 
            position: "absolute", top: "-50%", left: "-50%", width: "200%", height: "200%", 
            background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
            pointerEvents: "none"
          }} />

          <div style={{ position: "relative", zIndex: 3 }}>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, marginBottom: 24, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Start Your International <br /> Language Journey Today
            </h2>
            <p style={{ fontSize: 19, opacity: 0.9, maxWidth: 600, margin: "0 auto 48px", lineHeight: 1.6 }}>
              Join the ISML International Diploma program and prepare for a global future with 
              immersive training in French, German, or Japanese.
            </p>

            <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
              <button 
                onClick={onApply}
                className="btn-primary" 
                style={{ 
                  background: "#FFFFFF", color: "#4F6FE8", border: "none", 
                  padding: "18px 48px", fontSize: 17, fontWeight: 800,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  cursor: "pointer"
                }}
              >
                Apply Now
              </button>
              <a 
                href="https://wa.me/917338881781"
                target="_blank"
                className="btn-secondary" 
                style={{ 
                  background: "rgba(255,255,255,0.1)", color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.3)", 
                  padding: "18px 48px", fontSize: 17, fontWeight: 800,
                  backdropFilter: "blur(10px)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
