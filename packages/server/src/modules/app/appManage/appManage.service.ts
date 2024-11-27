import { Inject, Provide } from '@midwayjs/core'
import { AppConfigService } from '@/modules/admin/appManage/appConfig/appConfig.service'
import { AppPageService } from '@/modules/admin/appManage/appPage/appPage.service'
import { NoticeService } from '@/modules/admin/appManage/appNotice/notice.service'
import * as dayjs from 'dayjs'

@Provide()
export class AppManageService {
  @Inject()
  appConfig: AppConfigService

  @Inject()
  pageService: AppPageService

  @Inject()
  notificationService: NoticeService

  async getSystemConfig() {
    return this.appConfig.findUnique({ where: { id: 1 } })
  }

  async getPageConfig() {
    return this.pageService.findList()
  }

  async getNotification() {
    const notification = await this.notificationService.findUnique({ where: { id: 1 } })
    if (!notification) {
      return {}
    }
    const { startTime, endTime } = notification
    if (!startTime && !endTime) {
      return {}
    }

    if (!startTime) {
      return dayjs() < dayjs(endTime) ? notification : {}
    }
    if (!endTime) {
      return dayjs() > dayjs(startTime) ? notification : {}
    }
  }
}
