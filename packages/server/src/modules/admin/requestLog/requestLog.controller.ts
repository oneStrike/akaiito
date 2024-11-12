import { Controller, Get, Inject, Query } from '@midwayjs/core'
import { LogDto } from './dto/requestLog.dto'
import { RequestLogService } from './requestLog.service'

@Controller('/admin/logs')
export class RequestLogController {
  @Inject()
  requestLogService: RequestLogService

  @Get('/getRequestLogs', { summary: '获取请求日志' })
  async getRequestLogs(@Query() query: LogDto) {
    console.log(query)
    return await this.requestLogService.findPage({ where: query, like: { userMobile: 'startsWith' } })
  }
}
