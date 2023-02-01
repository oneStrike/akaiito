import { Controller, Get, Inject } from '@midwayjs/core'
import { BaseController } from '../../../../shared/controller/base.controller'
import { SystemService } from './system.service'
@Controller('/admin/clientManage')
export class SystemController extends BaseController {
  @Inject()
  systemService: SystemService

  @Get('/getSystemConfig', { summary: '获取客户端系统配置信息' })
  async getClientSystemConfig() {
    return await this.systemService.findByPk(1)
  }
}
