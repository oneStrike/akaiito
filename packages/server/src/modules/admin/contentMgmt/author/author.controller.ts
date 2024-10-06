import { BasicIdDto, BasicIdStatusDto } from '@/basic/dto/basic.dto'
import { AuthorService } from '@/modules/admin/contentMgmt/author/author.service'
import {
  AuthorDto,
  CreateAuthorDto,
  GetAuthorPageDto,
} from '@/modules/admin/contentMgmt/author/dto/author.dto'
import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'
import { Context } from '@midwayjs/koa'

@Controller('/admin/contentMgmt/author', {
  tagName: '管理员',
  description: '管理平台的用户管理',
})
export class AuthorController {
  @Inject()
  authorService: AuthorService

  @Inject()
  ctx: Context

  @Get('/getAuthorPage', { summary: '获取作者分页列表' })
  async getAuthorPage(@Query() query: GetAuthorPageDto) {
    return this.authorService.findPage({
      ...query,
      fuzzy: ['name'],
    })
  }

  @Post('/createAuthor', { summary: '创建作者' })
  async createAuthor(@Body() body: CreateAuthorDto) {
    return this.authorService.create(body)
  }

  @Post('/updateAuthorStatus', { summary: '启用禁用作者' })
  @Post('/updateAuthor', { summary: '更新作者信息' })
  async updateAuthor(@Body() body: AuthorDto | BasicIdStatusDto) {
    return this.authorService.update({ id: body.id }, body)
  }

  @Post('/deleteAuthor', { summary: '更新作者信息' })
  async deleteAuthor(@Body() body: BasicIdDto) {
    return this.authorService.delete({ id: body.id })
  }
}
