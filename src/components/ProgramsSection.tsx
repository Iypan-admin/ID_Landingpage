"use client";
import { useState } from "react";

const programs = [
  {
    flag: "🇫🇷",
    lang: "French",
    cert: "DELF / DALF",
    tagline: "Speak French. Earn a Diploma.",
    description: "Master French from beginner to advanced with immersive lessons designed around DELF A1 to DALF C2 certification milestones. Taught by Alliance Française-affiliated trainers.",
    color: "#4F6FE8",
    gradient: "linear-gradient(135deg,#4F6FE8,#7C5CFC)",
    bg: "linear-gradient(135deg,#EEF2FF,#F5F3FF)",
    levels: ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "B2 Upper-Intermediate", "C1 Advanced", "C2 Mastery"],
    highlights: [
      { icon: "🎙️", text: "Native-speaking trainers" },
      { icon: "📝", text: "DELF past papers & mock tests" },
      { icon: "🎬", text: "French cinema & culture modules" },
      { icon: "🤖", text: "AI conversation coach" },
    ],
    badge: "Most Popular",
    duration: "3 – 12 months",
    students: "5,800+",
  },
  {
    flag: "🇩🇪",
    lang: "German",
    cert: "Goethe-Zertifikat",
    tagline: "Unlock German. Open Doors.",
    description: "Rigorous, precision-focused German learning designed around the Goethe-Institut examinations from A1 to C2. Ideal for study abroad and professional migration goals.",
    color: "#7C5CFC",
    gradient: "linear-gradient(135deg,#7C5CFC,#A78BFA)",
    bg: "linear-gradient(135deg,#F5F3FF,#EDE9FE)",
    levels: ["A1 Starter", "A2 Foundation", "B1 Threshold", "B2 Vantage", "C1 Proficient", "C2 Expert"],
    highlights: [
      { icon: "📐", text: "Structured grammar mastery" },
      { icon: "🎓", text: "University & visa prep" },
      { icon: "🎤", text: "German debate & speaking clubs" },
      { icon: "📊", text: "Weekly performance tracking" },
    ],
    badge: "Study Abroad Ready",
    duration: "4 – 14 months",
    students: "3,900+",
  },
  {
    flag: "🇯🇵",
    lang: "Japanese",
    cert: "JLPT N5 – N1",
    tagline: "Master Japanese. Conquer JLPT.",
    description: "From hiragana & katakana to kanji mastery — our Japanese immersion program is structured to guide you through JLPT N5 all the way to the prestigious N1 level.",
    color: "#0EA5E9",
    gradient: "linear-gradient(135deg,#0EA5E9,#38BDF8)",
    bg: "linear-gradient(135deg,#F0F9FF,#E0F2FE)",
    levels: ["N5 Beginner", "N4 Basic", "N3 Intermediate", "N2 Upper-Int", "N1 Advanced"],
    highlights: [
      { icon: "✍️", text: "Hiragana, Katakana & Kanji" },
      { icon: "🗾", text: "Japan cultural immersion" },
      { icon: "🎌", text: "Anime-based learning modules" },
      { icon: "🏆", text: "JLPT mock exam series" },
    ],
    badge: "JLPT Focused",
    duration: "4 – 18 months",
    students: "2,300+",
  },
];

