import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'web-design-previews');

const onlyArg = process.argv[2];
const allSites = [
  { slug: 'forge-gym', url: 'https://forge-gym.pages.dev' },
  { slug: 'sable-restaurant', url: 'https://sable-restaurant.pages.dev' },
  { slug: 'aurea-spa', url: 'https://aurea-spa.pages.dev' },
  { slug: 'aldridge-pryce', url: 'https://aldridge-pryce.pages.dev' },
  { slug: 'hartwell-stone', url: 'https://hartwell-stone.pages.dev' },
  { slug: 'chiltern-computers', url: 'https://chilterncomputers.net' },
  { slug: 'freshwax', url: 'https://freshwax.co.uk' },
  { slug: 'flames-after-dark', url: 'https://flames-after-dark.co.uk' },
];
const sites = onlyArg
  ? allSites.filter((s) => onlyArg.split(',').includes(s.slug))
  : allSites;

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});

for (const s of sites) {
  const page = await ctx.newPage();
  console.log(`[${s.slug}] navigating ${s.url}`);
  try {
    try {
      await page.goto(s.url, { waitUntil: 'networkidle', timeout: 25000 });
    } catch {
      // Fall back to domcontentloaded for sites with always-busy networks
      await page.goto(s.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForLoadState('load', { timeout: 15000 }).catch(() => {});
    }
    // Let any scroll-triggered / GSAP / lazy assets settle
    await page.waitForTimeout(3500);
    // Scroll to bottom and back to trigger lazy images, then wait again
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(800);
    const out = join(outDir, `${s.slug}.jpg`);
    await page.screenshot({
      path: out,
      type: 'jpeg',
      quality: 82,
      fullPage: false,
      clip: { x: 0, y: 0, width: 1440, height: 900 },
    });
    console.log(`[${s.slug}] saved ${out}`);
  } catch (e) {
    console.error(`[${s.slug}] FAILED: ${e.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log('Done.');
