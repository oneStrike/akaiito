import type { RouteRecordRaw } from 'vue-router'

export default {
  name: 'ContentMgmt',
  path: '/contentMgmt',
  component: () => import('@/layout/index.vue'),
  meta: {
    title: '内容管理',
    order: 2,
    icon: 'book',
  },
  children: [
    {
      name: 'AuthorMgmt',
      path: '/contentMgmt/authorMgmt',
      component: () => import('@/views/contentMgmt/authorMgmt/index.vue'),
      meta: {
        title: '作者管理',
        icon: 'userEdit',
        rules: ['root'],
        order: 2,
      },
    },
    {
      name: 'ClassifyMgmt',
      path: '/contentMgmt/classifyMgmt',
      component: () => import('@/views/contentMgmt/classifyMgmt/index.vue'),
      meta: {
        title: '分类管理',
        icon: 'scale',
        rules: ['root'],
        order: 3,
      },
    },
    {
      name: 'ContentParsing',
      path: '/contentMgmt/contentParsing',
      component: () => import('@/views/contentMgmt/contentParsing/index.vue'),
      meta: {
        title: '模型管理',
        icon: 'cube',
        rules: ['root'],
        order: 4,
      },
    },
  ],
} as RouteRecordRaw
