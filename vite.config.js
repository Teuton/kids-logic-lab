import { defineConfig } from 'vite';

export default defineConfig({
  base: '/kids-logic-lab/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
  },
});
