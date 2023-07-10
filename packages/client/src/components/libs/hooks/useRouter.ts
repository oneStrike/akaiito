import { RouterJumpMethodEnum } from '@/components/libs/enum/router'
import type { RouterConfig } from '@/components/libs/typings/config'
import type { IRouter, Pages } from '@/components/libs/typings/hooks'

export class LkRouter {
  public tabBarPage: Pages[]
  private readonly guard?: RouterConfig['routerGuard']
  private readonly enter?: RouterConfig['routerEnter']
  private readonly prefix?: RouterConfig['prefix']

  constructor(config?: RouterConfig) {
    this.guard = config?.routerGuard
    this.enter = config?.routerEnter
    this.prefix = config?.prefix
    this.tabBarPage = ROUTES.filter((item) => item.tabBar)
  }

  private async jump({ path, method, params }: IRouter) {
    let prefix = this.prefix?.normal || ''
    if (this.isTabBarPage(path) && method !== RouterJumpMethodEnum.RELAUNCH) {
      method = RouterJumpMethodEnum.SWITCH_TAB
      prefix = this.prefix?.tabBar || ''
    }
    path = prefix + this.fullPath(path, params)
    let pass = true
    if (this.guard) {
      pass = await this.guard(path)
    }
    if (pass && method) {
      path = params
        ? path + '?params=' + encodeURIComponent(JSON.stringify(params))
        : path
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
  fullPath(path: string, params?: ObjType) {
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
    return this.tabBarPage.find((item) => item.path === path)
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
