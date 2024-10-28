import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync } from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimizeDeps: {
    exclude: [
      'chunk-L2FICHKX.js',
      'chunk-QMM7ELEV.js',
      'chunk-YL7LKWCF.js'
    ]
  },
  build: {
    outDir: 'dist', // Output directory for the build
    emptyOutDir: true, // Clears the output directory before building
  },
  // Hook to copy the sitemap.xml after building the project
  buildEnd: () => {
    copyFileSync(resolve(__dirname, 'sitemap.xml'), resolve(__dirname, 'dist/sitemap.xml'));
  }
});
