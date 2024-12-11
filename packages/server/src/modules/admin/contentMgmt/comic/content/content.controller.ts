import { Controller, Inject } from '@midwayjs/core'
import { ComicContentService } from '@/service/contentMgmt/comic/content.service'

@Controller('/admin/comic/content', { description: '漫画内容' })
export class ComicContentController {
  @Inject()
  comicContentService: ComicContentService
}
