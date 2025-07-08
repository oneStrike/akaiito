import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc, ApiPageDoc } from '@/common/decorators/api-doc.decorator'
import { CountDto } from '@/common/dto/batch.dto'
import { IdDto } from '@/common/dto/id.dto'
import { WorkComicVersionService } from './comic-version.service'
import {
  ComicVersionDetailResponseDto,
  ComicVersionPageResponseDto,
  CreateComicVersionDto,
  QueryComicVersionDto,
  UpdateComicVersionDto,
  UpdateVersionEnabledStatusDto,
  UpdateVersionPublishStatusDto,
  UpdateVersionReadRuleDto,
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
    model: ComicVersionPageResponseDto,
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
  async updatePublishStatus(@Body() body: UpdateVersionPublishStatusDto) {
    return this.comicVersionService.updateVersionPublishStatus(body)
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
    return this.comicVersionService.updateVersionEnabledStatus(body)
  }

  /**
   * 批量更新版本查看规则
   */
  @Post('/batch-update-version-read-rule')
  @ApiDoc({
    summary: '批量更新版本查看规则',
    model: CountDto,
  })
  async updateReadRule(@Body() body: UpdateVersionReadRuleDto) {
    return this.comicVersionService.updateVersionReadRule(body)
  }

  /**
   * 获取指定漫画的版本列表
   */
  @Get('/versions-by-comic')
  @ApiDoc({
    summary: '获取指定漫画的版本列表',
    model: [ComicVersionPageResponseDto],
  })
  async getVersionsByComic(@Query() query: { comicId: number }) {
    return this.comicVersionService.getVersionsByComicId(query.comicId)
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

  /**
   * 增加版本阅读次数
   */
  @Post('/increment-view-count')
  @ApiDoc({
    summary: '增加版本阅读次数',
    model: IdDto,
  })
  async incrementViewCount(@Body() body: { id: number; increment?: number }) {
    return this.comicVersionService.incrementViewCount(body.id, body.increment)
  }

  /**
   * 增加版本收藏数
   */
  @Post('/increment-favorite-count')
  @ApiDoc({
    summary: '增加版本收藏数',
    model: IdDto,
  })
  async incrementFavoriteCount(
    @Body() body: { id: number; increment?: number },
  ) {
    return this.comicVersionService.incrementFavoriteCount(
      body.id,
      body.increment,
    )
  }

  /**
   * 增加版本点赞数
   */
  @Post('/increment-like-count')
  @ApiDoc({
    summary: '增加版本点赞数',
    model: IdDto,
  })
  async incrementLikeCount(@Body() body: { id: number; increment?: number }) {
    return this.comicVersionService.incrementLikeCount(body.id, body.increment)
  }

  /**
   * 更新版本评分
   */
  @Post('/update-version-rating')
  @ApiDoc({
    summary: '更新版本评分',
    model: IdDto,
  })
  async updateRating(@Body() body: { id: number; rating: number }) {
    return this.comicVersionService.updateVersionRating(body.id, body.rating)
  }
}
