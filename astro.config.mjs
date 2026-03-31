// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://portfolio.jnkfacey.com',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [mdx()],
  output: 'static',
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' }
  }
});