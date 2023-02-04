import { Inject, Provide } from '@midwayjs/core'
import { BaseService } from '../../../shared/service/base.service'
import { LogMapping } from './mapping/log.mapping'
import { Context } from '@midwayjs/koa'
import { ServiceVersionEnum } from '../../../shared/enum/service-version.enum'
import { AdminUserEntity } from '../user/entities/user.entity'
import { IResponseData } from '../../../types/dto/list'
import { LoginLogDto } from './dto/loginLog.dto'

@Provide()
export class LogService extends BaseService {
  @Inject()
  mapping: LogMapping

  protected get repository() {
    return this.mapping.repository
  }

  /**
   * 写入日志
   */
  async record(ctx: Context) {
    const { path, method, header } = ctx
    if (
      this.utils.commonUtil.serviceVersionType(path) ===
      ServiceVersionEnum.CLIENT
    )
      return
    let username = null,
      userAccount = null,
      userId = null,
      userInfo: Partial<AdminUserEntity>
    const responseBody = ctx.response.body as {
      user: Partial<AdminUserEntity>
    }
    if (path === '/admin/user/login' && responseBody) {
      userInfo = responseBody.user
    } else {
      userInfo = ctx.getAttr('userInfo') || {}
    }
    username = userInfo.username
    userId = userInfo.id
    userAccount = userInfo.account
    const params: any = method === 'POST' ? ctx.request.body : ctx.query
    if (params) {
      delete params.password
      delete params.confirmPassword
    }

    const { fullUrl, summary } =
      (await this.webRouterService.getMatchedRouterInfo(path, method)) || {}
    const ip = await this.utils.systemUtil.getReqIP(ctx)

    const { code, desc, status }: Partial<IResponseData> =
      ctx.getAttr('responseRes') || {}
    const ipAddress = await this.utils.systemUtil.getIpAddr(ctx, ip)
    const recordInfo = {
      username,
      userId,
      userAccount,
      action: summary,
      ip,
      ipAddress,
      receipt: code,
      receiptDesc: code !== 1 ? desc : status,
      path: fullUrl,
      userAgent: header['user-agent'],
      params: this.utils.lodash.isEmpty(params) ? null : JSON.stringify(params)
    }
    await this.create(recordInfo)
  }

  async findLoginLog(params: LoginLogDto) {
    params.path = '/admin/user/login'
    return await this.findMultiple(params)
  }
}
