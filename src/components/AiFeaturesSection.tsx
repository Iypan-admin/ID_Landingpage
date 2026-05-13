"use client";

const features = [
  {
    icon: "🎙️",
    title: "Pronunciation Correction",
    desc: "Speak into your microphone and receive instant, detailed feedback. Our AI scores your accent, rhythm, and intonation with language-model precision.",
    tag: "Real-Time Feedback",
    color: "#4F6FE8",
    demo: { label: "Pronunciation Score", value: 87, unit: "/100" },
  },
  {
    icon: "💬",
    title: "AI Speaking Assistant",
    desc: "Your 24/7 language partner. Roleplay conversations — at a restaurant in Paris, a business meeting in Tokyo, or a café in Berlin.",
    tag: "Available 24/7",
    color: "#7C5CFC",
    demo: { label: "Conversations Today", value: 2340, unit: "+" },
  },
  {
    icon: "📚",
    title: "Interactive Lessons",
    desc: "Scenario-based video lessons, fill-in dialogues, drag-and-drop grammar exercises, and audio comprehension — never a dull moment.",
    tag: "Multi-Format",
    color: "#0EA5E9",
    demo: { label: "Lesson Modules", value: 1200, unit: "+" },
  },
  {
    icon: "📈",
    title: "Progress Tracking",
    desc: "Detailed analytics show your vocabulary growth, grammar accuracy, speaking fluency, and exam readiness at a glance — weekly reports included.",
    tag: "Smart Analytics",
    color: "#10B981",
    demo: { label: "Accuracy Improvement", value: 43, unit: "% avg" },
  },
  {
    icon: "🎮",
    title: "Gamified Learning",
    desc: "Earn XP, unlock badges, climb leaderboards, and maintain language streaks. Learning a language should feel like a game you actually want to play.",
    tag: "Leaderboard",
    color: "#F59E0B",
    demo: { label: "Daily Active Learners", value: 8900, unit: "+" },
  },
  {
    icon: "🧠",
    title: "Adaptive Learning Path",
    desc: "Our AI analyses your weaknesses and dynamically adjusts your lesson sequence so you always practice what matters most for your next exam.",
    tag: "Personalised AI",
    color: "#EC4899",
    demo: { label: "Topics Auto-Adjusted", value: 98, unit: "%" },
  },
];

export default function AiFeaturesSection() {
  return (
    <section id="ai-features" className="section-padding" style={{
      background: "linear-gradient(180deg,#F5F3FF 0%,#EEF2FF 50%,#F0F9FF 100%)",
      position: "relative", overflow: "hidden",
    }}>
      <div className="bg-blob" style={{ width: 600, height: 600, background: "rgba(79,111,232,0.07)", top: -150, right: -150 }} />
      <div className="bg-blob" style={{ width: 400, height: 400, background: "rgba(124,92,252,0.07)", bottom: -100, left: -100 }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="section-tag animate-fade-in-up"><span>🤖</span> AI-Powered Features</div>
          <h2 className="animate-fade-in-up delay-100" style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 800, color: "#0F172A", marginBottom: 16 }}>
            The Smartest Way to{" "}
            <span className="gradient-text">Learn a Language</span>
          </h2>
          <p className="animate-fade-in-up delay-200" style={{ fontSize: 17, color: "var(--color-text-secondary)", maxWidth: 540, margin: "0 auto" }}>
            Cutting-edge AI meets certified curriculum — giving you an unfair advantage in your language journey.
          </p>
        </div>

        {/* Features grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="ai-grid">
          {features.map((f, i) => (
            <div
              key={i}
              className="glass-card animate-fade-in-up"
              style={{
                borderRadius: 24, padding: "28px 24px",
                background: "rgba(255,255,255,0.88)",
                animationDelay: `${i * 0.1}s`,
                overflow: "hidden", position: "relative",
              }}
            >
              {/* BG decoration */}
              <div style={{
                position: "absolute", top: -30, right: -30, width: 120, height: 120,
                borderRadius: "50%", background: `${f.color}08`, pointerEvents: "none",
              }} />

              {/* Tag */}
              <span style={{
                fontSize: 11, fontWeight: 700, color: f.color,
                background: `${f.color}12`, padding: "3px 12px", borderRadius: 50,
                display: "inline-block", marginBottom: 16, letterSpacing: "0.05em",
              }}>{f.tag}</span>

              {/* Icon */}
              <div style={{
                width: 56, height: 56, borderRadius: 18, marginBottom: 16,
                background: `linear-gradient(135deg,${f.color}25,${f.color}10)`,
                border: `1.5px solid ${f.color}25`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24,
              }}>{f.icon}</div>

              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.7, marginBottom: 20 }}>{f.desc}</p>

              {/* Demo metric */}
              <div style={{
                padding: "12px 16px", borderRadius: 14,
                background: `${f.color}08`, border: `1px solid ${f.color}18`,
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span style={{ fontSize: 13, color: "var(--color-text-secondary)", fontWeight: 500 }}>{f.demo.label}</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: f.color }}>
                  {typeof f.demo.value === "number" && f.demo.value >= 1000
                    ? f.demo.value.toLocaleString()
                    : f.demo.value}{f.demo.unit}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom feature banner */}
        <div className="animate-fade-in-up delay-600" style={{
          marginTop: 48, borderRadius: 28,
          background: "linear-gradient(135deg,#4F6FE8,#7C5CFC)",
          padding: "40px 48px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 24,
          boxShadow: "0 16px 48px rgba(79,111,232,0.3)",
          overflow: "hidden", position: "relative",
        }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -60, left: "30%", width: 250, height: 250, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Available Now</div>
            <h3 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Try the AI Coach — Free for 7 Days</h3>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", maxWidth: 480, lineHeight: 1.6 }}>
              No credit card needed. Access our AI speaking coach, 3 lesson modules, and a mock exam for each language.
            </p>
          </div>
          <a href="#cta" style={{
            padding: "14px 32px", borderRadius: 50, fontSize: 16, fontWeight: 700,
            background: "#fff", color: "#4F6FE8", textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: 10,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            transition: "all 0.3s", whiteSpace: "nowrap", position: "relative", zIndex: 1,
          }}>
            Start Free Trial
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .ai-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .ai-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
