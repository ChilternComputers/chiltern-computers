// src/pages/robots.txt.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://chilterncomputers.net/sitemap.xml

# Block access to non-public areas
Disallow: /admin/
Disallow: /api/
Disallow: /thank-you/

# Crawl-delay for politeness
Crawl-delay: 1`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400'
    }
  });
};
