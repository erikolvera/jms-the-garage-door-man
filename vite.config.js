import { defineConfig } from 'vite';
import { resolve } from 'path';

// Relative base so the build works both on the GitHub Pages project sub-path
// (https://<user>.github.io/<repo>/) and at a custom-domain root later — no
// rebuild needed when a domain is added.
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        reviews: resolve(__dirname, 'reviews.html'),
      },
    },
  },
});
