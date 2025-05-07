import { BasicService } from '@/basic/service/basic.service'
import { WorkComicChapter, PrismaClient } from '@prisma/client'
import { Inject, Provide } from '@midwayjs/core'
import { AddChapterContentDTO, ChapterPageDTO } from '@/modules/admin/contentMgmt/comic/chapter/dto/chapter.dto'

@Provide()
export class WorkComicChapterService extends BasicService<WorkComicChapter> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.workComicChapter
  }

  // 创建章节数据
  async createChapter(data: any) {
    const { comicId, ...chapterData } = data
    chapterData.comic = {
      connect: {
        id: comicId,
      },
    }
    return this.create({
      data: chapterData,
    })
  }

  // 获取章节分页列表
  async getChapter(where: ChapterPageDTO) {
    return this.findPage({
      omit: {
        comicContent: true,
      },
      where,
      like: {
        title: 'contains',
      },
    })
  }

  // 添加章节内容
  async addChapterContent(body: AddChapterContentDTO) {
    return this.update({
      where: { id: body.id },
      data: {
        content: body.content,
      },
    })
  }

}
