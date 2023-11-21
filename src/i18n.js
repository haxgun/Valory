import messages from '@intlify/unplugin-vue-i18n/messages'
import { useLocalStorage } from '@vueuse/core'
import { createI18n } from 'vue-i18n'

const locale = useLocalStorage('valoryLocale', 'en')

export const i18n = createI18n({
  legacy: false,
  locale: locale.value,
  fallbackLocale: 'en',
  messages,
  globalInjection: true
})
