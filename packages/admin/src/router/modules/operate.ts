import type { RouteRecordRaw } from 'vue-router'

export default {
  name: 'operate',
  path: '/operate',
  component: () => import('@/layouts/CommonPage.vue'),
  meta: { title: '运营管理', roles: [], icon: 'ferrisWheel', sort: 1 },
  children: [
    {
      path: 'topic',
      name: 'topic',
      component: () => import('@/views/Operate/Topic/Topic.vue'),
      meta: { roles: ['admin'], title: '话题', icon: 'planetRocket' }
    }
  ]
} as RouteRecordRaw
