import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/LoginPage.vue'),
    meta: { roles: [], title: '登录', hide: true }
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
export default [...routes, ...autoRoutes]
