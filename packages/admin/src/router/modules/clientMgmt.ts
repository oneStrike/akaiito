import type { RouteRecordRaw } from 'vue-router'

export default {
  name: '                                                                        ',
  path: '/appMgmt',
  component: () => import('@/layouts/layoutMain.vue'),
  meta: {
    title: '客户端管理',
    order: 2,
    icon: 'mobile',
  },
  children: [
    {
      name: 'Notice',
      path: '/notice',
      component: () => import('@/views/appMgmt/notice/index.vue'),
      meta: {
        title: '通知公告',
        icon: 'speakerphone',
        rules: ['root'],
      },
    },
    {
      name: 'PageConfig',
      path: '/pageConfig',
      component: () => import('@/views/appMgmt/pageMgmt/index.vue'),
      meta: {
        title: '页面配置',
        icon: 'textbox',
        rules: ['root'],
      },
    },
    {
      name: 'SystemConfig',
      path: '/systemConfig',
      component: () => import('@/views/appMgmt/systemConfig/index.vue'),
      meta: {
        title: '系统配置',
        icon: 'settings',
        rules: ['root'],
      },
    },
  ],
} as RouteRecordRaw
