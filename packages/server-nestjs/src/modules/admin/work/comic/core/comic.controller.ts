import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc, ApiPageDoc } from '@/common/decorators/api-doc.decorator'
import { CountDto } from '@/common/dto/batch.dto'
import { IdDto } from '@/common/dto/id.dto'
import { WorkComicVersionService } from '../version/comic-version.service'
import {
  ComicVersionDetailResponseDto,
  CreateComicVersionDto,
  UpdateComicVersionDto,
} from '../version/dto/comic-version.dto'
import { WorkComicService } from './comic.service'
import {
  BaseComicDto,
  CreateComicDto,
  QueryComicDto,
  UpdateComicDto,
  UpdateComicHotDto,
  UpdateComicNewDto,
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
  constructor(
    private readonly comicService: WorkComicService,
    private readonly comicVersionService: WorkComicVersionService,
  ) {}

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
    model: BaseComicDto,
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
    model: BaseComicDto,
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
   * 获取指定漫画的版本列表
   */
  @Get('/versions')
  @ApiDoc({
    summary: '获取指定漫画的版本列表',
    model: [ComicVersionDetailResponseDto],
  })
  async getVersionsByComic(@Query() query: { comicId: number }) {
    return this.comicVersionService.getVersionsByComicId(query.comicId)
  }

  /**
   * 为漫画创建版本
   */
  @Post('/create-version')
  @ApiDoc({
    summary: '为漫画创建版本',
    model: IdDto,
  })
  async createVersion(@Body() body: CreateComicVersionDto) {
    return this.comicVersionService.createComicVersion(body)
  }

  /**
   * 更新漫画版本信息
   */
  @Post('/update-version')
  @ApiDoc({
    summary: '更新漫画版本信息',
    model: IdDto,
  })
  async updateVersion(@Body() body: UpdateComicVersionDto) {
    return this.comicVersionService.updateComicVersion(body)
  }

  /**
   * 删除漫画版本
   */
  @Post('/delete-version')
  @ApiDoc({
    summary: '删除漫画版本',
    model: IdDto,
  })
  async deleteVersion(@Body() body: IdDto) {
    return this.comicVersionService.deleteComicVersion(body.id)
  }
}
