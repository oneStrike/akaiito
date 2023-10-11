// 导入必要的模块
import type { RouteRecordRaw } from 'vue-router'

// 基础路由
const BasicRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/LoginPage.vue'), // 登录页组件
    meta: { title: '登录', hideMenu: true } // 元数据，用于路由守卫等
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/shared/NotFoundPage.vue'), // 404页组件
    meta: { title: '404', hideMenu: true } // 元数据，用于路由守卫等
  }
]

// 自动加载路由
const modules: Record<string, { [key: string]: never }> = import.meta.glob(
  './modules/**/*.ts',
  { eager: true }
) // 获取所有模块
const autoRoutes: RouteRecordRaw[] = []
Object.keys(modules).forEach((key) => {
  autoRoutes.push(modules[key].default) // 将模块添加到自动路由数组中
})

// 导出路由
export const routes = [...BasicRoutes, ...autoRoutes]
