import { Inject, MidwayWebRouterService, Provide } from '@midwayjs/core'
import type { RouterInfo } from '@midwayjs/core'

@Provide()
export class RouterService {
  @Inject()
  webRouterService: MidwayWebRouterService

  @Inject('router')
  router: RouterInfo[]

  async getRoutes() {
    return this.router
  }

  getRoute(path: string) {
    if (!Array.isArray(this.router) || !this.router.length) {
      return ''
    }
    return this.router.find((item) => item.fullUrl === path)
  }
}
