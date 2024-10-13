import { Controller, Get, Inject, Query } from '@midwayjs/core'
import { LogDto } from './dto/log.dto'
import { LogService } from './log.service'

@Controller('/admin/logs')
export class LogController {
  @Inject()
  logServer: LogService

  @Get('/getRequestLogs', { summary: '获取请求日志' })
  async getRequestLogs(@Query() query: LogDto) {
    console.log(query)
    return await this.logServer.getRequestLogs(query)
  }
}
