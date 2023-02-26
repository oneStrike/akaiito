import type { RouteRecordRaw } from 'vue-router'
import { router } from '@/router/index'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/layout/Main.vue'),
    meta: { title: '工作台', icon: 'support', hideParent: true },
    redirect: '/workbench',
    children: [
      {
        path: 'workbench',
        name: 'workbench',
        component: () =>
          import('@/views/dashboard/workbench/WorkbenchPage.vue'),
        meta: { roles: [], title: '工作台', icon: 'chart' }
      },
      {
        path: 'console',
        name: 'console',
        component: () => import('@/views/dashboard/console/Console.vue'),
        meta: { roles: [], title: '主控台', icon: 'game' }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginPage.vue'),
    meta: { roles: [], title: '登录', hideMenu: true }
  },
  {
    path: '/redirect',
    name: 'redirect',
    component: () => import('@/layout/Main.vue'),
    meta: { hideMenu: true },
    beforeEnter: (to) => {
      const { query } = to
      const timer = window.setTimeout(() => {
        router
          .replace({
            path: query.path as string
          })
          .then(() => {
            clearTimeout(timer)
          })
      }, 50)
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/exception/404.vue'),
    meta: { title: '404', hideMenu: true }
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
