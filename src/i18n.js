import messages from '@intlify/unplugin-vue-i18n/messages'
import { useLocalStorage } from '@vueuse/core'
import { createI18n } from 'vue-i18n'

const locale = useLocalStorage('valoryLocale', 'en')

const localStorageLang = localStorage.getItem('valoryLocale')

export const i18n = createI18n({
  legacy: false,
  locale: localStorageLang || locale.value,
  fallbackLocale: 'en',
  messages
})
