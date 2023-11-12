import { Inject, Provide } from '@midwayjs/core'
import type { Context } from '@midwayjs/koa'
import { AdminLog } from '@prisma/client'

import { ReportResult } from '@akaiito/typings/src'
import { BaseService } from '../../../base/service/base.service'
import { AkaiitoPrisma } from '../../../prisma'
import { utils } from '../../../utils'

@Provide()
export class LogService extends BaseService<AdminLog> {
  @Inject()
  prismaClient: AkaiitoPrisma

  protected get model() {
    return this.prismaClient.adminLog
  }

  async recordLogs(context: Context, report: ReportResult) {
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
