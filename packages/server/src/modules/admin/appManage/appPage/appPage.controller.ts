import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'
import { AppPageService } from '@/modules/admin/appManage/appPage/appPage.service'
import { AppPageQueryDto, AppPagesDto } from '@/modules/admin/appManage/appPage/dto/appPages.dto'
import { BasicIdDto } from '@/basic/dto/basic.dto'

@Controller('/admin/appPageConfig')
export class AppPageController {
  @Inject()
  pageService: AppPageService

  @Get('/getAppPages', { summary: '获取客户端页面' })
  async getAppPages(@Query() query: AppPageQueryDto) {
    return await this.pageService.findPage({ where: query })
  }

  @Get('/getAppPageDetail', { summary: '获取客户端页面详情' })
  async getAppPageDetail(@Query() query: BasicIdDto) {
    return await this.pageService.findUnique({ where: query })
  }

  @Post('/createAppPage', { summary: '创建客户端页面' })
  async createAppPage(@Body() body: AppPagesDto) {
    return await this.pageService.create({ data: body })
  }

  @Post('/updateAppPage', { summary: '更新客户端页面' })
  async updateAppPage(@Body() body: AppPagesDto & BasicIdDto) {
    return await this.pageService.update({ where: { id: body.id }, data: body })
  }

  @Post('/deleteAppPage', { summary: '删除客户端页面' })
  async deleteAppPage(@Body() body: BasicIdDto) {
    return await this.pageService.delete({ where: { id: body.id } })
  }
}
