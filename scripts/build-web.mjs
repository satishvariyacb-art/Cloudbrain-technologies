import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const webDir = path.join(root, 'web');
const webDist = path.join(webDir, 'dist');
const rootDist = path.join(root, 'dist');

function run(command, args, cwd) {
  const result = spawnSync(command, args, { cwd, stdio: 'inherit', shell: true });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

if (!fs.existsSync(path.join(webDir, 'package.json'))) {
  console.error('web/package.json not found. Set Root Directory to the repo root, not a nested folder.');
  process.exit(1);
}

run('npm', ['install', '--include=dev'], webDir);
run('npm', ['run', 'build'], webDir);

if (!fs.existsSync(path.join(webDist, 'index.html'))) {
  console.error('web/dist/index.html was not created. Vite build failed.');
  process.exit(1);
}

fs.rmSync(rootDist, { recursive: true, force: true });
fs.cpSync(webDist, rootDist, { recursive: true });
console.log(`Published files copied to ${rootDist}`);
