import App from '@/App.vue'
import '@/assets/style.scss'
import { i18n } from '@/i18n'
import router from '@/router'
import { Icon } from '@iconify/vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

createApp(App).use(createPinia()).use(i18n).use(router).component('Icon', Icon).mount('#app')

document.body.addEventListener('plugin_web_update_notice', () => {
  window.location.reload()
})
