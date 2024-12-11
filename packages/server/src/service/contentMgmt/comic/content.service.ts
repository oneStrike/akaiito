import { Inject, Provide } from '@midwayjs/core'
import { BasicService } from '@/basic/service/basic.service'
import { ComicContent, PrismaClient } from '@prisma/client'
import { ComicContentDTO } from '@/modules/admin/contentMgmt/comic/content/dto/content.dto'
import { FileService } from '@/basic/service/file.service'

@Provide()
export class ComicContentService extends BasicService<ComicContent> {
  @Inject()
  prismaClient: PrismaClient

  @Inject()
  fileService: FileService

  protected get model() {
    return this.prismaClient.comicContent
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

  // 创建内容
  createComicContent(body: ComicContentDTO) {
    const { urls, chapterId } = body
    const upsertData: any[] = []
    urls.forEach((item) => {
      upsertData.push({
        url: item,
        chapter: {
          connect: {
            id: chapterId,
          },
        },
      })
    })
    return this.createBatch({
      data: upsertData,
    })
  }
}
