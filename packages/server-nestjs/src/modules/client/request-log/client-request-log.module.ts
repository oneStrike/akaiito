import { Module } from '@nestjs/common'
import { RequestLogModule } from '@/modules/admin/request-log/request-log.module'
import { MaxMindModule } from '../../../common/module/maxmind/maxmind.module'
import { ClientRequestLogInterceptor } from './interceptors/client-request-log.interceptor'

/**
 * 客户端请求日志模块
 * 专门用于处理客户端的请求日志记录功能
 *
 * 功能特性：
 * - 提供客户端专用的请求日志拦截器
 * - 复用管理端的请求日志服务和数据模型
 * - 支持区分客户端和管理端的请求来源
 * - 自动记录客户端API请求的详细信息
 */
@Module({
  imports: [
    MaxMindModule,
    RequestLogModule, // 导入管理端的请求日志模块，复用服务和数据模型
  ],
  providers: [
    ClientRequestLogInterceptor, // 提供客户端请求日志拦截器
  ],
  exports: [
    ClientRequestLogInterceptor, // 导出拦截器供其他模块使用
  ],
})
export class ClientRequestLogModule {}
