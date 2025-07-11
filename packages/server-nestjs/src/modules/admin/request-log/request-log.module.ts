import { Module } from '@nestjs/common'
import { MaxMindModule } from '@/common/module/maxmind/maxmind.module'
import { AdminRequestLogInterceptor } from './interceptors/request-log.interceptor'
import { RequestLogController } from './request-log.controller'
import { RequestLogService } from './request-log.service'

/**
 * 请求日志模块
 * 提供系统请求日志的完整功能，包括记录、查询、统计和管理
 *
 * 功能特性：
 * - 请求日志记录：自动记录API请求的详细信息
 * - 分页查询：支持多条件筛选和排序的分页查询
 * - 详情查询：根据ID查询单个请求日志的完整信息
 * - 批量删除：支持批量删除请求日志记录
 * - 过期清理：自动清理过期的请求日志数据
 * - 统计分析：提供请求日志的各种统计信息
 */
@Module({
  imports: [MaxMindModule],
  controllers: [RequestLogController],
  providers: [RequestLogService, AdminRequestLogInterceptor],
  exports: [
    RequestLogService, // 导出服务供其他模块使用
    AdminRequestLogInterceptor,
  ],
})
export class RequestLogModule {}
