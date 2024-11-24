import { Controller, Get, Inject } from '@midwayjs/core'
import { AppManageService } from '@/modules/app/appManage/appManage.service'

@Controller('/app/appManage')
export class AppManageController {
  @Inject()
  appService: AppManageService

  @Get('/getSystemConfig', { summary: '获取客户端系统配置' })
  async getSystemConfig() {
    return this.appService.getSystemConfig()
  }

  @Get('/getPageConfig', { summary: '获取客户端页面配置信息' })
  async getPageConfig() {
    return this.appService.getPageConfig()
  }

  @Get('/getNotification', { summary: '获取客户端通知公告' })
  async getNotification() {
    return this.appService.getNotification()
  }
}
