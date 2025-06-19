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
   * 根据ID查询页面配置详情
   */
  @Get('/detailById')
  @ApiDoc({
    summary: '根据ID查询页面配置详情',
    model: ClientPageConfigDto,
  })
  async findDetail(@Query('id', ParseIntPipe) id: number) {
    return this.pageConfigService.findDetail(id)
  }

  /**
   * 根据页面编码查询页面配置详情
   */
  @Get('/detailByCode')
  @ApiDoc({
    summary: '根据页面编码查询页面配置详情',
    model: ClientPageConfigDto,
  })
  async findByCode(@Query('pageCode') pageCode: string) {
    return this.pageConfigService.findByPageCode(pageCode)
  }

  /**
   * 批量更新页面配置状态
   */
  @Post('/batchUpdateStatus')
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
  @Post('/incrementView')
  @ApiDoc({
    summary: '增加页面访问次数',
    model: Object,
  })
  async incrementViewCount(@Body() body: IncrementViewCountDto) {
    return this.pageConfigService.incrementViewCount(body.pageCode)
  }

  /**
   * 批量软删除页面配置
   */
  @Post('/batchDelete')
  @ApiDoc({
    summary: '批量软删除页面配置',
    model: Object,
  })
  async batchDelete(@Body() body: IdsDto) {
    return this.pageConfigService.softDeleteMany({
      id: { in: body.ids },
    })
  }
}
