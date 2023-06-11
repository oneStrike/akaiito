import type { RouteRecordRaw } from 'vue-router'
export default {
  name: 'businessManage',
  path: '/business-manage',
  component: () => import('@/layout/Main.vue'),
  meta: { title: '运营管理', roles: [], icon: 'ferrisWheel', sort: 1 },
  children: [
    {
      path: 'socialCircle',
      name: 'socialCircle',
      component: () => import('@/views/businessManage/socialCircle/SocialCirclePage.vue'),
      meta: { roles: ['admin'], title: '圈子', icon: 'planetRocket' }
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
