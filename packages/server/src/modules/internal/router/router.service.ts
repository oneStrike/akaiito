import { Inject, MidwayWebRouterService, Provide } from '@midwayjs/core'

@Provide()
export class RouterService {
  @Inject()
  webRouterService: MidwayWebRouterService

  async getRoutes() {}
}
