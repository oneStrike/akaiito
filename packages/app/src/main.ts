import { useEs } from '@/components/libs'
import { routerWhiteList } from '@/config/router.config'
import { authentication } from '@/core/authentication'
import { createSSRApp } from 'vue'

import App from './App.vue'
import { bootstrap } from './core/bootstrap'
import { pinia } from './stores'
import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)
  useEs.setup({
    routerWhiteList,
    routerGuard: authentication.guard,
    routerEnter: authentication.enter,
  })
  app.use(pinia)
  app.use(bootstrap)
  return {
    app,
  }
}
