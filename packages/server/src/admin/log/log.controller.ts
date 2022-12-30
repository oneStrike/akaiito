import { Controller, Get, Inject, Query } from '@midwayjs/core'
import { BaseController } from '../../shared/controller/base.controller'
import { LogService } from './log.service'
import { LoginDto } from './dto/login.dto'
import { Validate } from '@midwayjs/validate'

@Controller('/admin/log')
export class LogController extends BaseController {
  @Inject()
  logService: LogService

  @Get('/loginLog', { summary: '获取登录日志' })
  @Validate()
  async loginLog(@Query() param: LoginDto) {
    return await this.logService.findLoginLog(param)
  }
}
