import { createSSRApp } from 'vue'
import App from './App.vue'
import 'uno.css'

import { useEs } from '@/components/libs'
import { routerWhiteList } from '@/config/router.config'

useEs.setup({ routerWhiteList })
console.log('🚀 ~ file:main method: line:9 -----', uni.$es.router.pages)
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
