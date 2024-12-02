import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'
import { AppPageService } from '@/service/appMgmt/appPage.service'
import { AppPageQueryDTO, AppPagesDTO } from '@/modules/admin/appManage/appPage/dto/appPages.dto'
import { BasicIdDTO } from '@/basic/dto/basic.dto'

@Controller('/admin/appPageConfig')
export class AppPageController {
  @Inject()
  pageService: AppPageService

  @Get('/getAppPages', { summary: '获取客户端页面' })
  async getAppPages(@Query() query: AppPageQueryDTO) {
    return await this.pageService.findPage({ where: query })
  }

  @Get('/getAppPageDetail', { summary: '获取客户端页面详情' })
  async getAppPageDetail(@Query() query: BasicIdDTO) {
    return await this.pageService.findUnique({ where: query })
  }

  @Post('/createAppPage', { summary: '创建客户端页面' })
  async createAppPage(@Body() body: AppPagesDTO) {
    return await this.pageService.create({ data: body })
  }

  @Post('/updateAppPage', { summary: '更新客户端页面' })
  async updateAppPage(@Body() body: AppPagesDTO & BasicIdDTO) {
    return await this.pageService.update({ where: { id: body.id }, data: body })
  }

  @Post('/deleteAppPage', { summary: '删除客户端页面' })
  async deleteAppPage(@Body() body: BasicIdDTO) {
    return await this.pageService.delete({ where: { id: body.id } })
  }
}
