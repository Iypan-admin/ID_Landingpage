"use client";
import { useState } from "react";

const faqs = [
  {
    q: "What is the International Diploma (ID) program?",
    a: "The ID program is ISML's flagship training track designed specifically to prepare students for global certifications (DELF, Goethe, JLPT) while focusing on real-world speaking fluency."
  },
  {
    q: "What is the difference between ID Regular and ID Fast Track?",
    a: "ID Regular is a flexible 6-month program with 2 days/week. ID Fast Track is an intensive 3-month training program with 5 days/week (Monday to Friday)."
  },
  {
    q: "Do I need any prior knowledge of the language?",
    a: "No, we have batches starting from the absolute beginner level (A1/N5). We also conduct placement tests if you have studied before."
  },
  {
    q: "Does ISML help with official exam registration?",
    a: "Yes, we provide 100% guidance for DELF, Goethe, and JLPT international certification exam registrations."
  },
  {
    q: "Are the certificates globally recognized?",
    a: "Absolutely. We prepare you for official certificates recognized by global universities and employers worldwide."
  }
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding" style={{ background: "#F8FAFF" }}>
      <div className="container">
        <div className="faq-split-layout">
          {/* Left Side: Heading & Callout */}
          <div className="faq-intro">
            <div className="section-tag animate-fade-in-up"><span>❓</span> FAQ</div>
            <h2 className="animate-fade-in-up delay-100" style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 900, color: "#0F172A", marginBottom: 24, lineHeight: 1.1 }}>
              Got <br /><span className="gradient-text">Questions?</span>
            </h2>
            <p className="animate-fade-in-up delay-200" style={{ fontSize: "17px", color: "#64748b", marginBottom: 40, maxWidth: 350 }}>
              Find quick answers to the most common questions about our ID program.
            </p>

            {/* Still have questions card */}
            <div className="question-card animate-fade-in-up delay-300">
              <div className="q-icon-box">💬</div>
              <h4 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 8 }}>Still have questions?</h4>
              <p style={{ fontSize: 14, color: "#64748b", marginBottom: 20 }}>Can't find the answer you're looking for? Reach out to our team.</p>
              <a href="https://wa.me/917338881781" target="_blank" className="contact-link">
                <span>Contact Support:</span> 
                <span style={{ color: "#10B981" }}>+91 73388 81781</span>
              </a>
            </div>
          </div>

          {/* Right Side: Accordion */}
          <div className="faq-accordion">
            {faqs.map((f, i) => (
              <div 
                key={i} 
                className={`faq-item animate-fade-in-up ${open === i ? 'is-open' : ''}`}
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <button 
                  onClick={() => setOpen(open === i ? null : i)}
                  className="faq-trigger"
                >
                  <span className="faq-q-text">{f.q}</span>
                  <div className="faq-icon-circle">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </button>
                <div className="faq-content">
                  <div className="faq-answer-inner">
                    {f.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .faq-split-layout {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 80px;
          align-items: flex-start;
        }

        .question-card {
          padding: 32px;
          background: #ffffff;
          border-radius: 32px;
          border: 1px solid rgba(79, 111, 232, 0.1);
          box-shadow: 0 15px 40px rgba(79, 111, 232, 0.05);
        }

        .q-icon-box {
          width: 48px;
          height: 48px;
          background: #4F6FE8;
          color: #fff;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          margin-bottom: 20px;
          box-shadow: 0 8px 20px rgba(79, 111, 232, 0.3);
        }

        .contact-link {
          font-size: 14px;
          font-weight: 800;
          color: #4F6FE8;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s;
        }

        .contact-link:hover {
          gap: 12px;
        }

        .faq-accordion {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .faq-item {
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid rgba(0,0,0,0.04);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .faq-item:hover {
          border-color: rgba(79, 111, 232, 0.2);
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
        }

        .faq-item.is-open {
          border-color: rgba(79, 111, 232, 0.3);
          box-shadow: 0 20px 50px rgba(79, 111, 232, 0.08);
          background: linear-gradient(180deg, #FFFFFF 0%, #F8FAFF 100%);
        }

        .faq-trigger {
          width: 100%;
          padding: 28px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
        }

        .faq-q-text {
          font-size: 18px;
          font-weight: 800;
          color: #0F172A;
          padding-right: 20px;
          transition: color 0.3s;
        }

        .faq-item.is-open .faq-q-text {
          color: #4F6FE8;
        }

        .faq-icon-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #F1F5F9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94A3B8;
          transition: all 0.4s;
          flex-shrink: 0;
        }

        .faq-item.is-open .faq-icon-circle {
          background: #4F6FE8;
          color: #ffffff;
          transform: rotate(180deg);
        }

        .faq-content {
          max-height: 0;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .faq-item.is-open .faq-content {
          max-height: 300px;
        }

        .faq-answer-inner {
          padding: 0 32px 32px;
          font-size: 15.5px;
          color: #475569;
          line-height: 1.7;
        }

        @media (max-width: 1024px) {
          .faq-split-layout {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .faq-intro {
            text-align: center;
          }
          .faq-intro p {
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
          }
          .question-card {
            display: none; /* Hide helper card on mobile to save space */
          }
        }

        @media (max-width: 640px) {
          .faq-trigger {
            padding: 24px 20px;
          }
          .faq-q-text {
            font-size: 16px;
          }
          .faq-answer-inner {
            padding: 0 20px 24px;
          }
        }
      `}</style>
    </section>
  );
}
