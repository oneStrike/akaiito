import { Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { FastifyRequest } from 'fastify'
import { BaseRequestLogInterceptor } from '@/common/interceptors/base-request-log.interceptor'
import { MaxMindGeoIPService } from '@/common/services/maxmind-geoip.service'
import { RequestLogConfigService } from '@/config/request-log.config'
import { RequestLogService } from '@/modules/admin/request-log/request-log.service'
import { ClientJwtPayload } from '@/modules/client/auth/client-jwt.service'

/**
 * 客户端请求日志拦截器
 * 继承基础请求日志拦截器，专门处理客户端的请求日志记录
 *
 * 功能特性：
 * - 自动记录所有客户端API请求
 * - 提取客户端用户信息（如果已认证）
 * - 记录请求参数和响应状态
 * - 获取客户端IP地址和User-Agent
 * - 支持跳过特定接口的日志记录
 * - 区分客户端和管理端的请求来源
 */
@Injectable()
export class ClientRequestLogInterceptor extends BaseRequestLogInterceptor {
  constructor(
    requestLogService: RequestLogService,
    reflector: Reflector,
    maxMindGeoIPService: MaxMindGeoIPService,
  ) {
    super(
      requestLogService,
      reflector,
      maxMindGeoIPService,
      ClientRequestLogInterceptor.name,
      RequestLogConfigService.getClientConfig(),
    )
  }

  /**
   * 提取用户信息
   * @param request 请求对象
   * @returns 用户信息对象
   */
  protected extractUserInfo(request: FastifyRequest): {
    userId?: string
  } {
    const user = request.user as ClientJwtPayload | undefined
    return {
      userId: user?.sub,
    }
  }

  /**
   * 提取客户端用户名
   * @param request 请求对象
   * @returns 客户端用户名（客户端通常没有用户名，返回手机号或用户ID）
   */
  protected extractUsername(request: FastifyRequest): string | undefined {
    const user = request.user as ClientJwtPayload | undefined
    return user?.sub
  }

  /**
   * 获取API摘要
   * @param request 请求对象
   * @returns API摘要
   */
  protected getOperationDescription(request: FastifyRequest): string {
    const path = request.url.split('?')[0]
    return `客户端-${request.method} ${path}`
  }

  /**
   * 获取操作记录描述
   * @param request 请求对象
   * @param userInfo 用户信息
   * @returns 操作记录
   */
  protected getOperationRecord(
    request: FastifyRequest,
    userInfo: { userId?: string; userPhone?: string },
  ): string {
    return this.generateOperationRecord(request, userInfo, '客户端用户')
  }

  /**
   * 获取日志前缀
   * @returns 日志前缀
   */
  protected getLogPrefix(): string {
    return '客户端-'
  }

  /**
   * 获取敏感字段列表
   * @returns 敏感字段数组
   */
  protected getSensitiveFields(): string[] {
    return [
      'password',
      'token',
      'secret',
      'key',
      'authorization',
      'captcha',
      'smsCode', // 客户端特有的敏感字段
      'verificationCode',
    ]
  }
}

// 导出装饰器（从基类导入）
export { SkipRequestLog } from '@/common/interceptors/base-request-log.interceptor'
