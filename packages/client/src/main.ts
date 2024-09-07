import { useEs } from '@/components/libs'
import { routerWhiteList } from '@/config/router.config'
import { createSSRApp } from 'vue'
import App from './App.vue'

import { bootstrap } from './core/bootstrap'
import { stores } from './stores'
import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)
  useEs.setup({ routerWhiteList })
  app.use(stores)
  app.use(bootstrap)
  return {
    app,
  }
}
