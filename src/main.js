import App from '@/App.vue'
import '@/assets/style.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import router from './router'

createApp(App).use(createPinia()).use(router).mount('#app')
