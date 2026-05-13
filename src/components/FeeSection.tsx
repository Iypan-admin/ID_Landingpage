"use client";
import { useState } from "react";

const idStandard = [
  { level: "A1 / N5", duration: "6 Months", total: "₹7,794", monthly: "₹1,299" },
  { level: "A2 / N4", duration: "7 Months", total: "₹10,493", monthly: "₹1,499" },
  { level: "B1 / N3", duration: "8 Months", total: "₹13,592", monthly: "₹1,699" },
  { level: "B2 / N2", duration: "9 Months", total: "₹16,191", monthly: "₹1,799" },
];

const idFastTrack = [
  { level: "A1 / N5", duration: "3 Months", total: "₹8,273", monthly: "₹2,757" },
  { level: "A2 / N4", duration: "4 Months", total: "₹11,372", monthly: "₹2,843" },
  { level: "B1 / N3", duration: "5 Months", total: "₹14,571", monthly: "₹2,914" },
  { level: "B2 / N2", duration: "6 Months", total: "₹17,670", monthly: "₹2,945" },
];

export default function FeeSection() {
  const [mode, setMode] = useState<"standard" | "fasttrack">("standard");

  const data = mode === "standard" ? idStandard : idFastTrack;

  return (
    <section id="fees" className="section-padding" style={{ background: "#F8FAFF" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="section-tag animate-fade-in-up"><span>💰</span> Transparent Pricing</div>
          <h2 className="animate-fade-in-up delay-100" style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#0F172A", marginBottom: 16 }}>
            International Diploma Fee Structure
          </h2>
          <p className="animate-fade-in-up delay-200" style={{ fontSize: 17, color: "var(--color-text-secondary)", maxWidth: 600, margin: "0 auto" }}>
            Affordable monthly payments with no hidden costs. All fees are inclusive of taxes.
          </p>
        </div>

        {/* Toggle Switch */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
          <div style={{ 
            background: "#E2E8F0", 
            padding: 6, 
            borderRadius: 16, 
            display: "flex", 
            gap: 4,
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)"
          }}>
            <button 
              onClick={() => setMode("standard")}
              style={{
                padding: "10px 24px",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.3s ease",
                border: "none",
                background: mode === "standard" ? "#FFFFFF" : "transparent",
                color: mode === "standard" ? "#4F6FE8" : "#64748B",
                boxShadow: mode === "standard" ? "0 4px 12px rgba(0,0,0,0.05)" : "none",
              }}
            >
              Standard ID
            </button>
            <button 
              onClick={() => setMode("fasttrack")}
              style={{
                padding: "10px 24px",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.3s ease",
                border: "none",
                background: mode === "fasttrack" ? "#FFFFFF" : "transparent",
                color: mode === "fasttrack" ? "#4F6FE8" : "#64748B",
                boxShadow: mode === "fasttrack" ? "0 4px 12px rgba(0,0,0,0.05)" : "none",
              }}
            >
              FastTrack ID ⚡
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", 
          gap: 24 
        }}>
          {data.map((item, i) => (
            <div key={i + mode} className="animate-scale-in" style={{
              background: "#FFFFFF",
              borderRadius: 24,
              padding: "32px",
              border: "1px solid #E2E8F0",
              boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
              transition: "transform 0.3s ease, border-color 0.3s ease",
              position: "relative",
              overflow: "hidden",
              animationDelay: `${i * 100}ms`
            }}>
              {/* Level Badge */}
              <div style={{ 
                fontSize: 13, 
                fontWeight: 700, 
                color: "#4F6FE8", 
                background: "#F0F4FF", 
                padding: "4px 12px", 
                borderRadius: 50, 
                display: "inline-block",
                marginBottom: 16
              }}>
                LEVEL {item.level}
              </div>

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 14, color: "#64748B", marginBottom: 4 }}>Monthly Fee</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: "#0F172A" }}>
                  {item.monthly} <span style={{ fontSize: 16, fontWeight: 500, color: "#94A3B8" }}>/mo</span>
                </div>
              </div>

              <div style={{ 
                borderTop: "1px solid #F1F5F9", 
                paddingTop: 20, 
                display: "flex", 
                flexDirection: "column", 
                gap: 12 
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15 }}>
                  <span style={{ color: "#64748B" }}>Duration:</span>
                  <span style={{ fontWeight: 700, color: "#0F172A" }}>{item.duration}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15 }}>
                  <span style={{ color: "#64748B" }}>Total Full Fee:</span>
                  <span style={{ fontWeight: 700, color: "#0F172A" }}>{item.total}</span>
                </div>
              </div>

              <div style={{ marginTop: 32 }}>
                <button 
                  className="btn-primary" 
                  style={{ width: "100%", justifyContent: "center", padding: "14px" }}
                >
                  Enrol Now
                </button>
              </div>

              {/* Decorative accent */}
              <div style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 4,
                height: "100%",
                background: mode === "standard" ? "#4F6FE8" : "#7C5CFC"
              }} />
            </div>
          ))}
        </div>

        {/* Notice */}
        <div style={{ 
          marginTop: 48, 
          textAlign: "center", 
          padding: "20px", 
          borderRadius: 16, 
          background: "rgba(79, 111, 232, 0.05)",
          border: "1px dashed #4F6FE8"
        }}>
          <p style={{ margin: 0, fontSize: 14, color: "#4F6FE8", fontWeight: 600 }}>
            * All ID programs include Native-speaking trainers, DELF/Goethe/JLPT exam preparation, and official certification modules.
          </p>
        </div>
      </div>
    </section>
  );
}
