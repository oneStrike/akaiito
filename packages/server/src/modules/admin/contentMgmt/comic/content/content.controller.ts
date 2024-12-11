import { Body, Controller, Inject, Post } from '@midwayjs/core'
import { ComicContentService } from '@/service/contentMgmt/comic/content.service'

@Controller('/admin/comic/content', { description: '漫画内容' })
export class ComicContentController {
  @Inject()
  comicContentService: ComicContentService


  @Post('/upsertComicContent', { summary: '更新或创建' })
  async upsertComicContent(@Body() body) {

  }
}
