import router from '@/router'
import routes from '@/router/routes'
import type { RouteMeta, RouteRecordName, RouteRecordRaw } from 'vue-router'
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface'
import { CacheEnum } from '@/enum/cacheEnum'
import { useSessionStorage } from '@vueuse/core'

class UseMenu {
  private readonly identity = 'admin'
  routers = routes
  menus: RouteRecordRaw[] | undefined
  openKeys = useSessionStorage<string[]>(CacheEnum.OPEN_MENU_KEYS, [
    'dashboard'
  ])
  rootSubmenuKeys = routes.map((item) => item.name)

  constructor() {
    this.menus = this.getMenus()
  }

  getMenus() {
    return this.pureRoutes()
  }

  getMenuOpenKeys() {
    this.openKeys.value = router.currentRoute.value.matched.map(
      (item) => item.name as string
    )
  }

  menuOpenChange(keys: string[]) {
    if (!keys.length) return

    if (keys.length === 1) {
      this.openKeys.value = keys
      return
    }

    const latestOpenKey = keys.find(
      (key) => this.openKeys.value.indexOf(key) === -1
    )

    if (this.rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      this.openKeys.value = keys
    } else {
      this.openKeys.value = latestOpenKey ? [latestOpenKey] : []
    }
  }

  /**
   * 净化路由
   * @returns
   */
  pureRoutes(menu?: RouteRecordRaw[]) {
    menu = menu || this.routers
    const filterMenu = this.isMenuRouter(menu)
    const sortMenu = this.sortMenu(filterMenu)
    const menus: RouteRecordRaw[] = []
    sortMenu.forEach((item) => {
      const meta = item.meta!
      if (this.isValid(meta)) {
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
    const routes = this.isMenuRouter(this.sortMenu(route))
    routes.forEach((item) => {
      const meta = item.meta!
      if (item.children && item.children.length) {
        item.children = this.pureChildrenRoutes(item.children)
      }
      if (this.isValid(meta)) {
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
   * 判断路由是否显示在菜单中
   * @param routes
   */
  isMenuRouter(routes: RouteRecordRaw[]) {
    return routes.filter((item) => {
      const meta = item.meta
      return !(!meta || !meta.icon || meta.hideAllMenu)
    })
  }

  /**
   * 检验是否拥有权限
   * @param meta
   * @returns
   */
  isValid(meta: RouteMeta) {
    return (
      !meta.roles || !meta.roles.length || meta.roles.includes(this.identity)
    )
  }

  /**
   * 路由跳转
   * @param menuInfo
   */
  linkPage(menuInfo: MenuInfo) {
    try {
      router.push({ name: menuInfo.key as RouteRecordName })
    } catch (e) {
      router.replace({ name: '404' })
    }
  }
}

export const useMenu = new UseMenu()
