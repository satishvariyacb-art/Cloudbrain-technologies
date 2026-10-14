# CloudBrain Standalone Admin Console & Secure API

This is the standalone administrative control plane for the CloudBrain website ecosystem. It operates in an isolated folder and can be pushed to its own separate Git repository for independent deployment.

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Both API & Admin UI Concurrently
```bash
npm run start
```
This runs:
- **API Server**: `http://localhost:5000`
- **Admin Frontend**: `http://localhost:5174`

Or start them individually:
```bash
# Terminal 1 - Backend API Server
npm run server

# Terminal 2 - Frontend Admin Panel
npm run ui
```

`npm run dev` and `npm run start` launch the API and the admin UI together. Do not also run `npm run server` in that case.

Copy `.env.example` to `.env` before starting. The API refuses to boot without `JWT_SECRET`. Sign-in uses the admin account stored in MongoDB, or in `server/data/db.json` when MongoDB is not configured. Create that account with `node scripts/create-admin.js`. Do not commit `.env` or `server/data/db.json`.

---

## 🌐 Port Mapping

- **Port 5173**: CloudBrain Main Marketing & Careers Website
- **Port 5174**: CloudBrain Standalone Admin Console UI
- **Port 5000**: CloudBrain REST API & Persistent Datastore

---

## 🛠 Features & Architecture

1. **Job Openings Manager**:
   - Create, edit, delete, and toggle Active/Closed status.
   - Dynamic Department / Team management (add custom teams, filter openings by team).
   - Instant live sync with the main website.

2. **Candidate Application Pipeline**:
   - Inbound submissions from the website careers modal stream directly to this admin console.
   - Candidate resume/portfolio links, phone, email, applied date, and cover notes.
   - Change candidate status (`New`, `In Review`, `Shortlisted`, `Interviewing`, `Rejected`, `Hired`).

3. **Life at CloudBrain Media**:
   - Manage photos and video showcases displayed on the website.
   - Edit titles, categories, durations, captions, and locations.

4. **Storage**:
   - MongoDB database `cloudbrain` when `MONGODB_URI` is set and the connection succeeds.
   - `server/data/db.json` only when that URI is missing and `NODE_ENV` is not `production`.
   - `server/data/db.json` is local runtime data. It is gitignored.
