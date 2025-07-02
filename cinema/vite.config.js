import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'icons/favicon.ico',
        'icons/apple-touch-icon.png',
        'icons/favicon-96x96.png',
        'icons/favicon.svg',
        'icons/favicon-512x512.png',
        'icons/icon-192x192.png',
        'icons/icon-512x512.png'
      ],
      manifest: {
        name: 'AbsoluteCinema',
        short_name: 'Abscinema',
        description: 'Rekomendasi Film Terbaru',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icons/favicon.ico',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: 'icons/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png'
          },
          {
            src: 'icons/favicon-96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: 'icons/favicon.svg',
            sizes: '96x96',
            type: 'image/svg+xml'
          },
          {
            src: 'icons/favicon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
