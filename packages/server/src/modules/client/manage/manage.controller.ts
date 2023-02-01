import { Controller, Get, Inject } from '@midwayjs/core'
import { BaseController } from '../../../shared/controller/base.controller'
import { TransitService } from '../../../service/transit.service'
@Controller('/client/manage')
export class ManageController extends BaseController {
  @Inject()
  transitService: TransitService

  @Get('/getPages', { summary: '获取客户端页面列表' })
  async getPage() {
    return this.transitService.clientPages()
  }

  @Get('/getSystemConfig', { summary: '获取客户端页面列表' })
  async clientSystemConfigInfo() {
    return this.transitService.clientSystemConfigInfo()
  }
}
