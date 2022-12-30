import { Controller, Fields, Files, Get, Inject, Post } from '@midwayjs/core'
import { BaseController } from '../../shared/controller/base.controller'
import { SystemService } from './system.service'

@Controller('/admin/system')
export class SystemController extends BaseController {
  @Inject()
  systemService: SystemService

  @Get('/info', { summary: '获取服务器基本信息' })
  async getSystemInfo() {
    return this.systemService.getSystemInfo()
  }

  @Post('/upload', { summary: '上传静态资源' })
  async upload(@Files() files, @Fields() fields) {
    return await this.systemService.publicFileStorageMethod(files, fields)
  }
}
