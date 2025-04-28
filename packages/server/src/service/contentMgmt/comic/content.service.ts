import { Inject, Provide } from '@midwayjs/core'
import { BasicService } from '@/basic/service/basic.service'
import { ComicContent, PrismaClient } from '@prisma/client'
import { FileService } from '@/basic/service/file.service'
import { UploadFileInfo } from '@midwayjs/busboy'
import { ComicService } from './comic.service'
import { ChapterService } from '../chapter.service'
import { CreateComicContentDTO } from '@/modules/admin/contentMgmt/comic/content/dto/content.dto'

@Provide()
export class ComicContentService extends BasicService<ComicContent> {
  @Inject()
  prismaClient: PrismaClient

  @Inject()
  fileService: FileService

  @Inject()
  comicService: ComicService

  @Inject()
  chapterService: ChapterService

  protected get model() {
    return this.prismaClient.comicContent
  }

  // 创建内容
  async createComicContent(
    files: Array<UploadFileInfo>,
    fields: CreateComicContentDTO,
  ) {
    const { comicId, chapterId } = fields
    if (!comicId || !chapterId) {
      this.throwError('漫画数据关联失败')
    }

    const [comic, chapter] = await Promise.all([
      this.comicService.isExists({ where: { id: comicId } }),
      this.chapterService.isExists({ where: { id: chapterId } }),
    ])
    if (!comic || !chapter) {
      this.throwError('漫画数据关联失败')
    }
    const reportData = []
    for (const file of files) {
      const filePath = `/files/work/comic/${comicId}/${chapterId}/${file.filename}`

      await this.fileService.moveLocalFile(file.data, filePath)
      reportData.push({
        fileName: file.filename,
        filePath,
        mimeType: file.mimeType,
      })
      await this.create({
        data: {
          url: filePath,
          chapter: {
            connect: {
              id: chapterId,
            },
          },
        },
      })
    }
    return reportData
  }

  // 删除内容，同时删除本地文件
  async deleteContent(id: number) {
    const contentData = await this.findUnique({ where: { id } })
    await this.delete({ where: { id } })
    await this.fileService.deleteLocalFile(contentData.url)
    return { id }
  }

  // 清空内容

  async removeChapterContent(id: number) {
    await this.delete({ where: { chapterId: id } })
    await this.fileService.deleteComicChapterContent(id)
    return { id }
  }
}
