import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc, ApiPageDoc } from '@/common/decorators/api-doc.decorator'
import { CountDto } from '@/common/dto/batch.dto'
import { IdDto } from '@/common/dto/id.dto'
import { WorkComicService } from './comic.service'
import {
  CreateComicDto,
  IncrementCountDto,
  QueryComicDto,
  UpdateComicDto,
  UpdateComicHotDto,
  UpdateComicNewDto,
  UpdateComicRatingDto,
  UpdateComicRecommendedDto,
  UpdateComicStatusDto,
} from './dto/comic.dto'

/**
 * 漫画管理控制器
 * 提供漫画相关的API接口
 */
@ApiTags('漫画管理模块')
@Controller('admin/work/comic')
export class WorkComicController {
  constructor(private readonly comicService: WorkComicService) {}

  /**
   * 创建漫画
   */
  @Post('/create-comic')
  @ApiDoc({
    summary: '创建漫画',
    model: IdDto,
  })
  async create(@Body() body: CreateComicDto) {
    return this.comicService.createComic(body)
  }

  /**
   * 分页查询漫画列表
   */
  @Get('/comic-page')
  @ApiPageDoc({
    summary: '分页查询漫画列表',
    model: QueryComicDto,
  })
  async getPage(@Query() query: QueryComicDto) {
    return this.comicService.getComicPage(query)
  }

  /**
   * 获取漫画详情
   */
  @Get('/comic-detail')
  @ApiDoc({
    summary: '获取漫画详情',
    model: IdDto,
  })
  async getDetail(@Query() query: IdDto) {
    return this.comicService.getComicDetail(query.id)
  }

  /**
   * 更新漫画信息
   */
  @Post('/update-comic')
  @ApiDoc({
    summary: '更新漫画信息',
    model: IdDto,
  })
  async update(@Body() body: UpdateComicDto) {
    return this.comicService.updateComic(body)
  }

  /**
   * 批量更新漫画发布状态
   */
  @Post('/batch-update-comic-status')
  @ApiDoc({
    summary: '批量更新漫画发布状态',
    model: CountDto,
  })
  async updateStatus(@Body() body: UpdateComicStatusDto) {
    return this.comicService.updateComicStatus(body)
  }

  /**
   * 批量更新漫画推荐状态
   */
  @Post('/batch-update-comic-recommended')
  @ApiDoc({
    summary: '批量更新漫画推荐状态',
    model: CountDto,
  })
  async updateRecommended(@Body() body: UpdateComicRecommendedDto) {
    return this.comicService.updateComicRecommended(body)
  }

  /**
   * 批量更新漫画热门状态
   */
  @Post('/batch-update-comic-hot')
  @ApiDoc({
    summary: '批量更新漫画热门状态',
    model: CountDto,
  })
  async updateHot(@Body() body: UpdateComicHotDto) {
    return this.comicService.updateComicHot(body)
  }

  /**
   * 批量更新漫画新作状态
   */
  @Post('/batch-update-comic-new')
  @ApiDoc({
    summary: '批量更新漫画新作状态',
    model: CountDto,
  })
  async updateNew(@Body() body: UpdateComicNewDto) {
    return this.comicService.updateComicNew(body)
  }

  /**
   * 软删除漫画
   */
  @Post('/delete-comic')
  @ApiDoc({
    summary: '软删除漫画',
    model: IdDto,
  })
  async delete(@Body() body: IdDto) {
    return this.comicService.deleteComic(body.id)
  }

  /**
   * 更新漫画统计数据
   */
  @Post('/update-comic-stats')
  @ApiDoc({
    summary: '更新漫画统计数据',
    model: IdDto,
  })
  async updateStats(@Body() body: IdDto) {
    return this.comicService.updateComicStats(body.id)
  }

  /**
   * 更新漫画评分
   */
  @Post('/update-comic-rating')
  @ApiDoc({
    summary: '更新漫画评分',
    model: IdDto,
  })
  async updateRating(@Body() body: UpdateComicRatingDto) {
    return this.comicService.updateComicRating(
      body.id,
      body.rating,
      body.userId,
    )
  }

  /**
   * 增加漫画收藏数
   */
  @Post('/increment-favorite-count')
  @ApiDoc({
    summary: '增加漫画收藏数',
    model: IdDto,
  })
  async incrementFavoriteCount(@Body() body: IncrementCountDto) {
    return this.comicService.incrementFavoriteCount(
      body.id,
      body.increment || 1,
    )
  }

  /**
   * 增加漫画点赞数
   */
  @Post('/increment-like-count')
  @ApiDoc({
    summary: '增加漫画点赞数',
    model: IdDto,
  })
  async incrementLikeCount(@Body() body: IncrementCountDto) {
    return this.comicService.incrementLikeCount(body.id, body.increment || 1)
  }

  /**
   * 增加漫画评论数
   */
  @Post('/increment-comment-count')
  @ApiDoc({
    summary: '增加漫画评论数',
    model: IdDto,
  })
  async incrementCommentCount(@Body() body: IncrementCountDto) {
    return this.comicService.incrementCommentCount(body.id, body.increment || 1)
  }
}
