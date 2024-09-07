import { Controller, Get, Inject, Query } from '@midwayjs/core'
import type { LogDto } from './dto/log.dto'
import type { LogService } from './log.service'

@Controller('/admin/logs')
export class LogController {
  @Inject()
  logServer: LogService

  @Get('/getRequestLogs', { summary: '获取请求日志' })
  async getRequestLogs(@Query() query: LogDto) {
    return await this.logServer.getRequestLogs(query)
  }
}
