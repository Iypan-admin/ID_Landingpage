"use client";
import { useState, useEffect } from "react";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    language: "",
    level: ""
  });

  // Reset submitted state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setSubmitted(false), 300);
    }
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const dataToSave = {
      data: [{
        Date: new Date().toLocaleString(),
        Name: formData.name,
        Email: formData.email,
        Phone: formData.phone,
        Language: formData.language,
        Level: formData.level
      }]
    };

    try {
      const response = await fetch('https://sheetdb.io/api/v1/y4odbljzg3dxt', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSave)
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", language: "", level: "" });
      } else {
        throw new Error('Failed to save data');
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        {!submitted ? (
          <>
            <div className="form-header">
              <h2>Registration Form</h2>
              <p>All fields are required · Takes 60 seconds</p>
            </div>

            <form onSubmit={handleSubmit} className="registration-form">
              <div className="form-group">
                <label>FULL NAME</label>
                <input 
                  type="text" 
                  placeholder="e.g. Priya Sharma" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  placeholder="you@example.com" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>PHONE NUMBER</label>
                <input 
                  type="tel" 
                  placeholder="10-digit mobile number" 
                  pattern="[0-9]{10}" 
                  required 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>PICK LANGUAGES</label>
                  <select 
                    required 
                    value={formData.language}
                    onChange={(e) => setFormData({...formData, language: e.target.value})}
                  >
                    <option value="">Pick Languages</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                    <option value="japanese">Japanese</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>CHOOSE LEVEL</label>
                  <select 
                    required 
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value})}
                  >
                    <option value="">Choose Level</option>
                    <option value="beginner">Beginner (A1/N5)</option>
                    <option value="elementary">Elementary (A2/N4)</option>
                    <option value="intermediate">Intermediate (B1/N3)</option>
                    <option value="advanced">Advanced (B2+/N2+)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 8 }}>
                <button type="submit" className="submit-btn" style={{ width: '100%', maxWidth: 280 }}>
                  Register Now
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>

              <p className="form-footer">
                By proceeding, you agree to our Privacy Policy and Terms & Conditions.
              </p>
            </form>
          </>
        ) : (
          <div className="success-view" style={{ textAlign: 'center', padding: '20px 0' }}>
            <div className="success-icon" style={{ 
              width: 80, height: 80, background: '#10B981', color: '#fff', 
              borderRadius: '50%', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', fontSize: 40, margin: '0 auto 24px',
              boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)'
            }}>
              ✓
            </div>
            <h2 style={{ fontSize: 32, marginBottom: 16, fontWeight: 900 }}>Success!</h2>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 32 }}>
              Your registration has been saved.<br />
              Our team will contact you shortly.
            </p>
            <button 
              onClick={onClose}
              className="submit-btn" 
              style={{ width: 'auto', padding: '14px 40px', margin: '0 auto' }}
            >
              Great, Thank You!
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        .modal-content {
          background: #0f0524; /* Deep dark purple from image */
          width: 100%;
          max-width: 500px;
          border-radius: 24px;
          padding: 40px;
          position: relative;
          color: #fff;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: #fff;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          transition: all 0.2s;
        }

        .modal-close:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .form-header {
          margin-bottom: 32px;
        }

        .form-header h2 {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 8px;
          font-family: serif; /* Match image's serif title */
        }

        .form-header p {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
        }

        .enquiry-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        label {
          font-size: 11px;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.7);
          letter-spacing: 0.05em;
        }

        input, select {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 14px 18px;
          border-radius: 12px;
          color: #fff;
          font-size: 14px;
          transition: all 0.2s;
          outline: none;
        }

        input:focus, select:focus {
          background: rgba(255, 255, 255, 0.08);
          border-color: #4F6FE8;
          box-shadow: 0 0 0 4px rgba(79, 111, 232, 0.1);
        }

        input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        select option {
          background: #0f0524;
          color: #fff;
        }

        .submit-btn {
          margin-top: 8px;
          background: #4F6FE8;
          color: #fff;
          border: none;
          padding: 16px;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s;
          box-shadow: 0 10px 20px rgba(79, 111, 232, 0.2);
        }

        .submit-btn:hover {
          background: #3b5bdb;
          transform: translateY(-2px);
          box-shadow: 0 15px 25px rgba(79, 111, 232, 0.3);
        }

        .form-footer {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
          text-align: center;
          line-height: 1.5;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 480px) {
          .modal-content {
            padding: 30px 20px;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
