import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc, ApiPageDoc } from '@/common/decorators/api-doc.decorator'
import { useClassSerializerInterceptor } from '@/common/serializers/class-transformer.serializer'
import {
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
   * 分页查询请求日志
   * 支持多种条件筛选和排序
   * @param queryDto 查询条件和分页参数
   * @returns 分页查询结果
   */
  @Get('page')
  @ApiPageDoc({
    summary: '分页查询请求日志',
    model: RequestLogPageResponseDto,
  })
  async findRequestLogs(
    @Query() queryDto: QueryRequestLogDto,
  ): Promise<RequestLogPageResponseDto> {
    return this.requestLogService.findRequestLogs(queryDto)
  }

  /**
   * 根据ID查询请求日志详情
   * 获取单个请求日志的完整信息
   * @param id 请求日志ID
   * @returns 请求日志详情
   */
  @Get('detail')
  @ApiDoc({
    summary: '查询请求日志详情',
    model: RequestLogDto,
  })
  async findRequestLogById(@Query('id', ParseIntPipe) id: number) {
    return this.requestLogService.findRequestLogById(id)
  }
}
