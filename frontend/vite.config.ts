import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { webUpdateNotice } from '@plugin-web-update-notification/vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api']
      }
    }
  },
  devServer: {
    port: 5000
  },
  plugins: [
    vue(),
    VueI18nPlugin({
      include: [
        // eslint-disable-next-line no-undef
        path.resolve(__dirname, './src/locales/**')
      ],
      strictMessage: false,
      escapeHtml: false
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false
        })
      ]
    }),
    webUpdateNotice({
      notificationProps: {
        title: 'New version',
        description:
          'An update available, please refresh the page to get latest features and bug fixes!',
        buttonText: 'refresh',
        dismissButtonText: 'cancel'
      },
      checkInterval: 1 * 60 * 1000
    })
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
  },
  base: '/'
})
