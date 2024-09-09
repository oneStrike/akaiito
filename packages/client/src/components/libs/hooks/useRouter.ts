import { RouterJumpMethodEnum } from '@/components/libs/enum/router'
import { useStorage } from '@/components/libs/hooks/useStorage'
import type { RouterConfig } from '@/components/libs/typings/config'
import type { IRouter, Pages } from '@/components/libs/typings/hooks'
import type { IterateObject } from '@akaiito/typings/src'

export class EsRouter {
  public tabBarPage: Pages[]
  public pages: Pages[]
  private readonly routerStorage = useStorage('ROUTER_QUERY', {}, false)
  private readonly guard?: RouterConfig['routerGuard']
  private readonly enter?: RouterConfig['routerEnter']
  private readonly prefix?: RouterConfig['prefix']

  constructor(config?: RouterConfig) {
    this.guard = config?.routerGuard
    this.enter = config?.routerEnter
    this.prefix = config?.prefix
    // @ts-ignore
    this.pages = window?.ROUTES || ROUTES
    // @ts-ignore
    this.tabBarPage = (window?.ROUTES || ROUTES).filter(item => item.tabBar)
  }

  private async jump({ path, name, method, query }: IRouter) {
    if (!path && name) {
      path = `/${this.pages.find(item => item.name === name)?.path}`
    }
    if (!path) return
    const { tabBar = '', normal = '' } = this.prefix || {}
    let prefix = normal
    if (method === RouterJumpMethodEnum.RELAUNCH) {
      prefix = this.isTabBarPage(path) ? tabBar : normal
    } else if (method === RouterJumpMethodEnum.SWITCH_TAB) {
      prefix = tabBar
    }
    path = prefix + this.fullPath(path, query)
    const pass = this.guard ? await this.guard(path) : true
    if (!method) method = RouterJumpMethodEnum.NAVIGATE
    if (pass) {
      // @ts-ignore
      uni[method]({
        url: path,
        success: () => Promise.resolve(),
        fail: (err: any) => Promise.reject(err),
        complete: (res: any) => {
          this.enter && this.enter(res)
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

  // 获取当前路由在pages.json的信息
  getRoute() {
    const currentPath = getCurrentPages().at(-1)?.route
    return this.pages.find(item => item.path === currentPath)
  }

  // 获取传递的query信息
  getQuery() {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    if (!currentPage?.route) return {}
    const isTabBar = this.isTabBarPage(currentPage.route)

    const options = currentPage.options
    if (isTabBar) {
      const result = this.routerStorage.get()
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

    return options
  }

  // 是否为tabBar页面
  isTabBarPage(path: string) {
    return !!this.tabBarPage.find(item => item.path.includes(path))
  }

  async switchTab(options: IRouter) {
    if (options.query) {
      this.routerStorage.set(options.query)
      delete options.query
    }
    await this.jump({ ...options, method: RouterJumpMethodEnum.SWITCH_TAB })
  }

  async navigateTo(options: IRouter) {
    await this.jump({ ...options, method: RouterJumpMethodEnum.NAVIGATE })
  }

  async redirectTo(options: IRouter) {
    await this.jump({ ...options, method: RouterJumpMethodEnum.REDIRECT })
  }

  async reLaunch(options: IRouter) {
    await this.jump({ ...options, method: RouterJumpMethodEnum.RELAUNCH })
  }

  back(delta = 1, query?: IterateObject) {
    if (query) {
      this.routerStorage.set(query)
    }
    uni.navigateBack({ delta })
  }
}
