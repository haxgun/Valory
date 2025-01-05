import AutoImport from 'unplugin-auto-import/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { VitePWA } from 'vite-plugin-pwa'
import compression from 'vite-plugin-compression'
import { webUpdateNotice } from '@plugin-web-update-notification/vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
  plugins: [
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n'],
      dts: 'src/auto-imports.d.ts'
    }),
    vue(),
    VueI18nPlugin({
      include: [path.resolve(__dirname, './src/locales/**')],
      strictMessage: false,
      escapeHtml: false,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'VALORY',
        short_name: 'VALORY',
        theme_color: '#181818',
      },
    }),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    webUpdateNotice({
      notificationProps: {
        title: 'New version',
        description:
          'An update available, please refresh the page to get latest features and bug fixes!',
        buttonText: 'refresh',
        dismissButtonText: 'cancel',
      },
      checkInterval: 60 * 1000,
    }),
  ],
  clearScreen: false,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'esnext',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'vue-i18n'],
        },
      },
    },
  },
  base: '/',
})
