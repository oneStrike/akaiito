import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc, ApiPageDoc } from '@/common/decorators/api-doc.decorator'
import { BatchOperationStatusIdsDto, CountDto } from '@/common/dto/batch.dto'
import { IdDto } from '@/common/dto/id.dto'
import { WorkComicChapterService } from './comic-chapter.service'
import {
  ComicChapterDetailResponseDto,
  ComicChapterPageResponseDto,
  CreateComicChapterDto,
  QueryComicChapterDto,
  UpdateComicChapterDto,
  UpdateChapterPublishStatusDto,
  UpdateChapterReadRuleDto,
} from './dto/comic-chapter.dto'

/**
 * 漫画章节管理控制器
 * 提供漫画章节相关的API接口
 */
@ApiTags('漫画章节管理模块')
@Controller('admin/work/comic-chapter')
export class WorkComicChapterController {
  constructor(private readonly comicChapterService: WorkComicChapterService) {}

  /**
   * 创建漫画章节
   */
  @Post('/create-comic-chapter')
  @ApiDoc({
    summary: '创建漫画章节',
    model: IdDto,
  })
  async create(@Body() body: CreateComicChapterDto) {
    return this.comicChapterService.createComicChapter(body)
  }

  /**
   * 分页查询漫画章节列表
   */
  @Get('/comic-chapter-page')
  @ApiPageDoc({
    summary: '分页查询漫画章节列表',
    model: ComicChapterPageResponseDto,
  })
  async getPage(@Query() query: QueryComicChapterDto) {
    return this.comicChapterService.getComicChapterPage(query)
  }

  /**
   * 获取漫画章节详情
   */
  @Get('/comic-chapter-detail')
  @ApiDoc({
    summary: '获取漫画章节详情',
    model: ComicChapterDetailResponseDto,
  })
  async getDetail(@Query() query: IdDto) {
    return this.comicChapterService.getComicChapterDetail(query.id)
  }

  /**
   * 更新漫画章节信息
   */
  @Post('/update-comic-chapter')
  @ApiDoc({
    summary: '更新漫画章节信息',
    model: IdDto,
  })
  async update(@Body() body: UpdateComicChapterDto) {
    return this.comicChapterService.updateComicChapter(body)
  }

  /**
   * 批量更新章节发布状态
   */
  @Post('/batch-update-chapter-publish-status')
  @ApiDoc({
    summary: '批量更新章节发布状态',
    model: CountDto,
  })
  async updatePublishStatus(@Body() body: UpdateChapterPublishStatusDto) {
    return this.comicChapterService.updateChapterPublishStatus(body)
  }

  /**
   * 批量更新章节查看规则
   */
  @Post('/batch-update-chapter-read-rule')
  @ApiDoc({
    summary: '批量更新章节查看规则',
    model: CountDto,
  })
  async updateReadRule(@Body() body: UpdateChapterReadRuleDto) {
    return this.comicChapterService.updateChapterReadRule(body)
  }

  /**
   * 软删除章节
   */
  @Post('/delete-comic-chapter')
  @ApiDoc({
    summary: '软删除章节',
    model: IdDto,
  })
  async delete(@Body() body: IdDto) {
    return this.comicChapterService.deleteComicChapter(body.id)
  }

  /**
   * 批量软删除章节
   */
  @Post('/batch-delete-comic-chapter')
  @ApiDoc({
    summary: '批量软删除章节',
    model: CountDto,
  })
  async batchDelete(@Body() body: BatchOperationStatusIdsDto) {
    return this.comicChapterService.batchDeleteComicChapter(body)
  }

  /**
   * 恢复软删除的章节
   */
  @Post('/restore-comic-chapter')
  @ApiDoc({
    summary: '恢复软删除的章节',
    model: IdDto,
  })
  async restore(@Body() body: IdDto) {
    return this.comicChapterService.restoreComicChapter(body.id)
  }

  /**
   * 获取指定漫画的章节列表
   */
  @Get('/chapters-by-comic')
  @ApiDoc({
    summary: '获取指定漫画的章节列表',
    model: [ComicChapterPageResponseDto],
  })
  async getChaptersByComic(@Query() query: { comicId: number }) {
    return this.comicChapterService.getChaptersByComicId(query.comicId)
  }
}