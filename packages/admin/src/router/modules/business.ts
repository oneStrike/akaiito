import type { RouteRecordRaw } from 'vue-router'
export default {
  name: 'businessManage',
  path: '/business-manage',
  component: () => import('@/layout/Main.vue'),
  meta: { title: '运营管理', roles: [], icon: 'ferrisWheel', sort: 1 },
  children: [
    {
      path: 'subject',
      name: 'subject',
      component: () => import('@/views/businessManage/subject/SubjectPage.vue'),
      meta: { roles: ['admin'], title: '话题', icon: 'planetRocket' }
    },
    {
      path: 'privacy-policy',
      name: 'privacyPolicy',
      component: () =>
        import(
          '@/views/businessManage/privacyAgreement/PrivacyAgreementPage.vue'
        ),
      meta: { roles: ['admin'], title: '隐私协议', icon: 'exclamation' }
    }
  ]
} as RouteRecordRaw
