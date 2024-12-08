import { BasicService } from '@/basic/service/basic.service'
import { Chapter, PrismaClient } from '@prisma/client'
import { Inject, Provide } from '@midwayjs/core'
import { ChapterPageDTO } from '@/modules/admin/contentMgmt/comic/chapter/dto/chapter.dto'

@Provide()
export class ChapterService extends BasicService<Chapter> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.chapter
  }

  // 创建章节数据
  async createChapter(data: any) {
    const { comicId, novelId, ...chapterData } = data
    let maxSort = 0
    if (novelId) {
      maxSort = await this.getCount({ where: { novelId } })
    }
    if (comicId) {
      maxSort = await this.getCount({ where: { comicId } })
    }
    chapterData.sortOrder = maxSort
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
    const omit: IterateObject = {}
    if (where.comicId) {
      omit.novelId = true
    } else {
      omit.comicId = true
    }
    return this.findPage({ where, omit })
  }

  // 更新作品章节
  async updateChapter(data: any) {
    const { id, ...chapterData } = data
    return this.update({
      where: { id },
      data: chapterData,
    })
  }
}
