import { BasicPageDto } from '@/basic/dto/basic.dto'
import { AuthorService } from '@/modules/admin/contentMgmt/author/author.service'
import {
  AuthorDto,
  CreateAuthorDto,
  GetAuthorPageDto,
} from '@/modules/admin/contentMgmt/author/dto/author.dto'
import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'
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

  @Post('/createAuthor', { summary: '创建作者' })
  async createAuthor(@Body() body: CreateAuthorDto) {
    return this.authorService.create(body)
  }

  @Post('/updateAuthor', { summary: '更新作者信息' })
  async updateAuthor(@Body() body: AuthorDto) {
    return this.authorService.update({ id: body.id }, body)
  }

  @Get('/getAuthorPage', { summary: '获取作者分页列表' })
  async getAuthorPage(@Query() query: GetAuthorPageDto & BasicPageDto) {
    console.log(query)
    return this.authorService.findPage({
      ...query,
      fuzzy: ['name'],
    })
  }
}
