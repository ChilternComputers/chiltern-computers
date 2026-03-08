// src/pages/robots.txt.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const robotsTxt = `User-agent: *
Disallow: /admin/
Disallow: /api/
Disallow: /thank-you/
Allow: /

Sitemap: https://chilterncomputers.net/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
