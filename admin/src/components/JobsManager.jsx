import React, { useState } from 'react';
import { 
  Briefcase, Plus, Search, Edit3, Trash2, Power, 
  MapPin, Clock, Check, X, AlertCircle, Tag, Layers, FolderPlus 
} from 'lucide-react';

export default function JobsManager({ 
  jobs = [], 
  teams = [],
  onSaveJob, 
  onDeleteJob, 
  onToggleStatus,
  onCreateTeam,
  onDeleteTeam,
  isModalOpen,
  setIsModalOpen
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTeam, setFilterTeam] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Edit & Modal State
  const [editingJob, setEditingJob] = useState(null);
  const [isCustomTeam, setIsCustomTeam] = useState(false);
  const [customTeamName, setCustomTeamName] = useState('');
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [newTeamInput, setNewTeamInput] = useState('');

  const [formData, setFormData] = useState({
    role: '',
    team: teams[0] || 'Mobile Engineering',
    type: 'Full-Time',
    location: 'Remote / Hybrid',
    experience: '3+ Years',
    desc: '',
    status: 'Active'
  });

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      (job.role && job.role.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (job.team && job.team.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (job.desc && job.desc.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTeam = filterTeam === 'All' || job.team === filterTeam;
    const matchesStatus = filterStatus === 'All' || (job.status || 'Active') === filterStatus;

    return matchesSearch && matchesTeam && matchesStatus;
  });

  const handleOpenAdd = () => {
    setEditingJob(null);
    setIsCustomTeam(false);
    setCustomTeamName('');
    setFormData({
      role: '',
      team: teams[0] || 'Mobile Engineering',
      type: 'Full-Time',
      location: 'Remote / Hybrid',
      experience: '3+ Years',
      desc: '',
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (job) => {
    setEditingJob(job);
    setIsCustomTeam(false);
    setCustomTeamName('');
    setFormData({
      role: job.role || '',
      team: job.team || teams[0] || 'Mobile Engineering',
      type: job.type || 'Full-Time',
      location: job.location || 'Remote / Hybrid',
      experience: job.experience || '3+ Years',
      desc: job.desc || '',
      status: job.status || 'Active'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role.trim() || !formData.desc.trim()) return;

    let finalTeam = formData.team;
    if (isCustomTeam && customTeamName.trim()) {
      finalTeam = customTeamName.trim();
      if (onCreateTeam) {
        await onCreateTeam(finalTeam);
      }
    }

    onSaveJob({
      ...(editingJob ? { id: editingJob.id } : {}),
      ...formData,
      team: finalTeam
    });
    setIsModalOpen(false);
  };

  const handleDelete = (id, roleName) => {
    if (window.confirm(`Are you sure you want to delete opening "${roleName}"?`)) {
      onDeleteJob(id);
    }
  };

  const handleAddTeamSubmit = async (e) => {
    e.preventDefault();
    if (!newTeamInput.trim()) return;
    if (onCreateTeam) {
      await onCreateTeam(newTeamInput.trim());
      setNewTeamInput('');
    }
  };

  const handleDeleteTeamConfirm = async (teamName) => {
    const jobsWithTeam = jobs.filter(j => j.team === teamName);
    if (jobsWithTeam.length > 0) {
      alert(`Cannot delete team "${teamName}" because ${jobsWithTeam.length} job(s) are assigned to it. Please reassign them first.`);
      return;
    }
    if (window.confirm(`Delete team category "${teamName}"?`)) {
      if (onDeleteTeam) {
        await onDeleteTeam(teamName);
      }
    }
  };

  return (
    <div className="cb-jobs-manager">
      {/* Header */}
      <div className="cb-section-header-bar">
        <div className="cb-section-title-wrap">
          <h2>Job Openings & Departments</h2>
          <p>Create, update, toggle open/closed status, and manage dynamic team filters.</p>
        </div>
        <div className="cb-section-actions">
          <button 
            className="cb-btn cb-btn-secondary" 
            onClick={() => setIsTeamModalOpen(true)}
          >
            <Layers size={16} />
            <span>Manage Teams ({teams.length})</span>
          </button>
          <button className="cb-btn cb-btn-primary" onClick={handleOpenAdd}>
            <Plus size={16} />
            <span>Post New Job</span>
          </button>
        </div>
      </div>

      {/* Modal: Dynamic Team Management Dialog */}
      {isTeamModalOpen && (
        <div className="cb-modal-overlay" onClick={() => setIsTeamModalOpen(false)}>
          <div className="cb-modal-container" style={{ maxWidth: '540px' }} onClick={(e) => e.stopPropagation()}>
            <div className="cb-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: '8px', background: 'rgba(48, 133, 255, 0.1)', color: '#0066ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Layers size={18} />
                </div>
                <div>
                  <h3 className="cb-modal-title">Manage Teams & Departments</h3>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>
                    Add or remove departments for categorizing job openings and filtering.
                  </p>
                </div>
              </div>
              <button 
                className="cb-btn cb-btn-secondary cb-btn-icon" 
                onClick={() => setIsTeamModalOpen(false)}
              >
                <X size={16} />
              </button>
            </div>

            <div className="cb-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Add Team Input */}
              <form onSubmit={handleAddTeamSubmit}>
                <label className="cb-form-label" style={{ marginBottom: '0.4rem' }}>Add New Department / Team</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="text" 
                    className="cb-form-input"
                    placeholder="e.g., DevOps & Cloud, AI Research, Marketing"
                    value={newTeamInput}
                    onChange={(e) => setNewTeamInput(e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <button type="submit" className="cb-btn cb-btn-primary" disabled={!newTeamInput.trim()}>
                    <Plus size={14} />
                    <span>Add</span>
                  </button>
                </div>
              </form>

              {/* Existing Teams List */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <label className="cb-form-label" style={{ margin: 0 }}>
                    Active Teams ({teams.length})
                  </label>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    Tip: Cannot delete a team with assigned jobs
                  </span>
                </div>

                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '0.5rem', 
                  maxHeight: '260px', 
                  overflowY: 'auto', 
                  padding: '0.75rem', 
                  background: '#f8fafc', 
                  border: '1px solid var(--admin-border)', 
                  borderRadius: '8px' 
                }}>
                  {teams.length === 0 ? (
                    <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: 0, padding: '0.5rem' }}>No teams defined yet.</p>
                  ) : (
                    teams.map((t) => {
                      const count = jobs.filter(j => j.team === t).length;
                      return (
                        <div 
                          key={t}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.4rem 0.75rem',
                            background: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            color: '#334155',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                          }}
                        >
                          <span>{t}</span>
                          <span style={{ 
                            fontSize: '0.7rem', 
                            padding: '0.1rem 0.4rem', 
                            borderRadius: '999px', 
                            background: count > 0 ? '#eff6ff' : '#f1f5f9',
                            color: count > 0 ? '#0066ff' : '#64748b',
                            fontWeight: 700 
                          }}>
                            {count} {count === 1 ? 'job' : 'jobs'}
                          </span>
                          <button 
                            type="button"
                            onClick={() => handleDeleteTeamConfirm(t)}
                            title={count > 0 ? `Cannot delete: ${count} jobs assigned` : `Delete team "${t}"`}
                            style={{ 
                              background: 'none', 
                              border: 'none', 
                              cursor: count > 0 ? 'not-allowed' : 'pointer', 
                              color: count > 0 ? '#cbd5e1' : '#94a3b8', 
                              padding: '2px', 
                              display: 'flex', 
                              alignItems: 'center',
                              borderRadius: '4px'
                            }}
                            onMouseEnter={(e) => {
                              if (count === 0) e.currentTarget.style.color = '#ef4444';
                            }}
                            onMouseLeave={(e) => {
                              if (count === 0) e.currentTarget.style.color = '#94a3b8';
                            }}
                          >
                            <X size={13} />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            <div className="cb-modal-footer">
              <button 
                type="button" 
                className="cb-btn cb-btn-secondary" 
                onClick={() => setIsTeamModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Card Table */}
      <div className="cb-card">
        {/* Search & Filter Bar */}
        <div className="cb-filter-bar">
          <div className="cb-search-wrap">
            <Search size={16} className="cb-search-icon" />
            <input 
              type="text" 
              placeholder="Search job title, team, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <select 
              className="cb-filter-select"
              value={filterTeam}
              onChange={(e) => setFilterTeam(e.target.value)}
            >
              <option value="All">All Teams ({jobs.length})</option>
              {teams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>

            <select 
              className="cb-filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active Only</option>
              <option value="Closed">Closed Only</option>
            </select>
          </div>
        </div>

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--admin-text-muted)' }}>
            <Briefcase size={36} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.05rem', color: 'var(--admin-text-main)', margin: '0 0 0.25rem 0' }}>No openings match your criteria</h3>
            <p style={{ fontSize: '0.85rem', margin: 0 }}>Try clearing filters or post a new job opening.</p>
          </div>
        ) : (
          <div className="cb-table-responsive">
            <table className="cb-table">
              <thead>
                <tr>
                  <th>Job Title & Overview</th>
                  <th>Team / Department</th>
                  <th>Type & Location</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => {
                  const isActive = job.status === 'Active' || !job.status;
                  return (
                    <tr 
                      key={job.id}
                      className="cb-table-row-clickable"
                      onClick={() => handleOpenEdit(job)}
                      title="Click row to edit job opening details"
                    >
                      <td style={{ maxWidth: '320px' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--admin-text-main)', marginBottom: '0.2rem' }}>
                          {job.role}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {job.desc}
                        </div>
                      </td>

                      <td>
                        <span className="cb-badge pill-blue" style={{ fontSize: '0.75rem' }}>
                          {job.team}
                        </span>
                      </td>

                      <td>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--admin-text-main)' }}>
                          {job.type}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <MapPin size={12} />
                          <span>{job.location}</span>
                        </div>
                      </td>

                      <td onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleStatus(job.id);
                          }}
                          className={`cb-badge ${isActive ? 'active' : 'closed'}`}
                          style={{ cursor: 'pointer', border: 'none' }}
                          title={isActive ? 'Click to Close opening' : 'Click to Activate opening'}
                        >
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isActive ? '#04ab6b' : '#94a3b8' }}></span>
                          <span>{isActive ? 'Active' : 'Closed'}</span>
                        </button>
                      </td>

                      <td onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                          <button 
                            className="cb-btn cb-btn-secondary cb-btn-icon" 
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleStatus(job.id);
                            }}
                            title={isActive ? 'Deactivate Opening' : 'Activate Opening'}
                          >
                            <Power size={14} color={isActive ? '#04ab6b' : '#94a3b8'} />
                          </button>
                          <button 
                            className="cb-btn cb-btn-secondary cb-btn-icon" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenEdit(job);
                            }}
                            title="Edit Job Details"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button 
                            className="cb-btn cb-btn-secondary cb-btn-icon text-danger" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(job.id, job.role);
                            }}
                            title="Delete Job"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: Add/Edit Job */}
      {isModalOpen && (
        <div className="cb-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="cb-modal-container" style={{ maxWidth: '580px' }} onClick={(e) => e.stopPropagation()}>
            <div className="cb-modal-header">
              <div>
                <h3 className="cb-modal-title">{editingJob ? 'Edit Job Opening' : 'Post New Opening'}</h3>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>
                  This opening will update immediately on the CloudBrain careers portal.
                </p>
              </div>
              <button 
                className="cb-btn cb-btn-secondary cb-btn-icon" 
                onClick={() => setIsModalOpen(false)}
              >
                <X size={16} />
              </button>
            </div>

            <form 
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minHeight: 0,
                overflow: 'hidden'
              }}
            >
              <div 
                className="cb-modal-body" 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1rem',
                  flex: 1,
                  minHeight: 0,
                  overflowY: 'auto',
                  maxHeight: 'calc(85vh - 130px)'
                }}
              >
                <div className="cb-form-group">
                  <label className="cb-form-label">Job / Role Title *</label>
                  <input 
                    type="text" 
                    className="cb-form-input"
                    placeholder="e.g. Senior Cloud Architect"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                  />
                </div>

                <div className="cb-form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <label className="cb-form-label" style={{ margin: 0 }}>Department / Team *</label>
                    <button 
                      type="button" 
                      onClick={() => setIsTeamModalOpen(true)}
                      style={{ background: 'none', border: 'none', color: '#0066ff', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, padding: 0 }}
                      title="Open Manage Teams Dialog"
                    >
                      Manage Teams ({teams.length})
                    </button>
                  </div>
                  {!isCustomTeam ? (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <select 
                        className="cb-form-select"
                        value={formData.team}
                        onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                        style={{ flex: 1 }}
                      >
                        {teams.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <button 
                        type="button"
                        className="cb-btn cb-btn-secondary cb-btn-sm"
                        onClick={() => setIsCustomTeam(true)}
                        title="Type a new custom team"
                      >
                        <Plus size={14} />
                        <span>New</span>
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input 
                        type="text" 
                        className="cb-form-input"
                        placeholder="Enter new team name..."
                        value={customTeamName}
                        onChange={(e) => setCustomTeamName(e.target.value)}
                        style={{ flex: 1 }}
                        autoFocus
                      />
                      <button 
                        type="button"
                        className="cb-btn cb-btn-secondary cb-btn-sm"
                        onClick={() => setIsCustomTeam(false)}
                      >
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  <div className="cb-form-group">
                    <label className="cb-form-label">Job Type</label>
                    <select 
                      className="cb-form-select"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  <div className="cb-form-group">
                    <label className="cb-form-label">Location</label>
                    <input 
                      type="text" 
                      className="cb-form-input"
                      placeholder="Remote / Hybrid"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>

                  <div className="cb-form-group">
                    <label className="cb-form-label">Experience</label>
                    <input 
                      type="text" 
                      className="cb-form-input"
                      placeholder="3+ Years"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    />
                  </div>
                </div>

                <div className="cb-form-group">
                  <label className="cb-form-label">Role Overview & Responsibilities *</label>
                  <textarea 
                    className="cb-form-textarea"
                    rows={4}
                    placeholder="Describe expectations, core impact, tech stack, and qualifications..."
                    value={formData.desc}
                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                    required
                  />
                </div>

                <div className="cb-form-group">
                  <label className="cb-form-label">Opening Status</label>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                      <input 
                        type="radio" 
                        name="status" 
                        value="Active" 
                        checked={formData.status === 'Active'}
                        onChange={() => setFormData({ ...formData, status: 'Active' })}
                      />
                      <span>Active (Accepting Applications)</span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                      <input 
                        type="radio" 
                        name="status" 
                        value="Closed" 
                        checked={formData.status === 'Closed'}
                        onChange={() => setFormData({ ...formData, status: 'Closed' })}
                      />
                      <span>Closed</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="cb-modal-footer" style={{ flexShrink: 0 }}>
                <button 
                  type="button" 
                  className="cb-btn cb-btn-secondary" 
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="cb-btn cb-btn-primary">
                  {editingJob ? 'Save Changes' : 'Publish Opening'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
