import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { guard } from '@/router/guard'

const router = createRouter({
  routes,
  history: createWebHashHistory()
})
guard(router)
export default router
