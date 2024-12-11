import { Inject, Provide } from '@midwayjs/core'
import { BasicService } from '@/basic/service/basic.service'
import { ComicContent, PrismaClient } from '@prisma/client'
import { ComicContentDTO } from '@/modules/admin/contentMgmt/comic/content/dto/content.dto'

@Provide()
export class ComicContentService extends BasicService<ComicContent> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.comicContent
  }

  upsertComicContent(body: ComicContentDTO) {
    const { id, url, chapterId } = body
    const upsertData = {
      url,
      chapter: {
        connect: {
          id: chapterId,
        },
      },
    }
    return this.upsert({
      where: { id },
      create: upsertData,
      update: upsertData,
    })
  }
}
