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
    const localDate = new Date(body.publishAt)

    // 获取本地时间的各个部分
    const year = localDate.getFullYear()
    const month = String(localDate.getMonth() + 1).padStart(2, '0') // 月份从 0 开始，所以需要加 1，并补零
    const day = String(localDate.getDate()).padStart(2, '0')
    const hours = String(localDate.getHours()).padStart(2, '0')
    const minutes = String(localDate.getMinutes()).padStart(2, '0')
    const seconds = String(localDate.getSeconds()).padStart(2, '0')

    // 格式化时间字符串
    const gmt8Time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} GMT+0800`

    // 输出结果
    console.log(gmt8Time)
    return body
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

  @Get('/getComicDetail', { summary: '获取漫画详情' })
  async getComicDetail(@Query() query: BasicIdDto) {
    return this.comicService.getDetail(query)
  }

  @Post('/updateComicOrder', { summary: '更新漫画发布状态' })
  async updateComicOrder(@Body() body: BasicIdStatusDto) {
    return await this.comicService.update({ where: { id: body.id }, data: { isPublish: body.status } })
  }
}
