import type { RouteRecordRaw } from 'vue-router'

const BasicRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/LoginPage.vue'),
    meta: { title: '登录', hideMenu: true }
  }
]

//自动加载路由
const modules: Record<
  string,
  {
    [key: string]: never
  }
> = import.meta.glob('./modules/**/*.ts', { eager: true })

const autoRoutes = [] as RouteRecordRaw[]
Object.keys(modules).forEach((key) => {
  autoRoutes.push(modules[key].default)
})
export const routes = [...BasicRoutes, ...autoRoutes]
