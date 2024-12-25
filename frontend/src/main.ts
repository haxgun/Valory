import App from '@/App.vue'
import { i18n } from '@/i18n'
import router from '@/router'
import { Icon } from '@iconify/vue'
import { createApp } from 'vue'

const app = createApp(App)

app
  .use(i18n)
  .use(router)
  .component('Icon', Icon)
  .mount('#app')

document.body.addEventListener('plugin_web_update_notice', () => {
  window.location.reload()
})
