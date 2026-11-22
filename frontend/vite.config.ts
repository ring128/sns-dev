import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES === 'true' ? '/sns-dev/' : '/',
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:3000',
    },
  },
}) // Configure Vite to forward API requests to Fastify
