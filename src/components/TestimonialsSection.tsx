"use client";

const testimonials = [
  {
    name: "Swetha Venkat",
    lang: "French",
    quote: "I joined ISML, and trust me—this is the best institute to learn a foreign language. My trainer, Mr. Claude Sir, is the best teacher because he has so much patience. Even if we didn't understand the topic well, he would reteach it without hesitation. The best part about this institution is their constant support—no matter what the doubt is, they always take time to clarify. I'm truly happy to have joined here.",
    color: "#4F6FE8",
    lightBg: "#F0F4FF"
  },
  {
    name: "Chitransha Tanwar",
    lang: "French",
    quote: "The teachers at ISML are the best—they truly understand you and work with you patiently. I've been taking French classes and have successfully completed A1 level so far. It's been a fantastic journey with ISML, and I'm grateful for the support and guidance they've given me. Thank you so much, ISML!",
    color: "#7C5CFC",
    lightBg: "#F5F3FF"
  },
  {
    name: "Cris Joy",
    lang: "German",
    quote: "Spending six months in the German class was one of the best experiences of my life. Arjun Sir, though young, was incredibly patient and knowledgeable—his simple, effective methods made even complex grammar easy to grasp. The flexible timings fit our schedules perfectly, and the friendly, supportive classmates made learning even more enjoyable. Totally worth it! I highly recommend this institute to anyone wanting to learn German in a warm, positive setting.",
    color: "#0284C7",
    lightBg: "#F0F9FF"
  },
  {
    name: "Nithish Raghavendar T K",
    lang: "Japanese",
    quote: "I had a great experience at ISML. The teachers are very helpful, and learning from native Japanese speakers made the process more natural. The lessons were well-planned and focused on speaking, listening, and real-life situations. The study materials and practice sessions were very effective. The training truly helped me prepare for the JLPT exams. Overall, it’s a great place to learn Japanese—I highly recommend it!",
    color: "#10B981",
    lightBg: "#ECFDF5"
  }
];

export default function TestimonialsSection() {
  // Triple the items to ensure smooth infinite scroll even on wide screens
  const scrollItems = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="section-padding" style={{ background: "#FFFFFF", overflow: "hidden" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="section-tag animate-fade-in-up"><span>💬</span> Student Reviews</div>
          <h2 className="animate-fade-in-up delay-100" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: "#0F172A", marginBottom: 20 }}>
            Success Stories from <span className="gradient-text">Our Students</span>
          </h2>
          <p className="animate-fade-in-up delay-200" style={{ fontSize: "clamp(16px, 1.2vw, 18px)", color: "var(--color-text-secondary)", maxWidth: 650, margin: "0 auto" }}>
            Real experiences from students who have transformed their language skills at the Indian School for Modern Languages.
          </p>
        </div>
      </div>

      {/* Infinite Scroll Carousel */}
      <div className="carousel-container">
        <div className="carousel-track">
          {scrollItems.map((t, i) => (
            <div 
              key={i} 
              className="testimonial-card"
              style={{ 
                background: `linear-gradient(135deg, #FFFFFF 0%, ${t.lightBg} 100%)`,
                border: `1px solid ${t.color}20`
              }}
            >
              <div className="quote-icon" style={{ color: `${t.color}15` }}>"</div>
              
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ 
                  width: 48, height: 48, borderRadius: 14, background: t.color, 
                  color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, fontWeight: 800, boxShadow: `0 8px 20px ${t.color}30`
                }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: "#0F172A", fontSize: 16 }}>{t.name}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: t.color }}>{t.lang} Student</div>
                </div>
                <div style={{ marginLeft: "auto", display: "flex", gap: 2 }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color: "#FBBF24", fontSize: 14 }}>★</span>)}
                </div>
              </div>

              <p style={{ 
                fontSize: 15, color: "#475569", lineHeight: 1.7, 
                fontStyle: "italic", margin: 0, position: "relative", zIndex: 2 
              }}>
                "{t.quote}"
              </p>

              <div style={{ 
                position: "absolute", bottom: 0, right: 0, padding: "6px 16px", 
                background: `${t.color}15`, color: t.color, fontSize: 10, 
                fontWeight: 800, borderTopLeftRadius: 16, letterSpacing: "0.05em"
              }}>
                {t.lang.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .carousel-container {
          width: 100%;
          padding: 20px 0 60px;
          position: relative;
        }

        .carousel-track {
          display: flex;
          gap: 32px;
          width: max-content;
          animation: scroll 80s linear infinite;
        }

        .carousel-track:hover {
          animation-play-state: paused;
        }

        .testimonial-card {
          width: 400px;
          flex-shrink: 0;
          padding: 40px;
          border-radius: 32px;
          position: relative;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
          transition: all 0.4s ease;
          overflow: hidden;
        }

        .testimonial-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08) !important;
          border-color: rgba(0, 0, 0, 0.1) !important;
        }

        .quote-icon {
          position: absolute;
          top: -20px;
          right: 20px;
          font-size: 140px;
          font-family: serif;
          line-height: 1;
          pointer-events: none;
          z-index: 1;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-432px * ${testimonials.length})); }
        }

        @media (max-width: 768px) {
          .testimonial-card {
            width: 320px;
            padding: 32px 24px;
          }
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-352px * ${testimonials.length})); }
          }
        }
      `}</style>
    </section>
  );
}
