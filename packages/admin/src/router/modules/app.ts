import type { RouteRecordRaw } from 'vue-router'

export default {
  name: 'App',
  path: '/App',
  component: () => import('@/layouts/CommonPage.vue'),
  meta: { title: 'APP管理', roles: [], icon: 'applications', sort: 1 },
  children: [
    {
      path: 'pageDevise',
      name: 'pageDevise',
      meta: { roles: ['admin'], title: '页面设计', icon: 'sparkles' },
      children: [
        {
          path: 'pageManage',
          name: 'pageManage',
          component: () =>
            import('@/views/App/Devise/PageManage/PageManagePage.vue'),
          meta: { roles: ['admin'], title: '页面管理', icon: 'shooting' }
        },
        {
          path: 'userCenter',
          name: 'userCenter',
          component: () =>
            import('@/views/App/Devise/UserCenter/UserCenterPage.vue'),
          meta: { roles: ['admin'], title: '用户中心', icon: 'userGroup' }
        }
      ]
    }
  ]
} as RouteRecordRaw
