import type { RouteRecordRaw } from 'vue-router'

export default {
  name: 'ClientMgmt',
  path: '/clientMgmt',
  component: () => import('@/layout/index.vue'),
  meta: {
    title: '客户端管理',
    order: 2,
    icon: 'mobile',
  },
  children: [
    {
      name: 'PageConfig',
      path: '/pageConfig',
      component: () => import('@/views/clientMgmt/pageMgmt/index.vue'),
      meta: {
        title: '页面配置',
        icon: 'textbox',
        rules: ['root'],
      },
    },
    {
      name: 'MessageNotification',
      path: '/messageNotification',
      component: () => import('@/views/clientMgmt/messageNotification/index.vue'),
      meta: {
        title: '通知消息',
        icon: 'speakerphone',
        rules: ['root'],
      },
    },
    {
      name: 'AppConfig',
      path: '/appConfig',
      component: () => import('@/views/clientMgmt/appConfig/index.vue'),
      meta: {
        title: '应用配置',
        icon: 'settings',
        rules: ['root'],
      },
    },
  ],
} as RouteRecordRaw
