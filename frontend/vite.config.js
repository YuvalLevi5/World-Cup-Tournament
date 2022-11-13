import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
let faviconURL = './public/faveicon.svg'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [faviconURL],
      manifest: {
        theme_color: '#ffffff',
        icons: [
          {
            src: faviconURL,
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: faviconURL,
            sizes: '512x512',
            type: 'image/png',
          }
        ]
      },
    })
  ],
  build: {
    outDir: '../backend/public',
    emptyOutDir: true
  }
})
