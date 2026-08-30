import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/wickedSmart/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'],
      manifest: {
        name: 'wickedSmart',
        short_name: 'wickedSmart',
        description: 'A story game — short plays, proof you showed up.',
        theme_color: '#1e3a5f',
        background_color: '#f6f4ef',
        display: 'standalone',
        start_url: '/wickedSmart/',
        scope: '/wickedSmart/',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
        cacheId: 'wickedsmart-game-v2',
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: '/wickedSmart/index.html',
        navigateFallbackDenylist: [/^\/wickedSmart\/assets\//],
      },
    }),
  ],
  server: { port: 4317, host: true },
  preview: { port: 4317, host: true },
});
