import 'dotenv/config';
import dns from 'dns';
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {}

import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Job, Team, Application, Culture, AdminUser } from '../server/models.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '..', 'server', 'data', 'db.json');

async function migrate() {
  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(process.env.MONGODB_URI, { dbName: 'cloudbrain' });
  console.log('✓ Connected to MongoDB Atlas!');

  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  const local = JSON.parse(raw);

  // 1. Migrate Admin
  if (local.admin && local.admin.email) {
    const admin = await AdminUser.findOneAndUpdate(
      { email: local.admin.email },
      { ...local.admin },
      { upsert: true, new: true }
    );
    console.log(`✓ Admin user migrated: ${admin.email}`);
  }

  // 2. Migrate Teams
  if (Array.isArray(local.teams)) {
    for (const t of local.teams) {
      await Team.findOneAndUpdate({ name: t }, { name: t }, { upsert: true });
    }
    console.log(`✓ ${local.teams.length} Teams migrated to MongoDB!`);
  }

  // 3. Migrate Jobs
  if (Array.isArray(local.jobs)) {
    for (const j of local.jobs) {
      await Job.findOneAndUpdate({ id: j.id }, j, { upsert: true });
    }
    console.log(`✓ ${local.jobs.length} Job Openings migrated to MongoDB!`);
  }

  // 4. Migrate Culture
  if (Array.isArray(local.culture)) {
    for (const c of local.culture) {
      await Culture.findOneAndUpdate({ id: c.id }, c, { upsert: true });
    }
    console.log(`✓ ${local.culture.length} Culture media items migrated to MongoDB!`);
  }

  // 5. Migrate Applications (if any)
  if (Array.isArray(local.applications)) {
    for (const a of local.applications) {
      await Application.findOneAndUpdate({ id: a.id }, a, { upsert: true });
    }
    console.log(`✓ ${local.applications.length} Applications migrated to MongoDB!`);
  }

  console.log('\n=========================================');
  console.log('ALL CLOUDBRAIN DATA SUCCESSFULLY MIGRATED TO MONGODB ATLAS!');
  console.log('=========================================');
  process.exit(0);
}

migrate().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
