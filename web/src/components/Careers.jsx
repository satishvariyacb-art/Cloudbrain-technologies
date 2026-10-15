import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { apiClient } from '../services/apiClient';
import { MapPin, Clock, ArrowRight, X, CheckCircle2, Sparkles, Mail, Upload, FileText } from 'lucide-react';

export default function Careers({ isOpen, onClose }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState(null);
  const [appliedSuccess, setAppliedSuccess] = useState(false);
  const [applicant, setApplicant] = useState({ 
    name: '', 
    phone: '', 
    email: '', 
    portfolio: '', 
    resume: '', 
    resumeName: '', 
    notes: '' 
  });
  const [uploadingResume, setUploadingResume] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadJobs() {
      try {
        setLoading(true);
        const data = await apiClient.fetchActiveJobs();
        setJobs(data);
      } catch {
        setJobs([]);
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, []);

  useEffect(() => {
    if (selectedRole) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedRole]);

  const handleResumeChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit. Please choose a smaller document.');
      return;
    }

    setUploadingResume(true);
    const reader = new FileReader();
    reader.onload = () => {
      setApplicant(prev => ({
        ...prev,
        resume: reader.result,
        resumeName: file.name
      }));
      setUploadingResume(false);
    };
    reader.onerror = () => {
      alert('Could not read the file. Please try again.');
      setUploadingResume(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveResume = () => {
    setApplicant(prev => ({
      ...prev,
      resume: '',
      resumeName: ''
    }));
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!applicant.name.trim()) return;

    setSubmitting(true);
    try {
      if (selectedRole) {
        await apiClient.submitApplication({
          name: applicant.name.trim(),
          phone: applicant.phone.trim(),
          email: applicant.email.trim(),
          portfolio: applicant.portfolio.trim(),
          resume: applicant.resume,
          resumeName: applicant.resumeName,
          notes: applicant.notes.trim(),
          roleId: selectedRole.id,
          roleTitle: selectedRole.role,
          roleTeam: selectedRole.team
        });
      }
      setAppliedSuccess(true);
      setTimeout(() => {
        setAppliedSuccess(false);
        setSelectedRole(null);
        setApplicant({ name: '', phone: '', email: '', portfolio: '', resume: '', resumeName: '', notes: '' });
      }, 2800);
    } catch (err) {
      console.error('Error submitting application:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="careers" className="careers-section">
      <div className="section-padding">
        <div className="careers-banner">
          <div className="banner-content">
            <span className="section-tag">
              {jobs.length > 0 ? "We're Hiring" : "Talent Network"}
            </span>
            <h2 className="section-title">
              {jobs.length > 0 ? "Join Cloudbrain Engineering" : "Build the Future with Cloudbrain"}
            </h2>
            <p className="section-subtitle">
              {jobs.length > 0 
                ? "We are looking for world-class iOS architects, Android lead developers, AI/ML product engineers, and linear-style UI/UX designers."
                : "We are always eager to connect with visionary mobile architects, intelligent systems engineers, and product designers for upcoming squads."}
            </p>
          </div>
        </div>

        {/* Dynamic Job Roles Grid OR Offline/Empty Placeholder State */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '0.95rem' }}>Loading current opportunities...</p>
          </div>
        ) : jobs.length > 0 ? (
          <div className="roles-grid">
            {jobs.map((job) => (
              <div key={job.id} className="card-glass role-card">
                <div className="role-top">
                  <span className="role-type">{job.type}</span>
                </div>

                <h3 className="role-title">{job.role}</h3>
                <p className="role-desc">{job.desc}</p>

                <div className="role-meta">
                  <span className="meta-item">
                    <MapPin size={14} />
                    <span>{job.location}</span>
                  </span>
                  <span className="meta-item">
                    <Clock size={14} />
                    <span>{job.experience}</span>
                  </span>
                </div>

                <button 
                  className="btn btn-secondary role-apply-btn"
                  onClick={() => setSelectedRole(job)}
                >
                  <span>Apply for Position</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="card-glass empty-careers-card">
            <div className="empty-careers-icon-wrap">
              <Sparkles size={28} />
            </div>
            <span className="empty-careers-tag">All Squads Currently Staffed</span>
            <h3 className="empty-careers-title">Currently No Open Positions</h3>
            <p className="empty-careers-desc">
              Our development, design, and AI squads are currently operating at full capacity with no active vacancies at this moment. As our roadmap continues to scale, new opportunities open regularly—stay connected with us for future roles.
            </p>
            <div className="empty-careers-note-box">
              <p>
                Think you’d be a great addition to Cloudbrain? We always welcome exceptional talent. Feel free to reach out, share your work or portfolio, and we’ll get in touch as soon as a fitting role opens up.
              </p>
            </div>
            <div className="empty-careers-cta-row">
              <a 
                href="mailto:careers@cloudbrain.tech?subject=General%20Application%20-%20Cloudbrain%20Engineering" 
                className="btn btn-brand"
              >
                <Mail size={16} />
                <span>Drop Your Portfolio (careers@cloudbrain.tech)</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Role Application Modal */}
      {selectedRole && createPortal(
        <div className="modal-backdrop" onClick={() => setSelectedRole(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedRole(null)}>
              <X size={20} />
            </button>

            {appliedSuccess ? (
              <div className="applied-success-view">
                <CheckCircle2 size={48} className="success-icon" />
                <h3>Application Submitted!</h3>
                <p>Thank you for applying for <strong>{selectedRole.role}</strong>. Our engineering lead will review your profile and reach out within 48 hours.</p>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <h3 className="modal-title">Apply for {selectedRole.role}</h3>
                  <p className="modal-subtitle">{selectedRole.location} • {selectedRole.type}</p>
                </div>

                <form onSubmit={handleApplySubmit} className="apply-form">
                  <div className="form-group">
                    <label>Full Name <span className="field-required">*</span></label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Alex Morgan"
                      value={applicant.name}
                      onChange={(e) => setApplicant({ ...applicant, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Mobile Number <span className="field-optional">(Optional)</span></label>
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 000-0000 or +91 98765 43210"
                      value={applicant.phone}
                      onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address <span className="field-optional">(Optional)</span></label>
                    <input 
                      type="email" 
                      placeholder="alex@domain.com"
                      value={applicant.email}
                      onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Upload Resume / CV <span className="field-optional">(Optional)</span></label>
                    {applicant.resume ? (
                      <div className="resume-attached-box">
                        <div className="resume-attached-info">
                          <FileText size={18} color="var(--brand-primary)" />
                          <span className="resume-filename" title={applicant.resumeName}>
                            {applicant.resumeName}
                          </span>
                        </div>
                        <button 
                          type="button" 
                          className="resume-remove-btn"
                          onClick={handleRemoveResume}
                          title="Remove resume"
                        >
                          <X size={15} />
                        </button>
                      </div>
                    ) : (
                      <label className="resume-upload-zone">
                        <Upload size={18} />
                        <span>{uploadingResume ? 'Processing document...' : 'Attach Resume (PDF, DOC, DOCX up to 10MB)'}</span>
                        <input 
                          type="file" 
                          accept=".pdf,.doc,.docx" 
                          style={{ display: 'none' }}
                          disabled={uploadingResume}
                          onChange={handleResumeChange}
                        />
                      </label>
                    )}
                  </div>

                  <div className="form-group">
                    <label>LinkedIn / Portfolio / Work URL <span className="field-optional">(Optional)</span></label>
                    <input 
                      type="url" 
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={applicant.portfolio}
                      onChange={(e) => setApplicant({ ...applicant, portfolio: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Why Cloudbrain? (Brief Note) <span className="field-optional">(Optional)</span></label>
                    <textarea 
                      rows={3} 
                      placeholder="Tell us about your experience building iOS, Android, or AI products..."
                      value={applicant.notes}
                      onChange={(e) => setApplicant({ ...applicant, notes: e.target.value })}
                    />
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setSelectedRole(null)} disabled={submitting}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-brand" disabled={submitting || uploadingResume}>
                      {submitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>,
        document.body
      )}

      <style>{`
        .careers-section {
          background: #ffffff;
        }

        .careers-banner {
          padding: 1rem 0 2.5rem 0;
          margin-bottom: 2rem;
          text-align: center;
          background: transparent;
          border: none;
          box-shadow: none;
        }

        .banner-content {
          max-width: 760px;
          margin: 0 auto;
        }

        .roles-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.75rem;
        }

        .role-card {
          display: flex;
          flex-direction: column;
          padding: 2rem;
          border-radius: var(--radius-xl);
        }

        .role-top {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-bottom: 1rem;
        }

        .role-type {
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.25rem 0.65rem;
          background: var(--bg-secondary);
          border-radius: var(--radius-full);
          color: var(--text-secondary);
        }

        .role-title {
          font-size: 1.4rem;
          margin-bottom: 0.5rem;
        }

        .role-desc {
          font-size: 0.92rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }

        .role-meta {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .role-apply-btn {
          width: 100%;
          justify-content: space-between;
        }

        .empty-careers-card {
          padding: 3.5rem 2rem;
          text-align: center;
          border-radius: var(--radius-xl);
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 780px;
          margin: 0 auto;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
        }

        .empty-careers-icon-wrap {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(0, 102, 255, 0.08);
          color: #0066ff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .empty-careers-tag {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 0.5rem;
        }

        .empty-careers-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .empty-careers-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 600px;
          margin-bottom: 1.75rem;
        }

        .empty-careers-note-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          max-width: 620px;
          margin-bottom: 2rem;
        }

        .empty-careers-note-box p {
          margin: 0;
          font-size: 0.88rem;
          color: #475569;
          line-height: 1.55;
        }

        .empty-careers-cta-row {
          display: flex;
          justify-content: center;
        }

        .apply-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-group label {
          font-family: var(--font-main);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .form-group input, .form-group textarea {
          font-family: var(--font-body);
          font-size: 0.95rem;
          padding: 0.75rem 1rem;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          outline: none;
          transition: border-color 0.2s ease;
        }

        .form-group input:focus, .form-group textarea:focus {
          border-color: var(--brand-primary);
        }

        .field-required {
          color: #ef4444;
          font-weight: 700;
          margin-left: 0.2rem;
        }

        .field-optional {
          font-weight: 400;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-left: 0.35rem;
        }

        .resume-upload-zone {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.85rem 1rem;
          border: 1.5px dashed #cbd5e1;
          border-radius: var(--radius-md);
          background: #f8fafc;
          color: var(--text-secondary);
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .resume-upload-zone:hover {
          border-color: var(--brand-primary);
          background: rgba(48, 133, 255, 0.04);
          color: var(--brand-primary);
        }

        .resume-attached-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 0.9rem;
          border: 1px solid rgba(48, 133, 255, 0.3);
          background: rgba(48, 133, 255, 0.05);
          border-radius: var(--radius-md);
        }

        .resume-attached-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          overflow: hidden;
        }

        .resume-filename {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 400px;
        }

        .resume-remove-btn {
          background: transparent;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }

        .resume-remove-btn:hover {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }

        .applied-success-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 3rem 1rem;
        }

        .success-icon {
          color: var(--accent-green);
          margin-bottom: 1rem;
        }

        @media (max-width: 900px) {
          .roles-grid {
            grid-template-columns: 1fr;
          }
          .careers-banner {
            padding: 0.5rem 0 1.5rem 0;
          }
        }
      `}</style>
    </section>
  );
}
