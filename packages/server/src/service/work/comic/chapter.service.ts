import { BasicService } from '@/basic/service/basic.service'
import { WorkComicChapter, PrismaClient } from '@prisma/client'
import { Inject, Provide } from '@midwayjs/core'
import { AddChapterContentDTO, ChapterPageDTO } from '@/modules/admin/contentMgmt/comic/chapter/dto/chapter.dto'
import { utils } from '@/utils'

@Provide()
export class WorkChapterService extends BasicService<WorkComicChapter> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.workComicChapter
  }

  // 创建章节数据
  async createChapter(data: any) {
    const { comicId, novelId, ...chapterData } = data
    if (comicId) {
      chapterData.comic = {
        connect: {
          id: comicId,
        },
      }
    }
    if (novelId) {
      chapterData.novel = {
        connect: {
          id: novelId,
        },
      }
    }
    return this.create({
      data: chapterData,
    })
  }

  // 获取章节分页列表
  async getChapter(where: ChapterPageDTO) {
    if (!where.comicId && !where.novelId) {
      return this.throwError('暂无关联的作品')
    }
    const omit: IterateObject = { content: true }
    if (where.comicId) {
      omit.novelId = true
    } else {
      omit.comicId = true
    }
    return this.findPage({
      omit,
      where,
      like: {
        title: 'contains',
      },
    })
  }

  // 添加章节内容
  async addChapterContent(body: AddChapterContentDTO) {
    if (!utils.isJson(body.content)) {
      this.throwError('内容格式错误')
    }
    return this.update({
      where: { id: body.id },
      data: {
        content: body.content,
      },
    })
  }

}
