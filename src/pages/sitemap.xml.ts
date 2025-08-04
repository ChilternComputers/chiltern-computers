// src/pages/sitemap.xml.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const baseUrl = 'https://chilterncomputers.net';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Define your site structure with priorities and change frequencies
  const routes = [
    // Core pages
    { 
      url: '/', 
      priority: 1.0, 
      changefreq: 'weekly',
      lastmod: currentDate
    },
    
    // Main service pages - highest priority after homepage
    { url: '/services', priority: 0.9, changefreq: 'monthly', lastmod: currentDate },
    { url: '/computer-repair', priority: 0.9, changefreq: 'monthly', lastmod: currentDate },
    { url: '/laptop-repair', priority: 0.9, changefreq: 'monthly', lastmod: currentDate },
    { url: '/virus-removal', priority: 0.8, changefreq: 'monthly', lastmod: currentDate },
    { url: '/data-recovery', priority: 0.8, changefreq: 'monthly', lastmod: currentDate },
    { url: '/screen-repair', priority: 0.8, changefreq: 'monthly', lastmod: currentDate },
    { url: '/business-it-support', priority: 0.8, changefreq: 'monthly', lastmod: currentDate },
    
    // Location pages - important for local SEO
    { url: '/harold-hill', priority: 0.8, changefreq: 'monthly', lastmod: currentDate },
    { url: '/romford', priority: 0.8, changefreq: 'monthly', lastmod: currentDate },
    { url: '/essex', priority: 0.7, changefreq: 'monthly', lastmod: currentDate },
    
    // Brand-specific repair pages
    { url: '/apple-repair', priority: 0.7, changefreq: 'monthly', lastmod: currentDate },
    { url: '/dell-repair', priority: 0.7, changefreq: 'monthly', lastmod: currentDate },
    { url: '/hp-repair', priority: 0.7, changefreq: 'monthly', lastmod: currentDate },
    { url: '/lenovo-repair', priority: 0.7, changefreq: 'monthly', lastmod: currentDate },
    
    // Secondary services
    { url: '/hardware-upgrade', priority: 0.7, changefreq: 'monthly', lastmod: currentDate },
    { url: '/emergency-repair', priority: 0.7, changefreq: 'monthly', lastmod: currentDate },
    
    // Contact and conversion pages
    { url: '/contact', priority: 0.7, changefreq: 'monthly', lastmod: currentDate },
    { url: '/quote', priority: 0.7, changefreq: 'monthly', lastmod: currentDate },
    
    // Content pages
    { url: '/about', priority: 0.6, changefreq: 'monthly', lastmod: currentDate },
    { url: '/faq', priority: 0.6, changefreq: 'monthly', lastmod: currentDate },
    { url: '/testimonials', priority: 0.6, changefreq: 'monthly', lastmod: currentDate },
    { url: '/areas-covered', priority: 0.6, changefreq: 'monthly', lastmod: currentDate },
    { url: '/blog', priority: 0.6, changefreq: 'weekly', lastmod: currentDate },
    
    // Blog posts - with realistic lastmod dates
    { url: '/blog/computer-running-slow', priority: 0.5, changefreq: 'yearly', lastmod: '2024-12-15' },
    { url: '/blog/blue-screen-fixes', priority: 0.5, changefreq: 'yearly', lastmod: '2024-11-20' },
    { url: '/blog/prevent-virus-infections', priority: 0.5, changefreq: 'yearly', lastmod: '2024-10-10' },
    { url: '/blog/backup-your-data', priority: 0.5, changefreq: 'yearly', lastmod: '2024-09-05' },
    { url: '/blog/laptop-battery-tips', priority: 0.5, changefreq: 'yearly', lastmod: '2024-08-25' },
    
    // Legal pages - lowest priority
    { url: '/privacy-policy', priority: 0.3, changefreq: 'yearly', lastmod: '2024-06-01' },
    { url: '/terms-of-service', priority: 0.3, changefreq: 'yearly', lastmod: '2024-06-01' },
  ];

  // Generate XML with proper formatting and indentation
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