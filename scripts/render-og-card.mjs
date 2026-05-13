// Render a 1200x630 social-share card for the portfolio report.
// Uses Playwright + an inline HTML template — no extra deps.
import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';

const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&family=Playfair+Display:wght@700;800&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1200px;height:630px}
  body{
    font-family:'Inter',system-ui,sans-serif;color:#E8ECF4;
    background:#0B0F1A;
    background-image:
      radial-gradient(ellipse at 18% 30%, rgba(99,102,241,0.22) 0%, transparent 55%),
      radial-gradient(ellipse at 82% 70%, rgba(139,92,246,0.18) 0%, transparent 55%),
      linear-gradient(135deg,#0B0F1A 0%,#141926 50%,#1a1040 100%);
    padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between;
    overflow:hidden;position:relative;
  }
  body::after{
    content:'';position:absolute;inset:0;
    background:
      linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px) 0 0 / 80px 80px,
      linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px) 0 0 / 80px 80px;
    pointer-events:none;
  }
  .badge{
    display:inline-block;font-size:18px;font-weight:700;letter-spacing:0.28em;text-transform:uppercase;
    color:#818CF8;background:rgba(99,102,241,0.12);
    border:1px solid rgba(99,102,241,0.35);padding:10px 22px;border-radius:8px;
    align-self:flex-start;
  }
  h1{
    font-family:'Playfair Display',Georgia,serif;font-size:78px;font-weight:800;
    line-height:1.05;letter-spacing:-0.02em;margin-top:24px;
  }
  h1 span{color:#A5B4FC}
  .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:8px}
  .stat{
    background:rgba(20,25,38,0.65);border:1px solid #2A3150;border-radius:14px;
    padding:22px 26px;text-align:left;backdrop-filter:blur(4px);
  }
  .stat .value{
    font-family:'JetBrains Mono',monospace;font-size:44px;font-weight:800;
    color:#22C55E;line-height:1;
  }
  .stat .value.accent{color:#A5B4FC}
  .stat .label{
    font-size:13px;font-weight:600;letter-spacing:0.06em;color:#9CA3BF;
    margin-top:10px;text-transform:uppercase;
  }
  .footer{
    display:flex;justify-content:space-between;align-items:flex-end;
    color:#9CA3BF;font-size:18px;
  }
  .footer strong{color:#E8ECF4}
  .url{font-family:'JetBrains Mono',monospace;font-size:16px;color:#A5B4FC;letter-spacing:0.04em}
</style></head><body>
  <div>
    <span class="badge">Portfolio Performance Report</span>
    <h1>Outperforming <span>25 Industry Leaders</span><br>on Google Lighthouse</h1>
  </div>
  <div class="stats">
    <div class="stat"><div class="value">8/8</div><div class="label">Sites beat every competitor</div></div>
    <div class="stat"><div class="value">379&ndash;398</div><div class="label">Score range out of 400</div></div>
    <div class="stat"><div class="value accent">+96</div><div class="label">Average gap vs competitors</div></div>
    <div class="stat"><div class="value accent">100</div><div class="label">SEO &mdash; every site</div></div>
  </div>
  <div class="footer">
    <div><strong>Chiltern Computers</strong> &middot; Web Design</div>
    <div class="url">chilterncomputers.net/portfolio-report</div>
  </div>
</body></html>`;

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.setContent(html, { waitUntil: 'load' });
await page.waitForTimeout(800); // let fonts settle
await page.screenshot({
  path: 'C:/Users/Dave/chiltern-computers/public/portfolio-report/og.png',
  type: 'png',
  clip: { x: 0, y: 0, width: 1200, height: 630 },
});
console.log('og.png written');
await browser.close();
