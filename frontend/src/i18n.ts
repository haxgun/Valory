import messages from '@intlify/unplugin-vue-i18n/messages'
import { useLocalStorage } from '@vueuse/core'
import { nextTick, watch } from 'vue'
import type { Locale } from 'vue-i18n'
import { createI18n } from 'vue-i18n'

const getResourceMessages = (resource: any) => resource.default || resource

async function loadLocaleMessages(i18n: I18n, locale: Locale) {
  const messages = await import(`@/locales/${locale}.json`).then(getResourceMessages)
  i18n.global.setLocaleMessage(locale, messages)
  await nextTick()
}

const locale = useLocalStorage<Locale>('valory-locale', 'en')

watch(locale, (newLocale) => {
  loadLocaleMessages(i18n, newLocale)
  setLocale(i18n, newLocale)
})

export const AVAILABLE_LOCALES = [
  { code: 'en', name: 'English', flag: 'us' },
  { code: 'ru', name: 'Russian', flag: 'ru' },
  { code: 'ua', name: 'Українська', flag: 'ua' },
  { code: 'de', name: 'Deutsch', flag: 'de' },
  { code: 'jp', name: '日本語', flag: 'jp' },
  { code: 'kz', name: 'Қазақша', flag: 'kz' },
]

export function setLocale(i18n: I18n, locale: Locale) {
  i18n.global.locale.value = locale
}

function setupI18n() {
  const i18n = createI18n({
    legacy: false,
    locale: locale.value,
    fallbackLocale: 'en',
    messages,
  })

  loadLocaleMessages(i18n, 'en')
  if (locale.value !== 'en') {
    loadLocaleMessages(i18n, locale.value)
  }

  return i18n
}

export const i18n = setupI18n()
