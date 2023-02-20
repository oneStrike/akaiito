import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import router from '@/router'

/**
 * 检验是否拥有权限
 * @param meta
 * @returns
 */
const isValid = (meta: RouteMeta, role: any) => {
  return !meta.roles || !meta.roles.length || meta.roles.includes(role)
}

/**
 * 净化路由
 * @returns
 */

const formatMenus = (menus: RouteRecordRaw[], role: any) => {
  const innerMenus: RouteRecordRaw[] = []
  menus.forEach((item) => {
    const metaInfo = item.meta
    if (metaInfo && isValid(metaInfo, role) && !metaInfo.hideAllMenu) {
      const loadData = metaInfo.hideParent ? item.children : item
      if (loadData) {
        if (Array.isArray(loadData)) {
          formatMenus(loadData, role)
        } else {
          if (loadData.children && loadData.children.length) {
            loadData.children = pureChildrenRoutes(loadData.children, role)
          }
        }
        const pushData = Array.isArray(loadData) ? loadData : [loadData]
        innerMenus.push(...pushData)
      }
    }
  })
  return innerMenus
}

/**
 * 净化子路由
 * @param route
 * @returns
 */
const pureChildrenRoutes = (route: RouteRecordRaw[], role: any) => {
  const bottle: RouteRecordRaw[] = []
  sortMenu(route).forEach((item) => {
    const meta = item.meta
    if (item.children && item.children.length) {
      item.children = pureChildrenRoutes(item.children, role)
    }
    if (meta && isValid(meta, role) && !meta.hideMenu) {
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
const sortMenu = (route: RouteRecordRaw[]) => {
  return route.sort((a, b) => {
    return (a.meta?.sort ?? 0) - (b.meta?.sort ?? 0)
  })
}

/**
 * 路由跳转
 * @param route
 */
const linkPage = async (route: RouteRecordRaw) => {
  if (route.name) {
    try {
      await router.push({ name: route.name })
    } catch (e) {
      await router.replace({ name: '404' })
    }
  } else if (route.meta?.url) {
    window.open(route.meta.url)
  }
}

export const useMenu = {
  formatMenus,
  linkPage
}
