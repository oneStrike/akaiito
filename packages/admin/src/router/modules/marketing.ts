import type { RouteRecordRaw } from 'vue-router'

export default {
  name: 'Marketing',
  path: '/marketing',
  component: () => import('@/layouts/layoutMain.vue'),
  meta: {
    title: '营运管理',
    order: 2,
    icon: 'planet',
  },
  children: [
    {
      name: 'FunPlugin',
      path: '/funPlugin',
      component: () => import('@/views/marketing/funPlugin/funPluginPage.vue'),
      meta: {
        title: '功能插件',
        icon: 'puzzle',
        rules: ['root'],
      },
    },
    {
      name: 'ClientSystemConfig',
      path: '/clientSystemConfig',
      component: () =>
        import('@/views/marketing/clientSystemConfig/clientSystemConfig.vue'),
      meta: {
        title: '客户端配置',
        icon: 'settings',
        rules: ['root'],
      },
    },
  ],
} as RouteRecordRaw
