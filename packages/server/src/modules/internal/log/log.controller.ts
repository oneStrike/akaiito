import { Controller, Get, Inject, Query } from '@midwayjs/core'
import { LogService } from './log.service'
import { LogDto } from './dto/log.dto'

@Controller('/admin/logs')
export class LogController {
  @Inject()
  logServer: LogService

  @Get('/getRequestLogs', { summary: '获取请求日志' })
  async getRequestLogs(@Query() query: LogDto) {
    return await this.logServer.getRequestLogs(query)
  }
}
