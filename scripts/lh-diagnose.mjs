// Diagnostic: dump failing a11y audits + top perf opportunities for the lower trade demos.
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';

const SITES = [
  { name: 'Brightwell Electrical', url: 'https://brightwell-electrical.pages.dev/' },
  { name: 'Ridgeline Roofing',     url: 'https://ridgeline-roofing.pages.dev/' },
  { name: 'Oakhart Landscapes',    url: 'https://oakhart-landscapes.pages.dev/' },
  { name: 'Ashcroft (ref, a11y100)', url: 'https://ashcroft-plumbing.pages.dev/' },
];

const opts = {
  logLevel: 'error', output: 'json',
  onlyCategories: ['performance', 'accessibility'],
  formFactor: 'mobile',
  screenEmulation: { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75, disabled: false },
  throttling: { rttMs: 150, throughputKbps: 1638.4, cpuSlowdownMultiplier: 4, requestLatencyMs: 562.5, downloadThroughputKbps: 1474.56, uploadThroughputKbps: 675 },
};

for (const site of SITES) {
  const chrome = await launch({ chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'] });
  try {
    const { lhr } = await lighthouse(site.url, { ...opts, port: chrome.port });
    const a = lhr.audits;
    console.log(`\n===== ${site.name} =====`);
    console.log(`perf=${Math.round(lhr.categories.performance.score*100)} a11y=${Math.round(lhr.categories.accessibility.score*100)}`);

    // Failing a11y audits (binary, score 0)
    const a11yRefs = lhr.categories.accessibility.auditRefs.map(r => r.id);
    const a11yFails = a11yRefs.map(id => a[id]).filter(au => au && au.score !== null && au.score < 1 && au.scoreDisplayMode === 'binary');
    console.log('-- A11Y FAILS:');
    if (!a11yFails.length) console.log('   (none)');
    for (const au of a11yFails) {
      const items = au.details?.items || [];
      const sample = items.slice(0,3).map(it => (it.node?.snippet || it.node?.selector || JSON.stringify(it)).slice(0,140));
      console.log(`   [${au.id}] ${au.title}`);
      sample.forEach(s => console.log(`        - ${s}`));
    }

    // Perf opportunities + key metrics
    console.log('-- PERF METRICS:');
    for (const id of ['largest-contentful-paint','total-blocking-time','cumulative-layout-shift','speed-index','first-contentful-paint']) {
      if (a[id]) console.log(`   ${id}: ${a[id].displayValue}`);
    }
    console.log('-- PERF OPPORTUNITIES (savings):');
    const oppIds = ['render-blocking-resources','unused-javascript','unused-css-rules','unminified-javascript','uses-responsive-images','uses-optimized-images','offscreen-images','uses-text-compression','modern-image-formats','efficient-animated-content','total-byte-weight','uses-rel-preconnect','prioritize-lcp-image','legacy-javascript'];
    for (const id of oppIds) {
      const au = a[id];
      if (au && au.score !== null && au.score < 0.9 && au.details?.overallSavingsMs) {
        console.log(`   [${id}] ${au.title} — ~${Math.round(au.details.overallSavingsMs)}ms`);
      } else if (au && au.score !== null && au.score < 0.9 && au.displayValue) {
        console.log(`   [${id}] ${au.title} — ${au.displayValue}`);
      }
    }
  } catch (e) {
    console.log(`ERROR ${site.name}: ${e.message}`);
  } finally {
    await chrome.kill();
  }
}
