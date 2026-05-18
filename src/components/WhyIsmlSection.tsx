"use client";

import { useEffect, useState } from "react";

const stats = [
  { value: "10+ Years", label: "Legacy of Excellence", desc: "Established in 2014, pioneering modern language education in India.", icon: "⏳" },
  { value: "20,000+", label: "Students Impacted", desc: "Enriched lives through interactive workshops, parents & teacher engagement.", icon: "👥" },
  { value: "200+", label: "Excellence Achievers", desc: "Students securing top ranks & global certification benchmarks.", icon: "🏆" },
  { value: "3 Global Tracks", label: "French, German & Japanese", desc: "Immersive learning from primary levels to professional proficiency.", icon: "🌐" }
];

const partners = [
  "IYPAN Edu", "Ocean Institute", "Decathlon", "Global School", 
  "Tech Mahindra", "Apollo Group", "Rotary Club", "DPS India",
  "Alliance Francaise", "Goethe Circle", "JLPT Prep", "Chitrakoot Schools"
];

export default function WhyIsmlSection() {
  const [activeTab, setActiveTab] = useState<"vision" | "mission">("vision");

  return (
    <section id="why" className="section-padding" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFF 100%)", position: "relative", overflow: "hidden" }}>
      {/* Background decorations */}
      <div style={{ position: "absolute", top: "10%", left: "-10%", width: "400px", height: "400px", borderRadius: "50%", background: "rgba(79,111,232,0.03)", filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "-10%", width: "450px", height: "450px", borderRadius: "50%", background: "rgba(124,92,252,0.03)", filter: "blur(80px)", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(48px, 6vw, 64px)" }}>
          <div className="section-tag animate-fade-in-up"><span>⭐</span> The ISML Edge</div>
          <h2 className="animate-fade-in-up delay-100" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: "#0F172A", marginBottom: 20, letterSpacing: "-0.02em" }}>
            Why Choose <span className="gradient-text">ISML?</span>
          </h2>
          <p className="animate-fade-in-up delay-200" style={{ fontSize: "clamp(16px, 1.2vw, 18px)", color: "#475569", maxWidth: "720px", margin: "0 auto", lineHeight: 1.6 }}>
            Welcome to the <strong>Indian School for Modern Languages (ISML)</strong>, a registered trademark of IYPAN Educational Centre PVT LTD. Over a decade of building global fluency and career paths.
          </p>
        </div>

        {/* Dynamic Legacy & Interactive Info Cards */}
        <div className="legacy-grid" style={{ marginBottom: 64 }}>
          {/* Left Column: Who We Are & Interactive Tabs */}
          <div className="legacy-info-card animate-fade-in-up" style={{ 
            background: "#FFFFFF", 
            border: "1px solid rgba(79,111,232,0.12)", 
            borderRadius: 36, 
            padding: "clamp(24px, 4vw, 40px)",
            boxShadow: "0 20px 50px rgba(79,111,232,0.03)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(79,111,232,0.08)", color: "#4F6FE8", padding: "6px 14px", borderRadius: 50, fontSize: 13, fontWeight: 700, marginBottom: 20 }}>
                ✨ Established 2014
              </div>
              <h3 style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 800, color: "#0F172A", marginBottom: 16, lineHeight: 1.25 }}>
                Our Journey & Legacy
              </h3>
              <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.7, marginBottom: 20 }}>
                Originally founded in 2014 under the name of <em>Ocean Institute for French</em>, later changing to <em>IYPAN</em>, we have stood as a trusted pioneer in language education. 
              </p>
              <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.7, marginBottom: 32 }}>
                In 2022, we expanded from French to robust tracks for German and Japanese, delivering linguistic proficiency, official certifications, and rich cultural immersion to learners nationwide.
              </p>
            </div>

            {/* Interactive Vision & Mission Switcher */}
            <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: 24 }}>
              <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                <button 
                  onClick={() => setActiveTab("vision")}
                  style={{
                    padding: "8px 20px",
                    borderRadius: 50,
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    border: "none",
                    background: activeTab === "vision" ? "linear-gradient(135deg, #4F6FE8, #7C5CFC)" : "rgba(79,111,232,0.05)",
                    color: activeTab === "vision" ? "#FFFFFF" : "#4F6FE8",
                  }}
                >
                  Our Vision
                </button>
                <button 
                  onClick={() => setActiveTab("mission")}
                  style={{
                    padding: "8px 20px",
                    borderRadius: 50,
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    border: "none",
                    background: activeTab === "mission" ? "linear-gradient(135deg, #4F6FE8, #7C5CFC)" : "rgba(79,111,232,0.05)",
                    color: activeTab === "mission" ? "#FFFFFF" : "#4F6FE8",
                  }}
                >
                  Our Mission
                </button>
              </div>

              <div style={{ 
                background: "#F8FAFF", 
                padding: "20px 24px", 
                borderRadius: 24, 
                borderLeft: "4px solid #4F6FE8",
                minHeight: 100,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}>
                <p style={{ margin: 0, fontSize: 14.5, fontWeight: 600, color: "#0F172A", lineHeight: 1.6, fontStyle: "italic" }}>
                  {activeTab === "vision" 
                    ? '"We envision a society where language barriers are overcome, facilitating seamless communication and interconnectedness among diverse communities."'
                    : '"Our mission is to empower individuals of all ages with the linguistic proficiency necessary to thrive in a globalized world while fostering cross-cultural appreciation and understanding."'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Key Stats Cards */}
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div 
                key={i} 
                className="animate-fade-in-up stat-card"
                style={{ 
                  background: "#FFFFFF", 
                  border: "1px solid rgba(79,111,232,0.1)", 
                  borderRadius: 28, 
                  padding: "28px",
                  boxShadow: "0 10px 30px rgba(79,111,232,0.02)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  animationDelay: `${0.1 * i}s`
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 900, color: "#4F6FE8", letterSpacing: "-0.02em" }}>{s.value}</span>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(79,111,232,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{s.icon}</div>
                </div>
                <div>
                  <h4 style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", marginBottom: 6 }}>{s.label}</h4>
                  <p style={{ fontSize: 13.5, color: "#64748B", lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Trust Partners / Client Slider */}
        <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: 48, textAlign: "center" }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.15em", display: "block", marginBottom: 24 }}>
            Trusted by 48+ Reputed Schools, Corporates & Partners Across India
          </span>
          
          <div className="partners-slider">
            <div className="partners-track">
              {partners.concat(partners).map((p, i) => (
                <div 
                  key={i} 
                  style={{ 
                    display: "inline-flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "50px",
                    padding: "10px 24px",
                    margin: "0 10px",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#64748B",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.02)",
                    whiteSpace: "nowrap"
                  }}
                >
                  🏢 {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .legacy-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 32px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .stat-card {
          transition: all 0.35s ease;
        }
        .stat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 35px rgba(79,111,232,0.1) !important;
          border-color: rgba(79,111,232,0.2) !important;
        }
        .partners-slider {
          overflow: hidden;
          width: 100%;
          position: relative;
          padding: 10px 0;
        }
        .partners-slider::before,
        .partners-slider::after {
          content: "";
          position: absolute;
          top: 0;
          width: 120px;
          height: 100%;
          z-index: 5;
          pointer-events: none;
        }
        .partners-slider::before {
          left: 0;
          background: linear-gradient(to right, #F8FAFF 0%, transparent 100%);
        }
        .partners-slider::after {
          right: 0;
          background: linear-gradient(to left, #F8FAFF 0%, transparent 100%);
        }
        .partners-track {
          display: flex;
          width: max-content;
          animation: scrollPartners 25s linear infinite;
        }
        @keyframes scrollPartners {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 968px) {
          .legacy-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 580px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
