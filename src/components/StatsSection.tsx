"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 12000, suffix: "+", label: "Students Enrolled", icon: "👨‍🎓", color: "#4F6FE8" },
  { value: 96, suffix: "%", label: "Certification Pass Rate", icon: "🏆", color: "#7C5CFC" },
  { value: 3, suffix: "", label: "International Certifications", icon: "🌍", color: "#38BDF8" },
  { value: 150, suffix: "+", label: "Expert Trainers", icon: "👩‍🏫", color: "#4F6FE8" },
  { value: 8, suffix: "+", label: "Years of Excellence", icon: "⭐", color: "#7C5CFC" },
  { value: 98, suffix: "%", label: "Student Satisfaction", icon: "❤️", color: "#38BDF8" },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatCard({ stat, index, visible }: { stat: typeof stats[0]; index: number; visible: boolean }) {
  const count = useCountUp(stat.value, 1800, visible);
  return (
    <div
      className="glass-card animate-fade-in-up"
      style={{
        borderRadius: 24, padding: "32px 24px", textAlign: "center",
        animationDelay: `${index * 0.1}s`,
        background: "rgba(255,255,255,0.85)",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: -20, right: -20,
        width: 100, height: 100, borderRadius: "50%",
        background: `${stat.color}10`,
        pointerEvents: "none",
      }} />
      <div style={{
        width: 56, height: 56, borderRadius: 16, margin: "0 auto 16px",
        background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
        border: `1px solid ${stat.color}25`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 24,
      }}>
        {stat.icon}
      </div>
      <div style={{
        fontSize: 38, fontWeight: 900, fontFamily: "Outfit,sans-serif",
        background: `linear-gradient(135deg, ${stat.color}, ${stat.color}CC)`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        lineHeight: 1,
      }}>
        {count}{stat.suffix}
      </div>
      <div style={{ fontSize: 14, color: "var(--color-text-secondary)", fontWeight: 500, marginTop: 8 }}>
        {stat.label}
      </div>
    </div>
  );
}

const logos = [
  { name: "DELF", subtitle: "Alliance Française", emoji: "🇫🇷" },
  { name: "Goethe", subtitle: "Institut German", emoji: "🇩🇪" },
  { name: "JLPT", subtitle: "Japan Foundation", emoji: "🇯🇵" },
  { name: "CEFR", subtitle: "European Standard", emoji: "🌐" },
  { name: "ISO", subtitle: "Certified Quality", emoji: "✅" },
];

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: "linear-gradient(180deg,#EEF2FF 0%,#fff 100%)", padding: "80px 0 100px" }}>
      <div className="container">
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="section-tag animate-fade-in-up">
            <span>📊</span> By the Numbers
          </div>
          <h2 className="animate-fade-in-up delay-100" style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: "#0F172A", marginBottom: 14 }}>
            Trusted by Thousands of{" "}
            <span className="gradient-text">Language Learners</span>
          </h2>
          <p className="animate-fade-in-up delay-200" style={{ fontSize: 17, color: "var(--color-text-secondary)", maxWidth: 520, margin: "0 auto" }}>
            Our track record speaks for itself — real results from a global community of ambitious learners.
          </p>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="stats-grid">
          {stats.map((s, i) => (
            <StatCard key={i} stat={s} index={i} visible={visible} />
          ))}
        </div>

        {/* Certifications strip */}
        <div className="animate-fade-in-up delay-400" style={{ marginTop: 64, textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "var(--color-text-muted)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 24 }}>
            Internationally Recognised Certifications
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            {logos.map((l, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "12px 22px", borderRadius: 50,
                background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(79,111,232,0.15)",
                boxShadow: "0 2px 12px rgba(79,111,232,0.08)",
                transition: "all 0.3s",
              }}>
                <span style={{ fontSize: 20 }}>{l.emoji}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>{l.name}</div>
                  <div style={{ fontSize: 11, color: "var(--color-text-muted)" }}>{l.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .stats-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .stats-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
