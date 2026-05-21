import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Sitemap is hand-curated at src/pages/sitemap.xml.ts (83 URLs with
// per-route priorities and changefreq). @astrojs/sitemap was previously
// installed but only emitted 1 URL into sitemap-0.xml — likely an
// edge-case interaction with the custom /sitemap.xml endpoint. Since
// the custom endpoint is the canonical sitemap (referenced from
// robots.txt) and covers everything we want indexed, removing the
// integration is cleaner than chasing a fix.
export default defineConfig({
  site: 'https://chilterncomputers.net',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [],
  vite: {
    plugins: [tailwindcss()],
  },
});
