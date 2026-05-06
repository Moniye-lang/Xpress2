import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import prerender from '@prerenderer/rollup-plugin';
import JSDOMRenderer from '@prerenderer/renderer-jsdom';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer({
      webp: {
        quality: 70, // Compresses your 500kb images down to tiny sizes
      },
      jpg: {
        quality: 70,
      },
      png: {
        quality: 70,
      },
    }),
    prerender({
      routes: ['/', '/about', '/services', '/product', '/contact'],
      renderer: new JSDOMRenderer({
        renderAfterTime: 5000,
      }),
      staticDir: path.join(__dirname, 'dist'),
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'framer-vendor': ['framer-motion'],
          'lucide-vendor': ['lucide-react'],
        },
      },
    },
  },
});
