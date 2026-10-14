import 'dotenv/config';
import dns from 'dns';
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {}
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { Job, Team, Application, Culture, AdminUser } from './models.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');
const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URI = process.env.MONGODB_URI;

if (!JWT_SECRET) {
  console.error('JWT_SECRET is required. Copy admin/.env.example to admin/.env and set a long random value.');
  process.exit(1);
}

// Middleware
app.use(cors({
  origin: '*', // Allow both website (5173) and admin (5174) or custom domain
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ---------------------------------------------------------------------
// DATABASE CONNECTION & SEEDING (MONGODB ATLAS WITH JSON FALLBACK)
// ---------------------------------------------------------------------
let isMongoConnected = false;

// Helper: Read Local DB fallback
function readDb() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading db.json:', err);
    return { admin: {}, teams: [], jobs: [], applications: [], culture: [] };
  }
}

// Helper: Write Local DB fallback
function writeDb(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing db.json:', err);
    return false;
  }
}

async function seedMongoIfEmpty() {
  try {
    const jobCount = await Job.countDocuments();
    if (jobCount === 0) {
      console.log('Seeding initial data into MongoDB Atlas from db.json...');
      const local = readDb();

      // Seed Admin
      if (local.admin && local.admin.email) {
        await AdminUser.findOneAndUpdate(
          { email: local.admin.email },
          { ...local.admin },
          { upsert: true, new: true }
        );
      }

      // Seed Teams
      if (Array.isArray(local.teams) && local.teams.length > 0) {
        for (const t of local.teams) {
          await Team.findOneAndUpdate({ name: t }, { name: t }, { upsert: true });
        }
      }

      // Seed Jobs
      if (Array.isArray(local.jobs) && local.jobs.length > 0) {
        for (const j of local.jobs) {
          await Job.findOneAndUpdate({ id: j.id }, j, { upsert: true });
        }
      }

      // Seed Culture
      if (Array.isArray(local.culture) && local.culture.length > 0) {
        for (const c of local.culture) {
          await Culture.findOneAndUpdate({ id: c.id }, c, { upsert: true });
        }
      }
      console.log('✓ MongoDB Atlas successfully seeded with initial database!');
    }
  } catch (err) {
    console.warn('Note on seeding MongoDB:', err.message);
  }
}

async function initDatabase() {
  if (MONGODB_URI) {
    try {
      console.log('Connecting to MongoDB Atlas...');
      await mongoose.connect(MONGODB_URI, {
        dbName: 'cloudbrain'
      });
      isMongoConnected = true;
      console.log('✓ Successfully connected to live MongoDB Atlas database!');
      await seedMongoIfEmpty();
    } catch (err) {
      console.error('✗ Failed to connect to MongoDB Atlas:', err.message);
      if (process.env.NODE_ENV === 'production') {
        console.error('CRITICAL: Cannot start production server without live MongoDB Atlas connection.');
        process.exit(1);
      }
    }
  } else {
    if (process.env.NODE_ENV === 'production') {
      console.error('CRITICAL: MONGODB_URI environment variable is required in production.');
      process.exit(1);
    }
    console.log('⚠️ [DEV ONLY] MONGODB_URI not provided. Running with local data/db.json fallback.');
  }
}

// ---------------------------------------------------------------------
// AUTH HELPERS (HMAC SHA-256 JWT)
// ---------------------------------------------------------------------
function generateToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + 24 * 60 * 60 * 1000 })).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

function verifyToken(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [header, body, signature] = parts;
  const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  if (signature !== expectedSig) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf-8'));
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Unauthorized. Access token required.' });
  }
  const token = authHeader.split(' ')[1];
  const verified = verifyToken(token);
  if (!verified) {
    return res.status(401).json({ success: false, error: 'Invalid or expired session. Please login again.' });
  }
  req.user = verified;
  next();
}

