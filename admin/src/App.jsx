import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Briefcase, Users, Image as ImageIcon, 
  RefreshCw, Menu, X, Shield, 
  LogOut, ExternalLink, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { api } from './services/api';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import JobsManager from './components/JobsManager';
import ApplicationsManager from './components/ApplicationsManager';
import CultureManager from './components/CultureManager';
import './styles/admin.css';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Navigation
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Data state
  const [jobs, setJobs] = useState([]);
  const [teams, setTeams] = useState([]);
  const [applications, setApplications] = useState([]);
  const [cultureItems, setCultureItems] = useState([]);
  const [toast, setToast] = useState(null);

  // Modals & sub-views
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isCultureModalOpen, setIsCultureModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Auth Verification & Storage Sanitization
  useEffect(() => {
    try {
      localStorage.removeItem('cb_admin_culture_cache');
    } catch {}

    async function checkAuth() {
      try {
        const verified = await api.verifyAuth();
        if (verified) {
          setIsAuthenticated(true);
          setUser(api.getUser());
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    }
    checkAuth();
  }, []);

  // Fetch all data from API
  const loadAllData = async () => {
    if (!isAuthenticated) return;
    try {
      const [fetchedJobs, fetchedTeams, fetchedApps, fetchedCulture] = await Promise.all([
        api.getJobs().catch(() => []),
        api.getTeams().catch(() => []),
        api.getApplications().catch(() => []),
        api.getCultureItems().catch(() => [])
      ]);
      setJobs(fetchedJobs);
      setTeams(fetchedTeams);
      setApplications(fetchedApps);
      setCultureItems(fetchedCulture);
    } catch (err) {
      console.error('Failed to load admin data:', err);
      showToast('Could not load data from API server (Port 5000)', 'error');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  // Auth handlers
  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    showToast('Signed in successfully');
  };

  const handleLogout = () => {
    api.logout();
    setIsAuthenticated(false);
    setUser(null);
    showToast('Logged out of Admin Console');
  };

  // CRUD Actions: Jobs
  const handleSaveJob = async (jobData) => {
    try {
      if (jobData.id) {
        await api.updateJob(jobData.id, jobData);
        showToast('Job opening updated successfully');
      } else {
        await api.createJob(jobData);
        showToast('New job opening published live');
      }
      loadAllData();
    } catch (err) {
      showToast(err.message || 'Error saving job', 'error');
    }
  };

  const handleToggleJob = async (id) => {
    try {
      await api.toggleJob(id);
      showToast('Job status toggled');
      loadAllData();
    } catch (err) {
      showToast(err.message || 'Error updating status', 'error');
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      await api.deleteJob(id);
      showToast('Job opening removed');
      loadAllData();
    } catch (err) {
      showToast(err.message || 'Error deleting job', 'error');
    }
  };

  // CRUD Actions: Teams
  const handleCreateTeam = async (name) => {
    try {
      const updated = await api.createTeam(name);
      setTeams(updated);
      showToast(`Department "${name}" created`);
    } catch (err) {
      showToast(err.message || 'Error creating team', 'error');
    }
  };

  const handleDeleteTeam = async (name) => {
    try {
      const updated = await api.deleteTeam(name);
      setTeams(updated);
      showToast(`Department "${name}" deleted`);
    } catch (err) {
      showToast(err.message || 'Error deleting team', 'error');
    }
  };

  // CRUD Actions: Applications
  const handleUpdateAppStatus = async (id, status) => {
    try {
      await api.updateAppStatus(id, status);
      showToast(`Application marked as ${status}`);
      loadAllData();
    } catch (err) {
      showToast(err.message || 'Error updating application', 'error');
    }
  };

  const handleDeleteApp = async (id) => {
    try {
      await api.deleteApplication(id);
      showToast('Candidate application deleted');
      loadAllData();
    } catch (err) {
      showToast(err.message || 'Error deleting application', 'error');
    }
  };

  // CRUD Actions: Culture Media
  const handleSaveCulture = async (itemData) => {
    try {
      if (itemData.id) {
        await api.updateCultureItem(itemData.id, itemData);
        showToast('Media item updated successfully');
      } else {
        await api.createCultureItem(itemData);
        showToast('New media added to Life at Cloudbrain');
      }
      loadAllData();
      return true;
    } catch (err) {
      showToast(err.message || 'Error saving media item', 'error');
      throw err;
    }
  };

  const handleDeleteCulture = async (id) => {
    try {
      await api.deleteCultureItem(id);
      showToast('Media item removed');
      loadAllData();
    } catch (err) {
      showToast(err.message || 'Error deleting media', 'error');
    }
  };

  // Loading state
  if (isCheckingAuth) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{ textAlign: 'center' }}>
          <RefreshCw size={28} className="cb-spin" color="#0066ff" />
          <p style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.9rem' }}>Verifying secure session...</p>
        </div>
      </div>
    );
  }

  // Login view if not authenticated
  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  const newAppsCount = applications.filter(a => a.status === 'New').length;
  const activeJobsCount = jobs.filter(j => j.status === 'Active' || !j.status).length;

  return (
    <div className="cb-admin-root">
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.25rem',
          borderRadius: '8px',
          background: toast.type === 'error' ? '#fef2f2' : '#f0fdf4',
          border: `1px solid ${toast.type === 'error' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
          color: toast.type === 'error' ? '#ef4444' : '#15803d',
          boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
          fontSize: '0.85rem',
          fontWeight: 600
        }}>
          {toast.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className={`cb-admin-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="cb-admin-brand">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <img 
                src="/logo.svg" 
                alt="CloudBrain Logo" 
                style={{ height: '28px', width: 'auto' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div style={{ display: 'none', alignItems: 'center', gap: '0.4rem', fontWeight: 800, color: '#0066ff' }}>
                <Shield size={22} />
                <span>CloudBrain</span>
              </div>
            </div>
          </div>
        </div>

        <nav className="cb-admin-nav">
          <button 
            className={`cb-admin-nav-item ${currentTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => { setCurrentTab('dashboard'); setMobileMenuOpen(false); }}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>

          <button 
            className={`cb-admin-nav-item ${currentTab === 'jobs' ? 'active' : ''}`}
            onClick={() => { setCurrentTab('jobs'); setMobileMenuOpen(false); }}
          >
            <Briefcase size={18} />
            <span>Job Openings</span>
            <span className="cb-admin-nav-badge">{activeJobsCount}</span>
          </button>

          <button 
            className={`cb-admin-nav-item ${currentTab === 'applications' ? 'active' : ''}`}
            onClick={() => { setCurrentTab('applications'); setMobileMenuOpen(false); }}
          >
            <Users size={18} />
            <span>Applications</span>
            {newAppsCount > 0 && (
              <span className="cb-admin-nav-badge alert">{newAppsCount}</span>
            )}
          </button>

          <button 
            className={`cb-admin-nav-item ${currentTab === 'culture' ? 'active' : ''}`}
            onClick={() => { setCurrentTab('culture'); setMobileMenuOpen(false); }}
          >
            <ImageIcon size={18} />
            <span>Life at Cloudbrain</span>
            <span className="cb-admin-nav-badge">{cultureItems.length}</span>
          </button>
        </nav>

        <div className="cb-admin-sidebar-footer">
          <button 
            className="cb-btn cb-btn-secondary cb-btn-sm" 
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem', color: '#ef4444' }}
            onClick={handleLogout}
            title="Sign Out"
          >
            <LogOut size={13} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="cb-admin-main">
        {/* Topbar */}
        <header className="cb-admin-topbar">
          <div className="cb-topbar-title">
            <button 
              className="cb-btn cb-btn-secondary cb-btn-icon" 
              style={{ display: 'none' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <h1>
              {currentTab === 'dashboard' && 'Dashboard'}
              {currentTab === 'jobs' && 'Job Openings & Departments'}
              {currentTab === 'applications' && 'Candidate Applications'}
              {currentTab === 'culture' && 'Life at Cloudbrain Media'}
            </h1>
          </div>

          <div className="cb-topbar-actions">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f1f5f9', padding: '0.35rem 0.75rem', borderRadius: '8px', fontSize: '0.8rem', color: '#334155' }}>
              <Shield size={14} color="#0066ff" />
              <span style={{ fontWeight: 600 }}>{user?.email || ''}</span>
            </div>

            <a 
              href={import.meta.env.VITE_WEBSITE_URL || undefined} 
              target="_blank" 
              rel="noopener noreferrer"
              className="cb-btn cb-btn-primary cb-btn-sm"
              style={{ textDecoration: 'none' }}
            >
              <span>Live Website</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </header>

        {/* Content Area */}
        <div className="cb-admin-content">
          {currentTab === 'dashboard' && (
            <AdminDashboard 
              jobs={jobs}
              teams={teams}
              applications={applications}
              cultureItems={cultureItems}
              onNavigate={(tab) => setCurrentTab(tab)}
              onOpenAddJob={() => {
                setCurrentTab('jobs');
                setIsJobModalOpen(true);
              }}
              onOpenAddMedia={() => {
                setCurrentTab('culture');
                setIsCultureModalOpen(true);
              }}
              onViewApplication={(app) => {
                setSelectedApplication(app);
                setCurrentTab('applications');
              }}
            />
          )}

          {currentTab === 'jobs' && (
            <JobsManager 
              jobs={jobs}
              teams={teams}
              onSaveJob={handleSaveJob}
              onDeleteJob={handleDeleteJob}
              onToggleStatus={handleToggleJob}
              onCreateTeam={handleCreateTeam}
              onDeleteTeam={handleDeleteTeam}
              isModalOpen={isJobModalOpen}
              setIsModalOpen={setIsJobModalOpen}
            />
          )}

          {currentTab === 'applications' && (
            <ApplicationsManager 
              applications={applications}
              onUpdateStatus={handleUpdateAppStatus}
              onDeleteApplication={handleDeleteApp}
              selectedApp={selectedApplication}
              setSelectedApp={setSelectedApplication}
            />
          )}

          {currentTab === 'culture' && (
            <CultureManager 
              cultureItems={cultureItems}
              onSaveItem={handleSaveCulture}
              onDeleteItem={handleDeleteCulture}
              isModalOpen={isCultureModalOpen}
              setIsModalOpen={setIsCultureModalOpen}
            />
          )}
        </div>
      </div>
    </div>
  );
}
