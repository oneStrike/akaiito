import type { RouteRecordRaw } from 'vue-router'

export default {
  name: 'operate',
  path: '/operate',
  component: () => import('@/layouts/main.vue'),
  meta: { title: '运营管理', roles: [], icon: 'ferrisWheel', sort: 1 },
  children: [
    {
      path: 'topic',
      name: 'topic',
      component: () => import('@/views/Operate/Topic/TopicPage.vue'),
      meta: { roles: ['admin'], title: '话题', icon: 'planetRocket' }
    },
    {
      path: 'privacy',
      name: 'privacy',
      component: () => import('@/views/Operate/Privacy/PrivacyPage.vue'),
      meta: { roles: ['admin'], title: '隐私协议', icon: 'exclamation' }
    }
  ]
} as RouteRecordRaw
