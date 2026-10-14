# CloudBrain

Marketing website, admin UI, and API for CloudBrain. The site is static except for jobs, applications, and culture media, which come from the API.

```text
cloudbrain/
├── web/          Marketing site, Vite + React, port 5173
├── admin/        Admin UI, Vite + React, port 5174
│   └── server/   Express API, port 5000
├── package.json  Scripts that call the two apps
└── README.md
```

`web` and `admin` each already have their own Git repository and GitHub remote. The root folder is not a Git repository. Do not delete those nested `.git` directories until you choose the monorepo approach in the last section.

## Prerequisites

- Node.js 20 or newer. These checks used Node 24.
- npm.
- MongoDB only if you set `MONGODB_URI`. Local MongoDB 8 was present on this machine, listening on `127.0.0.1:27017` with authorization disabled in `mongod.cfg`. A new clone does not require MongoDB if you leave `MONGODB_URI` unset.

## Environment

Copy the examples. Real `.env` files are gitignored.

```powershell
copy web\.env.example web\.env
copy admin\.env.example admin\.env
```

Then edit `admin\.env` and replace `JWT_SECRET` with a long random value. Generate one locally and do not commit it:

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

| File | Variables the code reads |
| --- | --- |
| `web/.env` | `VITE_API_URL` |
| `admin/.env` | `PORT`, `MONGODB_URI`, `JWT_SECRET`, `VITE_API_URL`, `VITE_WEBSITE_URL` |

Vite only exposes names that start with `VITE_`. Do not put `JWT_SECRET` or `MONGODB_URI` in frontend code. Set `VITE_*` values before `npm run build`. They are baked into the bundle.

The API loads `admin/.env` from the process working directory via `dotenv`. Start it from the `admin` folder, or use the root `dev:api` script, which does that.

`JWT_SECRET` is required. The server exits if it is missing. There is no built-in signing key.

## Install

From `C:\Projects\cloudbrain`:

```powershell
npm run install:all
```

That runs `npm install` in `web` and in `admin`. Each app keeps its own `package-lock.json`.

## Run

Use three terminals from the project root:

```powershell
npm run dev:web
npm run dev:api
npm run dev:admin
```

| Service | URL | Script |
| --- | --- | --- |
| Marketing site | http://localhost:5173 | `dev:web` → `web`: `vite` (default port 5173) |
| API | http://localhost:5000 | `dev:api` → `admin`: `node server/server.js` |
| Admin UI | http://localhost:5174 | `dev:admin` → `admin`: `vite --port 5174` (`strictPort`) |

Inside `admin`, `npm run dev` and `npm run start` start the API and the admin UI together. Do not also run `dev:api` if you use those.

Restart Vite after changing `.env`. It reads environment variables at startup.

## Storage

Active mode depends on `MONGODB_URI`.

- URI set and MongoDB connects: database name `cloudbrain` (forced in `mongoose.connect`, even if the URI path differs). Collections are Mongoose defaults: `jobs`, `teams`, `applications`, `cultures`, `adminusers`.
- URI missing, and `NODE_ENV` is not `production`: `admin/server/data/db.json`.
- `NODE_ENV=production` without a working MongoDB connection: the process exits.

This working copy has `MONGODB_URI` set in `admin/.env`, so a normal API start uses local MongoDB. `db.json` is not the active store in that case.

`db.json` holds the admin password and candidate records. It is gitignored. `db.example.json` is a fake shape you can copy when you want the JSON fallback:

```powershell
copy admin\server\data\db.example.json admin\server\data\db.json
```

Do not copy the example over an existing `db.json`. That would replace local data.

Backup MongoDB with `mongodump` against `cloudbrain`, or copy `db.json` while the API is stopped. This repo does not run that backup for you.

The first time MongoDB connects and the `jobs` collection is empty, `server.js` copies admin, teams, jobs, and culture from `db.json`. It does not copy applications. It does not modify `db.json`. Do not point a fresh database at a `db.json` you do not want imported.

`node scripts/migrate-to-mongo.js` copies all of those records, including applications. It upserts. One sample application status in the current `db.json` is `Reviewing`, which is not in the schema enum, so that script can fail until the status is `New`, `In Review`, `Shortlisted`, `Interviewing`, `Rejected`, or `Hired`. Application fields `roleId` and `roleTeam` are not in the Mongoose schema and are dropped on MongoDB writes.

## Admin account

Sign-in checks the email and password stored for that account. Extra passwords are not accepted.

The account already in your local MongoDB or `db.json` still works. To create a new one without overwriting an existing email:

```powershell
cd admin
$env:ADMIN_EMAIL = "you@example.com"
$env:ADMIN_PASSWORD = "a-long-unique-password"
node scripts/create-admin.js
```

The password must be at least 12 characters. If that email already exists, the script exits without changes. Passwords are stored in plaintext. Treat the database as private.

## Scripts

| Command | Where | What |
| --- | --- | --- |
| `npm run dev` | `web` | Vite dev server |
| `npm run build` | `web` | Production build in `web/dist` |
| `npm run lint` | `web` | Oxlint |
| `npm run preview` | `web` | Preview the web build (Vite default port 4173) |
| `npm run server` | `admin` | API only |
| `npm run ui` | `admin` | Admin UI only |
| `npm run dev` / `npm run start` | `admin` | API and admin UI together |
| `npm run build` | `admin` | Admin UI build in `admin/dist` |
| `npm run preview` | `admin` | Preview on port 5174 |
| `npm run lint` | `admin` | Not defined |
| `npm test` | either app | Not defined |

There is no Dockerfile, Render config, or GitHub Actions workflow in the tree.

## What stays out of Git

- `web/.env` and `admin/.env`
- `admin/server/data/db.json` (admin password and candidate rows)
- `node_modules/` and `dist/`
- Resume data URLs stored inside the database

Public images and fonts under `web/public` and `admin/public` are application assets and should stay tracked.

## Nested Git repositories

| Directory | Remote | Branch seen |
| --- | --- | --- |
| `web` | `https://github.com/rajnigondaliyacb-crypto/CB-Webite.git` | `satish-dev` checked out, same commit as `main` |
| `admin` | `https://github.com/rajnigondaliyacb-crypto/cb-admin-.git` | `main` |

Those histories were not rewritten, and the remotes were not changed.

A root `git init` while those `.git` folders exist makes `git add web admin` record gitlinks (nested repos), not the source files. To make one repository:

1. Review and commit or stash work inside `web` and `admin` if you still need those histories.
2. Copy `web\.git` and `admin\.git` somewhere outside the project if you want to keep them. Do not delete them until that copy exists.
3. Remove the nested `.git` directories only after that backup.
4. From `C:\Projects\cloudbrain`: `git init`, review `git status`, then add files. Confirm `admin/.env`, `web/.env`, and `admin/server/data/db.json` are absent from the staged list.

Adding a secret to `.gitignore` does not remove it from the existing `web` or `admin` history. The old admin source contained a built-in signing key and accepted extra passwords. Those strings can still be in the `cb-admin-` history. Rotate `JWT_SECRET` and the admin password if that repository was ever pushed or shared. This preparation did not rewrite that history.
