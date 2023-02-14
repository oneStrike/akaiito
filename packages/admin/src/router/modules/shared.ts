import type { RouteRecordRaw } from 'vue-router'
import router from '@/router'

export default {
  name: 'redirect',
  path: '/redirect',
  component: () => import('@/layouts/main.vue'),
  meta: { hideAllMenu: true },
  beforeEnter: (to) => {
    const { query } = to
    setTimeout(() => {
      router.replace({
        path: query.path as string
      })
    }, 30)
  }
} as RouteRecordRaw
