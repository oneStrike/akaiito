import { Body, Controller, Fields, Files, Get, Inject, Post, Query } from '@midwayjs/core'
import { ComicContentService } from '@/service/contentMgmt/comic/content.service'
import { RemoveChapterContentDTO } from '@/modules/admin/contentMgmt/comic/content/dto/content.dto'
import { BasicIdDTO, BasicOrderDTO, BasicPageDTO } from '@/basic/dto/basic.dto'
import { SortQuery } from '@/decorator/sortQuery.decorator'
import { UploadMiddleware, UploadStreamFieldInfo, UploadStreamFileInfo } from '@midwayjs/busboy'

@Controller('/admin/comic/content', { description: '漫画内容' })
export class ComicContentController {
  @Inject()
  comicContentService: ComicContentService


  @Post('/createComicContent', { middleware: [UploadMiddleware], summary: '创建漫画内容' })
  async upload(
    @Files() fileIterator: AsyncGenerator<UploadStreamFileInfo>,
    @Fields() fieldIterator: AsyncGenerator<UploadStreamFieldInfo>,
  ) {
    return this.comicContentService.createComicContent(fileIterator, fieldIterator)
  }

  @Post('/removeComicContent', { summary: '清空漫画章节内容' })
  async removeChapterContent(@Body() body: RemoveChapterContentDTO) {
    return this.comicContentService.removeChapterContent(body.chapterId)
  }

  @Post('/deleteComicContent', { summary: '删除漫画内容' })
  async deleteComicContent(@Body() body: BasicIdDTO) {
    return this.comicContentService.deleteContent(body.id)
  }

  @Post('/orderComicContentPage', { summary: '漫画内容排序' })
  async orderComicContentPage(@Body() body: BasicOrderDTO) {
    return this.comicContentService.updateOrder(body)
  }

  @Get('/getComicContentPage', { summary: '获取漫画内容分页' })
  @SortQuery({ order: 'desc' })
  async getComicContentPage(@Query() query: BasicPageDTO) {
    if (!query.orderBy) {
      query.orderBy = '{"order":"desc"}'
    }
    return this.comicContentService.findPage({ where: query })
  }
}
