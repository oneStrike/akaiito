import { BasicService } from '@/basic/service/basic.service'
import { WorkComicChapter, PrismaClient } from '@prisma/client'
import { Inject, Provide } from '@midwayjs/core'
import {
  ChapterContentOrderDTO,
  ChapterPageDTO,
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

  // 获取漫画id
  async getComicId(id: number) {
    const chapter = await this.findUnique({
      where: {
        id,
      },
      select: {
        comicId: true,
      },
    })
    return chapter?.comicId
  }

  // 获取章节完整的文件路径
  async getChapterFilePath(id: number, comicId?: number) {
    comicId = comicId || (await this.getComicId(id))
    return `/files/work/comic/${comicId}/${id}/`
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
  async getChapterContent(where: BasicIdDTO, parse = true) {
    const chapter = await this.findUnique({
      where,
      select: {
        content: true,
      },
    })
    if (!chapter) {
      this.throwError('章节不存在')
    }
    if (!chapter.content) {
      return []
    }
    const content = JSON.parse(chapter.content)
    return parse
      ? content.map((item, index) => ({
          url: item,
          id: index,
        }))
      : content
  }

  // 添加漫画章节内容
  async createComicChapterContent(
    files: Array<UploadFileInfo>,
    fields: BasicIdDTO,
  ) {
    if (!fields.id) {
      this.throwError('漫画ID不能为空')
    }
    if (!files.length) {
      this.throwError('漫画内容不能为空')
    }
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

    let relativePath = await this.getChapterFilePath(fields.id, comicId)
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
    const content = await this.getChapterContent(
      {
        id: where.chapterId,
      },
      false,
    )

    if (!content[where.id]) {
      this.throwError('漫画章节内容不存在')
    }
    await this.fileService.deleteLocalFile(content[where.id])
    content.splice(where.id, 1)
    await this.update({
      where: {
        id: where.chapterId,
      },
      data: {
        content: JSON.stringify(content),
      },
    })
    return where
  }

  // 更新章节内容排序
  async updateComicChapterContentOrder(where: ChapterContentOrderDTO) {
    const content = await this.getChapterContent({
      id: where.id,
    })
    const { originId, targetId } = where
    if (!content[originId] || !content[targetId]) {
      this.throwError('漫画章节内容不存在')
    }
    const originData = content[originId]
    content[originId] = content[targetId]
    content[targetId] = originData
    await this.update({
      where: {
        id: where.id,
      },
      data: {
        content: JSON.stringify(content.map((item) => item.url)),
      },
    })

    return where
  }

  // 清空漫画章节内容
  async clearComicChapterContent(id: number) {
    const updateRes = await this.update({
      where: {
        id,
      },
      data: {
        content: '[]',
      },
    })
    await this.fileService.deleteLocalFolder(await this.getChapterFilePath(id))
    return updateRes
  }
}
