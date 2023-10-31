import { Controller, Get, Inject, Post, Body, Query } from '@midwayjs/core'
import { LogService } from './log.service'
import { BaseIdDto, BasePageDto } from '../../../base/dto/base.dto'

@Controller('/admin/log')
export class LogController {
  @Inject()
  logServer: LogService

  @Get('/getLogs')
  async getLogs(@Query() query: BasePageDto) {
    return await this.logServer.findPage(query)
  }

  @Post('/deleteLog')
  async deleteLog(@Body() body: BaseIdDto) {
    return await this.logServer.softDeletion(body)
  }
}
