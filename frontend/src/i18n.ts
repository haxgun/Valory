import messages from '@intlify/unplugin-vue-i18n/messages'
import { useLocalStorage } from '@vueuse/core'
import { createI18n, I18nOptions } from 'vue-i18n'

type MessageSchema = typeof messages
type Locale = keyof MessageSchema

const locale = useLocalStorage<Locale>('valoryLocale', 'us')

export const i18n = createI18n<I18nOptions & { messages: MessageSchema }, Locale>({
  legacy: false,
  locale: locale.value,
  fallbackLocale: 'us',
  messages,
  globalInjection: true,
})
