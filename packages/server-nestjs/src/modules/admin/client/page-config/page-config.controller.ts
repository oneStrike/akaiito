import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc, ApiPageDoc } from '@/common/decorators/api-doc.decorator'
import { BatchOperationResultDto } from '@/common/dto/batch.dto'
import { IdDto, IdsDto } from '@/common/dto/id.dto'
import {
  ClientPageConfigPageResponseDto,
  ClientPageConfigResponseDto,
  CreateClientPageConfigDto,
  IncrementViewCountDto,
  QueryClientPageConfigDto,
  UpdateClientPageConfigDto,
} from './dto/page-config.dto'
import { ClientPageConfigService } from './page-config.service'

/**
 * 客户端页面配置控制器
 * 提供页面配置相关的API接口
 */
@ApiTags('客户端页面配置模块')
@Controller('admin/page-config')
export class ClientPageConfigController {
  constructor(private readonly pageConfigService: ClientPageConfigService) {}

  /**
   * 创建页面配置
   */
  @Post('/page-config-create')
  @ApiDoc({
    summary: '创建页面配置',
    model: IdDto,
  })
  async create(@Body() body: CreateClientPageConfigDto) {
    return this.pageConfigService.createPageConfig(body)
  }

  /**
   * 分页查询页面配置列表
   */
  @Get('/page-config-page')
  @ApiPageDoc({
    summary: '分页查询页面配置列表',
    model: ClientPageConfigPageResponseDto,
  })
  async findPage(@Query() query: QueryClientPageConfigDto) {
    return this.pageConfigService.findPageConfigPage(query)
  }

  /**
   * 根据ID查询页面配置详情
   */
  @Get('/page-config-detail-by-id')
  @ApiDoc({
    summary: '根据ID查询页面配置详情',
    model: ClientPageConfigResponseDto,
  })
  async findDetail(@Query('id', ParseIntPipe) id: number) {
    return this.pageConfigService.findDetail(id)
  }

  /**
   * 根据页面编码查询页面配置详情
   */
  @Get('/page-config-detail-by-code')
  @ApiDoc({
    summary: '根据页面编码查询页面配置详情',
    model: ClientPageConfigResponseDto,
  })
  async findByCode(@Query('pageCode') pageCode: string) {
    return this.pageConfigService.findByPageCode(pageCode)
  }

  /**
   * 批量更新页面配置状态
   */
  @Post('/page-config-update')
  @ApiDoc({
    summary: '更新页面配置',
    model: IdDto,
  })
  async update(@Body() body: UpdateClientPageConfigDto) {
    const { id, ...data } = body
    return this.pageConfigService.updateById({
      id,
      data,
    })
  }

  /**
   * 批量更新页面配置状态
   */
  @Post('/page-config-batch-update-status')
  @ApiDoc({
    summary: '批量更新页面配置状态',
    model: BatchOperationResultDto,
  })
  async batchUpdateStatus(@Body() body: { ids: number[]; status: string }) {
    const { ids, status } = body
    return this.pageConfigService.batchUpdateStatus(ids, status)
  }

  /**
   * 增加页面访问次数
   */
  @Post('/page-config-increment-view')
  @ApiDoc({
    summary: '增加页面访问次数',
    model: IdDto,
  })
  async incrementViewCount(@Body() body: IncrementViewCountDto) {
    return this.pageConfigService.incrementViewCount(body.pageCode)
  }

  /**
   * 批量软删除页面配置
   */
  @Post('/page-config-batch-delete')
  @ApiDoc({
    summary: '批量软删除页面配置',
    model: BatchOperationResultDto,
  })
  async batchDelete(@Body() body: IdsDto) {
    return this.pageConfigService.softDeleteMany({
      id: { in: body.ids },
    })
  }
}
