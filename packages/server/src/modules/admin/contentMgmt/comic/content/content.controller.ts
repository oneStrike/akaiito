import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'
import { ComicContentService } from '@/service/contentMgmt/comic/content.service'
import { ComicContentDTO } from '@/modules/admin/contentMgmt/comic/content/dto/content.dto'
import { BasicIdDTO, BasicPageDTO } from '@/basic/dto/basic.dto'

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
    return this.comicContentService.delete({ where: { id: body.id } })
  }

  @Get('/getComicContentPage', { summary: '获取漫画内容分页' })
  async getComicContentPage(@Query() query: BasicPageDTO) {
    return this.comicContentService.findPage({ where: query })
  }
}
