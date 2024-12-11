import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'
import { ComicContentService } from '@/service/contentMgmt/comic/content.service'
import { ComicContentDTO } from '@/modules/admin/contentMgmt/comic/content/dto/content.dto'
import { BasicIdDTO, BasicOrderDTO, BasicPageDTO } from '@/basic/dto/basic.dto'

@Controller('/admin/comic/content', { description: '漫画内容' })
export class ComicContentController {
  @Inject()
  comicContentService: ComicContentService


  @Post('/upsertComicContent', { summary: '更新或创建漫画内容' })
  async upsertComicContent(@Body() body: ComicContentDTO) {
    return this.comicContentService.upsertComicContent(body)
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
