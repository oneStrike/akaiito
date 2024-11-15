import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'
import { ClientPageService } from '@/modules/admin/clientManage/clientPage/clientPage.service'
import { ClientPageQueryDto, ClientPagesDto } from '@/modules/admin/clientManage/clientPage/dto/clientPages.dto'
import { BasicIdDto } from '@/basic/dto/basic.dto'

@Controller('/admin/clientPageConfig')
export class ClientPageController {
  @Inject()
  pageService: ClientPageService

  @Get('/getClientPages', { summary: '获取客户端页面' })
  async getClientPages(@Query() query: ClientPageQueryDto) {
    return await this.pageService.findPage({ where: query })
  }

  @Post('/createClientPage', { summary: '创建客户端页面' })
  async createClientPage(@Body() body: ClientPagesDto) {
    return await this.pageService.create({ data: body })
  }

  @Post('/updateClientPage', { summary: '更新客户端页面' })
  async updateClientPage(@Body() body: ClientPagesDto & BasicIdDto) {
    return await this.pageService.update({ where: { id: body.id }, data: body })
  }

  @Post('/deleteClientPage', { summary: '删除客户端页面' })
  async deleteClientPage(@Body() body: BasicIdDto) {
    return await this.pageService.delete({ where: { id: body.id } })
  }
}
