import { createSSRApp } from 'vue'
import App from './App.vue'

import { bootstrap } from '@/core/bootstrap'

export function createApp() {
  const app = createSSRApp(App)
  app.use(bootstrap)
  return {
    app
  }
}
