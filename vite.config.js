import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),tailwindcss(),
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
