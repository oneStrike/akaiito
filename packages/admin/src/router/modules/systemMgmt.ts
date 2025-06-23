import type { RouteRecordRaw } from 'vue-router'

export default {
  name: 'SystemMgmt',
  path: '/systemMgmt',
  component: () => import('@/layouts/layoutMain.vue'),
  meta: {
    title: '系统管理',
    order: 4,
    icon: 'settings',
  },
  children: [
    {
      name: 'Profile',
      path: '/profile',
      component: () => import('@/views/system-manage/profile/index.vue'),
      meta: {
        title: '个人中心',
        icon: 'user',
        rules: ['root'],
      },
    },

    {
      name: 'DataDictionary',
      path: '/dataDictionary',
      component: () => import('@/views/system-manage/data-dict/index.vue'),
      meta: {
        title: '数据字典',
        icon: 'dataMinus',
      },
    },
    {
      name: 'logsMgmt',
      path: '/logsMgmt',
      meta: {
        title: '日志管理',
        icon: 'listBox',
      },
      children: [
        {
          name: 'LoginLogs',
          path: '/logsMgmt/loginLogs',
          component: () => import('@/views/system-manage/request-log/login-log/index.vue'),
          meta: {
            title: '登录日志',
            icon: 'login',
          },
        },
        {
          name: 'OperationLogs',
          path: '/logsMgmt/operationLogs',
          component: () => import('@/views/system-manage/request-log/operation-log/index.vue'),
          meta: {
            title: '操作日志',
            icon: 'handPointer',
          },
        },
      ],
    },

    {
      name: 'UserMgmt',
      path: '/userMgmt',
      component: () => import('@/views/system-manage/user-manage/index.vue'),
      meta: {
        title: '用户管理',
        icon: 'users',
      },
    },
    {
      name: 'ServerStatus',
      path: '/serverStatus',
      component: () => import('@/views/system-manage/server-status/index.vue'),
      meta: {
        title: '系统状态',
        icon: 'server',
      },
    },
  ],
} as RouteRecordRaw
