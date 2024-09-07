import { Controller, Inject } from '@midwayjs/core'
import type { AuthorService } from '@/modules/admin/contentMgmt/author/author.service'
import type { Context } from '@midwayjs/koa'

@Controller('/admin/user', {
  tagName: '管理员',
  description: '管理平台的用户管理',
})
export class AuthorController {
  @Inject()
  authorService: AuthorService

  @Inject()
  ctx: Context
}
