import { Controller, Get, Inject } from '@midwayjs/core'
import { BaseController } from '../../../shared/controller/base.controller'
import { LayoutService } from './layout.service'
@Controller('/client/layout')
export class LayoutController extends BaseController {
  @Inject()
  layoutService: LayoutService

  @Get('/homeLayout')
  async getLayout() {
    return await this.layoutService.getLayout()
  }
}
