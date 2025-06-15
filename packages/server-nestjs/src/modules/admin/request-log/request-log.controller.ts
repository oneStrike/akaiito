import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc, ApiPageDoc } from '@/common/decorators/api-doc.decorator'
import { useClassSerializerInterceptor } from '@/common/serializers/class-transformer.serializer'
import {
  CreateRequestLogDto,
  QueryRequestLogDto,
  RequestLogDto,
  RequestLogPageResponseDto,
} from './dto/request-log.dto'
import { RequestLogService } from './request-log.service'

/**
 * 请求日志控制器
 * 提供请求日志相关的 RESTful API 接口
 */
@ApiTags('管理端请求日志模块')
@Controller('admin/request-log')
@UseInterceptors(useClassSerializerInterceptor(RequestLogDto))
export class RequestLogController {
  constructor(private readonly requestLogService: RequestLogService) {}

  /**
   * 创建请求日志记录
   * 用于记录系统的API请求信息
   * @param createRequestLogDto 创建请求日志的数据传输对象
   * @returns 创建的请求日志记录
   */
  @Post()
  @ApiDoc({
    summary: '创建请求日志记录',
    model: RequestLogDto,
  })
  async createRequestLog(
    @Body() createRequestLogDto: CreateRequestLogDto,
  ): Promise<RequestLogDto> {
    try {
      return await this.requestLogService.createRequestLog(createRequestLogDto)
    } catch (error) {
      throw new HttpException(
        `创建请求日志失败: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  /**
   * 分页查询请求日志
   * 支持多种条件筛选和排序
   * @param queryDto 查询条件和分页参数
   * @returns 分页查询结果
   */
  @Get()
  @ApiPageDoc({
    summary: '分页查询请求日志',
    model: RequestLogPageResponseDto,
  })
  async findRequestLogs(
    @Query() queryDto: QueryRequestLogDto,
  ): Promise<RequestLogPageResponseDto> {
    try {
      const result = await this.requestLogService.findRequestLogs(queryDto)
      return {
        data: result.data,
        total: result.total,
        page: result.page,
        pageSize: result.pageSize,
        totalPages: result.totalPages,
      }
    } catch (error) {
      throw new HttpException(
        `查询请求日志失败: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  /**
   * 根据ID查询请求日志详情
   * 获取单个请求日志的完整信息
   * @param id 请求日志ID
   * @returns 请求日志详情
   */
  @Get(':id')
  @ApiDoc({
    summary: '查询请求日志详情',
    model: RequestLogDto,
  })
  async findRequestLogById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RequestLogDto> {
    try {
      const requestLog = await this.requestLogService.findRequestLogById(id)
      if (!requestLog) {
        throw new HttpException(
          `请求日志不存在，ID: ${id}`,
          HttpStatus.NOT_FOUND,
        )
      }
      return requestLog
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        `查询请求日志详情失败: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  /**
   * 批量删除请求日志
   * 根据ID数组批量删除请求日志记录
   * @param ids 要删除的请求日志ID数组
   * @returns 删除结果
   */
  @Delete('batch')
  @ApiDoc({
    summary: '批量删除请求日志',
  })
  async deleteRequestLogs(@Body('ids') ids: number[]) {
    try {
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new HttpException('请提供有效的ID数组', HttpStatus.BAD_REQUEST)
      }

      // 验证ID是否为正整数
      const invalidIds = ids.filter((id) => !Number.isInteger(id) || id <= 0)
      if (invalidIds.length > 0) {
        throw new HttpException(
          `无效的ID: ${invalidIds.join(', ')}`,
          HttpStatus.BAD_REQUEST,
        )
      }

      const deletedCount = await this.requestLogService.deleteRequestLogs(ids)
      return {
        message: `成功删除 ${deletedCount} 条请求日志记录`,
        deletedCount,
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        `批量删除请求日志失败: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  /**
   * 删除单个请求日志
   * 根据ID删除单个请求日志记录
   * @param id 请求日志ID
   * @returns 删除结果
   */
  @Delete(':id')
  @ApiDoc({
    summary: '删除请求日志',
  })
  async deleteRequestLog(@Param('id', ParseIntPipe) id: number) {
    try {
      const deletedCount = await this.requestLogService.deleteRequestLogs([id])
      if (deletedCount === 0) {
        throw new HttpException(
          `请求日志不存在，ID: ${id}`,
          HttpStatus.NOT_FOUND,
        )
      }
      return {
        message: '请求日志删除成功',
        deletedCount,
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        `删除请求日志失败: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  /**
   * 清理过期的请求日志
   * 删除指定天数之前的请求日志记录
   * @param daysToKeep 保留天数，默认30天
   * @returns 清理结果
   */
  @Delete('cleanup/expired')
  @ApiDoc({
    summary: '清理过期请求日志',
  })
  async cleanupExpiredLogs(@Query('daysToKeep') daysToKeep?: number) {
    try {
      const days = daysToKeep && daysToKeep > 0 ? daysToKeep : 30
      const deletedCount = await this.requestLogService.cleanupExpiredLogs(days)
      return {
        message: `成功清理 ${days} 天前的请求日志，删除 ${deletedCount} 条记录`,
        deletedCount,
        daysToKeep: days,
      }
    } catch (error) {
      throw new HttpException(
        `清理过期请求日志失败: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  /**
   * 获取请求日志统计信息
   * 提供请求日志的各种统计数据
   * @param startDate 开始日期（可选）
   * @param endDate 结束日期（可选）
   * @returns 统计信息
   */
  @Get('statistics/overview')
  @ApiDoc({
    summary: '获取请求日志统计信息',
  })
  async getRequestLogStatistics(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    try {
      // 验证日期格式
      if (startDate && !this.isValidDate(startDate)) {
        throw new HttpException(
          '开始日期格式无效，请使用 YYYY-MM-DD 格式',
          HttpStatus.BAD_REQUEST,
        )
      }
      if (endDate && !this.isValidDate(endDate)) {
        throw new HttpException(
          '结束日期格式无效，请使用 YYYY-MM-DD 格式',
          HttpStatus.BAD_REQUEST,
        )
      }

      // 验证日期范围
      if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        throw new HttpException(
          '开始日期不能晚于结束日期',
          HttpStatus.BAD_REQUEST,
        )
      }

      const statistics = await this.requestLogService.getRequestLogStatistics(
        startDate,
        endDate,
      )
      return {
        ...statistics,
        dateRange: {
          startDate: startDate || null,
          endDate: endDate || null,
        },
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        `获取请求日志统计信息失败: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  /**
   * 验证日期格式是否有效
   * @param dateString 日期字符串
   * @returns 是否有效
   */
  private isValidDate(dateString: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/
    if (!regex.test(dateString)) {
      return false
    }
    const date = new Date(dateString)
    return !Number.isNaN(date.getTime())
  }
}
