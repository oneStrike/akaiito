import type { Tabs } from '@/typings/layout/tabs'
import type {
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
  RouteRecordName
} from 'vue-router'
import { useStorage } from '@vueuse/core'
import { CacheEnum } from '@/enum/cacheEnum'
import router from '@/router'
import config from '@/config'

/**
 * this是个很大的问题，但是目前还没有比较好地解决方案
 */

class Tab {
  public history = useStorage<Tabs[]>(CacheEnum.HISTORY_TABS, [
    config.HOME_PAGE
  ])
  public route = ref<RouteLocationNormalized>()
  public isRouterAlive = ref<boolean>(true)
  public fixedTab = config.HOME_PAGE

  toggleTab(tab: Tabs) {
    router.replace({ name: tab.pathName })
  }

  reload() {
    return () => {
      this.isRouterAlive.value = false
      nextTick(() => {
        this.isRouterAlive.value = true
      })
    }
  }

  clear() {
    return () => {
      this.history.value = [this.fixedTab]
      router.replace({ name: this.fixedTab.pathName })
    }
  }

  addTab(route: RouteLocationNormalizedLoaded) {
    this.route.value = route
    if (route.name) {
      if (this.getTabIndex() === -1) {
        this.history.value.push(this.formatRouteToTab())
      }
    }
  }

  getTabIndex(pathName?: RouteRecordName) {
    if (this.route.value) {
      const path = pathName || this.route.value.name
      return this.history.value.findIndex((item) => item.pathName === path)
    }
    return 0
  }

  close(tab: Tabs) {
    const route = this.route.value
    if (route && route.name === tab.pathName) {
      this.closeCurrent()()
      return
    }
    const tabIndex = this.getTabIndex(tab.pathName)
    this.history.value.splice(tabIndex, 1)
  }

  closeCurrent() {
    return () => {
      if (this.route.value) {
        if (this.route.value.name === this.fixedTab.pathName) {
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
    }
  }

  closeLeft() {
    return () => {
      if (this.route.value) {
        const currentIndex = this.getTabIndex()
        const remaining = this.history.value.splice(currentIndex)
        this.history.value = [this.fixedTab, ...remaining]
      }
    }
  }
  closeRight() {
    return () => {
      if (this.route.value) {
        const currentIndex = this.getTabIndex()
        this.history.value.splice(currentIndex + 1)
      }
    }
  }

  closeOther() {
    return () => {
      const result = this.formatRouteToTab()
      if (result.pathName === this.fixedTab.pathName) {
        this.history.value = [this.fixedTab]
        return
      }
      this.history.value = [this.fixedTab, result]
    }
  }

  isLeft() {
    return () => this.getTabIndex() === 1 || this.getTabIndex() === 0
  }
  isRight() {
    return () => this.getTabIndex() === this.history.value.length - 1
  }
  isFixedTab() {
    return () => this.getTabIndex() === 0
  }

  isCloseOther() {
    return () =>
      this.getTabIndex() === 0 ||
      (this.history.value.length === 2 && this.getTabIndex() === 1)
  }

  formatRouteToTab() {
    if (this.route.value) {
      return {
        pathName: this.route.value.name,
        title: this.route.value.meta.title || '未知'
      } as Tabs
    }
    return this.fixedTab
  }
}

export default new Tab()
