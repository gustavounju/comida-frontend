import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'zone.js': resolve(__dirname, 'node_modules/zone.js/dist/zone.js'), // Forzar la inclusión de zone.js por si acaso
    },
  },
  server: {
    port: 4200,
    open: true,
  },
  optimizeDeps: {
    include: ['zone.js'], // Asegurar que zone.js se optimice y se incluya
  },
});
