import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'admin',
    component: () => import('@/layouts/CommonPage.vue'),
    meta: { title: '工作台', icon: 'support', hideParent: true },
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard/DashboardPage.vue'),
        meta: { roles: [], title: '工作台', icon: 'support' }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login/LoginPage.vue'),
    meta: { roles: [], title: '登录', hideAllMenu: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/Exception/404.vue'),
    meta: { title: '404', hideAllMenu: true }
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
