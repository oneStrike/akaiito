import type { RouteRecordRaw } from 'vue-router'
export default {
  name: 'shared',
  path: '/shared',
  children: [
    {
      path: 'view-privacy',
      name: 'viewPrivacy',
      component: () => import('@/views/shared/viewPrivacy/ViewPrivacy.vue'),
      meta: { title: '隐私协议' }
    }
  ]
} as RouteRecordRaw
