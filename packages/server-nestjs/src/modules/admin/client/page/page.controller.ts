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
import {
  BatchOperationResultDto,
  BatchOperationStatusIdsDto,
} from '@/common/dto/batch.dto'
import { IdDto, IdsDto } from '@/common/dto/id.dto'
import {
  BasePageConfigFieldsDto,
  ClientPageConfigPageResponseDto,
  ClientPageConfigResponseDto,
  QueryClientPageConfigDto,
  UpdateClientPageConfigDto,
} from './dto/page.dto'
import { ClientPageConfigService } from './page.service'

/**
 * 客户端页面配置控制器
 * 提供页面配置相关的API接口
 */
@ApiTags('客户端页面配置模块')
@Controller('admin/client-page')
export class ClientPageConfigController {
  constructor(private readonly pageConfigService: ClientPageConfigService) {}

  /**
   * 创建页面配置
   */
  @Post('/create-client-page')
  @ApiDoc({
    summary: '创建页面配置',
    model: IdDto,
  })
  async create(@Body() body: BasePageConfigFieldsDto) {
    return this.pageConfigService.createPageConfig(body)
  }

  /**
   * 分页查询页面配置列表
   */
  @Get('/client-page-page')
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
  @Get('/client-page-detail-by-id')
  @ApiDoc({
    summary: '根据ID查询页面配置详情',
    model: ClientPageConfigResponseDto,
  })
  async findDetail(@Query('id', ParseIntPipe) id: number) {
    return this.pageConfigService.findById({ id })
  }

  /**
   * 根据页面编码查询页面配置详情
   */
  @Get('/client-page-detail-by-code')
  @ApiDoc({
    summary: '根据页面编码查询页面配置详情',
    model: ClientPageConfigResponseDto,
  })
  async findByCode(@Query('pageCode') pageCode: string) {
    return this.pageConfigService.findByUnique({ where: { pageCode } })
  }

  /**
   * 批量更新页面配置状态
   */
  @Post('/update-client-page')
  @ApiDoc({
    summary: '更新页面配置',
    model: IdDto,
  })
  async update(@Body() body: UpdateClientPageConfigDto) {
    const { id, ...data } = body
    return this.pageConfigService.updatePage(body)
  }

  /**
   * 批量更新页面配置状态
   */
  @Post('/batch-update-client-page-status')
  @ApiDoc({
    summary: '批量更新页面配置状态',
    model: CountDto,
  })
  async batchUpdateStatus(@Body() body: BatchOperationStatusIdsDto) {
    const { ids, isEnabled } = body
    return this.pageConfigService.batchUpdateStatus(ids, isEnabled)
  }

  /**
   * 批量软删除页面配置
   */
  @Post('/batch-delete-client-page')
  @ApiDoc({
    summary: '批量软删除页面配置',
    model: CountDto,
  })
  async batchDelete(@Body() body: IdsDto) {
    return this.pageConfigService.softDeleteMany({
      id: { in: body.ids },
    })
  }
}
