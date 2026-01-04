import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["d130125d1a40.ngrok-free.app"],
    proxy: {
      '/api': {
        target: 'http://localhost/Travel and tourism/api/index.php',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
