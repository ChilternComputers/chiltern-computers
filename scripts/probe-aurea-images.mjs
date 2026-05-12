import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

// Capture every image request status
const imageEvents = [];
page.on('response', async (resp) => {
  const url = resp.url();
  const type = (resp.headers()['content-type'] || '').toLowerCase();
  if (type.startsWith('image/') || /\.(png|jpe?g|webp|gif|svg|avif)(\?|$)/i.test(url)) {
    imageEvents.push({ status: resp.status(), url, length: resp.headers()['content-length'] });
  }
});

console.log('Loading aurea-spa.pages.dev with extended wait...');
await page.goto('https://aurea-spa.pages.dev/', { waitUntil: 'domcontentloaded' });
await page.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
await page.waitForTimeout(2000);
// Scroll all the way down slowly to trigger lazy load
for (let y = 0; y <= 6000; y += 600) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(700);
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(2000);

// Final DOM state of every img
const imgs = await page.$$eval('img', (els) =>
  els.map((i) => ({
    src: i.currentSrc || i.src,
    complete: i.complete,
    natW: i.naturalWidth,
    natH: i.naturalHeight,
    display: getComputedStyle(i).display,
    loading: i.loading,
    parentDisplay: i.parentElement ? getComputedStyle(i.parentElement).display : null,
  }))
);

console.log('\n=== Total img elements:', imgs.length);
const broken = imgs.filter((i) => i.complete && i.natW === 0 && i.src);
console.log('Broken (complete + natW=0):', broken.length);
for (const b of broken) {
  console.log(`  natW=${b.natW} display=${b.display} loading=${b.loading} parent=${b.parentDisplay}`);
  console.log(`    ${b.src}`);
}

const notComplete = imgs.filter((i) => !i.complete);
console.log('Not yet complete:', notComplete.length);
for (const n of notComplete) console.log(`  ${n.src}`);

console.log('\n=== Image response events: total', imageEvents.length);
const non200 = imageEvents.filter((e) => e.status >= 400);
console.log('Non-2xx image responses:', non200.length);
for (const e of non200) console.log(`  ${e.status}  ${e.url}`);

await browser.close();
