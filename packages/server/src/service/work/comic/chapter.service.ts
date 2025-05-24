import { BasicService } from '@/basic/service/basic.service'
import { WorkComicChapter, PrismaClient } from '@prisma/client'
import { Inject, Provide } from '@midwayjs/core'
import {
  ChapterPageDTO,
  ComicChapterContentDTO,
  DeleteComicChapterContentDTO,
} from '@/modules/admin/contentMgmt/comic/chapter/dto/chapter.dto'
import { UploadFileInfo } from '@midwayjs/busboy'
import { BasicIdDTO } from '@/basic/dto/basic.dto'
import { FileService } from '@/basic/service/file.service'

@Provide()
export class WorkComicChapterService extends BasicService<WorkComicChapter> {
  @Inject()
  prismaClient: PrismaClient

  @Inject()
  fileService: FileService

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
        remark: true,
        content: true,
      },
      where,
      like: {
        title: 'contains',
      },
    })
  }

  // 获取漫画章节内容
  async getChapterContent(where: ComicChapterContentDTO) {
    const { content } = await this.findUnique({
      where,
      select: {
        content: true,
      },
    })
    if (!content) {
      return []
    }
    return JSON.parse(content).map((item, index) => ({
      url: item,
      id: index,
    }))
  }

  // 添加漫画章节内容
  async createComicChapterContent(
    files: Array<UploadFileInfo>,
    fields: BasicIdDTO,
  ) {
    const { comicId, content } = await this.findUnique({
      where: {
        id: fields.id,
      },
      select: {
        comicId: true,
        content: true,
      },
    })
    const filePath = JSON.parse(content || '[]')
    let relativePath = `/files/work/comic/${comicId}/${fields.id}/`
    for (const file of files) {
      filePath.push(
        await this.fileService.moveLocalFile(file.data, relativePath),
      )
    }
    await this.update({
      where: {
        id: fields.id,
      },
      data: {
        content: JSON.stringify(filePath),
      },
    })
    return {
      id: filePath.length,
    }
  }

  // 删除漫画章节内容
  async deleteChapterContent(where: DeleteComicChapterContentDTO) {
    const content = await this.getChapterContent({
      id: where.chapterId,
      comicId: where.comicId,
    })

    await this.update({
      where: {
        id: where.chapterId,
        comicId: where.comicId,
      },
      data: {
        content: JSON.stringify(content.filter((item) => item.id !== where.id)),
      },
    })
    return where
  }
}
