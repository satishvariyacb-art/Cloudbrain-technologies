import React from 'react';
import { 
  Briefcase, Users, Image as ImageIcon, 
  Clock, Plus, ChevronRight
} from 'lucide-react';

export default function AdminDashboard({ 
  jobs = [], 
  applications = [], 
  cultureItems = [], 
  teams = [],
  onNavigate,
  onOpenAddJob,
  onOpenAddMedia,
  onViewApplication
}) {
  const activeJobs = jobs.filter(j => j.status === 'Active' || !j.status);
  const newApplications = applications.filter(a => a.status === 'New');

  const recentApplications = applications.slice(0, 5);

  const getRoleApplicationCount = (roleTitle) => {
    return applications.filter(a => a.roleTitle === roleTitle).length;
  };

  return (
    <div className="cb-admin-dashboard">
      {/* Welcome Banner */}
      <div className="cb-section-header-bar">
        <div className="cb-section-title-wrap">
          <h2>Dashboard</h2>
          <p>Real-time telemetry and management for CloudBrain careers, talent pipeline, and media.</p>
        </div>
        <div className="cb-section-actions">
          <button className="cb-btn cb-btn-secondary" onClick={onOpenAddMedia}>
            <Plus size={16} />
            <span>Add Media</span>
          </button>
          <button className="cb-btn cb-btn-primary" onClick={onOpenAddJob}>
            <Plus size={16} />
            <span>Post New Job</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="cb-stats-grid">
        <div className="cb-stat-card" onClick={() => onNavigate('jobs')} style={{ cursor: 'pointer' }}>
          <div className="cb-stat-info">
            <h3>Active Openings</h3>
            <div className="cb-stat-val">{activeJobs.length}</div>
          </div>
          <div className="cb-stat-icon-wrap blue">
            <Briefcase size={22} />
          </div>
        </div>

        <div className="cb-stat-card" onClick={() => onNavigate('applications')} style={{ cursor: 'pointer' }}>
          <div className="cb-stat-info">
            <h3>Total Applications</h3>
            <div className="cb-stat-val">{applications.length}</div>
          </div>
          <div className="cb-stat-icon-wrap emerald">
            <Users size={22} />
          </div>
        </div>

        <div className="cb-stat-card" onClick={() => onNavigate('applications')} style={{ cursor: 'pointer' }}>
          <div className="cb-stat-info">
            <h3>Pending Review</h3>
            <div className="cb-stat-val">{newApplications.length}</div>
          </div>
          <div className="cb-stat-icon-wrap amber">
            <Clock size={22} />
          </div>
        </div>

        <div className="cb-stat-card" onClick={() => onNavigate('culture')} style={{ cursor: 'pointer' }}>
          <div className="cb-stat-info">
            <h3>Life at CB Media</h3>
            <div className="cb-stat-val">{cultureItems.length}</div>
          </div>
          <div className="cb-stat-icon-wrap purple">
            <ImageIcon size={22} />
          </div>
        </div>
      </div>

      {/* Grid: Recent Applications & Active Positions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
        {/* Recent Applications Card */}
        <div className="cb-card">
          <div className="cb-filter-bar" style={{ borderBottom: '1px solid var(--admin-border)', paddingBottom: '0.85rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--admin-text-main)', fontWeight: 700 }}>Recent Candidate Submissions</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>Direct applications from the careers portal</span>
            </div>
            <button 
              className="cb-btn cb-btn-secondary cb-btn-sm" 
              onClick={() => onNavigate('applications')}
            >
              <span>View All ({applications.length})</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ padding: '0.5rem 0' }}>
            {recentApplications.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--admin-text-muted)' }}>
                <Users size={32} style={{ opacity: 0.3, marginBottom: '0.5rem' }} />
                <p style={{ margin: 0, fontSize: '0.85rem' }}>No candidate applications received yet.</p>
              </div>
            ) : (
              recentApplications.map((app) => (
                <div 
                  key={app.id}
                  onClick={() => onViewApplication(app)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1.25rem',
                    borderBottom: '1px solid #f1f5f9',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--admin-text-main)' }}>{app.name}</span>
                      <span className={`cb-badge ${app.status === 'New' ? 'new' : app.status === 'Hired' ? 'hired' : 'review'}`} style={{ fontSize: '0.68rem', padding: '0.1rem 0.45rem' }}>
                        {app.status}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>
                      {app.roleTitle}{app.phone ? ` • ${app.phone}` : app.email ? ` • ${app.email}` : ''}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      {app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : 'Recent'}
                    </span>
                    <ChevronRight size={16} color="#94a3b8" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Active Openings Snapshot */}
        <div className="cb-card">
          <div className="cb-filter-bar" style={{ borderBottom: '1px solid var(--admin-border)', paddingBottom: '0.85rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--admin-text-main)', fontWeight: 700 }}>Active Job Openings</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>Live on website Careers page</span>
            </div>
            <button 
              className="cb-btn cb-btn-secondary cb-btn-sm" 
              onClick={() => onNavigate('jobs')}
            >
              <span>Manage Jobs</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ padding: '0.5rem 0' }}>
            {activeJobs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--admin-text-muted)' }}>
                <Briefcase size={32} style={{ opacity: 0.3, marginBottom: '0.5rem' }} />
                <p style={{ margin: 0, fontSize: '0.85rem' }}>No active job openings right now.</p>
                <button 
                  className="cb-btn cb-btn-primary cb-btn-sm" 
                  onClick={onOpenAddJob} 
                  style={{ marginTop: '0.75rem' }}
                >
                  Post First Job
                </button>
              </div>
            ) : (
              activeJobs.slice(0, 5).map((job) => (
                <div 
                  key={job.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1.25rem',
                    borderBottom: '1px solid #f1f5f9'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--admin-text-main)' }}>{job.role}</span>
                      <span className="cb-badge pill-blue" style={{ fontSize: '0.68rem', padding: '0.1rem 0.45rem' }}>
                        {job.team}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)' }}>
                      {job.type} • {job.location}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="cb-badge" style={{ fontSize: '0.72rem', background: '#f1f5f9', color: '#475569' }}>
                      {getRoleApplicationCount(job.role)} applicants
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
