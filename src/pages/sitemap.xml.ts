// src/pages/sitemap.xml.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const baseUrl = 'https://chilterncomputers.net';
  const lastUpdated = '2026-03-08';

  // Only include pages that actually exist
  const routes = [
    // Homepage
    {
      url: '/',
      priority: 1.0,
      changefreq: 'weekly',
      lastmod: lastUpdated,
    },

    // Service pages
    { url: '/services/repairs/', priority: 0.9, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/services/custom-pcs/', priority: 0.9, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/services/new-used/', priority: 0.9, changefreq: 'monthly', lastmod: lastUpdated },
    {
      url: '/services/data-recovery-havering/',
      priority: 0.9,
      changefreq: 'monthly',
      lastmod: lastUpdated,
    },
    {
      url: '/services/laptop-repair-dagenham/',
      priority: 0.9,
      changefreq: 'monthly',
      lastmod: lastUpdated,
    },
    {
      url: '/services/virus-removal-romford/',
      priority: 0.9,
      changefreq: 'monthly',
      lastmod: lastUpdated,
    },
    { url: '/services/laptop-repair-romford/', priority: 0.9, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/services/pc-repair-romford/', priority: 0.9, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/services/computer-upgrades-romford/', priority: 0.9, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/services/mac-repair-romford/', priority: 0.9, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/services/gaming-pc-repair-romford/', priority: 0.9, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/services/network-wifi-romford/', priority: 0.9, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/services/windows-installation-romford/', priority: 0.9, changefreq: 'monthly', lastmod: lastUpdated },

    // Core pages
    { url: '/contact/', priority: 0.8, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/about/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/privacy-policy/', priority: 0.3, changefreq: 'yearly', lastmod: lastUpdated },
    { url: '/terms-of-service/', priority: 0.3, changefreq: 'yearly', lastmod: lastUpdated },
    { url: '/accessibility/', priority: 0.3, changefreq: 'yearly', lastmod: lastUpdated },
    { url: '/free-play/', priority: 0.4, changefreq: 'monthly', lastmod: lastUpdated },

    // Area pages (Local SEO)
    { url: '/areas/', priority: 0.8, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/harold-hill/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/romford/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/hornchurch/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/upminster/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/dagenham/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/harold-wood/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/collier-row/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/gidea-park/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/brentwood/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/rainham/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/elm-park/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/chadwell-heath/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/emerson-park/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/cranham/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/noak-hill/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/chase-cross/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/south-hornchurch/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/ardleigh-green/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/hainault/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/barking/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/ilford/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/havering-atte-bower/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/goodmayes/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/pilgrims-hatch/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/warley/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/wennington/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/stapleford-abbotts/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/becontree/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/rush-green/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/seven-kings/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/marks-gate/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/harold-park/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/heath-park/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/hacton/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/corbets-tey/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/north-ockendon/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/gants-hill/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/barkingside/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/newbury-park/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/shenfield/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/upney/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/clayhall/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/aldborough-hatch/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/fairlop/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },
    { url: '/areas/hutton/', priority: 0.7, changefreq: 'monthly', lastmod: lastUpdated },

    // Blog pages
    { url: '/blog/', priority: 0.8, changefreq: 'weekly', lastmod: lastUpdated },
    {
      url: '/blog/virus-malware-removal-romford-guide/',
      priority: 0.7,
      changefreq: 'monthly',
      lastmod: '2026-02-13',
    },
    {
      url: '/blog/is-my-computer-worth-repairing-romford/',
      priority: 0.7,
      changefreq: 'monthly',
      lastmod: '2026-02-13',
    },
    {
      url: '/blog/upgrade-old-pc-windows-11-unsupported/',
      priority: 0.7,
      changefreq: 'monthly',
      lastmod: '2026-02-13',
    },
    {
      url: '/blog/best-computer-repair-near-romford/',
      priority: 0.7,
      changefreq: 'monthly',
      lastmod: '2026-02-13',
    },
    {
      url: '/blog/why-laptop-running-slow-romford-guide/',
      priority: 0.7,
      changefreq: 'monthly',
      lastmod: '2026-02-13',
    },
    {
      url: '/blog/gaming-pc-build-tips-essex/',
      priority: 0.7,
      changefreq: 'monthly',
      lastmod: '2026-02-13',
    },
    {
      url: '/blog/computer-maintenance-tips-romford-businesses/',
      priority: 0.7,
      changefreq: 'monthly',
      lastmod: '2026-02-13',
    },
    {
      url: '/blog/website-design-services-essex/',
      priority: 0.7,
      changefreq: 'monthly',
      lastmod: '2026-03-08',
    },

  ];

  // Generate XML with proper formatting
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${routes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
};
