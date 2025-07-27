import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc, ApiPageDoc } from '@/common/decorators/api-doc.decorator'
import { BatchPublishDto, CountDto } from '@/common/dto/batch.dto'
import { IdDto } from '@/common/dto/id.dto'
import { WorkComicVersionService } from './comic-version.service'
import {
  BaseComicVersionDto,
  ComicVersionDetailResponseDto,
  CreateComicVersionDto,
  QueryComicVersionDto,
  UpdateComicVersionDto,
  UpdateVersionEnabledStatusDto,
  UpdateVersionRecommendedStatusDto,
} from './dto/comic-version.dto'

/**
 * 漫画版本管理控制器
 * 提供漫画版本相关的API接口
 */
@ApiTags('漫画版本管理模块')
@Controller('admin/work/comic-version')
export class WorkComicVersionController {
  constructor(private readonly comicVersionService: WorkComicVersionService) {}

  /**
   * 创建漫画版本
   */
  @Post('/create-comic-version')
  @ApiDoc({
    summary: '创建漫画版本',
    model: IdDto,
  })
  async create(@Body() body: CreateComicVersionDto) {
    return this.comicVersionService.createComicVersion(body)
  }

  /**
   * 分页查询漫画版本列表
   */
  @Get('/comic-version-page')
  @ApiPageDoc({
    summary: '分页查询漫画版本列表',
    model: BaseComicVersionDto,
  })
  async getPage(@Query() query: QueryComicVersionDto) {
    return this.comicVersionService.getComicVersionPage(query)
  }

  /**
   * 获取漫画版本详情
   */
  @Get('/comic-version-detail')
  @ApiDoc({
    summary: '获取漫画版本详情',
    model: ComicVersionDetailResponseDto,
  })
  async getDetail(@Query() query: IdDto) {
    return this.comicVersionService.getComicVersionDetail(query.id)
  }

  /**
   * 更新漫画版本信息
   */
  @Post('/update-comic-version')
  @ApiDoc({
    summary: '更新漫画版本信息',
    model: IdDto,
  })
  async update(@Body() body: UpdateComicVersionDto) {
    return this.comicVersionService.updateComicVersion(body)
  }

  /**
   * 批量更新版本发布状态
   */
  @Post('/batch-update-version-publish-status')
  @ApiDoc({
    summary: '批量更新版本发布状态',
    model: CountDto,
  })
  async updatePublishStatus(@Body() body: BatchPublishDto) {
    return this.comicVersionService.updateMany({
      where: {
        id: { in: body.ids },
      },
      data: {
        isPublished: body.isPublished,
      },
    })
  }

  /**
   * 批量更新版本推荐状态
   */
  @Post('/batch-update-version-recommended-status')
  @ApiDoc({
    summary: '批量更新版本推荐状态',
    model: CountDto,
  })
  async updateRecommendedStatus(
    @Body() body: UpdateVersionRecommendedStatusDto,
  ) {
    return this.comicVersionService.updateVersionRecommendedStatus(body)
  }

  /**
   * 批量更新版本启用状态
   */
  @Post('/batch-update-version-enabled-status')
  @ApiDoc({
    summary: '批量更新版本启用状态',
    model: CountDto,
  })
  async updateEnabledStatus(@Body() body: UpdateVersionEnabledStatusDto) {
    return this.comicVersionService.updateMany({
      where: {
        id: { in: body.ids },
      },
      data: {
        isEnabled: body.isEnabled,
      },
    })
  }

  /**
   * 软删除版本
   */
  @Post('/delete-comic-version')
  @ApiDoc({
    summary: '软删除版本',
    model: IdDto,
  })
  async delete(@Body() body: IdDto) {
    return this.comicVersionService.deleteComicVersion(body.id)
  }
}
