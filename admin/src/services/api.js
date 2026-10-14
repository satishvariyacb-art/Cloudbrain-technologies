function resolveApiBase() {
  const raw = import.meta.env.VITE_API_URL;
  if (!raw || !String(raw).trim()) {
    console.error('VITE_API_URL is not set. Add it to admin/.env and restart the Vite dev server.');
    return '';
  }
  const trimmed = String(raw).trim().replace(/\/$/, '');
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
}

const API_BASE = resolveApiBase();
const TOKEN_KEY = 'cb_admin_jwt_token';
const USER_KEY = 'cb_admin_user_data';

const SEED_TEAMS = [
  'Mobile Engineering',
  'Intelligence',
  'Product Design',
  'Web Engineering',
  'Growth & Marketing'
];

const SEED_JOBS = [
  {
    id: "ios-architect",
    role: "Senior iOS Architect",
    team: "Mobile Engineering",
    type: "Full-Time",
    location: "Remote / Hybrid",
    experience: "5+ Years",
    desc: "Lead native iOS architecture using Swift 6, SwiftUI, and CoreML for high-scale apps.",
    status: "Active",
    postedDate: "2026-09-01"
  },
  {
    id: "android-lead",
    role: "Lead Android Engineer",
    team: "Mobile Engineering",
    type: "Full-Time",
    location: "Remote / Hybrid",
    experience: "5+ Years",
    desc: "Build mission-critical Kotlin & Jetpack Compose mobile experiences with automated CI/CD pipelines.",
    status: "Active",
    postedDate: "2026-09-05"
  },
  {
    id: "aiml-engineer",
    role: "AI/ML Product Specialist",
    team: "Intelligence",
    type: "Full-Time",
    location: "Remote / Hybrid",
    experience: "3+ Years",
    desc: "Integrate LLMs, vector search, and on-device CoreML/TFLite models into web and mobile platforms.",
    status: "Active",
    postedDate: "2026-09-10"
  },
  {
    id: "uiux-designer",
    role: "Lead UI/UX Product Designer",
    team: "Product Design",
    type: "Full-Time",
    location: "Remote / Hybrid",
    experience: "4+ Years",
    desc: "Craft Linear-inspired design systems, high-fidelity Figma components, and micro-interactions.",
    status: "Active",
    postedDate: "2026-09-15"
  }
];

const SEED_APPLICATIONS = [
  {
    id: "app-101",
    roleId: "ios-architect",
    roleTitle: "Senior iOS Architect",
    roleTeam: "Mobile Engineering",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    portfolio: "https://github.com/aarav-swift",
    notes: "Over 6 years building SwiftUI apps with custom metal shaders and CoreML pipelines. Highly interested in CloudBrain's native engineering culture.",
    appliedDate: "2026-09-20T10:14:00.000Z",
    status: "In Review"
  },
  {
    id: "app-102",
    roleId: "uiux-designer",
    roleTitle: "Lead UI/UX Product Designer",
    roleTeam: "Product Design",
    name: "Pooja Patel",
    email: "pooja.design@example.com",
    portfolio: "https://dribbble.com/poojadesign",
    notes: "Specialized in Linear-style dark mode dashboards, comprehensive Figma token design systems, and subtle web micro-interactions.",
    appliedDate: "2026-09-22T14:30:00.000Z",
    status: "New"
  }
];

const SEED_CULTURE = [
  {
    id: "workspace-1",
    type: "photo",
    category: "Photos",
    title: "Engineering Innovation Hub",
    location: "Main HQ Studio",
    image: "/workspace.png",
    caption: "Our modern product engineering space equipped with high-performance Apple hardware, dual 4K displays, and collaborative glass whiteboards."
  },
  {
    id: "video-1",
    type: "video",
    category: "Video Showcases",
    title: "Day in the Life of a Cloudbrain Engineer",
    duration: "2:45 min",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-computer-41445-large.mp4",
    poster: "/collaboration.png",
    caption: "Inside our 2-week agile sprint workflow, architecture discussions, and daily standups."
  },
  {
    id: "collaboration-1",
    type: "photo",
    category: "Photos",
    title: "Cross-Functional UX & Mobile Sprints",
    location: "Product Design Lab",
    image: "/collaboration.png",
    caption: "iOS architects, Android leads, and UI designers reviewing pixel-perfect Figma components and micro-interactions."
  },
  {
    id: "video-2",
    type: "video",
    category: "Video Showcases",
    title: "Cloudbrain Annual AI Hackathon 2026",
    duration: "3:10 min",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-people-working-in-an-office-43522-large.mp4",
    poster: "/hackathon.png",
    caption: "48 hours of non-stop coding, custom LLM model building, and mobile app prototype demos."
  }
];

