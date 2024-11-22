import type { RouteRecordRaw } from 'vue-router'

// 基础路由
const BasicRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/loginPage.vue'), // 登录页组件
    meta: { title: '登录', hideMenu: true }, // 元数据，用于路由守卫等
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('@/layouts/layoutMain.vue'),
    meta: { title: '', hideMenu: true, order: 1 },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/dashboardPage.vue'),
        meta: { title: '仪表盘', icon: 'dashboard', order: 1 },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/shared/notFoundPage.vue'), // 404页组件
    meta: { title: '404', hideMenu: true }, // 元数据，用于路由守卫等
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
