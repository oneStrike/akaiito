import { Body, Controller, Get, Inject, Post } from '@midwayjs/core'
import { BaseController } from '../../../../shared/controller/base.controller'
import { PageService } from './page.service'
import { updatePageDto } from './dto/page.dto'

@Controller('/admin/clientManage')
export class PageController extends BaseController {
  @Inject()
  pageService: PageService

  @Get('/getClientPage', { summary: '获取客户端页面列表' })
  async getClientPageList() {
    return await this.pageService.findAll()
  }

  @Post('/updateClientPage', { summary: '修改客户端页面信息' })
  async modifyClientPage(@Body() body: updatePageDto) {
    return await this.pageService.update(body)
  }
}
