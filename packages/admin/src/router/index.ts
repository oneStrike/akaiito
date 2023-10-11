import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'
import { guard } from '@/router/guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

guard(router)

export default router
