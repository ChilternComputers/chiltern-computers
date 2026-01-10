// src/pages/sitemap.xml.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const baseUrl = 'https://chilterncomputers.net';
  const currentDate = new Date().toISOString().split('T')[0];

  // Only include pages that actually exist
  const routes = [
    // Homepage
    {
      url: '/',
      priority: 1.0,
      changefreq: 'weekly',
      lastmod: currentDate
    },

    // Service pages
    { url: '/services/repairs', priority: 0.9, changefreq: 'monthly', lastmod: currentDate },
    { url: '/services/custom-pcs', priority: 0.9, changefreq: 'monthly', lastmod: currentDate },
    { url: '/services/new-used', priority: 0.9, changefreq: 'monthly', lastmod: currentDate },

    // Core pages
    { url: '/contact', priority: 0.8, changefreq: 'monthly', lastmod: currentDate },
    { url: '/about', priority: 0.7, changefreq: 'monthly', lastmod: currentDate },

    // Other pages
    { url: '/free-play', priority: 0.6, changefreq: 'monthly', lastmod: currentDate },
    { url: '/accessibility', priority: 0.4, changefreq: 'yearly', lastmod: currentDate },

    // Legal pages
    { url: '/privacy-policy', priority: 0.3, changefreq: 'yearly', lastmod: '2025-01-10' },
    { url: '/terms-of-service', priority: 0.3, changefreq: 'yearly', lastmod: '2025-01-10' },
  ];

  // Generate XML with proper formatting
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  });
};
