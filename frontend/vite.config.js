import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({

  plugins: [react()],

  server: {

    // supaya bisa diakses HP
    host: '0.0.0.0',

    // penting untuk ngrok
    allowedHosts: true,

    proxy: {

      '/api': {

        target: 'https://namabackend-koyeb.app',

        changeOrigin: true,

        secure: false

      }

    }

  },

  optimizeDeps: {

    exclude: ['@vladmandic/face-api']

  }

})