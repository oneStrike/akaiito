import { Controller, Get, Inject, Query } from '@midwayjs/core'
import { GetFunPluginDto } from './dto/funPlugin.dto'
import { FunPluginService } from './funPlugin.service'

@Controller('/client/funPlugin')
export class FunPluginController {
  @Inject()
  funPluginService: FunPluginService

  @Get('/getFunPlugin', { summary: '获取功能插件列表' })
  async getFunPlugin(@Query() query: GetFunPluginDto) {
    return this.funPluginService.findList({
      ...query,
      fuzzy: ['name']
    })
  }
}
