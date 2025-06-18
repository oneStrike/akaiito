import { Injectable, Logger } from '@nestjs/common'
import { BaseRepositoryService } from '@/global/services/base-repository.service'
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
  protected readonly modelName = 'SystemRequestLog'
  readonly logger = new Logger(RequestLogService.name)

  /**
   * 创建请求日志记录
   * @param logData 创建请求日志的数据传输对象
   * @returns 创建的请求日志记录
   */
  async createRequestLog(logData: CreateRequestLogDto) {
    return this.create({ data: logData, select: { id: true } })
  }

  /**
   * 分页查询请求日志
   * @param queryDto 查询条件和分页参数
   * @returns 分页查询结果
   */
  async findRequestLogs(queryDto: QueryRequestLogDto) {
    return this.findManyWithCommonPagination({
      ...queryDto,
      where: {
        AND: [
          { username: { contains: queryDto.username } },
          { userId: queryDto.userId },
          { responseCode: queryDto.responseCode },
          { httpMethod: queryDto.httpMethod },
        ],
      },
    })
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
}
