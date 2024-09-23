import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
  }
})
