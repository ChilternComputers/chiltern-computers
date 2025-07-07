// src/pages/sitemap.xml.ts
export async function GET() {
  const baseUrl = 'https://chilterncomputers.net';
  
  // Define your site structure with priorities and change frequencies
  const routes = [
    // Core pages
    { 
      url: '/', 
      priority: 1.0, 
      changefreq: 'weekly',
      lastmod: new Date().toISOString().split('T')[0]
    },
    
    // Main service pages - highest priority after homepage
    { url: '/services', priority: 0.9, changefreq: 'monthly' },
    { url: '/computer-repair', priority: 0.9, changefreq: 'monthly' },
    { url: '/laptop-repair', priority: 0.9, changefreq: 'monthly' },
    { url: '/virus-removal', priority: 0.8, changefreq: 'monthly' },
    { url: '/data-recovery', priority: 0.8, changefreq: 'monthly' },
    { url: '/screen-repair', priority: 0.8, changefreq: 'monthly' },
    { url: '/business-it-support', priority: 0.8, changefreq: 'monthly' },
    
    // Location pages - important for local SEO
    { url: '/harold-hill', priority: 0.8, changefreq: 'monthly' },
    { url: '/romford', priority: 0.8, changefreq: 'monthly' },
    { url: '/essex', priority: 0.7, changefreq: 'monthly' },
    
    // Brand-specific repair pages
    { url: '/apple-repair', priority: 0.7, changefreq: 'monthly' },
    { url: '/dell-repair', priority: 0.7, changefreq: 'monthly' },
    { url: '/hp-repair', priority: 0.7, changefreq: 'monthly' },
    { url: '/lenovo-repair', priority: 0.7, changefreq: 'monthly' },
    
    // Secondary services
    { url: '/hardware-upgrade', priority: 0.7, changefreq: 'monthly' },
    { url: '/emergency-repair', priority: 0.7, changefreq: 'monthly' },
    
    // Contact and conversion pages
    { url: '/contact', priority: 0.7, changefreq: 'monthly' },
    { url: '/quote', priority: 0.7, changefreq: 'monthly' },
    
    // Content pages
    { url: '/about', priority: 0.6, changefreq: 'monthly' },
    { url: '/faq', priority: 0.6, changefreq: 'monthly' },
    { url: '/testimonials', priority: 0.6, changefreq: 'monthly' },
    { url: '/areas-covered', priority: 0.6, changefreq: 'monthly' },
    { url: '/blog', priority: 0.6, changefreq: 'weekly' },
    
    // Blog posts - can be dynamically generated
    { url: '/blog/computer-running-slow', priority: 0.5, changefreq: 'yearly' },
    { url: '/blog/blue-screen-fixes', priority: 0.5, changefreq: 'yearly' },
    { url: '/blog/prevent-virus-infections', priority: 0.5, changefreq: 'yearly' },
    { url: '/blog/backup-your-data', priority: 0.5, changefreq: 'yearly' },
    { url: '/blog/laptop-battery-tips', priority: 0.5, changefreq: 'yearly' },
    
    // Legal pages - lowest priority
    { url: '/privacy-policy', priority: 0.3, changefreq: 'yearly' },
    { url: '/terms-of-service', priority: 0.3, changefreq: 'yearly' },
  ];

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
    }
  });
}

// Alternative: If you want to automatically discover pages from your file system
export async function getStaticPaths() {
  // This would scan your pages directory and auto-generate routes
  // Useful for larger sites with many pages
  return [];
}

// robots.txt generator (bonus)
// Create src/pages/robots.txt.ts
export function generateRobotsTxt() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://chilterncomputers.net/sitemap.xml

# Block access to admin areas (if any)
Disallow: /admin/
Disallow: /api/
Disallow: /_astro/

# Allow important files
Allow: /favicon.ico
Allow: /robots.txt
Allow: /sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    }
  });
}