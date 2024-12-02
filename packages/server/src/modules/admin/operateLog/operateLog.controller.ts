import { Controller, Get, Inject, Query } from '@midwayjs/core'
import { OperateLogDTO } from './dto/operateLog.dto'
import { OperateLogService } from '@/service/log/operateLog.service'

@Controller('/admin/logs')
export class OperateLogController {
  @Inject()
  requestLogService: OperateLogService

  @Get('/getRequestLogs', { summary: '获取请求日志' })
  async getRequestLogs(@Query() query: OperateLogDTO) {
    return await this.requestLogService.findPage({ where: query, like: { userMobile: 'startsWith' } })
  }
}
