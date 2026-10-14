import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { AdminUser } from '../server/models.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '..', 'server', 'data', 'db.json');

const email = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD || '';
const name = process.env.ADMIN_NAME || 'CloudBrain Admin';

if (!email || !password || password.length < 12) {
  console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD (at least 12 characters), then run this script again.');
  process.exit(1);
}

function readDb() {
  const raw = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(raw);
}

async function main() {
  if (process.env.MONGODB_URI) {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'cloudbrain' });
    const existing = await AdminUser.findOne({ email });
    if (existing) {
      console.log('Admin account already exists. No changes were made.');
      await mongoose.disconnect();
      return;
    }
    await AdminUser.create({ email, password, name });
    console.log('Admin account created in MongoDB.');
    await mongoose.disconnect();
    return;
  }

  const db = readDb();
  if (db.admin && db.admin.email) {
    console.log('server/data/db.json already has an admin account. No changes were made.');
    return;
  }
  db.admin = { email, password, name };
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
  console.log('Admin account written to server/data/db.json.');
}

main().catch((err) => {
  console.error('Could not create admin account:', err.message);
  process.exit(1);
});
