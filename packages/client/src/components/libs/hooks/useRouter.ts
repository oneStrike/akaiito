import type { RouterConfig } from '@/components/libs/types/config'
import type { BackOptions, IRouter, Pages } from '@/components/libs/types/hooks'
import type { WindowExtensions } from '@/env'
import { RouterJumpMethodEnum } from '@/components/libs/enum/router'
import { useModal } from '@/components/libs/hooks/useModal'
import { useStorage } from '@/components/libs/hooks/useStorage'
import { StoreKeyEnum } from '@/enum/storeKey'

export class EsRouter {
  public tabBarPage: Pages[]
  public pages: Pages[]
  private readonly routerStorage = useStorage('ROUTER_QUERY', {}, false)
  private readonly guard?: RouterConfig['routerGuard']
  private readonly enter?: RouterConfig['routerEnter']
  private readonly prefix?: RouterConfig['prefix']

  constructor(config?: RouterConfig) {
    // @ts-expect-error vite.config.ts > define > ROUTES
    const allPageInfo = ROUTES as WindowExtensions['ROUTES']

    this.guard = config?.routerGuard
    this.enter = config?.routerEnter
    this.prefix = config?.prefix
    this.pages = allPageInfo
    this.tabBarPage = allPageInfo.filter((item) => item.tabBar)
  }

  private async jump({ path, name, method, query }: IRouter) {
    if (!path && name) {
      path = `/${this.pages.find((item) => item.name === name)?.path}`
    }
    if (!path || path === '/undefined') {
      useModal({
        content: '敬请期待',
        showCancel: false,
      })
      return
    }
    const { tabBar = '', normal = '' } = this.prefix || {}
    let prefix = normal
    if (method === RouterJumpMethodEnum.ReLaunch) {
      prefix = this.isTabBarPage(path) ? tabBar : normal
    } else if (method === RouterJumpMethodEnum.SwitchTab) {
      prefix = tabBar
    }
    path = prefix + this.fullPath(path, query)
    const routerInfo = this.getRouteByNameOrPath({ path, name })
    const pass = this.guard ? await this.guard(routerInfo!) : true
    if (!method) {
      method = RouterJumpMethodEnum.NavigateTo
    }
    console.log(path)
    if (pass) {
      // @ts-expect-error ignore
      uni[method]({
        url: path,
        success: () => Promise.resolve(),
        fail: (err: any) => Promise.reject(err),
        complete: () => {
          if (this.enter) {
            this.enter(routerInfo!, query)
          }
        },
      })
    }
  }

  // 拼接完整路由地址
  fullPath(path: string, query?: IterateObject) {
    const queryArr: string[] = []
    if (query) {
      for (const queryKey in query) {
        const item = query[queryKey]
        queryArr.push(`${queryKey}=${item}`)
      }
    }
    const joinUnit = path.includes('?') ? '&' : '?'
    const queryStr = queryArr.join('&')
    return path + (queryStr ? joinUnit + queryStr : '')
  }

  // 通过路径或者name获取页面信息
  getRouteByNameOrPath({ name = '', path = '' }) {
    return this.pages.find((item) => item.name === name || item.path === path)
  }

  // 获取当前路由在pages.json的信息
  getRoute() {
    const currentPath = this.currentPageInfo()?.route
    return this.pages.find((item) => item.path === currentPath)
  }

  // 获取传递的query信息
  getQuery() {
    const currentPage = this.currentPageInfo()
    if (!currentPage?.route) {
      return {}
    }
    const isTabBar = this.isTabBarPage(currentPage.route)

    // @ts-expect-error ignore
    const options = currentPage.options
    const storeQuery = this.routerStorage.get()
    if (isTabBar || (!Object.keys(options).length && storeQuery)) {
      const result = storeQuery
      nextTick(this.routerStorage.remove)
      return result || {}
    }

    // #ifdef MP
    for (const optionsKey in options) {
      if (typeof options[optionsKey] === 'string') {
        options[optionsKey] = decodeURIComponent(options[optionsKey])
      }
    }
    // #endif
    nextTick(this.routerStorage.remove)
    return options
  }

  // 是否为tabBar页面
  isTabBarPage(path: string) {
    return !!this.tabBarPage.find((item) => item.path.includes(path))
  }

  // 当前页面信息
  currentPageInfo() {
    const pages = getCurrentPages()
    return pages[pages.length - 1]
  }

  // 数据更新后刷新任意上级页面
  reLoad() {
    const refreshInfo = uni.getStorageSync(StoreKeyEnum.RefreshPage)
    if (refreshInfo) {
      const pageInstance = this.currentPageInfo()
      // @ts-expect-error ignore
      const options = pageInstance?.options
      if (pageInstance) {
        // #ifdef MP
        if (pageInstance.onLoad) {
          pageInstance.onLoad(options)
        }
        // #endif

        // #ifdef H5
        // @ts-expect-error ignore
        if (pageInstance.$.onLoad) {
          // @ts-expect-error ignore
          pageInstance.$.onLoad[0](options)
        }
        // #endif

        refreshInfo.count--
        if (refreshInfo.count > 0) {
          uni.setStorageSync(StoreKeyEnum.RefreshPage, refreshInfo)
        } else {
          uni.removeStorageSync(StoreKeyEnum.RefreshPage)
        }
      }
    }
  }

  // 注入刷新机制
  injectReLoad() {
    // #ifdef MP
    // @ts-expect-error ignore
    uni.onAppRoute(() => {
      this.reLoad()
    })
    // #endif
    // #ifdef H5
    nextTick(() => {
      const appDom = document.getElementById('app')
      // @ts-expect-error ignore
      appDom.__vue_app__.router.beforeEach(() => {
        this.reLoad()
      })
    })
    // #endif
  }

  async switchTab(options: IRouter) {
    if (options.query) {
      this.routerStorage.set(options.query)
      delete options.query
    }
    await this.jump({
      ...options,
      method: RouterJumpMethodEnum.SwitchTab,
    })
  }

  async navigateTo(options: IRouter) {
    await this.jump({
      ...options,
      method: RouterJumpMethodEnum.NavigateTo,
    })
  }

  async redirectTo(options: IRouter) {
    await this.jump({
      ...options,
      method: RouterJumpMethodEnum.Redirect,
    })
  }

  async reLaunch(options: IRouter) {
    await this.jump({
      ...options,
      method: RouterJumpMethodEnum.ReLaunch,
    })
  }

  setRefreshFlag(count = 1) {
    uni.setStorageSync(StoreKeyEnum.RefreshPage, {
      count,
    })
  }

  back(options?: BackOptions) {
    const {
      delay = 0,
      query = {},
      delta = 1,
      refresh = false,
      refreshCount = 1,
    } = options || {}
    if (query) {
      this.routerStorage.set(query)
    }
    if (refresh) {
      this.setRefreshFlag(refreshCount)
    }
    if (delay) {
      const timer = setTimeout(() => {
        uni.navigateBack({
          delta,
        })
        clearTimeout(timer)
      }, delay)
      return
    }
    uni.navigateBack({
      delta,
    })
  }
}
