import React, { useState } from 'react';
import { 
  Users, Search, ExternalLink, Trash2, CheckCircle2, 
  Clock, X, Mail, Globe, Calendar, FileText, ChevronRight, Phone, Download 
} from 'lucide-react';

export default function ApplicationsManager({ 
  applications = [], 
  onUpdateStatus, 
  onDeleteApplication,
  selectedApp,
  setSelectedApp
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Extract unique roles from applications
  const uniqueRoles = ['All', ...new Set(applications.map(a => a.roleTitle).filter(Boolean))];

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = 
      (app.name && app.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (app.email && app.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (app.phone && app.phone.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (app.roleTitle && app.roleTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (app.notes && app.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole = filterRole === 'All' || app.roleTitle === filterRole;
    const matchesStatus = filterStatus === 'All' || app.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleDelete = (id, candidateName) => {
    if (window.confirm(`Delete application from "${candidateName}"?`)) {
      onDeleteApplication(id);
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp(null);
      }
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'Recent';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return isoString;
    }
  };

  const statusOptions = ['New', 'In Review', 'Shortlisted', 'Interviewing', 'Rejected', 'Hired'];

  return (
    <div className="cb-applications-manager">
      {/* Header */}
      <div className="cb-section-header-bar">
        <div className="cb-section-title-wrap">
          <h2>Candidate Applications & Pipeline</h2>
          <p>Click on any candidate row to view full application details in a dialog.</p>
        </div>
        <div className="cb-section-actions">
          <span className="cb-badge new" style={{ padding: '0.45rem 0.85rem' }}>
            {applications.filter(a => a.status === 'New').length} New Submissions
          </span>
        </div>
      </div>

      {/* Card Table */}
      <div className="cb-card">
        {/* Search & Filter Bar */}
        <div className="cb-filter-bar">
          <div className="cb-search-wrap">
            <Search size={16} className="cb-search-icon" />
            <input 
              type="text" 
              placeholder="Search candidate name, email, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <select 
              className="cb-filter-select"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              {uniqueRoles.map(r => <option key={r} value={r}>{r === 'All' ? 'All Roles' : r}</option>)}
            </select>

            <select 
              className="cb-filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              {statusOptions.map(st => <option key={st} value={st}>{st}</option>)}
            </select>
          </div>
        </div>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--admin-text-muted)' }}>
            <Users size={36} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.05rem', color: 'var(--admin-text-main)', margin: '0 0 0.25rem 0' }}>No applications match filters</h3>
            <p style={{ fontSize: '0.85rem', margin: 0 }}>Candidate submissions submitted on the careers portal will show up here automatically.</p>
          </div>
        ) : (
          <div className="cb-table-responsive">
            <table className="cb-table">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Position</th>
                  <th>Applied Date</th>
                  <th>Resume / Portfolio</th>
                  <th>Pipeline Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr 
                    key={app.id}
                    className="cb-table-row-clickable"
                    onClick={() => setSelectedApp(app)}
                    title="Click row to view full candidate details"
                  >
                    <td>
                      <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--admin-text-main)' }}>
                        {app.name}
                      </div>
                      {app.email && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.15rem' }}>
                          <Mail size={12} />
                          <span style={{ color: 'inherit' }}>
                            {app.email}
                          </span>
                        </div>
                      )}
                      {app.phone && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.15rem' }}>
                          <Phone size={12} color="#04ab6b" />
                          <span style={{ color: 'inherit' }}>
                            {app.phone}
                          </span>
                        </div>
                      )}
                    </td>

                    <td>
                      <span className="cb-badge pill-blue" style={{ fontSize: '0.75rem' }}>
                        {app.roleTitle}
                      </span>
                    </td>

                    <td>
                      <div style={{ fontSize: '0.82rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Calendar size={13} color="#94a3b8" />
                        <span>{formatDate(app.appliedDate)}</span>
                      </div>
                    </td>

                    {/* Exclude View / Portfolio column from opening row dialog */}
                    <td onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', alignItems: 'flex-start' }}>
                        {app.resume && (
                          <a 
                            href={app.resume} 
                            download={app.resumeName || `${app.name ? app.name.replace(/\s+/g, '_') : 'Candidate'}_Resume`}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="cb-btn cb-btn-brand cb-btn-sm"
                            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', padding: '0.25rem 0.55rem' }}
                            onClick={(e) => e.stopPropagation()}
                            title="Download / View candidate resume"
                          >
                            <FileText size={12} />
                            <span>Resume</span>
                            <Download size={11} />
                          </a>
                        )}
                        {app.portfolio && (
                          <a 
                            href={app.portfolio.startsWith('http') ? app.portfolio : `https://${app.portfolio}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="cb-btn cb-btn-secondary cb-btn-sm"
                            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', padding: '0.25rem 0.55rem' }}
                            onClick={(e) => e.stopPropagation()}
                            title="Open portfolio in new tab"
                          >
                            <Globe size={12} />
                            <span>Portfolio</span>
                            <ExternalLink size={11} />
                          </a>
                        )}
                        {!app.resume && !app.portfolio && (
                          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Not provided</span>
                        )}
                      </div>
                    </td>

                    {/* Exclude Pipeline Status column from opening row dialog */}
                    <td onClick={(e) => e.stopPropagation()}>
                      <select 
                        value={app.status || 'New'}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          e.stopPropagation();
                          onUpdateStatus(app.id, e.target.value);
                        }}
                        className="cb-filter-select"
                        style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem' }}
                      >
                        {statusOptions.map(st => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </td>

                    {/* Exclude Delete action from opening row dialog */}
                    <td onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                        <button 
                          className="cb-btn cb-btn-secondary cb-btn-sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedApp(app);
                          }}
                          style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
                        >
                          <span>Review</span>
                          <ChevronRight size={13} />
                        </button>
                        <button 
                          className="cb-btn cb-btn-secondary cb-btn-icon text-danger" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(app.id, app.name);
                          }}
                          title="Delete Application"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Candidate Details Dialog / Modal */}
      {selectedApp && (
        <div className="cb-modal-overlay" onClick={() => setSelectedApp(null)}>
          <div className="cb-modal-container" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
            <div className="cb-modal-header">
              <div>
                <h3 className="cb-modal-title">Candidate Details</h3>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>
                  Submission received on {formatDate(selectedApp.appliedDate)}
                </p>
              </div>
              <button 
                className="cb-btn cb-btn-secondary cb-btn-icon" 
                onClick={() => setSelectedApp(null)}
              >
                <X size={16} />
              </button>
            </div>

            <div className="cb-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.25rem 0', color: 'var(--admin-text-main)' }}>
                    {selectedApp.name}
                  </h2>
                  <span className="cb-badge pill-blue" style={{ fontSize: '0.78rem' }}>
                    Applied for: {selectedApp.roleTitle}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
                  <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--admin-text-muted)' }}>STATUS</label>
                  <select 
                    value={selectedApp.status || 'New'}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      onUpdateStatus(selectedApp.id, newStatus);
                      setSelectedApp({ ...selectedApp, status: newStatus });
                    }}
                    className="cb-filter-select"
                    style={{ fontSize: '0.8rem' }}
                  >
                    {statusOptions.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Contact info */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                <div style={{ background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Email</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.25rem' }}>
                    <Mail size={14} color="#0066ff" />
                    {selectedApp.email ? (
                      <a href={`mailto:${selectedApp.email}`} style={{ fontSize: '0.85rem', color: '#0f172a', fontWeight: 600, textDecoration: 'none' }}>
                        {selectedApp.email}
                      </a>
                    ) : (
                      <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Not provided</span>
                    )}
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Mobile / Phone</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.25rem' }}>
                    <Phone size={14} color="#04ab6b" />
                    {selectedApp.phone ? (
                      <a href={`tel:${selectedApp.phone}`} style={{ fontSize: '0.85rem', color: '#0f172a', fontWeight: 600, textDecoration: 'none' }}>
                        {selectedApp.phone}
                      </a>
                    ) : (
                      <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Not provided</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Resume Document */}
              {selectedApp.resume && (
                <div style={{ background: '#eff6ff', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <FileText size={20} color="#2563eb" />
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#1e40af' }}>
                        {selectedApp.resumeName || 'Attached Resume / CV'}
                      </div>
                      <span style={{ fontSize: '0.72rem', color: '#3b82f6' }}>Applicant Document</span>
                    </div>
                  </div>
                  <a 
                    href={selectedApp.resume}
                    download={selectedApp.resumeName || `${selectedApp.name ? selectedApp.name.replace(/\s+/g, '_') : 'Candidate'}_Resume`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cb-btn cb-btn-brand cb-btn-sm"
                    style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                  >
                    <Download size={14} />
                    <span>Download / View Resume</span>
                  </a>
                </div>
              )}

              {/* Portfolio link */}
              {selectedApp.portfolio && (
                <div style={{ background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Portfolio / Work Link</span>
                  <div style={{ marginTop: '0.35rem' }}>
                    <a 
                      href={selectedApp.portfolio.startsWith('http') ? selectedApp.portfolio : `https://${selectedApp.portfolio}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.85rem', color: '#0066ff', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                      <Globe size={14} />
                      <span>{selectedApp.portfolio}</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              )}

              {/* Cover note */}
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                  Cover Note / Message
                </span>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem', lineHeight: '1.6', color: '#334155', whiteSpace: 'pre-wrap' }}>
                  {selectedApp.notes || 'No message provided with application.'}
                </div>
              </div>
            </div>

            <div className="cb-modal-footer" style={{ justifyContent: 'space-between' }}>
              <button 
                type="button" 
                className="cb-btn cb-btn-secondary text-danger" 
                onClick={() => handleDelete(selectedApp.id, selectedApp.name)}
              >
                <Trash2 size={14} />
                <span>Delete Application</span>
              </button>
              <button 
                type="button" 
                className="cb-btn cb-btn-primary" 
                onClick={() => setSelectedApp(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
