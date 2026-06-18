import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
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
