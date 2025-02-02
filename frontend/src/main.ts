import App from '@/App.vue'
import { i18n } from '@/i18n'
import router from '@/router'
import { Icon } from '@iconify/vue'
import { createHead } from '@unhead/vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'

const app = createApp(App)
const pinia = createPinia()
const head = createHead()

pinia.use(piniaPluginPersistedstate)

app.use(pinia).use(head).use(i18n).use(router).component('Icon', Icon).mount('#app')