export default function ProgramsSection() {
  const [active, setActive] = useState(0);
  const p = programs[active];

  return (
    <section id="programs" className="section-padding" style={{ background: "linear-gradient(180deg,#F8FAFF,#EEF2FF)" }}>
      <div className="container">
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="section-tag animate-fade-in-up"><span>🗺️</span> Our Programs</div>
          <h2 className="animate-fade-in-up delay-100" style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 800, color: "#0F172A", marginBottom: 16 }}>
            Choose Your Language Journey
          </h2>
          <p className="animate-fade-in-up delay-200" style={{ fontSize: 17, color: "var(--color-text-secondary)", maxWidth: 540, margin: "0 auto" }}>
            Three internationally certified programs, one premium platform. Which world do you want to unlock?
          </p>
        </div>

        {/* Tab switcher */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 48, flexWrap: "wrap" }}>
          {programs.map((pg, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "12px 24px", borderRadius: 50, fontSize: 15, fontWeight: 600,
                cursor: "pointer", transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                border: active === i ? "none" : "1.5px solid rgba(79,111,232,0.2)",
                background: active === i ? pg.gradient : "rgba(255,255,255,0.9)",
                color: active === i ? "#fff" : pg.color,
                boxShadow: active === i ? `0 6px 24px ${pg.color}45` : "0 2px 8px rgba(0,0,0,0.05)",
                transform: active === i ? "scale(1.04)" : "scale(1)",
              }}
            >
              <span style={{ fontSize: 20 }}>{pg.flag}</span>
              {pg.lang}
            </button>
          ))}
        </div>

        {/* Detail card */}
        <div key={active} style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48,
          background: "rgba(255,255,255,0.9)", borderRadius: 32,
          border: `1px solid ${p.color}25`,
          boxShadow: `0 20px 60px ${p.color}15, 0 8px 24px ${p.color}08`,
          padding: "48px 40px", alignItems: "start",
          overflow: "hidden", position: "relative",
        }} className="program-detail animate-scale-in">
          {/* BG accent */}
          <div style={{ position: "absolute", top: -60, right: -60, width: 250, height: 250, borderRadius: "50%", background: p.bg, filter: "blur(40px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -40, left: -40, width: 180, height: 180, borderRadius: "50%", background: p.bg, filter: "blur(30px)", pointerEvents: "none" }} />

          {/* Left */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{
                width: 72, height: 72, borderRadius: 20,
                background: p.gradient, display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: 36, boxShadow: `0 8px 24px ${p.color}40`,
              }}>{p.flag}</div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <h3 style={{ fontSize: 28, fontWeight: 800, color: "#0F172A" }}>{p.lang}</h3>
                  <span style={{
                    fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 50,
                    background: p.gradient, color: "#fff",
                  }}>{p.badge}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: p.color }}>{p.cert}</div>
              </div>
            </div>

            <p style={{ fontSize: 16, color: "var(--color-text-secondary)", lineHeight: 1.75, marginBottom: 28 }}>{p.description}</p>

            {/* Highlights */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
              {p.highlights.map((h, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "12px 16px", borderRadius: 14,
                  background: `${p.color}08`, border: `1px solid ${p.color}15`,
                }}>
                  <span style={{ fontSize: 18 }}>{h.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#0F172A" }}>{h.text}</span>
                </div>
              ))}
            </div>

            {/* Meta */}
            <div style={{ display: "flex", gap: 24, marginBottom: 28 }}>
              <div>
                <div style={{ fontSize: 12, color: "var(--color-text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Duration</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}>{p.duration}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "var(--color-text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Students</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}>{p.students}</div>
              </div>
            </div>

            <a href="#cta" className="btn-primary" style={{ background: p.gradient, boxShadow: `0 6px 20px ${p.color}40` }}>
              Enrol in {p.lang}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          {/* Right: levels */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 20 }}>Program Levels</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {p.levels.map((l, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "14px 18px", borderRadius: 16,
                  background: "rgba(255,255,255,0.8)", border: `1px solid ${p.color}15`,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 10,
                    background: p.gradient, color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 800,
                  }}>{i + 1}</div>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#0F172A" }}>{l}</span>
                  <div style={{ flex: 1, height: 4, borderRadius: 50, background: `${p.color}15` }}>
                    <div style={{
                      height: "100%", borderRadius: 50,
                      width: `${100 - i * 14}%`,
                      background: p.gradient,
                      transition: "width 0.8s ease",
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div style={{
              marginTop: 24, padding: "16px 20px", borderRadius: 16,
              background: `${p.color}08`, border: `1px solid ${p.color}20`,
            }}>
              <p style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6, margin: 0 }}>
                <span style={{ fontWeight: 700, color: p.color }}>"{p.tagline}"</span>
                <br />
                Certification-aligned, culture-rich, and career-ready.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .program-detail { grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) { .program-detail { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
