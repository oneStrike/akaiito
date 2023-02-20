import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/Main.vue'
export default {
  name: 'businessManage',
  path: '/business-manage',
  component: Layout,
  meta: { title: '运营管理', roles: [], icon: 'ferrisWheel', sort: 1 },
  children: [
    {
      path: 'subject',
      name: 'subject',
      component: () => import('@/views/businessManage/subject/subjectPage.vue'),
      meta: { roles: ['admin'], title: '话题', icon: 'planetRocket' }
    },
    {
      path: 'privacy-policy',
      name: 'privacyPolicy',
      component: () =>
        import('@/views/businessManage/privacyPolicy/PrivacyPage.vue'),
      meta: { roles: ['admin'], title: '隐私协议', icon: 'exclamation' }
    }
  ]
} as RouteRecordRaw
