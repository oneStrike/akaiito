import { Controller, Get, Inject } from '@midwayjs/core'
import { AppRequestPlatform } from '@/decorator/appRequestClient.decorator'
import { AppConfigService } from '@/service/appOperations/config/appConfig.service'
import { AppPageService } from '@/service/appOperations/pages/appPage.service'
import { AppNoticeService } from '@/service/appOperations/notice/appNotice.service'

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

  @Get('/getNotice', { summary: '获取客户端通知公告' })
  async getNotification(@AppRequestPlatform() platform: string) {
    const options: any = {
      where: {
        isPublish: 1,
        OR: [
          { endTime: null },
          { endTime: { gte: new Date() } },
          { startTime: null },
          { startTime: { lte: new Date() } },
        ],
      },
    }
    switch (platform) {
      case 'web':
        options.where.enableWeb = 1
        break
      case 'app':
        options.where.enableApp = 1
        break
      case 'applet':
        options.where.enableApplet = 1
        break
    }
    return this.noticeService.findFirst(options)
  }
}