function getAuthHeader() {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

// Safe localStorage setItem helper that never throws QuotaExceededError
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    console.warn(`localStorage quota exceeded for key "${key}". Skipping cache to prevent crash.`);
    try {
      localStorage.removeItem(key);
    } catch {}
  }
}

// Request with fallback
async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...options.headers
  };

  try {
    const res = await fetch(url, { ...options, headers });
    const json = await res.json();
    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
      throw new Error(json.error || `Request failed with status ${res.status}`);
    }
    return json;
  } catch (err) {
    // If request fails (e.g. server offline or failed to fetch), throw so caller can fallback
    throw err;
  }
}

export const api = {
  // ----------------------------------------------------
  // Authentication
  // ----------------------------------------------------
  async login(email, password) {
    const cleanEmail = (email || '').trim().toLowerCase();
    
    // First try live backend on Port 5000
    try {
      const res = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: cleanEmail, password })
      });
      if (res.success && res.token) {
        localStorage.setItem(TOKEN_KEY, res.token);
        localStorage.setItem(USER_KEY, JSON.stringify(res.user));
      }
      return res;
    } catch (err) {
      throw new Error(err.message || 'Invalid credentials or API server unreachable.');
    }
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem(TOKEN_KEY));
  },

  getUser() {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY)) || null;
    } catch {
      return null;
    }
  },

  async verifyAuth() {
    if (!this.isAuthenticated()) return false;
    try {
      const res = await request('/auth/me');
      return res.success;
    } catch {
      // Retain active session even if server is temporarily unreachable
      return this.isAuthenticated();
    }
  },

  // ----------------------------------------------------
  // Jobs CRUD
  // ----------------------------------------------------
  async getJobs() {
    try {
      const res = await request('/admin/jobs');
      if (res.data) {
        localStorage.setItem('cb_admin_jobs_cache', JSON.stringify(res.data));
        return res.data;
      }
    } catch {}
    
    // Fallback cache
    try {
      const cached = localStorage.getItem('cb_admin_jobs_cache');
      if (cached) return JSON.parse(cached);
    } catch {}
    return SEED_JOBS;
  },

  async createJob(jobData) {
    try {
      const res = await request('/admin/jobs', {
        method: 'POST',
        body: JSON.stringify(jobData)
      });
      return res.data;
    } catch {
      const jobs = await this.getJobs();
      const newJob = {
        ...jobData,
        id: `job-${Date.now()}`,
        status: jobData.status || 'Active',
        postedDate: new Date().toISOString().split('T')[0]
      };
      const updated = [newJob, ...jobs];
      localStorage.setItem('cb_admin_jobs_cache', JSON.stringify(updated));
      return newJob;
    }
  },

  async updateJob(id, jobData) {
    try {
      const res = await request(`/admin/jobs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(jobData)
      });
      return res.data;
    } catch {
      const jobs = await this.getJobs();
      const updated = jobs.map(j => j.id === id ? { ...j, ...jobData } : j);
      localStorage.setItem('cb_admin_jobs_cache', JSON.stringify(updated));
      return jobData;
    }
  },

  async toggleJob(id) {
    try {
      const res = await request(`/admin/jobs/${id}/toggle`, {
        method: 'PATCH'
      });
      return res.data;
    } catch {
      const jobs = await this.getJobs();
      const updated = jobs.map(j => {
        if (j.id === id) {
          return { ...j, status: j.status === 'Active' ? 'Closed' : 'Active' };
        }
        return j;
      });
      localStorage.setItem('cb_admin_jobs_cache', JSON.stringify(updated));
      return updated.find(j => j.id === id);
    }
  },

  async deleteJob(id) {
    try {
      const res = await request(`/admin/jobs/${id}`, {
        method: 'DELETE'
      });
      return res.success;
    } catch {
      const jobs = await this.getJobs();
      const updated = jobs.filter(j => j.id !== id);
      localStorage.setItem('cb_admin_jobs_cache', JSON.stringify(updated));
      return true;
    }
  },

  // ----------------------------------------------------
  // Dynamic Teams
  // ----------------------------------------------------
  async getTeams() {
    try {
      const res = await request('/teams');
      if (res.data) {
        localStorage.setItem('cb_admin_teams_cache', JSON.stringify(res.data));
        return res.data;
      }
    } catch {}

    try {
      const cached = localStorage.getItem('cb_admin_teams_cache');
      if (cached) return JSON.parse(cached);
    } catch {}
    return SEED_TEAMS;
  },

  async createTeam(name) {
    try {
      const res = await request('/admin/teams', {
        method: 'POST',
        body: JSON.stringify({ name })
      });
      return res.data || [];
    } catch {
      const teams = await this.getTeams();
      if (!teams.includes(name)) {
        const updated = [...teams, name];
        localStorage.setItem('cb_admin_teams_cache', JSON.stringify(updated));
        return updated;
      }
      return teams;
    }
  },

  async deleteTeam(name) {
    try {
      const res = await request(`/admin/teams/${encodeURIComponent(name)}`, {
        method: 'DELETE'
      });
      return res.data || [];
    } catch {
      const teams = await this.getTeams();
      const updated = teams.filter(t => t !== name);
      localStorage.setItem('cb_admin_teams_cache', JSON.stringify(updated));
      return updated;
    }
  },

  // ----------------------------------------------------
  // Candidate Applications
  // ----------------------------------------------------
  async getApplications() {
    try {
      const res = await request('/admin/applications');
      if (res.data) {
        localStorage.setItem('cb_admin_apps_cache', JSON.stringify(res.data));
        return res.data;
      }
    } catch {}

    try {
      const cached = localStorage.getItem('cb_admin_apps_cache');
      if (cached) return JSON.parse(cached);
    } catch {}
    return SEED_APPLICATIONS;
  },

  async updateAppStatus(id, status) {
    try {
      const res = await request(`/admin/applications/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
      return res.data;
    } catch {
      const apps = await this.getApplications();
      const updated = apps.map(a => a.id === id ? { ...a, status } : a);
      localStorage.setItem('cb_admin_apps_cache', JSON.stringify(updated));
      return updated;
    }
  },

  async deleteApplication(id) {
    try {
      const res = await request(`/admin/applications/${id}`, {
        method: 'DELETE'
      });
      return res.success;
    } catch {
      const apps = await this.getApplications();
      const updated = apps.filter(a => a.id !== id);
      localStorage.setItem('cb_admin_apps_cache', JSON.stringify(updated));
      return true;
    }
  },

  // ----------------------------------------------------
  // Culture / Life at CloudBrain Media (Direct DB via Server)
  // ----------------------------------------------------
  async getCultureItems() {
    try {
      const res = await request('/culture');
      if (res && res.data) {
        return res.data;
      }
    } catch (err) {
      console.warn('API /culture request failed:', err.message);
    }
    return [];
  },

  async createCultureItem(itemData) {
    const res = await request('/admin/culture', {
      method: 'POST',
      body: JSON.stringify(itemData)
    });
    return res.data;
  },

  async updateCultureItem(id, itemData) {
    const res = await request(`/admin/culture/${id}`, {
      method: 'PUT',
      body: JSON.stringify(itemData)
    });
    return res.data;
  },

  async deleteCultureItem(id) {
    const res = await request(`/admin/culture/${id}`, {
      method: 'DELETE'
    });
    return res.success;
  }
};
