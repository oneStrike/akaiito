import { RouterJumpMethodEnum } from '@/components/libs/enum/router'
import type { RouterConfig } from '@/components/libs/typings/config'
import type { IRouter, Pages } from '@/components/libs/typings/hooks'
import type { IterateObject } from '@akaiito/typings/src'

export class EsRouter {
  public tabBarPage: Pages[]
  public pages: Pages[]
  private readonly guard?: RouterConfig['routerGuard']
  private readonly enter?: RouterConfig['routerEnter']
  private readonly prefix?: RouterConfig['prefix']

  constructor(config?: RouterConfig) {
    this.guard = config?.routerGuard
    this.enter = config?.routerEnter
    this.prefix = config?.prefix
    this.pages = ROUTES
    this.tabBarPage = ROUTES.filter((item) => item.tabBar)
  }

  private async jump({ path, method, params }: IRouter) {
    const { tabBar = '', normal = '' } = this.prefix || {}
    let prefix = normal
    if (method === RouterJumpMethodEnum.RELAUNCH) {
      prefix = this.isTabBarPage(path) ? tabBar : normal
    } else if (method === RouterJumpMethodEnum.SWITCH_TAB) {
      prefix = tabBar
    }
    path = prefix + this.fullPath(path, params)
    const pass = this.guard ? await this.guard(path) : true
    if (pass) {
      console.log(path)
      // @ts-ignore
      uni[method]({
        url: path,
        success: () => Promise.resolve(),
        fail: (err: any) => Promise.reject(err),
        complete: (res: any) => {
          this.enter && this.enter(res)
        }
      })
    }
  }

  //拼接完整路由地址
  fullPath(path: string, params?: IterateObject) {
    const query: string[] = []
    if (params) {
      for (const paramsKey in params) {
        const item = params[paramsKey]
        query.push(`${paramsKey}=${item}`)
      }
    }
    const joinUnit = path.includes('?') ? '&' : '?'
    const queryStr = query.join('&')
    return path + (queryStr ? joinUnit + queryStr : '')
  }

  //是否为tabBar页面
  isTabBarPage(path: string) {
    return this.tabBarPage.find((item) => item.path.includes(path))
  }

  async switchTab(options: IRouter) {
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

  back(delta = 1) {
    uni.navigateBack({ delta })
  }
}
