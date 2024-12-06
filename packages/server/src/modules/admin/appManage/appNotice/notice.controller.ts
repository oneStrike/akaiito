import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'
import { AppNoticeService } from '@/service/appMgmt/appNotice.service'
import {
  getNoticeListDTO,
  NoticeDTO,
  PublishNoticeDTO,
  UpdateNoticeDTO,
} from '@/modules/admin/appManage/appNotice/dto/notice'
import { BasicIdDTO } from '@/basic/dto/basic.dto'

@Controller('/admin/appNotice')
export class AppNoticeController {
  @Inject()
  NoticeService: AppNoticeService

  @Get('/getAppNoticeList', { summary: '获取客户端通知消息' })
  async getAppNotice(@Query() query: getNoticeListDTO) {
    return await this.NoticeService.findList({
      where: query,
      omit: { content: true, backgroundImage: true },
      include: {
        appPage: {
          select: {
            pageCode: true,
            pageName: true,
            pagePath: true,
          },
        },
      },
    })
  }

  @Get('/getAppNoticeDetail', { summary: '获取客户端通知消息详情' })
  async getAppNoticeDetail(@Query() query: BasicIdDTO) {
    return this.NoticeService.findUnique({
      where: query,
      include: {
        appPage: {
          select: {
            pageCode: true,
            pageName: true,
            pagePath: true,
          },
        },
      },
    })
  }

  @Post('/createAppNotice', { summary: '新增客户端通知消息' })
  async createAppNotice(@Body() body: NoticeDTO) {
    return await this.NoticeService.createNotice(body)
  }

  @Post('/deleteAppNotice', { summary: '删除客户端通知消息' })
  async deleteAppNotice(@Body() body: BasicIdDTO) {
    return await this.NoticeService.delete({ where: body })
  }

  @Post('/updateAppNotice', { summary: '编辑客户端通知消息' })
  async updateAppNotice(@Body() body: UpdateNoticeDTO) {
    return await this.NoticeService.update({ where: { id: body.id }, data: body })
  }

  @Post('/publishAppNotice', { summary: '调整客户端通知消息发布状态' })
  async publishAppNotice(@Body() body: PublishNoticeDTO) {
    return await this.NoticeService.publish(body)
  }
}
