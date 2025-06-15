import { Injectable, Logger } from '@nestjs/common'
import { BaseRepositoryService } from '@/global/services/base-repository.service'
import { Prisma } from '@/prisma/client'
import {
  CreateRequestLogDto,
  QueryRequestLogDto,
  RequestLogDto,
} from './dto/request-log.dto'

/**
 * 请求日志服务类
 * 提供请求日志的增删改查等业务逻辑
 */
@Injectable()
export class RequestLogService extends BaseRepositoryService<'SystemRequestLog'> {
  protected modelName: 'SystemRequestLog'
  readonly logger = new Logger(RequestLogService.name)

  /**
   * 创建请求日志记录
   * @param logData 创建请求日志的数据传输对象
   * @returns 创建的请求日志记录
   */
  async createRequestLog(logData: CreateRequestLogDto): Promise<RequestLogDto> {
    try {
      this.logger.log(`创建请求日志记录: ${logData.requestPath}`)
      const requestLog = await this.prisma.systemRequestLog.create({
        data: logData,
      })

      this.logger.log(`请求日志记录创建成功，ID: ${requestLog.id}`)
      return requestLog as RequestLogDto
    } catch (error) {
      this.logger.error(`创建请求日志记录失败: ${error.message}`, error.stack)
      throw error
    }
  }

  /**
   * 分页查询请求日志
   * @param queryDto 查询条件和分页参数
   * @returns 分页查询结果
   */
  async findRequestLogs(queryDto: QueryRequestLogDto) {
    try {
      this.logger.log('开始分页查询请求日志')

      // 构建查询条件
      const whereConditions: Prisma.SystemRequestLogWhereInput = {}

      // 用户名模糊查询
      if (queryDto.username) {
        whereConditions.username = {
          contains: queryDto.username,
          mode: 'insensitive',
        }
      }

      // 用户ID精确查询
      if (queryDto.userId) {
        whereConditions.userId = queryDto.userId
      }

      // IP地址模糊查询
      if (queryDto.ipAddress) {
        whereConditions.ipAddress = {
          contains: queryDto.ipAddress,
          mode: 'insensitive',
        }
      }

      // 响应状态码精确查询
      if (queryDto.responseCode) {
        whereConditions.responseCode = queryDto.responseCode
      }

      // 请求方法精确查询
      if (queryDto.httpMethod) {
        whereConditions.httpMethod = queryDto.httpMethod
      }

      // API路径模糊查询
      if (queryDto.requestPath) {
        whereConditions.requestPath = {
          contains: queryDto.requestPath,
          mode: 'insensitive',
        }
      }

      // 时间范围查询
      if (queryDto.startDate || queryDto.endDate) {
        whereConditions.createdAt = {}
        if (queryDto.startDate) {
          whereConditions.createdAt.gte = new Date(queryDto.startDate)
        }
        if (queryDto.endDate) {
          // 结束日期包含当天，所以加一天
          const endDate = new Date(queryDto.endDate)
          endDate.setDate(endDate.getDate() + 1)
          whereConditions.createdAt.lt = endDate
        }
      }

      // 构建排序条件
      let orderBy: Prisma.SystemRequestLogOrderByWithRelationInput = {
        createdAt: 'desc', // 默认按创建时间倒序
      }

      // 如果有自定义排序
      if (queryDto.orderBy) {
        try {
          const customOrderBy = JSON.parse(queryDto.orderBy)
          orderBy = { ...orderBy, ...customOrderBy }
        } catch (error) {
          this.logger.warn(`排序参数解析失败，使用默认排序: ${error.message}`)
        }
      }

      // 分页参数
      const page = queryDto.pageIndex || 0
      const pageSize = queryDto.pageSize || 15
      const skip = page * pageSize

      // 执行查询
      const [data, total] = await Promise.all([
        this.prisma.systemRequestLog.findMany({
          where: whereConditions,
          orderBy,
          skip,
          take: pageSize,
        }),
        this.prisma.systemRequestLog.count({
          where: whereConditions,
        }),
      ])

      const totalPages = Math.ceil(total / pageSize)

      this.logger.log(
        `请求日志查询完成，共 ${total} 条记录，当前第 ${page + 1} 页`,
      )

      return {
        list: data as RequestLogDto[],
        total,
        page,
        pageSize,
        totalPages,
      }
    } catch (error) {
      this.logger.error(`分页查询请求日志失败: ${error.message}`, error.stack)
      throw error
    }
  }

