// Generic Unsplash self-host script.
// Usage: node selfhost-unsplash-shared.mjs <project-root>
//
// Scans every .ts/.tsx/.astro/.md/.mjs/.js file under <project-root>/src,
// extracts every images.unsplash.com URL, downloads each unique photo ID at
// its max-requested width into <project-root>/public/images/unsplash/, and
// rewrites every reference to point at the local path.

import { readFile, writeFile, mkdir, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname, relative, resolve } from 'node:path';
import https from 'node:https';

const projectRoot = resolve(process.argv[2] || process.cwd());
const srcDir = join(projectRoot, 'src');
const localDir = join(projectRoot, 'public', 'images', 'unsplash');

async function walk(dir, exts) {
  const out = [];
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); }
  catch { return out; }
  for (const e of entries) {
    if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...await walk(full, exts));
    else if (exts.some((ex) => e.name.endsWith(ex))) out.push(full);
  }
  return out;
}

await mkdir(localDir, { recursive: true });
const urlRe = /https:\/\/images\.unsplash\.com\/photo-([a-zA-Z0-9-]+)(\?[^"'`)\s]*)?/g;

const files = await walk(srcDir, ['.ts', '.tsx', '.astro', '.md', '.mjs', '.js', '.json']);
const photoMaxWidth = new Map();
const fileTexts = new Map();
let totalUsages = 0;

for (const f of files) {
  const text = await readFile(f, 'utf8');
  let m;
  let hasAny = false;
  urlRe.lastIndex = 0;
  while ((m = urlRe.exec(text))) {
    hasAny = true;
    totalUsages++;
    const [, id, query = ''] = m;
    const wMatch = query.match(/[?&]w=(\d+)/);
    const w = wMatch ? parseInt(wMatch[1], 10) : 1920;
    photoMaxWidth.set(id, Math.max(photoMaxWidth.get(id) || 0, w));
  }
  if (hasAny) fileTexts.set(f, text);
}

console.log(`Project: ${projectRoot}`);
console.log(`Unique photo IDs: ${photoMaxWidth.size}`);
console.log(`Total usages: ${totalUsages}`);

function fetchBuf(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBuf(res.headers.location).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`${res.statusCode} ${url}`));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

let downloaded = 0;
for (const [id, w] of photoMaxWidth) {
  const out = join(localDir, `${id}.webp`);
  if (existsSync(out)) { downloaded++; continue; }
  const dlW = Math.min(w, 2048);
  const u = `https://images.unsplash.com/photo-${id}?w=${dlW}&q=85&fit=crop&auto=format&fm=webp`;
  try {
    const buf = await fetchBuf(u);
    await writeFile(out, buf);
    console.log(`  ✓ ${id}.webp (${dlW}w, ${(buf.length / 1024).toFixed(0)}KB)`);
    downloaded++;
  } catch (e) {
    console.error(`  ✗ ${id}: ${e.message}`);
  }
}
console.log(`Downloaded: ${downloaded}/${photoMaxWidth.size}`);

let filesChanged = 0;
for (const [file, text] of fileTexts) {
  const newText = text.replace(urlRe, (_full, id) => `/images/unsplash/${id}.webp`);
  if (newText !== text) {
    await writeFile(file, newText);
    filesChanged++;
    console.log(`  rewrote ${relative(projectRoot, file)}`);
  }
}
console.log(`Files rewritten: ${filesChanged}`);
