import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/live': 'http://localhost:8080',
      '/ws': 'http://localhost:8080',
      '/d': 'http://localhost:8080',
      '/u': 'http://localhost:8080',
      '/upload': 'http://localhost:8080',
      '/health': 'http://localhost:8080',
      '/static': 'http://localhost:8080',
    }
  },
  build: {
    outDir: '../web/assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
})
