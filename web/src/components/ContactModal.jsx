import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { SERVICES_DATA } from '../data/websiteData';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceId: 'android-dev',
    budget: '$25k - $50k',
    details: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({
        name: '',
        email: '',
        company: '',
        serviceId: 'android-dev',
        budget: '$25k - $50k',
        details: ''
      });
    }, 2800);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content contact-modal" onClick={(e) => e.stopPropagation()}>
        <div className="contact-modal-accent" aria-hidden="true">
          <span /><span /><span /><span />
        </div>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        {submitted ? (
          <div className="submitted-view">
            <CheckCircle2 size={54} className="success-icon" />
            <h3 className="success-title">Project Proposal Received!</h3>
            <p className="success-text">
              Thank you, <strong>{formData.name}</strong>. Our Lead Product Architect will analyze your scope and get back to you within 12 business hours.
            </p>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <span className="section-tag">
                <Sparkles size={14} />
                <span>Start a Project</span>
              </span>
              <h3 className="modal-title">Let's Build Your Product</h3>
              <p className="modal-subtitle">Direct access to product engineers—no sales fluff.</p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Sarah Connor"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Work Email *</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="sarah@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Company / Organization</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Cyberdyne Systems"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Primary Service Needed *</label>
                  <select 
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  >
                    {SERVICES_DATA.map((s) => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Estimated Project Budget</label>
                <div className="budget-options">
                  {['<$25k', '$25k - $50k', '$50k - $100k', '$100k+'].map((b) => (
                    <button
                      type="button"
                      key={b}
                      className={`budget-pill ${formData.budget === b ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, budget: b })}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Project Scope & Requirements *</label>
                <textarea 
                  rows={4} 
                  required
                  placeholder="Describe your target app features, timeline, Play Store / App Store requirements..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-brand">
                  <span>Send Project Specs</span>
                  <Send size={16} />
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      <style>{`
        .contact-modal {
          max-width: 640px;
        }

        .contact-modal-accent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 3;
          height: 6px;
          display: flex;
          pointer-events: none;
          border-radius: 32px 32px 0 0;
          overflow: hidden;
        }

        .contact-modal-accent span {
          flex: 1;
        }

        .contact-modal-accent span:nth-child(1) { background: #3086FF; }
        .contact-modal-accent span:nth-child(2) { background: #FFBE00; }
        .contact-modal-accent span:nth-child(3) { background: #00AF57; }
        .contact-modal-accent span:nth-child(4) { background: #F52837; }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group select {
          font-family: var(--font-body);
          font-size: 0.95rem;
          padding: 0.75rem 1rem;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          background: #ffffff;
          outline: none;
        }

        .budget-options {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .budget-pill {
          font-family: var(--font-main);
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.45rem 0.85rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          cursor: pointer;
          color: var(--text-secondary);
          transition: all 0.2s ease;
        }

        .budget-pill.active {
          background: var(--brand-primary);
          color: #ffffff;
          border-color: var(--brand-primary);
        }

        .submitted-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 3rem 1rem;
        }

        .success-title {
          font-size: 1.8rem;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }

        .success-text {
          font-size: 1.05rem;
          color: var(--text-secondary);
        }

        @media (max-width: 640px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
