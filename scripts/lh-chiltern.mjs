// Run Lighthouse locally against Chiltern pages and dump category scores.
// Usage: node scripts/lh-chiltern.mjs [mobile|desktop]
// Default: mobile.
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';

const PAGES = [
  { label: 'Homepage',           url: 'https://chilterncomputers.net/' },
  { label: 'Area / Wennington',  url: 'https://chilterncomputers.net/areas/wennington/' },
  { label: 'Service / PC repair', url: 'https://chilterncomputers.net/services/pc-repair-romford/' },
];

const strategy = process.argv[2] === 'desktop' ? 'desktop' : 'mobile';

const opts = {
  logLevel: 'error',
  output: 'json',
  onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  formFactor: strategy,
  screenEmulation:
    strategy === 'desktop'
      ? { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false }
      : { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75, disabled: false },
  throttling:
    strategy === 'desktop'
      ? { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1, requestLatencyMs: 0, downloadThroughputKbps: 0, uploadThroughputKbps: 0 }
      : { rttMs: 150, throughputKbps: 1638.4, cpuSlowdownMultiplier: 4, requestLatencyMs: 562.5, downloadThroughputKbps: 1474.56, uploadThroughputKbps: 675 },
};

console.log(`\n=== Lighthouse · ${strategy.toUpperCase()} · chilterncomputers.net ===\n`);

for (const page of PAGES) {
  process.stdout.write(`${page.label.padEnd(24)} `);
  const chrome = await launch({
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
  });
  try {
    const result = await lighthouse(page.url, { ...opts, port: chrome.port });
    const cats = result.lhr.categories;
    const r = (k) => Math.round((cats[k]?.score ?? 0) * 100);
    const perf = r('performance');
    const a11y = r('accessibility');
    const bp = r('best-practices');
    const seo = r('seo');
    console.log(`Perf ${String(perf).padStart(3)} · A11y ${String(a11y).padStart(3)} · BP ${String(bp).padStart(3)} · SEO ${String(seo).padStart(3)}`);

    // Surface failed SEO audits if SEO is sub-100
    if (seo < 100) {
      const audits = result.lhr.audits;
      const seoAudits = cats.seo.auditRefs.map((ref) => audits[ref.id]).filter(Boolean);
      const failed = seoAudits.filter((a) => a.score !== null && a.score < 1);
      if (failed.length) {
        console.log('  Failed SEO audits:');
        for (const a of failed) console.log('    - ' + a.id + ': ' + a.title);
      }
    }
  } catch (e) {
    console.log(`ERROR: ${e.message}`);
  } finally {
    await chrome.kill();
  }
}

console.log('');
