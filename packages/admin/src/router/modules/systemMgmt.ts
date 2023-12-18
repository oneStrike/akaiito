import type { RouteRecordRaw } from 'vue-router'

export default {
  name: 'SystemMgmt',
  path: '/systemMgmt',
  component: () => import('@/layouts/LayoutMain.vue'),
  meta: {
    title: '系统管理',
    order: 9999,
    icon: 'settings'
  },
  children: [
    {
      name: 'Profile',
      path: '/profile',
      component: () => import('@/views/systemMgmt/profile/ProfilePage.vue'),
      meta: {
        title: '个人中心',
        icon: 'user'
      }
    },
    {
      name: 'OperationLogs',
      path: '/operationLogs',
      component: () =>
        import('@/views/systemMgmt/operationLogs/OperationLogsPage.vue'),
      meta: {
        title: '操作日志',
        icon: 'handPointer'
      }
    },
    {
      name: 'UserMgmt',
      path: '/userMgmt',
      component: () => import('@/views/systemMgmt/userMgmt/UserMgmtPage.vue'),
      meta: {
        title: '用户管理',
        icon: 'users'
      }
    },
    {
      name: 'ServerStatus',
      path: '/serverStatus',
      component: () =>
        import('@/views/systemMgmt/serverStatus/ServerStatusPage.vue'),
      meta: {
        title: '系统状态',
        icon: 'server'
      }
    }
  ]
} as RouteRecordRaw