// ---------------------------------------------------------------------
// 1. AUTH ROUTES
// ---------------------------------------------------------------------
app.post('/api/auth/login', async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = req.body.password;

  if (!email || !password) {
    return res.status(401).json({ success: false, error: 'Invalid email or password.' });
  }

  if (isMongoConnected) {
    try {
      const admin = await AdminUser.findOne({ email });
      if (admin && admin.password === password) {
        const token = generateToken({ email: admin.email, name: admin.name, role: 'SuperAdmin' });
        return res.json({
          success: true,
          token,
          user: { email: admin.email, name: admin.name }
        });
      }
    } catch (err) {
      console.error('Mongo Auth Error:', err);
    }
    return res.status(401).json({ success: false, error: 'Invalid email or password.' });
  }

  const db = readDb();
  const storedEmail = String(db.admin?.email || '').trim().toLowerCase();
  if (storedEmail && email === storedEmail && password === db.admin.password) {
    const token = generateToken({ email: db.admin.email, name: db.admin.name, role: 'SuperAdmin' });
    return res.json({
      success: true,
      token,
      user: { email: db.admin.email, name: db.admin.name }
    });
  }

  return res.status(401).json({
    success: false,
    error: 'Invalid email or password.'
  });
});

app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({ success: true, user: req.user });
});

