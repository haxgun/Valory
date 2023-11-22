import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { webUpdateNotice } from '@plugin-web-update-notification/vite'

export default defineConfig({
  devServer: {
    port: 5000
  },
  plugins: [
    vue(),
    VueI18nPlugin({
      include: [
        // eslint-disable-next-line no-undef
        path.resolve(__dirname, './src/locales/**'),
      ],
      strictMessage: false,
      escapeHtml: false,
    }),
    webUpdateNotice({
      hiddenDefaultNotification: true,
    }),
  ],
  clearScreen: false,
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    target: 'esnext'
  }
})

document.body.addEventListener('plugin_web_update_notice', () => {
  window.location.reload();
});
