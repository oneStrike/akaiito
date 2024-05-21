import { Body, Controller, Inject, Post } from '@midwayjs/core'
import { CreateFunPluginDto } from './dto/funPlugin.dto'
import { FunPluginService } from './funPlugin.service'

@Controller('/admin/funPlugin')
export class FunPluginController {
  @Inject()
  funPluginService: FunPluginService

  @Post('/createFunPlugin', { summary: '创建功能插件' })
  async createFunPlugin(@Body() body: CreateFunPluginDto) {
    return this.funPluginService.create(body)
  }
}
