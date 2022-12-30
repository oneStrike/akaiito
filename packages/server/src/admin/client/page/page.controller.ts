import { Body, Controller, Get, Inject, Post } from '@midwayjs/core'
import { BaseController } from '../../../shared/controller/base.controller'
import { PageService } from './page.service'
import { ModifyPageDto } from './dto/page.dto'

@Controller('/admin/client')
export class PageController extends BaseController {
  @Inject()
  pageService: PageService

  @Get('/getPage', { summary: '获取客户端页面列表' })
  async getClientPageList() {
    return await this.pageService.findAll()
  }

  @Post('/modifyPage', { summary: '修改客户端页面信息' })
  async modifyClientPage(@Body() body: ModifyPageDto) {
    return await this.pageService.update(body)
  }
}
