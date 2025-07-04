import type { RouteRecordRaw } from 'vue-router'

export default {
  name: 'ContentMgmt',
  path: '/contentMgmt',
  component: () => import('@/layouts/layoutMain.vue'),
  meta: {
    title: '内容管理',
    order: 2,
    icon: 'book',
  },
  children: [
    {
      name: 'ContentMgmtPage',
      path: '/contentMgmt/contentMgmt',
      component: () => import('@/views/content-manage/comic/index.vue'),
      meta: {
        title: '漫画',
        icon: 'textbox',
        rules: ['root'],
        order: 2,
      },
    },
    {
      name: 'AuthorPage',
      path: '/contentMgmt/author',
      component: () => import('@/views/content-manage/author/index.vue'),
      meta: {
        title: '作者管理',
        icon: 'userEdit',
        rules: ['root'],
        order: 2,
      },
    },
    {
      name: 'ClassifyMgmtPage',
      path: '/contentMgmt/classifyMgmtPage',
      component: () => import('@/views/content-manage/classify/index.vue'),
      meta: {
        title: '分类管理',
        icon: 'scale',
        rules: ['root'],
        order: 3,
      },
    },
  ],
} as RouteRecordRaw
