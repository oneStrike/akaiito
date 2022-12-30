import type { RouteRecordRaw } from 'vue-router'

export default {
  name: 'error',
  path: '/error',
  component: () => import('@/layouts/CommonPage.vue'),
  meta: { hideAllMenu: true },
  children: [
    {
      name: '404',
      path: '404',
      component: () => import('@/views/Exception/404.vue'),
      meta: { title: '404' }
    }
  ]
} as RouteRecordRaw
