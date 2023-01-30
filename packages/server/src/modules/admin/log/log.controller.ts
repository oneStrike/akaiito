import { Controller, Get, Inject, Query } from '@midwayjs/core'
import { BaseController } from '../../../shared/controller/base.controller'
import { LogService } from './log.service'
import { LoginLogDto } from './dto/loginLog.dto'
import { Validate } from '@midwayjs/validate'
import { Serialize } from '../../../decorator/serialize.decorator'

@Controller('/admin/log')
export class LogController extends BaseController {
  @Inject()
  logService: LogService

  static pure = ['path']

  @Get('/loginLog', { summary: '获取登录日志' })
  @Validate()
  @Serialize('list')
  async loginLog(@Query() query: LoginLogDto) {
    return await this.logService.findLoginLog(query)
  }
}
