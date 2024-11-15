import { Controller, Get, Inject } from '@midwayjs/core'
import { ClientManageService } from '@/modules/client/clientManage/clientManage.service'

@Controller('/client/clientManage')
export class ClientManageController {
  @Inject()
  clientService: ClientManageService

  @Get('/getSystemConfig', { summary: '获取客户端系统配置' })
  async getSystemConfig() {
    return this.clientService.getSystemConfig()
  }

  @Get('/getPageConfig', { summary: '获取客户端页面配置信息' })
  async getPageConfig() {
    return this.clientService.getPageConfig()
  }

  @Get('/getNotification', { summary: '获取客户端通知公告' })
  async getNotification() {
    return this.clientService.getNotification()
  }
}
