import { createRouter, createWebHashHistory } from 'vue-router'
import { guard } from './guard'
import routes from './routes'

const router = createRouter({
  routes,
  history: createWebHashHistory()
})
guard(router)
export { router }
