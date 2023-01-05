import { Controller, Get, Redirect } from '@midwayjs/core'
import { BaseController } from '../../../shared/controller/base.controller'

@Controller('/client/manage')
export class ManageController extends BaseController {
  @Get('/getPages', { summary: '获取客户端页面配置信息' })
  @Redirect('/admin/clientManage/getClientPage', 200)
  async getPage() {}
}
