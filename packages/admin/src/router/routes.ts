import type { RouteRecordRaw } from 'vue-router'

// 基础路由
const BasicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'admin',
    component: () => import('@/layout/index.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { roles: [], title: '工作台', icon: 'dashboard' },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { roles: [], title: '登录', hide: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/exception/404.vue'),
    meta: { title: '404', hide: true },
  },
]

// 自动加载路由
const modules: Record<string, { [key: string]: never }> = import.meta.glob('./modules/**/*.ts', { eager: true }) // 获取所有模块
const autoRoutes: RouteRecordRaw[] = []
Object.keys(modules).forEach((key) => {
  autoRoutes.push(modules[key].default) // 将模块添加到自动路由数组中
})

// 导出路由
export const routes = [...BasicRoutes, ...autoRoutes]
