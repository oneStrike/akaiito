import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc, ApiPageDoc } from '@/common/decorators/api-doc.decorator'
import { BatchOperationStatusIdsDto, CountDto } from '@/common/dto/batch.dto'
import { IdDto } from '@/common/dto/id.dto'
import { OrderDto } from '@/common/dto/order.dto'
import { WorkComicVersionService } from '../version/comic-version.service'
import { WorkComicChapterService } from './comic-chapter.service'
import {
  AddChapterContentDto,
  BaseComicChapterDto,
  BatchUpdateChapterContentsDto,
  ComicChapterPageResponseDto,
  CreateComicChapterDto,
  DeleteChapterContentDto,
  MoveChapterContentDto,
  QueryComicChapterDto,
  UpdateChapterContentDto,
  UpdateChapterPublishStatusDto,
  UpdateComicChapterDto,
} from './dto/comic-chapter.dto'

/**
 * 漫画章节管理控制器
 * 提供漫画章节相关的API接口
 */
@ApiTags('漫画章节管理模块')
@Controller('admin/work/comic-chapter')
export class WorkComicChapterController {
  constructor(
    private readonly comicChapterService: WorkComicChapterService,
    private readonly comicVersionService: WorkComicVersionService,
  ) {}

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
    model: BaseComicChapterDto,
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
   * 获取指定漫画的章节列表
   */
  @Get('/chapters-by-comic')
  @ApiDoc({
    summary: '获取指定漫画的章节列表',
    model: [ComicChapterPageResponseDto],
  })
  async getChaptersByComic(
    @Query() query: { comicId: number; versionId?: number },
  ) {
    return this.comicChapterService.getChaptersByComicId(
      query.comicId,
      query.versionId,
    )
  }

  /**
   * 获取指定版本的章节列表
   */
  @Get('/chapters-by-version')
  @ApiDoc({
    summary: '获取指定版本的章节列表',
    model: [ComicChapterPageResponseDto],
  })
  async getChaptersByVersion(@Query() query: { versionId: number }) {
    return this.comicChapterService.getChaptersByVersionId(query.versionId)
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
   * 交换两个章节的章节号
   */
  @Post('swap-chapter-numbers')
  @ApiDoc({ summary: '交换两个章节的章节号', model: OrderDto })
  async swapChapterNumbers(@Body() swapChapterNumberDto: OrderDto) {
    return this.comicChapterService.swapChapterNumbers(swapChapterNumberDto)
  }

  /**
   * 批量移动章节到指定版本
   */
  @Post('/batch-move-chapters-to-version')
  @ApiDoc({
    summary: '批量移动章节到指定版本',
    model: CountDto,
  })
  async batchMoveChaptersToVersion(
    @Body() body: { chapterIds: number[]; targetVersionId: number },
  ) {
    return this.comicChapterService.batchMoveChaptersToVersion(
      body.chapterIds,
      body.targetVersionId,
    )
  }

  /**
   * 复制章节到指定版本
   */
  @Post('/copy-chapter-to-version')
  @ApiDoc({
    summary: '复制章节到指定版本',
    model: IdDto,
  })
  async copyChapterToVersion(
    @Body() body: { chapterId: number; targetVersionId: number },
  ) {
    return this.comicChapterService.copyChapterToVersion(
      body.chapterId,
      body.targetVersionId,
    )
  }

  /**
   * 获取章节内容详情
   */
  @Get('/chapter-contents')
  @ApiDoc({
    summary: '获取章节内容详情',
    model: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  })
  async getChapterContents(@Query() query: IdDto) {
    return this.comicChapterService.getChapterContents(query.id)
  }

  /**
   * 添加章节内容
   */
  @Post('/add-chapter-content')
  @ApiDoc({
    summary: '添加章节内容',
    model: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  })
  async addChapterContent(@Body() body: AddChapterContentDto) {
    return this.comicChapterService.addChapterContent(body)
  }

  /**
   * 更新章节内容
   */
  @Post('/update-chapter-content')
  @ApiDoc({
    summary: '更新章节内容',
    model: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  })
  async updateChapterContent(@Body() body: UpdateChapterContentDto) {
    return this.comicChapterService.updateChapterContent(body)
  }

  /**
   * 删除章节内容
   */
  @Post('/delete-chapter-content')
  @ApiDoc({
    summary: '删除章节内容',
    model: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  })
  async deleteChapterContent(@Body() body: DeleteChapterContentDto) {
    return this.comicChapterService.deleteChapterContent(body)
  }

  /**
   * 移动章节内容（排序）
   */
  @Post('/move-chapter-content')
  @ApiDoc({
    summary: '移动章节内容（排序）',
    model: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  })
  async moveChapterContent(@Body() body: MoveChapterContentDto) {
    return this.comicChapterService.moveChapterContent(body)
  }

  /**
   * 批量更新章节内容
   */
  @Post('/batch-update-chapter-contents')
  @ApiDoc({
    summary: '批量更新章节内容',
    model: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  })
  async batchUpdateChapterContents(
    @Body() body: BatchUpdateChapterContentsDto,
  ) {
    return this.comicChapterService.batchUpdateChapterContents(body)
  }
}
