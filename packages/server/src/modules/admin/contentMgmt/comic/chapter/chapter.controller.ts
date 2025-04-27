import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'
import { ChapterService } from '@/service/contentMgmt/chapter.service'
import {
  AddChapterContentDTO,
  ChapterDTO,
  ChapterPageDTO,
  UpdateChapterDTO,
  updateChapterPublishDTO,
} from '@/modules/admin/contentMgmt/comic/chapter/dto/chapter.dto'
import { BasicIdDTO, BasicOrderDTO } from '@/basic/dto/basic.dto'
import { SortQuery } from '@/decorator/sortQuery.decorator'

@Controller('/admin/chapter', { description: '作品章节' })
export class ChapterController {
  @Inject()
  chapterService: ChapterService

  @Post('/createChapter', { summary: '添加作品章节' })
  async createChapter(@Body() body: ChapterDTO) {
    return await this.chapterService.createChapter(body)
  }

  @Get('/getChapter', { summary: '获取作品章节' })
  @SortQuery()
  async getChapter(@Query() query: ChapterPageDTO) {
    return await this.chapterService.getChapter(query)
  }

  @Post('/updateChapter', { summary: '更新作品章节' })
  async updateChapter(@Body() body: UpdateChapterDTO) {
    return await this.chapterService.update({
      where: { id: body.id },
      data: body,
    })
  }

  @Post('/updateChapterPublish', { summary: '更新作品章节发布状态' })
  async updateChapterPublish(@Body() body: updateChapterPublishDTO) {
    return await this.chapterService.update({
      where: { id: body.id },
      data: body,
    })
  }

  @Post('/deleteChapter', { summary: '删除作品章节' })
  async deleteChapter(@Body() body: BasicIdDTO) {
    return await this.chapterService.delete({ where: { id: body.id } })
  }

  @Post('/updateChapterOrder', { summary: '删除作品章节' })
  async updateChapterOrder(@Body() body: BasicOrderDTO) {
    return await this.chapterService.updateOrder(body)
  }

  @Post('/addChapterContent', { summary: '添加章节内容' })
  async addChapterContent(@Body() body: AddChapterContentDTO) {
    return await this.chapterService.addChapterContent(body)
  }
}
