import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'
import { ComicContentService } from '@/service/contentMgmt/comic/content.service'
import { ComicContentDTO, RemoveChapterContentDTO } from '@/modules/admin/contentMgmt/comic/content/dto/content.dto'
import { BasicIdDTO, BasicOrderDTO, BasicPageDTO } from '@/basic/dto/basic.dto'

@Controller('/admin/comic/content', { description: '漫画内容' })
export class ComicContentController {
  @Inject()
  comicContentService: ComicContentService


  @Post('/createComicContent', { summary: '创建漫画内容' })
  async createComicContent(@Body() body: ComicContentDTO) {
    return this.comicContentService.createComicContent(body)
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
  async getComicContentPage(@Query() query: BasicPageDTO) {
    if (!query.orderBy) {
      query.orderBy = '{"order":"desc"}'
    }
    return this.comicContentService.findPage({ where: query })
  }
}
