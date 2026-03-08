# Chiltern Computers — Round 4: The Real Push to 100

## Current → Target Scores

| Category | Current | Target | Notes |
|----------|---------|--------|-------|
| Performance | 73 | **92** | Blocked at ~92 by inline styles (architectural) |
| Accessibility | 62 | **95** | Blocked at ~95 by inline-style specificity wars |
| SEO | 72 | **95** | Blocked at ~95 by single OG image (needs design) |
| Security | 82 | **88** | Blocked at ~88 by Astro unsafe-inline |
| Code Quality | 34 | **75** | Blocked at ~75 by inline styles architecture |
| Infrastructure | 56 | **90** | Blocked at ~90 until analytics added |
| Best Practices | 62 | **85** | Blocked at ~85 by inline styles architecture |

---

## PHASE 1: Critical Fixes (Accessibility + Security)

### Fix 1.1 — CRITICAL: Contrast failure `#1e3a8a` on dark background
**Files:** `src/pages/index.astro`, `src/pages/services/repairs.astro`
- `color: var(--cosmic-blue)` (#1e3a8a) on dark cards = ~1.8:1 contrast ratio
- Change to `#60a5fa` (blue-400) or `#93c5fd` (blue-300) for 7:1+ contrast
- This is a WCAG AA hard failure

### Fix 1.2 — Blog category filters not keyboard accessible
**File:** `src/pages/blog/index.astro` (lines 414-423)
- Change `<span class="category-btn">` → `<button class="category-btn">`
- Remove JS click handler registration (buttons are natively clickable)
- WCAG 2.1.1 (Keyboard) failure

### Fix 1.3 — Emoji missing `aria-hidden="true"` on thank-you + 404
**Files:** `src/pages/thank-you.astro`, `src/pages/404.astro`
- Wrap all decorative emoji in `<span aria-hidden="true">`
- thank-you.astro: ~15 emoji instances
- 404.astro: ~8 emoji instances

### Fix 1.4 — Remove Astro generator meta tag (info disclosure)
**File:** `src/components/SEO.astro` (line 419)
- Remove `<meta name="generator" content={Astro.generator} />`
- Exposes exact Astro version to attackers

### Fix 1.5 — Add `maxlength` to all form inputs
**File:** `src/pages/contact.astro`
- name: `maxlength="100"`
- email: `maxlength="254"`
- phone: `maxlength="20"` + `pattern="[0-9+\s()-]+"`
- location: `maxlength="100"`
- message: `maxlength="2000"`

### Fix 1.6 — Tighten CSP directives
**File:** `public/_headers`
- `img-src 'self' data:` (remove `https:` wildcard)
- `frame-src https://maps.google.com https://www.google.com` (remove `*.google.com`)
- Add `Cross-Origin-Resource-Policy: same-origin`

---

## PHASE 2: SEO Fixes

### Fix 2.1 — Conditional service schemas (stop schema spam)
**File:** `src/components/SEO.astro`
- Only render the 3 Service schemas on the homepage and their respective service pages
- Only render LocalBusiness on homepage, about, contact
- Only render Organization on homepage
- Skip ALL schemas on noindex pages
- This saves ~6-8KB per non-homepage HTML

### Fix 2.2 — Add FAQPage schema to service pages
**Files:** `src/pages/services/virus-removal-romford.astro`, `laptop-repair-dagenham.astro`, `data-recovery-havering.astro`, `new-used.astro`
- These pages already have visible FAQ sections but no JSON-LD FAQPage schema
- Add schema to match the visible FAQ content

### Fix 2.3 — Fix llms.txt completeness
**File:** `src/pages/llms.txt.ts`
- Add mobile phone number
- Add email address
- Add full physical address
- Add all 14 service areas
- Add page URLs for services, blog, areas
- Add pricing ranges

### Fix 2.4 — Fix blog author consistency
**File:** `src/pages/blog/virus-malware-removal-romford-guide.astro`
- Change `author = 'David Hagon'` → `author = 'Chiltern Computers'`
- Change Article schema `@type: 'Person'` → `@type: 'Organization'`

### Fix 2.5 — Fix sitemap lastmod dates
**File:** `src/pages/sitemap.xml.ts`
- Replace `new Date()` with actual static last-modified dates per page
- Dynamic dates cause Google to distrust the sitemap

### Fix 2.6 — Fix `areaServed` types in schema
**File:** `src/components/SEO.astro`
- Change `@type: 'City'` → `@type: 'Place'` for non-city areas (Harold Hill, Collier Row, etc.)

---

## PHASE 3: Infrastructure Fixes

### Fix 3.1 — Fix `*.json` in `.gitignore`
**File:** `.gitignore`
- Remove `*.json` wildcard
- Replace with specific patterns: `*lighthouse*.json`

### Fix 3.2 — Fix apple-touch-icon reference
**File:** `src/layouts/Layout.astro` (line 57)
- Change `/icons/icon-192x192.png` → `/apple-touch-icon.png` (the correct 180x180 file)

### Fix 3.3 — Add favicon.ico fallback link
**File:** `src/components/SEO.astro`
- Add `<link rel="icon" type="image/x-icon" href="/favicon.ico" />` for legacy browser support

### Fix 3.4 — Fix PWA manifest
**File:** `public/site.webmanifest`
- Add `scope`, `id`, `categories` fields
- Split `purpose: "any maskable"` into separate icon entries

### Fix 3.5 — Add cache headers for favicon.ico, site.webmanifest, sw.js
**File:** `public/_headers`
```
/favicon.ico
  Cache-Control: public, max-age=31536000, immutable

/site.webmanifest
  Cache-Control: public, max-age=86400

/sw.js
  Cache-Control: public, max-age=0, must-revalidate
```

### Fix 3.6 — Server-side copyright year
**File:** `src/components/Footer.astro`
- Replace hardcoded `2025` with `{new Date().getFullYear()}` in Astro template
- Remove JS `document.getElementById('current-year')` updater

### Fix 3.7 — Remove dead gtag reference
**File:** `src/pages/404.astro` (line 636)
- Remove the `typeof gtag !== 'undefined'` block — no analytics are installed

---

## PHASE 4: Best Practices + Accessibility Polish

### Fix 4.1 — Make phone/email clickable on contact + about pages
**Files:** `src/pages/contact.astro`, `src/pages/about.astro`
- Wrap phone numbers in `<a href="tel:...">`
- Wrap email in `<a href="mailto:...">`

### Fix 4.2 — Footer scrolling ticker ARIA
**File:** `src/components/Footer.astro`
- Add `role="marquee"` and `aria-label="Service areas we cover"` to scroll container

### Fix 4.3 — SVGs missing `aria-hidden="true"`
**Files:** `src/pages/index.astro`, `src/components/Footer.astro`
- Add `aria-hidden="true"` to decorative SVG icons (Google, Facebook logos)

### Fix 4.4 — Google/Facebook badge links missing `aria-label`
**File:** `src/pages/index.astro`
- Add `aria-label="Google Reviews - 5 out of 5 stars"` to Google badge link
- Add `aria-label="Recommended on Facebook"` to Facebook badge link

### Fix 4.5 — Fix 404 search input focus style
**File:** `src/pages/404.astro` (line 307-311)
- Change `outline: none` to `outline: 3px solid #10b981` (keep box-shadow too)
- `outline: none` fails WCAG 2.4.7 in Windows High Contrast Mode

### Fix 4.6 — Remove redundant `role="contentinfo"` on footer
**File:** `src/components/Footer.astro` (line 9)
- `<footer>` already has implicit contentinfo role

### Fix 4.7 — Fix offline.astro to use `<main>`
**File:** `src/pages/offline.astro` (line 67)
- Change `<div role="main">` → `<main>`

### Fix 4.8 — Fix form submit button re-enable on failure
**File:** `src/pages/contact.astro`
- Add timeout to re-enable submit button after 10s (in case of failure)

### Fix 4.9 — Fix print styles to target actual classes
**File:** `src/styles/global.css` (lines 1875-1890)
- Change `.header-premium` → `.cosmic-header`
- Change `.emergency-header-banner` → correct class
- Add: hide footer ticker, hide cookie consent, set white background, hide decorative elements

### Fix 4.10 — Preload SpaceMono font
**File:** `src/components/SEO.astro`
- Add preload for `SpaceMono-Regular.woff2` (used in header/footer on every page)

### Fix 4.11 — Fix dns-prefetch to correct domain
**File:** `src/components/SEO.astro` (line 502)
- Remove `maps.googleapis.com` prefetch (not used) or change to `maps.google.com`

---

## PHASE 5: Code Quality (Dead Code Cleanup)

### Fix 5.1 — Delete dead `tailwind.config.js`
- Tailwind v4 doesn't use this file; it would error if imported

### Fix 5.2 — Remove ~500 lines dead CSS from global.css
**File:** `src/styles/global.css`
- Remove `.header-premium`, `.header-content`, `.logo-container`, `.desktop-nav`, `.nav-link-premium`, `.mobile-menu-btn`, `.mobile-overlay`, `.mobile-menu-premium`, `.mobile-content`, `.mobile-header`, `.mobile-close-btn`, `.mobile-links`, `.mobile-link`, and related responsive rules
- These are from a previous header design, now replaced by Header.astro's own styles

### Fix 5.3 — Deduplicate keyframe definitions
- `emergencyPulse`, `shimmer`, `float-cosmic` each defined 3 times (global.css, Header.astro, 404.astro)
- Keep only the global.css versions, remove duplicates from components

### Fix 5.4 — Remove dead responsive CSS in global.css
**File:** `src/styles/global.css` (lines 1495-1705)
- These responsive rules duplicate Header.astro's scoped `<style>` block
- Keep Header.astro's versions, remove from global.css

### Fix 5.5 — Fix ESLint: re-enable excluded files
**File:** `.eslintrc.cjs`
- Remove file exclusions from `ignorePatterns`
- Fix any actual parsing errors in the 5 excluded files

### Fix 5.6 — Fix form submit button disabled-forever bug
**File:** `src/pages/contact.astro` (lines 801-821)
- Re-enable submit button after timeout or on navigation failure

---

## NOT FIXING (Architectural / Out of Scope)

| Issue | Why Not Fixing |
|-------|---------------|
| Inline styles everywhere | Tailwind v4 spacing bug workaround — would require full CSS rewrite |
| 385 `!important` declarations | Consequence of inline styles — fixes itself if inline styles are ever removed |
| `unsafe-inline` in CSP | Required by Astro's architecture |
| Single OG image | Needs graphic design work for each page — out of code scope |
| No analytics | Business decision, not a code issue |
| ReviewCard component extraction | Refactoring, not a bug — works correctly as-is |
| Hardcoded phone numbers → config | Would require client-side config import in scripts — not worth the complexity |
| Missing PWA icon sizes (48-384px) | Needs graphic assets — out of code scope |
| Blog images all identical | Needs photo assets — out of code scope |

---

## Files Summary (estimated ~25 files)

| Phase | Files | Changes |
|-------|-------|---------|
| 1 | 6 files | Contrast fix, keyboard a11y, emoji aria-hidden, security hardening |
| 2 | 7 files | Schema spam fix, FAQ schemas, llms.txt, sitemap dates, author consistency |
| 3 | 6 files | gitignore, apple-touch-icon, PWA manifest, cache headers, copyright year, dead code |
| 4 | 9 files | tel/mailto links, ARIA fixes, focus styles, print styles, font preload |
| 5 | 4 files | Dead CSS removal, dead config removal, keyframe dedup, ESLint fixes |

## Verification
1. `npm run lint` — 0 errors
2. `rm -rf dist && npm run build` — 0 errors
3. Manual check: contrast ratios, keyboard tab order, print preview
4. Deploy and verify headers in DevTools
