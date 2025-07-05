import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://chilterncomputers.net',
  integrations: [tailwind()],
});