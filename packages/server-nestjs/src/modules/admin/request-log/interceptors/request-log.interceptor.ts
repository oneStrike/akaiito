import { Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { FastifyRequest } from 'fastify'
import { BaseRequestLogInterceptor } from '@/common/interceptors/base-request-log.interceptor'
import { MaxMindGeoIPService } from '@/common/services/maxmind-geoip.service'
import { RequestLogConfigService } from '@/config/request-log.config'
import { AdminJwtPayload } from '@/modules/admin/auth/admin-jwt.service'
import { RequestLogService } from '../request-log.service'

/**
 * 管理端请求日志拦截器
 * 继承基础请求日志拦截器，专门处理管理端的请求日志记录
 *
 * 功能特性：
 * - 自动记录所有管理端API请求
 * - 提取管理员用户信息（如果已认证）
 * - 记录请求参数和响应状态
 * - 获取客户端IP地址和User-Agent
 * - 支持跳过特定接口的日志记录
 */
@Injectable()
export class AdminRequestLogInterceptor extends BaseRequestLogInterceptor {
  constructor(
    requestLogService: RequestLogService,
    reflector: Reflector,
    maxMindGeoIPService: MaxMindGeoIPService,
  ) {
    super(
      requestLogService,
      reflector,
      maxMindGeoIPService,
      'AdminRequestLogInterceptor',
      RequestLogConfigService.getAdminConfig(),
    )
  }

  /**
   * 获取管理端API摘要信息
   * @param request 请求对象
   * @returns API摘要
   */
  protected getOperationDescription(request: FastifyRequest): string {
    const path = request.url.split('?')[0]
    const method = request.method
    const action = this.getActionByMethod(request)

    // 根据路径和方法生成摘要
    const pathSegments = path.split('/').filter(Boolean)

    if (pathSegments.length === 0) {
      return '管理端-根路径访问'
    }

    // 简单的路径解析逻辑
    const module = pathSegments[0] || 'unknown'
    const resource = pathSegments[1] || 'unknown'

    return `管理端-${module}模块-${resource}${action}`
  }

  /**
   * 提取管理员用户信息
   * @param request 请求对象
   * @returns 管理员用户信息
   */
  protected extractUserInfo(request: FastifyRequest): {
    userId?: string
  } {
    const user = request.user as AdminJwtPayload | undefined
    return {
      userId: user?.sub?.toString(),
    }
  }

  /**
   * 提取管理员用户名
   * @param request 请求对象
   * @returns 管理员用户名
   */
  protected extractUsername(request: FastifyRequest): string | undefined {
    const user = request.user as AdminJwtPayload | undefined
    return user?.username
  }

  /**
   * 获取管理端操作记录
   * @param request 请求对象
   * @param userInfo 用户信息
   * @returns 操作记录
   */
  protected getOperationRecord(
    request: FastifyRequest,
    userInfo: { userId?: string; userPhone?: string },
  ): string {
    return this.generateOperationRecord(request, userInfo, '管理员')
  }

  /**
   * 获取日志前缀
   * @returns 日志前缀
   */
  protected getLogPrefix(): string {
    return '管理端-'
  }

  /**
   * 获取敏感字段列表
   * @returns 敏感字段数组
   */
  protected getSensitiveFields(): string[] {
    return ['password', 'token', 'secret', 'key', 'authorization', 'captcha']
  }
}

// 导出装饰器（从基类导入）
export { SkipRequestLog } from '@/common/interceptors/base-request-log.interceptor'
