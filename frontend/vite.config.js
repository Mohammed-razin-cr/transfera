import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/live': 'http://localhost:8088',
      '/ws': 'http://localhost:8088',
      '/d': 'http://localhost:8088',
      '/u': 'http://localhost:8088',
      '/upload': 'http://localhost:8088',
      '/health': 'http://localhost:8088',
      '/static': 'http://localhost:8088',
    }
  },
  build: {
    outDir: '../web/assets',
    emptyOutDir: true,
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons': ['lucide-react'],
          'vendor-ogl': ['ogl']
        }
      }
    }
  }
})
