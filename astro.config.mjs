// @ts-check
import { defineConfig } from 'astro/config';
import auth from 'auth-astro';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [auth()],
  site: 'https://deredaya.com',
  output: 'server',
  adapter: vercel(),
});