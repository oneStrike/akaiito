import {
  Body,
  Controller,
  Fields,
  Files,
  Get,
  Inject,
  Post,
  Query,
} from '@midwayjs/core'
import {
  ChapterDTO,
  ChapterPageDTO,
  ComicChapterContentDTO,
  DeleteComicChapterContentDTO,
  UpdateChapterDTO,
  updateChapterPublishDTO,
} from '@/modules/admin/contentMgmt/comic/chapter/dto/chapter.dto'
import { BasicIdDTO, BasicOrderDTO } from '@/basic/dto/basic.dto'
import { SortQuery } from '@/decorator/sortQuery.decorator'
import { WorkComicChapterService } from '@/service/work/comic/chapter.service'
import { UploadFileInfo, UploadMiddleware } from '@midwayjs/busboy'

@Controller('/admin/comic/chapter', { description: '漫画章节' })
export class ComicChapterController {
  @Inject()
  chapterService: WorkComicChapterService

  @Post('/createChapter', { summary: '添加漫画章节' })
  async createChapter(@Body() body: ChapterDTO) {
    return await this.chapterService.createChapter(body)
  }

  @Get('/getChapterPage', { summary: '获取漫画章节分页列表' })
  @SortQuery()
  async getChapterPage(@Query() query: ChapterPageDTO) {
    return await this.chapterService.getChapter(query)
  }

  @Get('/getChapter', { summary: '获取漫画章节' })
  async getChapter(@Query() query: BasicIdDTO) {
    return await this.chapterService.findUnique({ where: query })
  }

  @Post('/updateChapter', { summary: '更新漫画章节' })
  async updateChapter(@Body() body: UpdateChapterDTO) {
    return await this.chapterService.update({
      where: { id: body.id },
      data: body,
    })
  }

  @Post('/updateChapterPublish', { summary: '更新漫画章节发布状态' })
  async updateChapterPublish(@Body() body: updateChapterPublishDTO) {
    return await this.chapterService.update({
      where: { id: body.id },
      data: body,
    })
  }

  @Post('/deleteChapter', { summary: '删除漫画章节' })
  async deleteChapter(@Body() body: BasicIdDTO) {
    return await this.chapterService.delete({ where: { id: body.id } })
  }

  @Post('/updateChapterOrder', { summary: '更新漫画章节排序' })
  async updateChapterOrder(@Body() body: BasicOrderDTO) {
    return await this.chapterService.updateOrder(body)
  }

  @Get('/getChapterContent', { summary: '获取漫画章节内容' })
  async getChapterContent(@Query() query: ComicChapterContentDTO) {
    return await this.chapterService.getChapterContent(query)
  }

  @Post('/createComicChapterContent', {
    middleware: [UploadMiddleware],
    summary: '添加漫画章节内容',
  })
  async createComicChapterContent(
    @Files() files: Array<UploadFileInfo>,
    @Fields() fields: BasicIdDTO,
  ) {
    return await this.chapterService.createComicChapterContent(files, fields)
  }

  @Post('/deleteChapterContent', { summary: '删除漫画章节内容' })
  async deleteChapterContent(@Body() body: DeleteComicChapterContentDTO) {
    return await this.chapterService.deleteChapterContent(body)
  }

  @Post('/clearChapterContent', { summary: '清空漫画章节内容' })
  async clearChapterContent(@Body() body: ComicChapterContentDTO) {
    return await this.chapterService.update({
      where: { id: body.id, comicId: body.comicId },
      data: { content: '[]' },
    })
  }
}
