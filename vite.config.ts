import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/tapia-calidad/',
  plugins: [react(), tailwindcss()],
  server: { host: '127.0.0.1', port: 8797 },
  preview: { host: '127.0.0.1', port: 8797 },
  build: { outDir: 'dist', sourcemap: false },
})
