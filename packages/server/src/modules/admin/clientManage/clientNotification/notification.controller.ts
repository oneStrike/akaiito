import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'
import { NotificationService } from '@/modules/admin/clientManage/clientNotification/notification.service'
import {
  getNotificationListDto,
  NotificationDto,
} from '@/modules/admin/clientManage/clientNotification/dto/notification.dto'
import { BasicIdDto, BasicIdStatusDto } from '@/basic/dto/basic.dto'

@Controller('/admin/clientNotification')
export class ClientNotificationController {
  @Inject()
  notificationService: NotificationService

  @Get('/getClientNotificationList', { summary: '获取客户端通知消息' })
  async getClientNotification(@Query() query: getNotificationListDto) {
    return await this.notificationService.findList({ where: query, omit: { content: true, backgroundImage: true } })
  }

  @Get('/getClientNotificationDetail', { summary: '获取客户端通知消息详情' })
  async getClientNotificationDetail(@Query() query: BasicIdDto) {
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

  @Post('/updateClientNotificationStatus', { summary: '启用或禁用客户端通知消息' })
  async updateClientNotificationStatus(@Body() body: BasicIdStatusDto) {
    return await this.notificationService.updateStatus(body)
  }
}
