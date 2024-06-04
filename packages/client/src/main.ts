import { createSSRApp } from 'vue'
import App from './App.vue'
import 'uno.css'

import { useEs } from '@/components/libs'
import { routerWhiteList } from '@/config/router.config'
import { bootstrap } from './core/bootstrap'

useEs.setup({ routerWhiteList })

export function createApp() {
  const app = createSSRApp(App)
  app.use(bootstrap)
  return {
    app
  }
}
