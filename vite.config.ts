// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import hexjsonPlugin from './vite-plugin-hexjson';

export default defineConfig({
  plugins: [react(), hexjsonPlugin()],
  resolve: {
    alias: {
      '@': '/src',
      'oi.hexmap.js': '/libs/oi.hexmap.js', // Add this line
    },
  },
  build: {
    target: 'esnext',
  },
});


