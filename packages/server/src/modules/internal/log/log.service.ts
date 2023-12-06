import { Inject, Provide } from '@midwayjs/core'
import type { Context } from '@midwayjs/koa'
import { AdminLog, PrismaClient } from '@prisma/client'

import { ReportResult } from '@akaiito/typings/src'
import { BaseService } from '../../../base/service/base.service'
import { utils } from '../../../utils'

@Provide()
export class LogService extends BaseService<AdminLog> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.adminLog
  }

  async recordLogs(context: Context, report: ReportResult) {
    console.log(context.req)
    const { path, method, header } = context

    const ip = utils.sysUtils.getReqIP(context)
    const ipAddress = utils.sysUtils.getIpAddr(ip) as string

    await this.create({
      ip,
      ipAddress,
      method,
      path,
      statusCode: report.code,
      statusDesc: report.desc,
      userAgent: header['user-agent']
    })
  }
}
