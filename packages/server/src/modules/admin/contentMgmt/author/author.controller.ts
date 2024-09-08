import { AuthorService } from '@/modules/admin/contentMgmt/author/author.service'
import { Controller, Inject } from '@midwayjs/core'
import { Context } from '@midwayjs/koa'

@Controller('/admin/author', {
  tagName: '管理员',
  description: '管理平台的用户管理',
})
export class AuthorController {
  @Inject()
  authorService: AuthorService

  @Inject()
  ctx: Context
}
