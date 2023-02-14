import type { RouteRecordRaw } from 'vue-router'

export default {
  name: 'system',
  path: '/system',
  component: () => import('@/layouts/main.vue'),
  meta: { title: '系统管理', roles: [], icon: 'laptop', sort: 1 },
  children: [
    {
      path: 'role',
      name: 'role',
      component: () => import('@/views/System/Role/RolePage.vue'),
      meta: {
        roles: ['admin'],
        title: '访问控制',
        icon: 'users',
        cache: false,
        sort: 1
      }
    },
    {
      path: 'profile',
      name: 'profile',
      component: () => import('@/views/System/Profile/ProfilePage.vue'),
      meta: {
        roles: [],
        title: '个人中心',
        icon: 'user',
        cache: false,
        sort: 3
      }
    },
    {
      path: 'server',
      name: 'server',
      component: () => import('@/views/System/Server/ServerPage.vue'),
      meta: {
        roles: [],
        title: '系统状态',
        icon: 'server',
        cache: false,
        sort: 4
      }
    },
    {
      path: 'log',
      name: 'log',
      component: () => import('@/views/System/Log/LoginLog/LoginLogPage.vue'),
      meta: {
        roles: [],
        title: '操作日志',
        icon: 'clock',
        cache: false,
        sort: 1
      }
    }
  ]
} as RouteRecordRaw
