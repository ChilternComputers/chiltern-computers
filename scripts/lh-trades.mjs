// Lighthouse the four trade demos under the SAME conditions as lh-portfolio.mjs
// so scores are directly comparable. Usage: node scripts/lh-trades.mjs [mobile|desktop]
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';

const SITES = [
  { name: 'Ridgeline Roofing',          url: 'https://ridgeline-roofing.pages.dev/',    industry: 'Roofing' },
  { name: 'Brightwell Electrical',       url: 'https://brightwell-electrical.pages.dev/', industry: 'Electrical' },
  { name: 'Ashcroft Plumbing & Heating', url: 'https://ashcroft-plumbing.pages.dev/',     industry: 'Plumbing & Heating' },
  { name: 'Oakhart Landscapes',          url: 'https://oakhart-landscapes.pages.dev/',    industry: 'Landscaping' },
  { name: 'Marwood Decorators',          url: 'https://marwood-decorators.pages.dev/',     industry: 'Painting & Decorating' },
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

for (const site of SITES) {
  const chrome = await launch({ chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'] });
  try {
    const result = await lighthouse(site.url, { ...opts, port: chrome.port });
    const cats = result.lhr.categories;
    const r = (k) => Math.round((cats[k]?.score ?? 0) * 100);
    const out = {
      name: site.name, url: site.url, industry: site.industry, strategy,
      performance: r('performance'), accessibility: r('accessibility'),
      bestPractices: r('best-practices'), seo: r('seo'),
      total: r('performance') + r('accessibility') + r('best-practices') + r('seo'),
    };
    console.log(JSON.stringify(out));
  } catch (e) {
    console.error(JSON.stringify({ name: site.name, url: site.url, error: e.message }));
  } finally {
    await chrome.kill();
  }
}
