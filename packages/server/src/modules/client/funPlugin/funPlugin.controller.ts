import { Controller, Get, Inject, Query } from '@midwayjs/core'
import type { BasicIdDto } from '@/basic/dto/basic.dto'
import type { GetFunPluginDto } from '@/modules/admin/funPlugin/dto/funPlugin.dto'
import type { FunPluginService } from '@/modules/client/funPlugin/funPlugin.service'

@Controller('/client/funPlugin')
export class FunPluginController {
  @Inject()
  funPluginService: FunPluginService

  @Get('/getFunPlugin', { summary: '获取功能插件列表' })
  async getFunPlugin(@Query() query: GetFunPluginDto) {
    return this.funPluginService.getPage(query)
  }

  @Get('/getFunPluginDetail', { summary: '获取功能插件详情' })
  async getFunPluginDetail(@Query() query: BasicIdDto) {
    return this.funPluginService.getDetail(query.id)
  }
}
