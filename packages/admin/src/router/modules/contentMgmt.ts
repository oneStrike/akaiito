import type { RouteRecordRaw } from 'vue-router'

export default {
  name: 'ContentMgmt',
  path: '/contentMgmt',
  component: () => import('@/layouts/layoutMain.vue'),
  meta: {
    title: '内容管理',
    order: 2,
    icon: 'settings'
  },
  children: [
    {
      name: 'Profile',
      path: '/profile',
      component: () =>
        import('@/views/contentMgmt/classifyMgmt/classifyMgmtPage.vue'),
      meta: {
        title: '分类管理',
        icon: 'user',
        rules: ['root']
      }
    }
  ]
} as RouteRecordRaw
