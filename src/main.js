import App from '@/App.vue'
import '@/assets/style.scss'
import { i18n } from '@/i18n'
import router from '@/router'
import { Icon } from '@iconify/vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ProgressSpinner from 'primevue/progressspinner'
import { createApp } from 'vue'

createApp(App)
  .use(createPinia())
  .use(i18n)
  .use(router)
  .use(PrimeVue)
  .component('Icon', Icon)
  .component('ProgressSpinner', ProgressSpinner)
  .mount('#app')
