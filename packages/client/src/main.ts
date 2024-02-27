import { createSSRApp } from 'vue'
import App from './App.vue'
import 'uno.css'

import { useEs } from '@/components/libs'
import { routerWhiteList } from '@/config/router.config'

useEs.setup({ routerWhiteList })

export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