  /**
   * 根据ID查询单个请求日志
   * @param id 请求日志ID
   * @returns 请求日志详情
   */
  async findRequestLogById(id: number): Promise<RequestLogDto | null> {
    try {
      this.logger.log(`查询请求日志详情，ID: ${id}`)

      const requestLog = await this.prisma.systemRequestLog.findUnique({
        where: { id },
      })

      if (!requestLog) {
        this.logger.warn(`请求日志不存在，ID: ${id}`)
        return null
      }

      this.logger.log(`请求日志查询成功，ID: ${id}`)
      return requestLog as RequestLogDto
    } catch (error) {
      this.logger.error(`查询请求日志详情失败: ${error.message}`, error.stack)
      throw error
    }
  }

  /**
   * 批量删除请求日志
   * @param ids 要删除的请求日志ID数组
   * @returns 删除的记录数量
   */
  async deleteRequestLogs(ids: number[]): Promise<number> {
    try {
      this.logger.log(`批量删除请求日志，IDs: ${ids.join(', ')}`)

      const result = await this.prisma.systemRequestLog.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      })

      this.logger.log(`批量删除请求日志成功，删除 ${result.count} 条记录`)
      return result.count
    } catch (error) {
      this.logger.error(`批量删除请求日志失败: ${error.message}`, error.stack)
      throw error
    }
  }

  /**
   * 清理过期的请求日志
   * @param daysToKeep 保留天数，默认30天
   * @returns 删除的记录数量
   */
  async cleanupExpiredLogs(daysToKeep: number = 30): Promise<number> {
    try {
      this.logger.log(`开始清理 ${daysToKeep} 天前的请求日志`)

      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep)

      const result = await this.prisma.systemRequestLog.deleteMany({
        where: {
          createdAt: {
            lt: cutoffDate,
          },
        },
      })

      this.logger.log(`清理过期请求日志完成，删除 ${result.count} 条记录`)
      return result.count
    } catch (error) {
      this.logger.error(`清理过期请求日志失败: ${error.message}`, error.stack)
      throw error
    }
  }

  /**
   * 获取请求日志统计信息
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @returns 统计信息
   */
  async getRequestLogStatistics(startDate?: string, endDate?: string) {
    try {
      this.logger.log('获取请求日志统计信息')

      const whereConditions: Prisma.SystemRequestLogWhereInput = {}

      // 时间范围查询
      if (startDate || endDate) {
        whereConditions.createdAt = {}
        if (startDate) {
          whereConditions.createdAt.gte = new Date(startDate)
        }
        if (endDate) {
          const endDateObj = new Date(endDate)
          endDateObj.setDate(endDateObj.getDate() + 1)
          whereConditions.createdAt.lt = endDateObj
        }
      }

      // 总请求数
      const totalRequests = await this.prisma.systemRequestLog.count({
        where: whereConditions,
      })

      // 成功请求数（2xx状态码）
      const successRequests = await this.prisma.systemRequestLog.count({
        where: {
          ...whereConditions,
          responseCode: {
            gte: 200,
            lt: 300,
          },
        },
      })

      // 错误请求数（4xx和5xx状态码）
      const errorRequests = await this.prisma.systemRequestLog.count({
        where: {
          ...whereConditions,
          responseCode: {
            gte: 400,
          },
        },
      })

      // 按请求方法统计
      const methodStats = await this.prisma.systemRequestLog.groupBy({
        by: ['httpMethod'],
        where: whereConditions,
        _count: {
          id: true,
        },
      })

      // 按状态码统计
      const statusCodeStats = await this.prisma.systemRequestLog.groupBy({
        by: ['responseCode'],
        where: whereConditions,
        _count: {
          id: true,
        },
        orderBy: {
          _count: {
            id: 'desc',
          },
        },
      })

      this.logger.log('请求日志统计信息获取完成')

      return {
        totalRequests,
        successRequests,
        errorRequests,
        successRate:
          totalRequests > 0
            ? ((successRequests / totalRequests) * 100).toFixed(2)
            : '0.00',
        methodStats: methodStats.map((stat) => ({
          method: stat.httpMethod,
          count: stat._count.id,
        })),
        statusCodeStats: statusCodeStats.map((stat) => ({
          statusCode: stat.responseCode,
          count: stat._count.id,
        })),
      }
    } catch (error) {
      this.logger.error(
        `获取请求日志统计信息失败: ${error.message}`,
        error.stack,
      )
      throw error
    }
  }
}
