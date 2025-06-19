import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc, ApiPageDoc } from '@/common/decorators/api-doc.decorator'
import { IdDto, IdsDto } from '@/common/dto/id.dto'
import {
  ClientPageConfigDto,
  CreateClientPageConfigDto,
  IncrementViewCountDto,
  QueryClientPageConfigDto,
  UpdateClientPageConfigDto,
  UpdatePageConfigStatusDto,
} from './dto/pageConfig.dto'
import { ClientPageConfigService } from './pageConfig.service'

/**
 * 客户端页面配置控制器
 * 提供页面配置相关的API接口
 */
@ApiTags('客户端页面配置模块')
@Controller('admin/pageConfig')
export class ClientPageConfigController {
  constructor(private readonly pageConfigService: ClientPageConfigService) {}

  /**
   * 创建页面配置
   */
  @Post('/create')
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
  @Get('/page')
  @ApiPageDoc({
    summary: '分页查询页面配置列表',
    model: ClientPageConfigDto,
  })
  async findPage(@Query() query: QueryClientPageConfigDto) {
    return this.pageConfigService.findPageConfigPage(query)
  }

  /**
   * 获取启用的页面配置列表（客户端使用）
   */
  @Get('/active')
  @ApiDoc({
    summary: '获取启用的页面配置列表',
    model: [ClientPageConfigDto],
  })
  async findActive(@Query('pageRule') pageRule?: string) {
    return this.pageConfigService.findActivePageConfigs(pageRule)
  }

  /**
   * 根据ID查询页面配置详情
   */
  @Get('/detail/:id')
  @ApiDoc({
    summary: '根据ID查询页面配置详情',
    model: ClientPageConfigDto,
  })
  async findDetail(@Param('id', ParseIntPipe) id: number) {
    return this.pageConfigService.findDetail(id)
  }

  /**
   * 根据页面编码查询页面配置详情
   */
  @Get('/code/:pageCode')
  @ApiDoc({
    summary: '根据页面编码查询页面配置详情',
    model: ClientPageConfigDto,
  })
  async findByCode(@Param('pageCode') pageCode: string) {
    return this.pageConfigService.findByPageCode(pageCode)
  }

  /**
   * 更新页面配置
   */
  @Post('/update')
  @ApiDoc({
    summary: '更新页面配置',
    model: ClientPageConfigDto,
  })
  async update(@Body() body: UpdateClientPageConfigDto) {
    return this.pageConfigService.updatePageConfig(body)
  }

  /**
   * 更新页面配置状态
   */
  @Post('/update-status')
  @ApiDoc({
    summary: '更新页面配置状态',
    model: ClientPageConfigDto,
  })
  async updateStatus(@Body() body: UpdatePageConfigStatusDto) {
    const { id, status } = body
    return this.pageConfigService.updatePageConfig({ id, status })
  }

  /**
   * 批量更新页面配置状态
   */
  @Post('/batch-update-status')
  @ApiDoc({
    summary: '批量更新页面配置状态',
    model: Object,
  })
  async batchUpdateStatus(@Body() body: { ids: number[]; status: string }) {
    const { ids, status } = body
    return this.pageConfigService.batchUpdateStatus(ids, status)
  }

  /**
   * 增加页面访问次数
   */
  @Post('/increment-view')
  @ApiDoc({
    summary: '增加页面访问次数',
    model: Object,
  })
  async incrementViewCount(@Body() body: IncrementViewCountDto) {
    return this.pageConfigService.incrementViewCount(body.pageCode)
  }

  /**
   * 软删除页面配置
   */
  @Post('/delete')
  @ApiDoc({
    summary: '软删除页面配置',
    model: Object,
  })
  async delete(@Body() body: IdDto) {
    return this.pageConfigService.softDelete(body.id)
  }

  /**
   * 批量软删除页面配置
   */
  @Post('/batch-delete')
  @ApiDoc({
    summary: '批量软删除页面配置',
    model: Object,
  })
  async batchDelete(@Body() body: IdsDto) {
    return this.pageConfigService.batchSoftDelete(body.ids)
  }

  /**
   * 恢复已删除的页面配置
   */
  @Post('/restore')
  @ApiDoc({
    summary: '恢复已删除的页面配置',
    model: ClientPageConfigDto,
  })
  async restore(@Body() body: IdDto) {
    return this.pageConfigService.restore(body.id)
  }

  /**
   * 永久删除页面配置
   */
  @Post('/force-delete')
  @ApiDoc({
    summary: '永久删除页面配置',
    model: Object,
  })
  async forceDelete(@Body() body: IdDto) {
    return this.pageConfigService.forceDelete(body.id)
  }

  /**
   * 获取页面配置统计信息
   */
  @Get('/statistics')
  @ApiDoc({
    summary: '获取页面配置统计信息',
    model: Object,
  })
  async getStatistics() {
    return this.pageConfigService.getStatistics()
  }
}
