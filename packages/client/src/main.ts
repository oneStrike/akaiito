import { createSSRApp } from 'vue'
import App from './App.vue'

import uviewPlus from 'uview-plus'
import { bootstrap } from '@/core/bootstrap'

export function createApp() {
  const app = createSSRApp(App)
  app.use(uviewPlus)
  app.use(bootstrap)
  return {
    app
  }
}
