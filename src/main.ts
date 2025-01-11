import App from '@/App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { i18n } from '@/i18n'
import router from '@/router'
import { Icon } from '@iconify/vue'
import { createApp } from 'vue'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia).use(i18n).use(router).component('Icon', Icon).mount('#app')

document.body.addEventListener('plugin_web_update_notice', () => {
  window.location.reload()
})
