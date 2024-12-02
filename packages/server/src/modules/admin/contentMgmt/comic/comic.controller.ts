import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'
import { ComicService } from '@/service/contentMgmt/comic.service'
import { ComicDTO, ComicSearchDTO, ComicUpdateDTO } from '@/modules/admin/contentMgmt/comic/dto/comic.dto'
import { BasicIdDTO, BasicIdStatusDTO } from '@/basic/dto/basic.dto'

@Controller('/admin/comic', { description: '漫画' })
export class ComicController {
  @Inject()
  comicService: ComicService

  @Post('/createComic', { summary: '创建漫画' })
  async createComic(@Body() body: ComicDTO) {
    return await this.comicService.createComic(body)
  }

  @Post('/updateComic', { summary: '更新漫画' })
  async updateComic(@Body() body: ComicUpdateDTO) {
    return await this.comicService.update({ where: { id: body.id }, data: body })
  }

  @Post('/deleteComic', { summary: '删除漫画' })
  async deleteComic(@Body() body: BasicIdDTO) {
    return await this.comicService.delete({ where: { id: body.id } })
  }

  @Get('/getComicPage', { summary: '获取漫画列表' })
  async getComicPage(@Query() query: ComicSearchDTO) {
    const UTC = new Date().toUTCString();
    console.log(UTC);
    const UTCtimestamp = Date.parse(UTC);
    console.log(new Date(UTCtimestamp));
    return await this.comicService.getPage(query)
  }

  @Get('/getComicDetail', { summary: '获取漫画详情' })
  async getComicDetail(@Query() query: BasicIdDTO) {
    return this.comicService.getDetail(query)
  }

  @Post('/updateComicOrder', { summary: '更新漫画发布状态' })
  async updateComicOrder(@Body() body: BasicIdStatusDTO) {
    return await this.comicService.update({ where: { id: body.id }, data: { isPublish: body.status } })
  }
}
