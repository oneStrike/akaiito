import type { RouteRecordRaw } from 'vue-router'
import router from '@/router'
import Layout from '@/layouts/Main.vue'

export default {
  name: 'redirect',
  path: '/redirect',
  component: Layout,
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
