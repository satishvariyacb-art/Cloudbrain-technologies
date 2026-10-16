import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { apiClient } from '../services/apiClient';
import { ArrowRight, X, CheckCircle2, Mail, Upload, FileText } from 'lucide-react';
import SectionBadge from './SectionBadge';

function jobTags(job) {
  if (Array.isArray(job.skills) && job.skills.length) {
    return job.skills.map((tag) => String(tag).trim()).filter(Boolean);
  }
  if (typeof job.skills === 'string' && job.skills.trim()) {
    return job.skills.split(',').map((tag) => tag.trim()).filter(Boolean);
  }
  return [job.team, job.type, job.location, job.experience].filter(Boolean);
}

export default function Careers() {
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
      <div className="careers-inner">
        <header className="careers-head">
        <SectionBadge number="07" label="CAREERS" />
          <h2>Join the Cloudbrain</h2>
          <p>
            We&apos;re looking for a people who&apos;d rather build something real than just talk
            <br />
            about it.
          </p>
        </header>

        {loading ? (
          <div className="roles-grid" aria-hidden="true">
            {[0, 1, 2].map((slot) => (
              <div key={slot} className="role-card is-skeleton" />
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <div className="roles-grid">
            {jobs.map((job) => (
              <article key={job.id || job.role} className="role-card">
                <h3 className="role-title">{job.role}</h3>
                <p className="role-desc">Role: {job.desc}</p>
                <ul className="role-tags">
                  {jobTags(job).map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="role-apply-btn"
                  onClick={() => setSelectedRole(job)}
                  aria-label={`Apply for ${job.role}`}
                >
                  Apply Now
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-careers-card">
            <h3 className="empty-careers-title">Currently No Open Positions</h3>
            <p className="empty-careers-desc">
              Our development, design, and AI squads are currently operating at full capacity with no active vacancies at this moment. As our roadmap continues to scale, new opportunities open regularly—stay connected with us for future roles.
            </p>
            <p className="empty-careers-note">
              Think you&apos;d be a great addition to Cloudbrain? We always welcome exceptional talent. Feel free to reach out, share your work or portfolio, and we&apos;ll get in touch as soon as a fitting role opens up.
            </p>
            <a
              href="mailto:careers@cloudbrain.tech?subject=General%20Application%20-%20Cloudbrain%20Engineering"
              className="role-apply-btn empty-careers-mail"
            >
              <Mail size={16} aria-hidden="true" />
              Drop Your Portfolio
            </a>
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
          position: relative;
          z-index: 2;
          background: #ffffff;
          padding: 8.5rem 0 calc(8rem + 160px);
          padding-bottom: 10.15rem;
          border-bottom-left-radius: 96px;
          border-bottom-right-radius: 96px;
        }

        .careers-inner {
          max-width: 1560px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .careers-head {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 4.5rem;
        }

        .careers-head .cb-section-badge {
          margin-bottom: 3.25rem;
        }

        .careers-head h2 {
          font-family: var(--font-main);
          font-size: 78px;
          font-weight: 500;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: #0B1020;
          margin: 0 0 1.35rem;
        }

        .careers-head p {
          max-width: 760px;
          margin: 0;
          font-family: var(--font-body);
          font-size: 24px;
          line-height: 1.55;
          color: #64748b;
        }

        .roles-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.5rem;
          align-items: stretch;
        }

        .role-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-width: 0;
          height: 100%;
          background: #F4F7FB;
          border-radius: 32px;
          padding: 2rem 1.65rem 1.75rem;
        }

        .role-card.is-skeleton {
          min-height: 320px;
          background: linear-gradient(90deg, #f4f7fb 0%, #ffffff 50%, #f4f7fb 100%);
          background-size: 200% 100%;
        }

        .role-title {
          font-family: var(--font-main);
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.15;
          color: #0B1020;
          margin: 0 0 0.75rem;
        }

        .role-desc {
          font-family: var(--font-body);
          font-size: 18px;
          line-height: 1.5;
          color: #64748b;
          margin: 0 0 1.25rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .role-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          list-style: none;
          margin: 0 0 1.5rem;
          padding: 0;
        }

        .role-tags li {
          background: #E7EDF4;
          color: #64748b;
          font-family: var(--font-main);
          font-size: 14px;
          font-weight: 600;
          line-height: 1;
          padding: 0.5rem 0.8rem;
          border-radius: 999px;
        }

        .role-apply-btn {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: #ffffff;
          color: #0B1020;
          border: 1px solid #E2E8F0;
          border-radius: 999px;
          padding: 0.7rem 1.1rem 0.7rem 1.2rem;
          font-family: var(--font-main);
          font-size: 16px;
          font-weight: 600;
          letter-spacing: -0.01em;
          cursor: pointer;
          text-decoration: none;
        }

        .role-apply-btn:hover {
          background: #3085FF;
          color: #ffffff;
          border-color: #3085FF;
          transform: translateY(-1px);
        }

        .role-apply-btn:focus-visible {
          outline: 2px solid #3085FF;
          outline-offset: 3px;
        }

        .empty-careers-card {
          max-width: 860px;
          margin: 0 auto;
          background: #F4F7FB;
          border-radius: 32px;
          padding: 2.25rem 2rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .empty-careers-title {
          font-family: var(--font-main);
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.15;
          color: #0B1020;
          margin: 0 0 0.75rem;
        }

        .empty-careers-desc,
        .empty-careers-note {
          font-family: var(--font-body);
          font-size: 18px;
          line-height: 1.5;
          color: #64748b;
          margin: 0 0 0.9rem;
        }

        .empty-careers-mail {
          margin-top: 0.4rem;
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
          .careers-section {
            padding-bottom: calc(6.5rem + 72px);
            border-bottom-left-radius: 72px;
            border-bottom-right-radius: 72px;
          }
        }

        @media (max-width: 980px) {
          .roles-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 680px) {
          .careers-section {
            padding: 3.5rem 0 calc(5rem + 48px);
            border-bottom-left-radius: 48px;
            border-bottom-right-radius: 48px;
          }

          .roles-grid {
            grid-template-columns: 1fr;
          }

          .careers-head h2 {
            font-size: 1.85rem;
          }

          .careers-head p {
            font-size: 1rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .role-apply-btn:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
