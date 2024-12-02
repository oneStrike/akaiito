import { BasicIdDTO, BasicIdStatusDTO } from '@/basic/dto/basic.dto'
import { AuthorService } from '@/service/contentMgmt/author.service'
import { AuthorDTO, CreateAuthorDTO, GetAuthorPageDTO } from '@/modules/admin/contentMgmt/author/dto/author.dto'
import { Context } from '@midwayjs/koa'
import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'

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
  async getAuthorPage(@Query() query: GetAuthorPageDTO) {
    return this.authorService.findPage({
      where: query,
      like: { name: 'contains' },
    })
  }

  @Post('/createAuthor', { summary: '创建作者' })
  async createAuthor(@Body() body: CreateAuthorDTO) {
    return this.authorService.create({ data: body })
  }

  @Post('/updateAuthor', { summary: '更新作者信息' })
  async updateAuthor(@Body() body: AuthorDTO) {
    return this.authorService.update({ where: { id: body.id }, data: body })
  }

  @Post('/updateAuthorStatus', { summary: '启用禁用作者' })
  async updateAuthorStatus(@Body() body: BasicIdStatusDTO) {
    return this.authorService.update({ where: { id: body.id }, data: body })
  }

  @Post('/deleteAuthor', { summary: '删除作者信息' })
  async deleteAuthor(@Body() body: BasicIdDTO) {
    return this.authorService.delete({ where: { id: body.id } })
  }
}
