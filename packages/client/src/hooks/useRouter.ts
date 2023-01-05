import { usePageStore, useUserStore } from '@/stores'
import { RouterJumpMethodEnum } from '@/enum/router'

export interface IRouter {
  path: string
  params?: Record<string, any> | string
  method: RouterJumpMethodEnum
  beforeEach?: () => Promise<boolean>
}

class Router {
  private user = useUserStore()
  private pages = usePageStore()

  private async jump({ path, method, params, beforeEach }: IRouter) {
    const guard = beforeEach ? await beforeEach() : true
    if (guard) {
      uni[method]({
        url: path
      })
    }
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

export const router = new Router()
