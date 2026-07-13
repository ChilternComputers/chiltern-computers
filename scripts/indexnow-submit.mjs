// IndexNow submitter for chilterncomputers.net
//
// Run AFTER a deploy has gone live:  npm run indexnow
//
// What it does:
//   1. Fetches the LIVE sitemap (https://chilterncomputers.net/sitemap.xml)
//   2. Diffs <loc> + <lastmod> against the snapshot in
//      scripts/indexnow-snapshot.json
//   3. POSTs only the changed/new URLs to api.indexnow.org (Bing, Yandex,
//      Seznam, Naver all consume the same endpoint)
//   4. Advances the snapshot ONLY on a successful (200/202) submission, so
//      a failed run simply retries next time
//
// First ever run: no snapshot exists, so the full sitemap is submitted.
// The key file is served from public/<KEY>.txt — do not delete it.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const HOST = 'chilterncomputers.net';
const KEY = 'c940f5f10fc4765d50da6db1bfeb9a9b';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const SNAPSHOT_PATH = fileURLToPath(new URL('./indexnow-snapshot.json', import.meta.url));

function log(msg) {
  console.log(`[indexnow] ${msg}`);
}

// --- 1. Verify the key file is live (deploy actually happened) -----------
const keyRes = await fetch(KEY_LOCATION);
if (!keyRes.ok || (await keyRes.text()).trim() !== KEY) {
  console.error(
    `[indexnow] ABORT: key file not live at ${KEY_LOCATION} (HTTP ${keyRes.status}).\n` +
      `           Deploy the site first, then re-run.`
  );
  process.exit(1);
}

// --- 2. Fetch + parse the live sitemap ------------------------------------
const smRes = await fetch(SITEMAP_URL);
if (!smRes.ok) {
  console.error(`[indexnow] ABORT: could not fetch ${SITEMAP_URL} (HTTP ${smRes.status})`);
  process.exit(1);
}
const xml = await smRes.text();

const current = {};
for (const block of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  const loc = block[1].match(/<loc>\s*([^<]+?)\s*<\/loc>/)?.[1];
  const lastmod = block[1].match(/<lastmod>\s*([^<]+?)\s*<\/lastmod>/)?.[1] ?? '';
  if (loc) current[loc] = lastmod;
}
const total = Object.keys(current).length;
if (total === 0) {
  console.error('[indexnow] ABORT: parsed 0 URLs from the sitemap — format change?');
  process.exit(1);
}
log(`live sitemap: ${total} URLs`);

// --- 3. Diff against the snapshot -----------------------------------------
let snapshot = {};
if (existsSync(SNAPSHOT_PATH)) {
  try {
    snapshot = JSON.parse(readFileSync(SNAPSHOT_PATH, 'utf8'));
  } catch {
    log('snapshot unreadable — treating as first run');
  }
} else {
  log('no snapshot — first run, submitting the full sitemap');
}

const changed = Object.keys(current).filter((url) => snapshot[url] !== current[url]);
if (changed.length === 0) {
  log('nothing changed since last submission — done');
  process.exit(0);
}
log(`${changed.length} new/changed URL(s):`);
for (const u of changed) log(`  ${u}`);

// --- 4. Submit -------------------------------------------------------------
const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: changed,
  }),
});

if (res.status === 200 || res.status === 202) {
  writeFileSync(SNAPSHOT_PATH, JSON.stringify(current, null, 2) + '\n');
  log(`submitted OK (HTTP ${res.status}) — snapshot advanced (${total} URLs tracked)`);
} else {
  const body = await res.text().catch(() => '');
  console.error(
    `[indexnow] FAILED: HTTP ${res.status} ${body.slice(0, 300)}\n` +
      `           Snapshot NOT advanced — the same URLs will retry on the next run.`
  );
  process.exit(1);
}
