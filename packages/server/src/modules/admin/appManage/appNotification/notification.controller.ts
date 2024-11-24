import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'
import { NotificationService } from '@/modules/admin/appManage/appNotification/notification.service'
import {
  getNotificationListDto,
  NotificationDto,
} from '@/modules/admin/appManage/appNotification/dto/notification.dto'
import { BasicIdDto } from '@/basic/dto/basic.dto'

@Controller('/admin/appNotification')
export class AppNotificationController {
  @Inject()
  notificationService: NotificationService

  @Get('/getAppNotificationList', { summary: '获取客户端通知消息' })
  async getAppNotification(@Query() query: getNotificationListDto) {
    return await this.notificationService.findList({ where: query, omit: { content: true, backgroundImage: true } })
  }

  @Get('/getAppNotificationDetail', { summary: '获取客户端通知消息详情' })
  async getAppNotificationDetail(@Query() query: BasicIdDto) {
    return await this.notificationService.findList({ where: query })
  }

  @Post('/createClientNotification', { summary: '新增客户端通知消息' })
  async createClientNotification(@Body() body: NotificationDto) {
    return await this.notificationService.create({ data: body })
  }

  @Post('/deleteClientNotification', { summary: '删除客户端通知消息' })
  async deleteClientNotification(@Body() body: BasicIdDto) {
    return await this.notificationService.delete({ where: body })
  }

  @Post('/updateClientNotification', { summary: '编辑客户端通知消息' })
  async updateClientNotification(@Body() body: NotificationDto & BasicIdDto) {
    return await this.notificationService.update({ where: { id: body.id }, data: body })
  }
}
