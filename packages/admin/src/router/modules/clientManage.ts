import type { RouteRecordRaw } from 'vue-router'

export default {
  name: 'clientManage',
  path: '/client-manage',
  component: () => import('@/layout/Main.vue'),
  meta: { title: 'APP管理', roles: [], icon: 'applications', sort: 1 },
  children: [
    {
      path: 'page-design',
      name: 'pageDesign',
      meta: { roles: ['admin'], title: '页面设计', icon: 'sparkles' },
      children: [
        {
          path: 'page-manage',
          name: 'pageManage',
          meta: { roles: ['admin'], title: '页面管理', icon: 'pinwheel' },
          component: () =>
            import('@/views/clientManage/design/pageManage/PageManagePage.vue')
        },
        {
          path: 'user-center',
          name: 'userCenter',
          component: () =>
            import('@/views/clientManage/design/userCenter/UserCenterPage.vue'),
          meta: { roles: ['admin'], title: '用户中心', icon: 'userGroup' }
        }
      ]
    },
    {
      path: 'program-config',
      name: 'programConfig',
      meta: { roles: ['admin'], title: '程序配置', icon: 'cog' },
      component: () =>
        import('@/views/clientManage/programConfig/ProgramConfig.vue')
    }
  ]
} as RouteRecordRaw