import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url'
import { splitVendorChunkPlugin } from 'vite'
// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [react(), splitVendorChunkPlugin()],
  build: {
    target: 'esnext'
  },
  resolve: {
    alias: {
      '@components': fileURLToPath(new URL( './src/components', import.meta.url)),
      '@src': fileURLToPath(new URL( './src', import.meta.url)),
      '@assets': fileURLToPath(new URL( './src/assets', import.meta.url)),
      '@application': fileURLToPath(new URL( './src/app', import.meta.url)),
      '@pages': fileURLToPath(new URL( './src/pages', import.meta.url)),
      '@utils': fileURLToPath(new URL( './src/utils', import.meta.url)),
      '@store': fileURLToPath(new URL( './src/store', import.meta.url)),
      '@sections': fileURLToPath(new URL( './src/sections', import.meta.url)),
      '@layout': fileURLToPath(new URL( './src/layout', import.meta.url)),
      '@hooks': fileURLToPath(new URL( './src/hooks', import.meta.url)),
      '@contexts': fileURLToPath(new URL( './src/contexts', import.meta.url)),
      '@themes': fileURLToPath(new URL( './src/themes', import.meta.url)),
      '@routes': fileURLToPath(new URL( './src/routes', import.meta.url)),
      '@config': fileURLToPath(new URL( './src/config', import.meta.url)),
      '@data': fileURLToPath(new URL( './src/data', import.meta.url)),
      '@menuItems': fileURLToPath(new URL( './src/menu-items', import.meta.url))


    }
  },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
  },
  // 3. to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ['VITE_', 'TAURI_'],
}));
