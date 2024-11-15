import { Inject, Provide } from '@midwayjs/core'
import { ClientConfigService } from '@/modules/admin/clientManage/clientConfig/clientConfig.service'
import { ClientPageService } from '@/modules/admin/clientManage/clientPage/clientPage.service'
import { NotificationService } from '@/modules/admin/clientManage/clientNotification/notification.service'
import * as dayjs from 'dayjs'

@Provide()
export class ClientManageService {
  @Inject()
  clientConfig: ClientConfigService

  @Inject()
  pageService: ClientPageService

  @Inject()
  notificationService: NotificationService

  async getSystemConfig() {
    return this.clientConfig.findUnique({ where: { id: 1 } })
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
