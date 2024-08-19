import type { RouteRecordRaw } from 'vue-router'

export default {
  name: 'ContentMgmt',
  path: '/contentMgmt',
  component: () => import('@/layouts/layoutMain.vue'),
  meta: {
    title: '内容管理',
    order: 2,
    icon: 'book'
  },
  children: [
    {
      name: 'ContentMgmtPage',
      path: '/contentMgmt/contentMgmt',
      component: () =>
        import('@/views/contentMgmt/contentMgmt/contentMgmt.vue'),
      meta: {
        title: '内容列表',
        icon: 'textbox',
        rules: ['root'],
        order: 2
      }
    },
    {
      name: 'ClassifyMgmtPage',
      path: '/contentMgmt/classifyMgmtPage',
      component: () =>
        import('@/views/contentMgmt/classifyMgmt/classifyMgmtPage.vue'),
      meta: {
        title: '分类管理',
        icon: 'scale',
        rules: ['root'],
        order: 2
      }
    }
  ]
} as RouteRecordRaw
