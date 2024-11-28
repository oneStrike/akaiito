import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'
import { NoticeService } from '@/modules/admin/appManage/appNotice/notice.service'
import {
  getNoticeListDto,
  NoticeDto,
  PublishNoticeDto,
  UpdateNoticeDto,
} from '@/modules/admin/appManage/appNotice/dto/notice'
import { BasicIdDto } from '@/basic/dto/basic.dto'

@Controller('/admin/appNotice')
export class AppNoticeController {
  @Inject()
  NoticeService: NoticeService

  @Get('/getAppNoticeList', { summary: '获取客户端通知消息' })
  async getAppNotice(@Query() query: getNoticeListDto) {
    return await this.NoticeService.findList({ where: query, omit: { content: true, backgroundImage: true } })
  }

  @Get('/getAppNoticeDetail', { summary: '获取客户端通知消息详情' })
  async getAppNoticeDetail(@Query() query: BasicIdDto) {
    return await this.NoticeService.findUnique({ where: query })
  }

  @Post('/createAppNotice', { summary: '新增客户端通知消息' })
  async createAppNotice(@Body() body: NoticeDto) {
    return await this.NoticeService.create({ data: body })
  }

  @Post('/deleteAppNotice', { summary: '删除客户端通知消息' })
  async deleteAppNotice(@Body() body: BasicIdDto) {
    return await this.NoticeService.delete({ where: body })
  }

  @Post('/updateAppNotice', { summary: '编辑客户端通知消息' })
  async updateAppNotice(@Body() body: UpdateNoticeDto) {
    return await this.NoticeService.update({ where: { id: body.id }, data: body })
  }

  @Post('/publishAppNotice', { summary: '调整客户端通知消息发布状态' })
  async publishAppNotice(@Body() body: PublishNoticeDto) {
    return await this.NoticeService.update({ where: { id: body.id }, data: body })
  }
}
