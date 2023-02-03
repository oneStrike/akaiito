// import { useUserStore } from '@/stores'
import routes from '@/router/routes'
import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import router from '@/router'
class UseMenu {
  // private readonly role = useUserStore().userInfo.isRoot
  private readonly role = 'admin'
  menus: RouteRecordRaw[]

  constructor() {
    this.menus = this.getMenu()
  }

  getMenu() {
    return this.pureRoutes()
  }

  /**
   * 净化路由
   * @returns
   */
  pureRoutes(menu?: RouteRecordRaw[]) {
    menu = menu || routes
    const menus: RouteRecordRaw[] = []
    menu.forEach((item) => {
      const meta = item.meta
      if (meta && this.isValid(meta) && !meta.hideAllMenu) {
        const loadData = meta.hideParent ? item.children : item
        if (loadData) {
          if (Array.isArray(loadData)) {
            this.pureRoutes(loadData)
          } else {
            if (loadData.children && loadData.children.length) {
              loadData.children = this.pureChildrenRoutes(loadData.children)
            }
          }
          const pushData = Array.isArray(loadData) ? loadData : [loadData]
          menus.push(...pushData)
        }
      }
    })
    return this.sortMenu(menus)
  }

  /**
   * 净化子路由
   * @param route
   * @returns
   */
  pureChildrenRoutes(route: RouteRecordRaw[]) {
    const bottle: RouteRecordRaw[] = []
    this.sortMenu(route).forEach((item) => {
      const meta = item.meta
      if (item.children && item.children.length) {
        item.children = this.pureChildrenRoutes(item.children)
      }
      if (meta && this.isValid(meta) && !meta.hideMenu) {
        bottle.push(item)
      }
    })
    return bottle
  }

  /**
   * 菜单排序
   * @param route
   * @returns
   */
  sortMenu(route: RouteRecordRaw[]) {
    return route.sort((a, b) => {
      return (a.meta?.sort ?? 0) - (b.meta?.sort ?? 0)
    })
  }

  /**
   * 检验是否拥有权限
   * @param meta
   * @returns
   */
  isValid(meta: RouteMeta) {
    return !meta.roles || !meta.roles.length || meta.roles.includes(this.role)
  }

  /**
   * 获取当前活跃的路由
   * @param menu
   * @param child
   * @param joinKey
   */
  getActiveKey(
    menu: RouteRecordRaw,
    child?: RouteRecordRaw,
    joinKey?: string
  ): string {
    if (child) {
      const key = menu.path + '/' + child.path

      return joinKey ? joinKey + key : key
    } else {
      const key = '/' + menu.path
      return joinKey ? joinKey + key : key
    }
  }

  /**
   * 路由跳转
   * @param route
   */
  async linkPage(route: RouteRecordRaw) {
    if (route.path) {
      try {
        await router.push({ name: route.path })
      } catch (e) {
        console.log('🚀 ~ file:useMenu method:linkPage line:115 -----', routes)
        await router.replace({ name: '404' })
      }
    } else if (route.meta?.url) {
      window.open(route.meta.url)
    }
  }
}

export default new UseMenu()
