import { Inject, Provide } from '@midwayjs/core'
import type { Context } from '@midwayjs/koa'
import { AdminLog, PrismaClient } from '@prisma/client'

import { HttpResponseResult, IterateObject } from '@akaiito/typings/src'
import { BasicService } from '../../../basic/service/basic.service'
import { utils } from '../../../utils'
import { RouterService } from '../router/router.service'

@Provide()
export class LogService extends BasicService<AdminLog> {
  @Inject()
  prismaClient: PrismaClient

  @Inject()
  routerService: RouterService

  protected get model() {
    return this.prismaClient.adminLog
  }

  async recordLogs(context: Context, report: HttpResponseResult) {
    const { path, method, header, query, request } = context
    const params: IterateObject =
      (method === 'POST' ? request.body : query) || {}
    const summaryUserInfo: IterateObject =
      context.getAttr('summaryUserInfo') || {}
    if (path === '/admin/user/login' && report.data) {
      summaryUserInfo.id = report.data.userInfo.id
      summaryUserInfo.username = report.data.userInfo.username
      summaryUserInfo.mobile = report.data.userInfo.mobile
      params.password = params.password.replace(/./g, '*')
    }
    if (path === '/admin/user/createAdminUser') {
      params.password = params.password.replace(/./g, '*')
      params.confirmPassword = params.confirmPassword.replace(/./g, '*')
    }
    const route = this.routerService.getRoute(path)
    const ip = utils.sysUtils.getReqIP(context)
    const ipAddress = utils.sysUtils.getIpAddr(ip) as string
    await this.create({
      summary: typeof route !== 'string' && route ? route.summary : '',
      username: summaryUserInfo.username,
      userId: summaryUserInfo.id,
      mobile: summaryUserInfo.mobile,
      params: JSON.stringify(params),
      ip,
      ipAddress,
      method,
      path,
      statusCode: report.code,
      statusDesc: report.desc,
      userAgent: header['user-agent']
    })
  }

  async getRequestLogs(query: IterateObject) {
    if (query.status === 1) {
      query.where = {
        statusCode: 200
      }
    } else if (query.status === 0) {
      query.where = {
        statusCode: {
          not: 200
        }
      }
    }
    delete query.status
    return await this.findPage(query)
  }
}
