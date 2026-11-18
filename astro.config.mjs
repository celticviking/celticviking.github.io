// Astro settings. `site` is the live address, used for absolute links and the sitemap later.
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.vagabondcelticviking.com',
  trailingSlash: 'ignore',
  // The floating Astro toolbar at the bottom of pages while previewing (npm run dev).
  // It never appears on the live site; this hides it locally too.
  devToolbar: { enabled: false },
});
