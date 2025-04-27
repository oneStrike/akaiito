import { Inject, Provide } from '@midwayjs/core'
import { BasicService } from '@/basic/service/basic.service'
import { ComicContent, PrismaClient } from '@prisma/client'
import { FileService } from '@/basic/service/file.service'
import { UploadStreamFieldInfo, UploadStreamFileInfo } from '@midwayjs/busboy'

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
  createComicContent(fileIterator: AsyncGenerator<UploadStreamFileInfo>,
                     fieldIterator: AsyncGenerator<UploadStreamFieldInfo>) {
    console.log(fileIterator)
    console.log(123)
    console.log(fieldIterator)
    return 'ok'
  }
}
