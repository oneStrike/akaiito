import { Controller, Get, Inject } from '@midwayjs/core'
import { BaseController } from '../../../shared/controller/base.controller'
import { PageService } from '../../../service/clientManage/page/page.service'
@Controller('/client/manage')
export class ManageController extends BaseController {
  @Inject()
  pageService: PageService

  @Get('/getPages', { summary: '获取客户端页面列表' })
  async getPage() {
    return this.pageService.findAll()
  }
}
