import { chromium } from 'playwright';

const onlyArg = process.argv[2];
const allSites = [
  'https://forge-gym.pages.dev',
  'https://sable-restaurant.pages.dev',
  'https://aurea-spa.pages.dev',
  'https://aldridge-pryce.pages.dev',
  'https://hartwell-stone.pages.dev',
];
const sites = onlyArg ? allSites.filter((s) => s.includes(onlyArg)) : allSites;

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

const summary = {};

for (const root of sites) {
  console.log(`\n=== ${root} ===`);
  const page = await ctx.newPage();
  const failed = [];
  page.on('response', async (resp) => {
    const url = resp.url();
    const type = (resp.headers()['content-type'] || '').toLowerCase();
    const status = resp.status();
    const looksImage =
      type.startsWith('image/') ||
      /\.(png|jpe?g|webp|gif|svg|avif)(\?|$)/i.test(url);
    if (looksImage && status >= 400) failed.push({ status, url });
  });
  // Discover internal links from homepage
  let internal = new Set([root + '/']);
  try {
    try {
      await page.goto(root, { waitUntil: 'networkidle', timeout: 20000 });
    } catch {
      await page.goto(root, { waitUntil: 'domcontentloaded', timeout: 25000 });
      await page.waitForLoadState('load', { timeout: 10000 }).catch(() => {});
    }
    const links = await page.$$eval('a[href]', (as) => as.map((a) => a.href));
    for (const l of links) {
      try {
        const u = new URL(l);
        if (u.host === new URL(root).host) {
          // strip hash + trailing index variations
          u.hash = '';
          internal.add(u.toString());
        }
      } catch {}
    }
  } catch (e) {
    console.error(`[${root}] homepage error: ${e.message}`);
  }
  const pages = Array.from(internal).slice(0, 25); // cap
  console.log(`Visiting ${pages.length} pages on ${root}`);
  for (const url of pages) {
    try {
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
      } catch {
        try {
          await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
          await page.waitForLoadState('load', { timeout: 8000 }).catch(() => {});
        } catch (e) { throw e; }
      }
      // Force lazy load + scroll
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(800);
    } catch (e) {
      console.error(`  ! ${url} -> ${e.message}`);
    }
  }
  // Also broken <img> elements with naturalWidth=0 that loaded 200 (broken src)
  try {
    await page.goto(root, { waitUntil: 'networkidle', timeout: 20000 });
  } catch {
    await page.goto(root, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.waitForLoadState('load', { timeout: 10000 }).catch(() => {});
  }
  // Allow lazy images time to actually load before classifying as broken
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1500);
  const brokenInDom = await page.$$eval('img', (imgs) =>
    imgs
      .filter((i) => i.complete && i.naturalWidth === 0 && i.getAttribute('src'))
      .map((i) => i.currentSrc || i.src)
  );
  summary[root] = { failed, brokenInDom };
  console.log(`Failed image responses: ${failed.length}`);
  failed.forEach((f) => console.log(`  ${f.status}  ${f.url}`));
  console.log(`Broken in DOM (naturalWidth=0): ${brokenInDom.length}`);
  brokenInDom.forEach((u) => console.log(`  ${u}`));
  await page.close();
}

await browser.close();
console.log('\n--- SUMMARY ---');
for (const [k, v] of Object.entries(summary)) {
  console.log(`${k}: ${v.failed.length} failed responses, ${v.brokenInDom.length} broken DOM imgs`);
}
