import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { apiClient } from '../services/apiClient';
import { ArrowRight, X, Check, Mail, Upload, FileText, Search, Phone, Link2, Lock, Briefcase, User, Clock, MessageSquare } from 'lucide-react';
import SectionBadge from './SectionBadge';

function formatFileSize(bytes) {
  if (!bytes) return '';
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)}MB`;
}

function fileKind(name) {
  const ext = String(name || '').split('.').pop()?.toUpperCase() || 'FILE';
  if (ext === 'DOCX') return 'DOC';
  return ext.slice(0, 4);
}

function makeRef() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `CB-${code}`;
}

function formatSubmitted(date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const suffix = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12;
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}, ${hours}:${minutes} ${suffix}`;
}

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
    resumeSize: 0,
    notes: '' 
  });
  const [receipt, setReceipt] = useState(null);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [resumeError, setResumeError] = useState(false);
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

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit. Please choose a smaller document.');
      return;
    }

    setUploadingResume(true);
    const reader = new FileReader();
    reader.onload = () => {
      setResumeError(false);
      setApplicant(prev => ({
        ...prev,
        resume: reader.result,
        resumeName: file.name,
        resumeSize: file.size
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
      resumeName: '',
      resumeSize: 0
    }));
  };

  const closeApply = () => {
    const wasSuccess = appliedSuccess;
    setSelectedRole(null);
    if (!wasSuccess) return;
    setAppliedSuccess(false);
    setReceipt(null);
    setResumeError(false);
    setApplicant({ name: '', phone: '', email: '', portfolio: '', resume: '', resumeName: '', resumeSize: 0, notes: '' });
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!applicant.resume) {
      setResumeError(true);
      return;
    }
    if (!applicant.name.trim() || !applicant.email.trim()) return;

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
      setReceipt({ ref: makeRef(), at: new Date() });
      setAppliedSuccess(true);
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
          <h2>Join the Cloudbrain</h2>
          <p>
            We&apos;re looking for a people who&apos;d rather build something real than just talk about it.
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
                  onClick={() => { setResumeError(false); setSelectedRole(job); }}
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
        <div className="modal-backdrop" onClick={closeApply}>
          <div className="modal-content apply-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close apply-modal-close" onClick={closeApply} aria-label="Close">
              <X size={18} />
            </button>
            {appliedSuccess ? (
              <div className="apply-success">
                <div className="apply-success-mark" aria-hidden="true">
                  <Check size={30} strokeWidth={3} />
                </div>
                <h3>Application Submitted!</h3>
                <p>
                  Thank you for applying to CloudBrain. We&apos;ve received your application and will get back to you if your profile matches an available opportunity.
                </p>
                <div className="apply-receipt">
                  <div className="apply-receipt-head">
                    <strong>Your Application Details</strong>
                    <span className="apply-ref">REF: {receipt?.ref}</span>
                  </div>
                  <div className="apply-receipt-row">
                    <span><Briefcase size={16} aria-hidden="true" /> Position</span>
                    <strong>{selectedRole.role}</strong>
                  </div>
                  <div className="apply-receipt-row">
                    <span><User size={16} aria-hidden="true" /> Full Name</span>
                    <strong>{applicant.name}</strong>
                  </div>
                  <div className="apply-receipt-row">
                    <span><Mail size={16} aria-hidden="true" /> Email Address</span>
                    <strong>{applicant.email}</strong>
                  </div>
                  <div className="apply-receipt-row">
                    <span><Phone size={16} aria-hidden="true" /> Mobile Number</span>
                    <strong>{applicant.phone.trim() || '—'}</strong>
                  </div>
                  <div className="apply-receipt-row">
                    <span><FileText size={16} aria-hidden="true" /> Resume/CV</span>
                    <strong className="apply-file">
                      <span className="apply-file-kind">{fileKind(applicant.resumeName)}</span>
                      <a href={applicant.resume} download={applicant.resumeName}>{applicant.resumeName}</a>
                      {applicant.resumeSize ? <em>({formatFileSize(applicant.resumeSize)})</em> : null}
                    </strong>
                  </div>
                  <div className="apply-receipt-row">
                    <span><Link2 size={16} aria-hidden="true" /> Work URL</span>
                    {applicant.portfolio.trim() ? (
                      <a className="apply-work-link" href={applicant.portfolio} target="_blank" rel="noreferrer">{applicant.portfolio.replace(/^https?:\/\//, '')}</a>
                    ) : (
                      <strong>—</strong>
                    )}
                  </div>
                  <div className="apply-receipt-row">
                    <span><MessageSquare size={16} aria-hidden="true" /> Why Cloudbrain?</span>
                    <strong>{applicant.notes.trim() || '—'}</strong>
                  </div>
                  <div className="apply-receipt-foot">
                    <Clock size={15} aria-hidden="true" />
                    Submitted on {receipt?.at ? formatSubmitted(receipt.at) : ''}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="apply-head">
                  <h3 className="apply-title">Apply Now</h3>
                  <p className="apply-for">
                    Apply for
                    <span className="apply-role-pill">{selectedRole.role}</span>
                  </p>
                </div>

                <form onSubmit={handleApplySubmit} className="apply-form">
                  <div className="form-group">
                    <label htmlFor="apply-name">Full Name <span className="field-required">*</span></label>
                    <div className="apply-field">
                      <Search size={16} aria-hidden="true" />
                      <input
                        id="apply-name"
                        type="text"
                        required
                        placeholder="Enter full name"
                        value={applicant.name}
                        onChange={(e) => setApplicant({ ...applicant, name: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="apply-row">
                    <div className="form-group">
                      <label htmlFor="apply-email">Email Address <span className="field-required">*</span></label>
                      <div className="apply-field">
                        <Mail size={16} aria-hidden="true" />
                        <input
                          id="apply-email"
                          type="email"
                          required
                          placeholder="Enter email address"
                          value={applicant.email}
                          onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="apply-phone">Mobile Number (optional)</label>
                      <div className="apply-field">
                        <Phone size={16} aria-hidden="true" />
                        <input
                          id="apply-phone"
                          type="tel"
                          placeholder="Enter mobile number"
                          value={applicant.phone}
                          onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Upload Resume / CV <span className="field-required">*</span></label>
                    {applicant.resume ? (
                      <div className="resume-attached-box">
                        <div className="resume-attached-info">
                          <FileText size={18} color="#3085FF" />
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
                      <label
                        className="resume-upload-zone"
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={(event) => {
                          event.preventDefault();
                          const file = event.dataTransfer.files && event.dataTransfer.files[0];
                          if (file) handleResumeChange({ target: { files: [file] } });
                        }}
                      >
                        <span className="resume-upload-icon" aria-hidden="true">
                          <Upload size={18} />
                        </span>
                        <span className="resume-upload-copy">
                          {uploadingResume ? 'Processing document...' : (
                            <>
                              <span>Drag & drop your file here, or <span className="resume-browse">browse</span></span>
                              <small>PDF, DOC or DOCX. Max 5mb</small>
                            </>
                          )}
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          disabled={uploadingResume}
                          onChange={handleResumeChange}
                        />
                      </label>
                    )}
                    {resumeError && !applicant.resume ? (
                      <span className="apply-resume-error">Please upload your resume to continue.</span>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <label htmlFor="apply-portfolio">LinkedIn / Portfolio / Work URL (optional)</label>
                    <div className="apply-field">
                      <Link2 size={16} aria-hidden="true" />
                      <input
                        id="apply-portfolio"
                        type="url"
                        placeholder="https://linkedin.com/in/yourname"
                        value={applicant.portfolio}
                        onChange={(e) => setApplicant({ ...applicant, portfolio: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="apply-notes">Why Cloudbrain? (Brief Note) (optional)</label>
                    <div className="apply-note">
                      <textarea
                        id="apply-notes"
                        rows={4}
                        maxLength={500}
                        placeholder="Tell us briefly what draws you to Cloudbrain."
                        value={applicant.notes}
                        onChange={(e) => setApplicant({ ...applicant, notes: e.target.value.slice(0, 500) })}
                      />
                      <span className="apply-count">{applicant.notes.length}/500</span>
                    </div>
                  </div>

                  <div className="apply-footer">
                    <p className="apply-privacy">
                      <Lock size={14} aria-hidden="true" />
                      Your details are kept private and used only for recruitment.
                    </p>
                    <div className="apply-actions">
                      <button type="button" className="btn btn-secondary" onClick={closeApply} disabled={submitting}>
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-brand" disabled={submitting || uploadingResume}>
                        {submitting ? 'Submitting...' : 'Apply Now'}
                        {!submitting && <ArrowRight size={16} aria-hidden="true" />}
                      </button>
                    </div>
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
          padding: 8.5rem var(--page-gutter) calc(8rem + 160px);
          padding-bottom: 10.15rem;
          border-bottom-left-radius: 80px;
          border-bottom-right-radius: 80px;
        }

        .careers-inner {
          max-width: none;
          margin: 0 auto;
          padding: 0;
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
          max-width: 1100px;
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

        .apply-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0.85rem 0.35rem 0.2rem;
        }

        .apply-success-mark {
          width: 68px;
          height: 68px;
          border-radius: 18px;
          display: grid;
          place-items: center;
          color: #ffffff;
          background: linear-gradient(180deg, #4ade80 0%, #22c55e 100%);
          box-shadow: 0 12px 24px rgba(34, 197, 94, 0.28);
          margin-bottom: 1.15rem;
        }

        .apply-success h3 {
          margin: 0;
          font-family: var(--font-main);
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.15;
          color: #0b1020;
        }

        .apply-success > p {
          max-width: 34rem;
          margin: 0.7rem 0 0;
          font-family: var(--font-body);
          font-size: 0.95rem;
          line-height: 1.55;
          color: #64748b;
        }

        .apply-receipt {
          width: 100%;
          margin-top: 1.45rem;
          text-align: left;
          background: #f5f7fb;
          border: 1px solid #e7edf5;
          border-radius: 16px;
          overflow: hidden;
        }

        .apply-receipt-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding: 0.85rem 1.05rem;
        }

        .apply-receipt-head strong {
          font-family: var(--font-main);
          font-size: 0.92rem;
          font-weight: 700;
          color: #0b1020;
        }

        .apply-ref {
          flex: none;
          background: #e7f0ff;
          color: #3b82f6;
          border-radius: 7px;
          padding: 0.22rem 0.5rem;
          font-family: var(--font-main);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .apply-receipt-row {
          display: grid;
          grid-template-columns: 168px minmax(0, 1fr);
          gap: 0.75rem;
          align-items: start;
          padding: 0.72rem 1.05rem;
          border-top: 1px solid #e6edf5;
        }

        .apply-receipt-row > span {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          color: #64748b;
          font-family: var(--font-body);
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .apply-receipt-row > span svg {
          flex: none;
          color: #94a3b8;
        }

        .apply-receipt-row > strong,
        .apply-work-link {
          font-family: var(--font-body);
          font-size: 0.92rem;
          font-weight: 700;
          line-height: 1.45;
          color: #0b1020;
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .apply-work-link {
          color: #3085ff;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .apply-file {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .apply-file-kind {
          flex: none;
          background: #e7f0ff;
          color: #3085ff;
          border-radius: 5px;
          padding: 0.08rem 0.32rem;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.03em;
        }

        .apply-file a {
          color: #3085ff;
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 2px;
          overflow-wrap: anywhere;
        }

        .apply-file em {
          font-style: normal;
          font-weight: 500;
          color: #94a3b8;
        }

        .apply-receipt-foot {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.72rem 1.05rem;
          border-top: 1px solid #e6edf5;
          background: #f8fafc;
          color: #94a3b8;
          font-family: var(--font-body);
          font-size: 0.82rem;
        }

        @media (max-width: 1100px) {
          .careers-section {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
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
            padding: 3.25rem 1.25rem calc(5rem + 48px);
            border-bottom-left-radius: 48px;
            border-bottom-right-radius: 48px;
          }

          .careers-head {
            margin-bottom: 1.6rem;
          }

          .careers-head .cb-section-badge {
            margin-bottom: 1rem;
          }

          .careers-head h2 {
            font-size: 1.95rem;
            line-height: 1.15;
            margin-bottom: 0.7rem;
          }

          .careers-head p {
            font-size: 1rem;
            line-height: 1.5;
          }

          .roles-grid {
            grid-template-columns: 1fr;
            gap: 0.85rem;
          }

          .role-card,
          .empty-careers-card {
            border-radius: 22px;
            padding: 1.25rem 1.15rem 1.2rem;
          }

          .role-title,
          .empty-careers-title {
            font-size: 1.3rem;
            margin-bottom: 0.45rem;
          }

          .role-desc,
          .empty-careers-desc,
          .empty-careers-note {
            font-size: 0.95rem;
            line-height: 1.45;
            margin-bottom: 0.9rem;
          }

          .role-tags {
            gap: 0.4rem;
            margin-bottom: 1.05rem;
          }

          .role-tags li {
            font-size: 0.8rem;
            padding: 0.42rem 0.7rem;
          }

          .role-apply-btn {
            font-size: 0.95rem;
            padding: 0.62rem 1rem 0.62rem 1.05rem;
          }
        }

        .apply-modal.modal-content {
          max-width: 760px;
          padding: 1.6rem 1.7rem 1.15rem;
          border-radius: 28px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .apply-modal-close {
          z-index: 2;
          top: 1rem;
          right: 1rem;
          background: #f4f7fb;
          border-color: #e6edf5;
          color: #475569;
        }

        .apply-modal.modal-content::-webkit-scrollbar {
          display: none;
        }

        .apply-title {
          margin: 0 0 0.7rem;
          font-family: var(--font-main);
          font-size: 2.35rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: #0B1020;
        }

        .apply-for {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.55rem;
          margin: 0;
          font-size: 0.95rem;
          color: #64748b;
        }

        .apply-role-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.28rem 0.7rem;
          border-radius: 999px;
          background: #eef4ff;
          color: #3085FF;
          font-size: 0.82rem;
          font-weight: 600;
        }

        .apply-role-pill::before {
          content: '';
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #3085FF;
        }

        .apply-form {
          gap: 0.95rem;
        }

        .apply-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.9rem;
        }

        .apply-modal .form-group label {
          font-size: 0.82rem;
          font-weight: 600;
          color: #1e293b;
        }

        .apply-field {
          position: relative;
        }

        .apply-field svg {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          pointer-events: none;
        }

        .apply-modal .apply-field input,
        .apply-modal textarea {
          width: 100%;
          background: #f8fafc;
          border: 1px solid #e6ebf2;
          border-radius: 12px;
          color: #0B1020;
        }

        .apply-modal .apply-field input {
          padding-left: 2.45rem;
        }

        .apply-note {
          position: relative;
        }

        .apply-modal textarea {
          min-height: 110px;
          resize: vertical;
          padding-bottom: 1.6rem;
        }

        .apply-count {
          position: absolute;
          right: 12px;
          bottom: 8px;
          font-size: 0.75rem;
          color: #94a3b8;
        }

        .apply-modal .resume-upload-zone {
          position: relative;
          min-height: 148px;
          flex-direction: column;
          gap: 0.55rem;
          border: 1.5px dashed #3085FF;
          border-radius: 14px;
          background: #f8fbff;
          text-align: center;
        }

        .apply-modal .resume-upload-zone input {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
        }

        .resume-upload-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          background: #3085FF;
          color: #ffffff;
        }

        .resume-upload-copy {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          color: #334155;
          font-size: 0.92rem;
          font-weight: 500;
        }

        .resume-upload-copy small {
          color: #94a3b8;
          font-size: 0.78rem;
          font-weight: 400;
        }

        .resume-browse {
          color: #3085FF;
          font-weight: 600;
        }

        .apply-resume-error {
          color: #ef4444;
          font-size: 0.8rem;
        }

        .apply-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 0.35rem;
          padding-top: 0.9rem;
          border-top: 1px solid #eef2f6;
        }

        .apply-privacy {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin: 0;
          color: #94a3b8;
          font-size: 0.78rem;
        }

        .apply-actions {
          display: flex;
          align-items: center;
          gap: 0.55rem;
        }

        .apply-modal .btn {
          border-radius: 999px;
          padding: 0.62rem 1.05rem;
          font-size: 0.92rem;
        }

        .apply-modal .btn-secondary {
          background: #ffffff;
        }

        @media (max-width: 680px) {
          .apply-modal.modal-content {
            max-width: none;
            max-height: calc(100vh - 1.25rem);
            padding: 1.15rem 1rem 0.9rem;
            border-radius: 20px;
          }

          .apply-title {
            font-size: 1.7rem;
          }

          .apply-row {
            grid-template-columns: 1fr;
          }

          .apply-footer {
            flex-direction: column;
            align-items: stretch;
          }

          .apply-actions {
            justify-content: flex-end;
          }

          .resume-filename {
            max-width: 180px;
          }

          .apply-success h3 {
            font-size: 1.45rem;
          }

          .apply-receipt-row {
            grid-template-columns: 1fr;
            gap: 0.2rem;
          }

          .apply-receipt-head {
            align-items: flex-start;
            flex-direction: column;
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