// ---------------------------------------------------------------------
// 2. JOBS ROUTES (Public GET for Website, Protected for Admin)
// ---------------------------------------------------------------------
// Public GET: returns Active jobs for the main website
app.get('/api/jobs', async (req, res) => {
  try {
    if (isMongoConnected) {
      const activeJobs = await Job.find({ status: { $ne: 'Closed' } }).sort({ createdAt: -1 });
      return res.json({ success: true, count: activeJobs.length, data: activeJobs });
    }
    const db = readDb();
    const activeJobs = db.jobs.filter(j => j.status === 'Active' || !j.status);
    return res.json({ success: true, count: activeJobs.length, data: activeJobs });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Protected GET: returns All jobs (active + closed) for Admin
app.get('/api/admin/jobs', requireAuth, async (req, res) => {
  try {
    if (isMongoConnected) {
      const allJobs = await Job.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: allJobs.length, data: allJobs });
    }
    const db = readDb();
    return res.json({ success: true, count: db.jobs.length, data: db.jobs });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Protected POST: Create Job
app.post('/api/admin/jobs', requireAuth, async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      id: req.body.id || `job-${Date.now()}`,
      status: req.body.status || 'Active',
      postedDate: new Date().toISOString().split('T')[0]
    };

    if (isMongoConnected) {
      const created = await Job.create(jobData);
      if (jobData.team) {
        await Team.findOneAndUpdate({ name: jobData.team }, { name: jobData.team }, { upsert: true });
      }
      return res.status(201).json({ success: true, data: created });
    }

    const db = readDb();
    if (jobData.team && !db.teams.includes(jobData.team)) {
      db.teams.push(jobData.team);
    }
    db.jobs.unshift(jobData);
    writeDb(db);
    return res.status(201).json({ success: true, data: jobData });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Protected PUT: Update Job
app.put('/api/admin/jobs/:id', requireAuth, async (req, res) => {
  try {
    if (isMongoConnected) {
      const updated = await Job.findOneAndUpdate(
        { id: req.params.id },
        { ...req.body },
        { new: true }
      );
      if (!updated) return res.status(404).json({ success: false, error: 'Job not found' });
      if (req.body.team) {
        await Team.findOneAndUpdate({ name: req.body.team }, { name: req.body.team }, { upsert: true });
      }
      return res.json({ success: true, data: updated });
    }

    const db = readDb();
    const index = db.jobs.findIndex(j => j.id === req.params.id);
    if (index === -1) return res.status(404).json({ success: false, error: 'Job not found' });

    db.jobs[index] = { ...db.jobs[index], ...req.body };
    if (req.body.team && !db.teams.includes(req.body.team)) {
      db.teams.push(req.body.team);
    }
    writeDb(db);
    return res.json({ success: true, data: db.jobs[index] });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Protected PATCH: Toggle Job Status
app.patch('/api/admin/jobs/:id/toggle', requireAuth, async (req, res) => {
  try {
    if (isMongoConnected) {
      const job = await Job.findOne({ id: req.params.id });
      if (!job) return res.status(404).json({ success: false, error: 'Job not found' });
      job.status = job.status === 'Active' ? 'Closed' : 'Active';
      await job.save();
      return res.json({ success: true, data: job });
    }

    const db = readDb();
    const index = db.jobs.findIndex(j => j.id === req.params.id);
    if (index === -1) return res.status(404).json({ success: false, error: 'Job not found' });

    const currentStatus = db.jobs[index].status || 'Active';
    db.jobs[index].status = currentStatus === 'Active' ? 'Closed' : 'Active';
    writeDb(db);
    return res.json({ success: true, data: db.jobs[index] });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Protected DELETE: Remove Job
app.delete('/api/admin/jobs/:id', requireAuth, async (req, res) => {
  try {
    if (isMongoConnected) {
      await Job.findOneAndDelete({ id: req.params.id });
      return res.json({ success: true, message: 'Job deleted successfully' });
    }

    const db = readDb();
    db.jobs = db.jobs.filter(j => j.id !== req.params.id);
    writeDb(db);
    return res.json({ success: true, message: 'Job deleted successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ---------------------------------------------------------------------
// 3. DYNAMIC TEAMS ROUTES
// ---------------------------------------------------------------------
app.get('/api/teams', async (req, res) => {
  try {
    if (isMongoConnected) {
      const teams = await Team.find().sort({ name: 1 });
      return res.json({ success: true, data: teams.map(t => t.name) });
    }
    const db = readDb();
    return res.json({ success: true, data: db.teams });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/admin/teams', requireAuth, async (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, error: 'Team name is required' });
  }
  const clean = name.trim();

  try {
    if (isMongoConnected) {
      await Team.findOneAndUpdate({ name: clean }, { name: clean }, { upsert: true });
      const teams = await Team.find().sort({ name: 1 });
      return res.json({ success: true, data: teams.map(t => t.name) });
    }

    const db = readDb();
    if (!db.teams.includes(clean)) {
      db.teams.push(clean);
      writeDb(db);
    }
    return res.json({ success: true, data: db.teams });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/admin/teams/:name', requireAuth, async (req, res) => {
  const target = decodeURIComponent(req.params.name);

  try {
    if (isMongoConnected) {
      await Team.findOneAndDelete({ name: target });
      const teams = await Team.find().sort({ name: 1 });
      return res.json({ success: true, data: teams.map(t => t.name) });
    }

    const db = readDb();
    db.teams = db.teams.filter(t => t !== target);
    writeDb(db);
    return res.json({ success: true, data: db.teams });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ---------------------------------------------------------------------
// 4. JOB APPLICATIONS ROUTES
// ---------------------------------------------------------------------
// Public POST: Candidates apply directly from the website
app.post('/api/applications', async (req, res) => {
  const { name, email, phone, mobile, portfolio, resume, resumeName, notes, roleId, roleTitle, roleTeam } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, error: 'Full name is required.' });
  }

  const newApplication = {
    id: `app-${Date.now()}`,
    name: name.trim(),
    email: (email || '').trim(),
    phone: (phone || mobile || '').trim(),
    portfolio: (portfolio || '').trim(),
    resume: resume || '',
    resumeName: resumeName || '',
    notes: (notes || '').trim(),
    roleId: roleId || '',
    roleTitle: roleTitle || 'General Candidate',
    roleTeam: roleTeam || 'Engineering',
    appliedDate: new Date().toISOString(),
    status: 'New'
  };

  try {
    if (isMongoConnected) {
      const created = await Application.create(newApplication);
      return res.status(201).json({
        success: true,
        message: 'Application received successfully.',
        data: created
      });
    }

    const db = readDb();
    db.applications.unshift(newApplication);
    writeDb(db);

    return res.status(201).json({
      success: true,
      message: 'Application received successfully.',
      data: newApplication
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Protected GET: Admin retrieves all applications
app.get('/api/admin/applications', requireAuth, async (req, res) => {
  try {
    if (isMongoConnected) {
      const apps = await Application.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: apps.length, data: apps });
    }
    const db = readDb();
    return res.json({ success: true, count: db.applications.length, data: db.applications });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Protected PATCH: Update Application Status
app.patch('/api/admin/applications/:id/status', requireAuth, async (req, res) => {
  const { status } = req.body;
  try {
    if (isMongoConnected) {
      const updated = await Application.findOneAndUpdate(
        { id: req.params.id },
        { status },
        { new: true }
      );
      if (!updated) return res.status(404).json({ success: false, error: 'Application not found' });
      return res.json({ success: true, data: updated });
    }

    const db = readDb();
    const index = db.applications.findIndex(a => a.id === req.params.id);
    if (index === -1) return res.status(404).json({ success: false, error: 'Application not found' });

    db.applications[index].status = status;
    writeDb(db);
    return res.json({ success: true, data: db.applications[index] });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Protected DELETE: Remove Application
app.delete('/api/admin/applications/:id', requireAuth, async (req, res) => {
  try {
    if (isMongoConnected) {
      await Application.findOneAndDelete({ id: req.params.id });
      return res.json({ success: true, message: 'Application deleted successfully' });
    }

    const db = readDb();
    db.applications = db.applications.filter(a => a.id !== req.params.id);
    writeDb(db);
    return res.json({ success: true, message: 'Application deleted successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ---------------------------------------------------------------------
// 5. CULTURE / LIFE AT CLOUDBRAIN ROUTES
// ---------------------------------------------------------------------
// Public GET: Returns photos and videos for website
app.get('/api/culture', async (req, res) => {
  try {
    if (isMongoConnected) {
      const items = await Culture.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: items.length, data: items });
    }
    const db = readDb();
    return res.json({ success: true, count: db.culture.length, data: db.culture });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Protected POST: Create Media Item
app.post('/api/admin/culture', requireAuth, async (req, res) => {
  const newItem = {
    ...req.body,
    id: req.body.id || `culture-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0]
  };

  try {
    if (isMongoConnected) {
      const created = await Culture.create(newItem);
      return res.status(201).json({ success: true, data: created });
    }

    const db = readDb();
    db.culture.unshift(newItem);
    writeDb(db);
    return res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Protected PUT: Update Media Item
app.put('/api/admin/culture/:id', requireAuth, async (req, res) => {
  try {
    if (isMongoConnected) {
      const updated = await Culture.findOneAndUpdate(
        { id: req.params.id },
        { ...req.body },
        { new: true }
      );
      if (!updated) return res.status(404).json({ success: false, error: 'Media item not found' });
      return res.json({ success: true, data: updated });
    }

    const db = readDb();
    const index = db.culture.findIndex(c => c.id === req.params.id);
    if (index === -1) return res.status(404).json({ success: false, error: 'Media item not found' });

    db.culture[index] = { ...db.culture[index], ...req.body };
    writeDb(db);
    return res.json({ success: true, data: db.culture[index] });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Protected DELETE: Delete Media Item
app.delete('/api/admin/culture/:id', requireAuth, async (req, res) => {
  try {
    if (isMongoConnected) {
      await Culture.findOneAndDelete({ id: req.params.id });
      return res.json({ success: true, message: 'Media item deleted' });
    }

    const db = readDb();
    db.culture = db.culture.filter(c => c.id !== req.params.id);
    writeDb(db);
    return res.json({ success: true, message: 'Media item deleted' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ---------------------------------------------------------------------
// 6. SERVE PRODUCTION FRONTEND (Optional Single-Service Hosting)
// ---------------------------------------------------------------------
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// ---------------------------------------------------------------------
// SERVER START
// ---------------------------------------------------------------------
app.listen(PORT, '0.0.0.0', async () => {
  await initDatabase();
  console.log(`CloudBrain API Server running securely on http://localhost:${PORT}`);
});
