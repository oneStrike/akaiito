import {
  Body,
  Controller,
  Fields,
  Files,
  Get,
  Inject,
  Post,
  Query,
} from '@midwayjs/core'
import { ComicContentService } from '@/service/contentMgmt/comic/content.service'
import {
  CreateComicContentDTO,
  ChapterContentDTO,
} from '@/modules/admin/contentMgmt/comic/content/dto/content.dto'
import { BasicIdDTO, BasicOrderDTO } from '@/basic/dto/basic.dto'
import { SortQuery } from '@/decorator/sortQuery.decorator'
import { UploadFileInfo, UploadMiddleware } from '@midwayjs/busboy'

@Controller('/admin/comic/content', { description: '漫画内容' })
export class ComicContentController {
  @Inject()
  comicContentService: ComicContentService

  @Post('/createComicContent', {
    middleware: [UploadMiddleware],
    summary: '创建漫画内容',
  })
  async upload(
    @Files() files: Array<UploadFileInfo>,
    @Fields() fields: CreateComicContentDTO,
  ) {
    console.log('Uploaded files:', files);
    console.log('Uploaded fields:', fields);
    return this.comicContentService.createComicContent(files, fields)
  }

  @Post('/removeComicContent', { summary: '清空漫画章节内容' })
  async removeChapterContent(@Body() body: ChapterContentDTO) {
    return this.comicContentService.removeChapterContent(body.chapterId)
  }

  @Post('/deleteComicContent', { summary: '删除漫画内容' })
  async deleteComicContent(@Body() body: BasicIdDTO) {
    return this.comicContentService.deleteContent(body.id)
  }

  @Post('/orderComicContentPage', { summary: '漫画内容排序' })
  async orderComicContentPage(@Body() body: BasicOrderDTO) {
    return this.comicContentService.updateOrder(body)
  }

  @Get('/getComicContent', { summary: '获取漫画内容分页' })
  @SortQuery({ order: 'desc' })
  async getComicContent(@Query() query: ChapterContentDTO) {
    return this.comicContentService.findList({ where: query })
  }
}
