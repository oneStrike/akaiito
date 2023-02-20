import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/Main.vue'
export default {
  name: 'error',
  path: '/error',
  component: Layout,
  meta: { hideAllMenu: true },
  children: [
    {
      name: '404',
      path: '404',
      component: () => import('@/views/exception/404Page.vue'),
      meta: { title: '404' }
    }
  ]
} as RouteRecordRaw
