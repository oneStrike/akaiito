import { BasicService } from '@/basic/service/basic.service'
import { utils } from '@/utils'
import { Inject, Provide } from '@midwayjs/core'

import { SysOperateLog, PrismaClient } from '@prisma/client'
import type { HttpResponseResult } from '@akaiito/types'
import type { Context } from '@midwayjs/koa'
import { RouterService } from '@/basic/service/router.service'
import { CtxAttrEnum } from '@/enum/ctxAttr'

@Provide()
export class OperateLogService extends BasicService<SysOperateLog> {
  @Inject()
  prismaClient: PrismaClient

  @Inject()
  routerService: RouterService

  protected get model() {
    return this.prismaClient.sysOperateLog
  }

  async recordLogs(context: Context, report: HttpResponseResult) {
    const { path, method, header, query, request } = context
    const params: IterateObject = (method === 'POST' ? request.body : query) || {}
    const summaryUserInfo: IterateObject = context.getAttr(CtxAttrEnum.ADMIN_USER_INFO) || {}
    if (path === '/admin/user/login') {
      if (report.data) {
        summaryUserInfo.id = report.data.userInfo.id
        summaryUserInfo.username = report.data.userInfo.username
        summaryUserInfo.mobile = report.data.userInfo.mobile
        params.password = params.password.replace(/./g, '*')
      }
    }
    if (path === '/admin/user/createAdminUser') {
      params.password = params.password?.replace(/./g, '*')
      params.confirmPassword = params.confirmPassword?.replace(/./g, '*')
    }
    const route = this.routerService.getRoute(path)
    const ip = utils.sysUtils.getReqIP(context)
    const ipAddress = utils.sysUtils.getIpAddr(ip) as string
    await this.create({
      data: {
        apiSummary: typeof route !== 'string' && route ? route.summary : '',
        username: summaryUserInfo.username || '',
        userId: summaryUserInfo.id,
        userMobile: summaryUserInfo.mobile || params.mobile,
        requestParams: JSON.stringify(params),
        targetIp: ip,
        ipMappingAddress: ipAddress,
        requestMethod: method,
        apiPath: path,
        responseCode: report?.code ?? 0,
        responseDesc: report?.message ?? '',
        userAgent: header['user-agent'],
        record: '',
      },
    })
  }
}
