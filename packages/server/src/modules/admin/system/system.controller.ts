import { Controller, Get, Inject, Query } from '@midwayjs/core'
import { LogService } from '../../internal/log/log.service'
import { LogDto } from './dto/log.dto'

@Controller('/admin/system')
export class SystemController {
  @Inject()
  logService: LogService

  @Get('/getRequestLog', { summary: '获取系统请求日志' })
  async getRequestLog(@Query() query: LogDto) {
    return this.logService.findPage(query)
  }
}
