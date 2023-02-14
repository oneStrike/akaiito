import type {
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
  RouteRecordName
} from 'vue-router'
import type { Tabs } from '@/typings/layout'

import { useSessionStorage } from '@vueuse/core'
import { CacheEnum } from '@/enum/cacheEnum'
import router from '@/router'
import config from '@/config'

class Tab {
  public history = useSessionStorage<Tabs[]>(CacheEnum.HISTORY_TABS, [
    config.HOME_PAGE
  ])
  public fixedTab = config.HOME_PAGE
  public activeTab: Tabs = config.HOME_PAGE

  toggleTab(tab: Tabs) {
    router.replace({ name: tab.pathName })
    this.activeTab = tab
  }

  reload() {
    router.replace({
      name: 'redirect',
      query: {
        path: router.currentRoute.value.fullPath
      }
    })
  }

  clear() {
    this.history.value = [this.fixedTab]
    router.replace({ name: this.fixedTab.pathName })
  }

  addTab(route: RouteLocationNormalizedLoaded) {
    const pushData = this.formatRouteToTab(route)
    this.activeTab = pushData
    if (route.name && route.name !== 'redirect') {
      if (this.getTabIndex(route.name) === -1) {
        this.history.value.push(pushData)
      }
    }
  }

  getTabIndex(pathName?: RouteRecordName) {
    const path = pathName || this.activeTab.pathName
    return this.history.value.findIndex((item) => item.pathName === path)
  }

  close(tab: Tabs) {
    if (this.activeTab.pathName === tab.pathName) {
      this.closeCurrent()
      return
    }
    const tabIndex = this.getTabIndex(tab.pathName)
    console.log('🚀 ~ file:useTabs method:close line:60 -----', tabIndex)
    this.history.value.splice(tabIndex, 1)
  }

  closeCurrent() {
    if (this.activeTab.pathName === this.fixedTab.pathName) {
      this.reload()
      return
    }

    const currentIndex = this.getTabIndex()

    if (currentIndex !== -1) {
      this.history.value.splice(currentIndex, 1)
      const leftTab = this.history.value[currentIndex - 1]
      const rightTab = this.history.value[currentIndex]
      const nextPathName = rightTab?.pathName || leftTab?.pathName
      router.replace({ name: nextPathName })
    }
  }

  closeLeft() {
    const currentIndex = this.getTabIndex()
    const remaining = this.history.value.splice(currentIndex)
    this.history.value = [this.fixedTab, ...remaining]
  }
  closeRight() {
    const currentIndex = this.getTabIndex()
    this.history.value.splice(currentIndex + 1)
  }

  closeOther() {
    const result = this.formatRouteToTab()
    if (result.pathName === this.fixedTab.pathName) {
      this.history.value = [this.fixedTab]
      return
    }
    this.history.value = [this.fixedTab, result]
  }

  isLeft() {
    return this.getTabIndex() === 1 || this.getTabIndex() === 0
  }
  isRight() {
    return this.getTabIndex() === this.history.value.length - 1
  }
  isFixedTab() {
    return this.getTabIndex() === 0
  }

  isCloseOther() {
    return (
      this.getTabIndex() === 0 ||
      (this.history.value.length === 2 && this.getTabIndex() === 1)
    )
  }

  formatRouteToTab(route?: RouteLocationNormalized) {
    if (route) {
      return {
        pathName: route.name,
        title: route.meta.title || '未知'
      } as Tabs
    }
    return this.fixedTab
  }
}

export default new Tab()
