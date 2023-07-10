import { createSSRApp } from 'vue'
import App from './App.vue'
import * as Pinia from 'pinia'
import { bootstrap } from '@/core/bootstrap'
import { useLk } from '@/components/libs'
import { routerConfig } from '@/config/router.config'

useLk.setup({
  ...routerConfig
})

export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia.createPinia())
  app.use(bootstrap)
  return {
    app,
    Pinia
  }
}
