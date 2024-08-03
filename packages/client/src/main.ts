import { createSSRApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import { stores } from './stores'

import { useEs } from '@/components/libs'
import { routerWhiteList } from '@/config/router.config'
import { bootstrap } from './core/bootstrap'

export function createApp() {
  const app = createSSRApp(App)
  useEs.setup({ routerWhiteList })
  app.use(stores)
  app.use(bootstrap)
  return {
    app
  }
}
