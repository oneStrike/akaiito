import { Controller, Get, Inject } from '@midwayjs/core'
import { BaseController } from '../../../shared/controller/base.controller'
import { SystemService } from './system.service'

@Controller('/admin/system')
export class SystemController extends BaseController {
  @Inject()
  systemService: SystemService

  @Get('/systemInfo', { summary: '获取服务器基本信息' })
  async getSystemInfo() {
    return this.systemService.getSystemInfo()
  }
}
