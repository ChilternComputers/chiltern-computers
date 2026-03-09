// src/pages/robots.txt.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const robotsTxt = `# Chiltern Computers - chilterncomputers.net
# Professional Computer Repair & IT Support

User-agent: *
Allow: /
Disallow: /offline/
Disallow: /thank-you/

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /
Crawl-delay: 1

Host: https://chilterncomputers.net
Sitemap: https://chilterncomputers.net/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
