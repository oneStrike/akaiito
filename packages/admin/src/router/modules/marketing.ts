import type { RouteRecordRaw } from 'vue-router'

export default {
  name: 'Marketing',
  path: '/marketing',
  component: () => import('@/layouts/LayoutMain.vue'),
  meta: {
    title: '营运管理',
    order: 9999,
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
    }
  ]
} as RouteRecordRaw
