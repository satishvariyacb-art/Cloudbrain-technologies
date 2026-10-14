function getApiBase() {
  const raw = import.meta.env.VITE_API_URL;
  if (!raw || !String(raw).trim()) {
    console.error('VITE_API_URL is not set. Add it to web/.env and restart the Vite dev server.');
    return '';
  }
  const trimmed = String(raw).trim().replace(/\/$/, '');
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
}

export const apiClient = {
  // ------------------------------------------------------------------
  // 1. Fetch Active Job Openings (No mock fallback when offline)
  // ------------------------------------------------------------------
  async fetchActiveJobs() {
    try {
      const base = getApiBase();
      const res = await fetch(`${base}/jobs`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) return [];
      const json = await res.json();
      const allJobs = json.data || [];
      // Only return jobs that are Active
      return allJobs.filter(job => job.status === 'Active' || !job.status);
    } catch (err) {
      console.warn('Error fetching active jobs:', err);
      return [];
    }
  },

  // ------------------------------------------------------------------
  // 2. Submit Candidate Application to Admin Backend
  // ------------------------------------------------------------------
  async submitApplication(candidateData) {
    try {
      const base = getApiBase();
      const res = await fetch(`${base}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(candidateData)
      });
      return await res.json();
    } catch (err) {
      console.warn('Backend server offline. Application could not be submitted remotely:', err);
      return { success: false, offline: true };
    }
  },

  // ------------------------------------------------------------------
  // 3. Fetch Culture Media (Photos & Videos - No mock fallback when offline)
  // ------------------------------------------------------------------
  async fetchCultureItems() {
    try {
      const base = getApiBase();
      const res = await fetch(`${base}/culture`, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) return [];
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      console.warn('Error fetching culture items from live API:', err);
      return [];
    }
  }
};
