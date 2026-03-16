import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://chilterncomputers.net',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [sitemap({
    filter: (page) =>
      !page.includes('/privacy-policy/') &&
      !page.includes('/terms-of-service/') &&
      !page.includes('/accessibility/') &&
      !page.includes('/thank-you/') &&
      !page.includes('/free-play/') &&
      !page.includes('/404'),
  })],
  vite: {
    plugins: [tailwindcss()],
  },
});
