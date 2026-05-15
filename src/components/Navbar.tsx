"use client";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "About ID", href: "#about" },
  { label: "Languages", href: "#languages" },
  { label: "Learning Modes", href: "#modes" },
  { label: "Why ISML", href: "#why" },
  { label: "Journey", href: "#journey" },
  { label: "Contact Us", href: "https://wa.me/917338881781", isExternal: true },
];

interface NavbarProps {
  onBookDemo: () => void;
}

export default function Navbar({ onBookDemo }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, zIndex: 1000,
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        background: scrolled ? "rgba(255,255,255,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(79,111,232,0.1)" : "1px solid transparent",
        padding: scrolled ? "12px 0" : "24px 0",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 14 }}>
          {/* Professional Logo Display */}
          <img 
            src="/logo.png" 
            alt="ISML Logo" 
            style={{ 
              height: scrolled ? 44 : 50, 
              width: "auto", 
              transition: "all 0.4s ease",
              objectFit: "contain"
            }} 
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 18, fontWeight: 900, color: "#0F172A", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
              Indian School for <br /> Modern Languages
            </span>
          </div>
        </a>

        <nav className="desktop-nav" style={{ display: "flex", gap: 8 }}>
          {navLinks.map((l) => (
            <a 
              key={l.href} 
              href={l.href} 
              target={l.isExternal ? "_blank" : undefined}
              rel={l.isExternal ? "noopener noreferrer" : undefined}
              style={{ 
                padding: "10px 18px", borderRadius: 50, fontSize: 14, fontWeight: 600, 
                color: "#475569", textDecoration: "none", transition: "all 0.25s" 
              }}
              className="nav-link-hover"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button 
            onClick={onBookDemo}
            className="btn-primary" 
            style={{ padding: "10px 24px", fontSize: 14, background: "#0F172A", border: 'none', cursor: 'pointer' }}
          >
            Book Demo
          </button>
          <button 
            className="mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ 
              display: "none", background: "none", border: "none", cursor: "pointer", padding: 8
            }}
          >
            <div style={{ width: 24, height: 2, background: "#0F172A", marginBottom: 6 }} />
            <div style={{ width: 24, height: 2, background: "#0F172A" }} />
          </button>
        </div>
      </div>

      {/* Mobile Menu (Simplified) */}
      {menuOpen && (
        <div style={{ 
          position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", 
          padding: 24, borderBottom: "1px solid rgba(79,111,232,0.1)",
          display: "flex", flexDirection: "column", gap: 16
        }}>
          {navLinks.map((l) => (
            <a 
              key={l.href} 
              href={l.href} 
              target={l.isExternal ? "_blank" : undefined}
              rel={l.isExternal ? "noopener noreferrer" : undefined}
              onClick={() => setMenuOpen(false)} 
              style={{ fontSize: 16, fontWeight: 600, color: "#0F172A", textDecoration: "none" }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        .nav-link-hover:hover { color: #4F6FE8 !important; background: rgba(79,111,232,0.05); }
        @media (max-width: 968px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
