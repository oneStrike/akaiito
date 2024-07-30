import type { RouteRecordRaw } from 'vue-router'

export default {
  name: 'Marketing',
  path: '/marketing',
  component: () => import('@/layouts/LayoutMain.vue'),
  meta: {
    title: '营运管理',
    order: 2,
    icon: 'planet'
  },
  children: [
    {
      name: 'FunPlugin',
      path: '/funPlugin',
      component: () => import('@/views/marketing/funPlugin/FunPluginPage.vue'),
      meta: {
        title: '功能插件',
        icon: 'puzzle',
        rules: ['root']
      }
    },
    {
      name: 'ClientSystemMgmt',
      path: '/clientSystemMgmt',
      component: () =>
        import('@/views/marketing/systemMgmt/systemMgmtPage.vue'),
      meta: {
        title: '系统配置',
        icon: 'settings',
        rules: ['root']
      }
    }
  ]
} as RouteRecordRaw
