import type { RouteRecordRaw } from 'vue-router'

export default {
  name: 'systemManage',
  path: '/system-manage',
  component: () => import('@/layout/Main.vue'),
  meta: { title: '系统管理', roles: [], icon: 'laptop', sort: 1 },
  children: [
    {
      path: 'user-manage',
      name: 'userManage',
      component: () =>
        import('@/views/systemManage/userManage/UserManagePage.vue'),
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
      component: () => import('@/views/systemManage/profile/ProfilePage.vue'),
      meta: {
        roles: [],
        title: '个人中心',
        icon: 'user',
        cache: false,
        sort: 3
      }
    },
    {
      path: 'server-status',
      name: 'serverStatus',
      component: () =>
        import('@/views/systemManage/serverStatus/ServerStatusPage.vue'),
      meta: {
        roles: [],
        title: '系统状态',
        icon: 'server',
        cache: false,
        sort: 4
      }
    },
    {
      path: 'login-log',
      name: 'loginLog',
      component: () => import('@/views/systemManage/loginLog/LoginLogPage.vue'),
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
