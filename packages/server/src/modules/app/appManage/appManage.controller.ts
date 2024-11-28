import { Controller, Get, Inject } from '@midwayjs/core'
import { AppConfigService } from '@/service/appMgmt/appConfig.service'
import { AppPageService } from '@/service/appMgmt/appPage.service'
import { AppNoticeService } from '@/service/appMgmt/appNotice.service'

@Controller('/app/appManage')
export class AppManageController {
  @Inject()
  appConfig: AppConfigService

  @Inject()
  pageService: AppPageService

  @Inject()
  noticeService: AppNoticeService

  @Get('/getSystemConfig', { summary: '获取客户端系统配置' })
  async getSystemConfig() {
    return this.appConfig.findUnique({ where: { id: 1 } })
  }

  @Get('/getPageConfig', { summary: '获取客户端页面配置信息' })
  async getPageConfig() {
    return this.pageService.findList()
  }

  @Get('/getNotification', { summary: '获取客户端通知公告' })
  async getNotification() {
    return this.noticeService.findUnique({ where: { isPublish: 1, endTime: { lte: new Date() } } })
  }
}
