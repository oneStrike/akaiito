import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiDoc } from '@/common/decorators/api-doc.decorator'
import { IdDto } from '@/common/dto/id.dto'
import { WorkComicService } from './comic.service'
import {
  BatchOperationStatusIdsDto,
  CreateComicDto,
  QueryComicDto,
  UpdateComicDto,
  UpdateComicHotDto,
  UpdateComicNewDto,
  UpdateComicRecommendedDto,
} from './dto/comic.dto'

/**
 * 漫画管理控制器
 * 提供漫画的增删改查等API接口
 */
@ApiTags('漫画管理')
@Controller('admin/work/comic')
export class WorkComicController {
  constructor(private readonly workComicService: WorkComicService) {}

  /**
   * 创建漫画
   */
  @Post('createComic')
  @ApiDoc({
    summary: '创建漫画',
    model: IdDto,
  })
  async createComic(@Body() createComicDto: CreateComicDto) {
    return this.workComicService.createComic(createComicDto)
  }

  /**
   * 分页查询漫画列表
   */
  @Get('comicPage')
  @ApiDoc({
    summary: '分页查询漫画列表',
    model: QueryComicDto,
  })
  async getComicPage(@Query() queryComicDto: QueryComicDto) {
    return this.workComicService.getComicPage(queryComicDto)
  }

  /**
   * 获取漫画详情
   */
  @Get('comicDetail')
  @ApiOperation({ summary: '获取漫画详情' })
  async getComicDetail(@Query() query: IdDto) {
    return this.workComicService.getComicDetail(query.id)
  }

  /**
   * 更新漫画信息
   */
  @Patch(':id')
  @ApiOperation({ summary: '更新漫画信息' })
  async updateComic(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateComicDto: Omit<UpdateComicDto, 'id'>,
  ) {
    return this.workComicService.updateComic({ ...updateComicDto, id })
  }

  /**
   * 批量更新漫画发布状态
   */
  @Patch('batch/status')
  @ApiOperation({ summary: '批量更新漫画发布状态' })
  async updateComicStatus(@Body() updateStatusDto: BatchOperationStatusIdsDto) {
    return this.workComicService.updateComicStatus(updateStatusDto)
  }

  /**
   * 批量更新漫画推荐状态
   */
  @Patch('batch/recommended')
  @ApiOperation({ summary: '批量更新漫画推荐状态' })
  async updateComicRecommended(
    @Body() updateRecommendedDto: UpdateComicRecommendedDto,
  ) {
    return this.workComicService.updateComicRecommended(updateRecommendedDto)
  }

  /**
   * 批量更新漫画热门状态
   */
  @Patch('batch/hot')
  @ApiOperation({ summary: '批量更新漫画热门状态' })
  async updateComicHot(@Body() updateHotDto: UpdateComicHotDto) {
    return this.workComicService.updateComicHot(updateHotDto)
  }

  /**
   * 批量更新漫画新作状态
   */
  @Patch('batch/new')
  @ApiOperation({ summary: '批量更新漫画新作状态' })
  async updateComicNew(@Body() updateNewDto: UpdateComicNewDto) {
    return this.workComicService.updateComicNew(updateNewDto)
  }

  /**
   * 软删除漫画
   */
  @Delete(':id')
  @ApiOperation({ summary: '软删除漫画' })
  async deleteComic(@Param('id', ParseIntPipe) id: number) {
    return this.workComicService.deleteComic(id)
  }

  /**
   * 更新漫画统计数据
   */
  @Patch(':id/stats')
  @ApiOperation({ summary: '更新漫画统计数据' })
  async updateComicStats(@Param('id', ParseIntPipe) id: number) {
    return this.workComicService.updateComicStats(id)
  }

  /**
   * 更新漫画评分
   */
  @Patch(':id/rating')
  @ApiOperation({ summary: '更新漫画评分' })
  async updateComicRating(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { rating: number; userId?: number },
  ) {
    return this.workComicService.updateComicRating(id, body.rating, body.userId)
  }

  /**
   * 增加漫画收藏数
   */
  @Patch(':id/favorite')
  @ApiOperation({ summary: '增加漫画收藏数' })
  async incrementFavoriteCount(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { increment?: number },
  ) {
    return this.workComicService.incrementFavoriteCount(id, body.increment || 1)
  }

  /**
   * 增加漫画点赞数
   */
  @Patch(':id/like')
  @ApiOperation({ summary: '增加漫画点赞数' })
  async incrementLikeCount(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { increment?: number },
  ) {
    return this.workComicService.incrementLikeCount(id, body.increment || 1)
  }

  /**
   * 增加漫画评论数
   */
  @Patch(':id/comment')
  @ApiOperation({ summary: '增加漫画评论数' })
  async incrementCommentCount(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { increment?: number },
  ) {
    return this.workComicService.incrementCommentCount(id, body.increment || 1)
  }
}
