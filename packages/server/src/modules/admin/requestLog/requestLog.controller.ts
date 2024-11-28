import { Controller, Get, Inject, Query } from '@midwayjs/core'
import { LogDto } from './dto/requestLog.dto'
import { RequestLogService } from '@/service/log/requestLog.service'

@Controller('/admin/logs')
export class RequestLogController {
  @Inject()
  requestLogService: RequestLogService

  @Get('/getRequestLogs', { summary: '获取请求日志' })
  async getRequestLogs(@Query() query: LogDto) {
    return await this.requestLogService.findPage({ where: query, like: { userMobile: 'startsWith' } })
  }
}
