import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/Main.vue'
export default {
  name: 'clientManage',
  path: '/client-manage',
  component: Layout,
  meta: { title: 'APP管理', roles: [], icon: 'applications', sort: 1 },
  children: [
    {
      path: 'page-design',
      name: 'pageDesign',
      meta: { roles: ['admin'], title: '页面设计', icon: 'sparkles' },
      children: [
        {
          path: 'user-center',
          name: 'userCenter',
          component: () =>
            import(
              '@/views/clientManage/pageDesign/userCenter/UserCenterPage.vue'
            ),
          meta: { roles: ['admin'], title: '用户中心', icon: 'userGroup' }
        }
      ]
    },
    {
      path: 'bootstrap-manage',
      name: 'bootstrapManage',
      meta: { roles: ['admin'], title: '启动管理', icon: 'pinwheel' },
      component: () =>
        import('@/views/clientManage/bootstrapManage/BootstrapManage.vue')
    }
  ]
} as RouteRecordRaw
