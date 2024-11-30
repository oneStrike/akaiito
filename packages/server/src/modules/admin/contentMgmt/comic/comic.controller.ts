import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'
import { ComicService } from '@/service/contentMgmt/comic.service'
import { ComicDto, ComicSearchDto, ComicUpdateDto } from '@/modules/admin/contentMgmt/comic/dto/comic.dto'
import { BasicIdDto, BasicIdStatusDto } from '@/basic/dto/basic.dto'

@Controller('/admin/comic', { description: '漫画' })
export class ComicController {
  @Inject()
  comicService: ComicService

  @Post('/createComic', { summary: '创建漫画' })
  async createComic(@Body() body: ComicDto) {
    return await this.comicService.createComic(body)
  }

  @Post('/updateComic', { summary: '更新漫画' })
  async updateComic(@Body() body: ComicUpdateDto) {
    return await this.comicService.update({ where: { id: body.id }, data: body })
  }

  @Post('/deleteComic', { summary: '删除漫画' })
  async deleteComic(@Body() body: BasicIdDto) {
    return await this.comicService.delete({ where: { id: body.id } })
  }

  @Get('/getComicPage', { summary: '获取漫画列表' })
  async getComicPage(@Query() query: ComicSearchDto) {
    return await this.comicService.getPage(query)
  }

  @Get('/getComic', { summary: '获取漫画详情' })
  async getComic(@Query() query: BasicIdDto) {
    return await this.comicService.findUnique({ where: query })
  }

  @Post('/updateComicOrder', { summary: '更新漫画发布状态' })
  async updateComicOrder(@Body() body: BasicIdStatusDto) {
    return await this.comicService.update({ where: { id: body.id }, data: { isPublish: body.status } })
  }
}
