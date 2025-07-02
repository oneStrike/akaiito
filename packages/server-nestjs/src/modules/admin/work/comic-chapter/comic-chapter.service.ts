import { BadRequestException, Injectable } from '@nestjs/common'
import { BatchOperationStatusIdsDto } from '@/common/dto/batch.dto'
import { BaseRepositoryService } from '@/global/services/base-repository.service'
import { PrismaService } from '@/global/services/prisma.service'
import { WorkComicChapterWhereInput } from '@/prisma/client/models/WorkComicChapter'
import {
  CreateComicChapterDto,
  QueryComicChapterDto,
  UpdateComicChapterDto,
  UpdateChapterPublishStatusDto,
  UpdateChapterReadRuleDto,
} from './dto/comic-chapter.dto'

/**
 * 漫画章节服务类
 * 提供漫画章节的增删改查等核心业务逻辑
 */
@Injectable()
export class WorkComicChapterService extends BaseRepositoryService<'WorkComicChapter'> {
  protected readonly modelName = 'WorkComicChapter' as const
  protected readonly supportsSoftDelete = true

  constructor(protected readonly prisma: PrismaService) {
    super(prisma)
  }

  /**
   * 创建漫画章节
   * @param createComicChapterDto 创建章节的数据
   * @returns 创建的章节信息
   */
  async createComicChapter(createComicChapterDto: CreateComicChapterDto) {
    const { comicId, chapterNumber } = createComicChapterDto

    // 验证漫画是否存在
    const comic = await this.prisma.workComic.findUnique({
      where: { id: comicId },
    })
    if (!comic) {
      throw new BadRequestException('关联的漫画不存在')
    }

    // 验证同一漫画下章节号是否已存在
    const existingChapter = await this.findFirst({
      where: {
        comicId,
        chapterNumber,
      },
    })
    if (existingChapter) {
      throw new BadRequestException('该漫画下章节号已存在')
    }

    // 验证漫画内容格式
    if (createComicChapterDto.contents) {
      try {
        const contents = JSON.parse(createComicChapterDto.contents)
        if (!Array.isArray(contents)) {
          throw new Error('内容必须是数组格式')
        }
      } catch {
        throw new BadRequestException(
          '漫画内容格式不正确，请使用有效的JSON数组格式',
        )
      }
    }

    return this.create({ data: createComicChapterDto })
  }

  /**
   * 分页查询漫画章节列表
   * @param queryComicChapterDto 查询条件
   * @returns 分页章节列表
   */
  async getComicChapterPage(queryComicChapterDto: QueryComicChapterDto) {
    const {
      title,
      isPublished,
      comicId,
      readRule,
      isPreview,
    } = queryComicChapterDto

    // 构建查询条件
    const where: WorkComicChapterWhereInput = {}

    // 标题模糊搜索
    if (title) {
      where.title = {
        contains: title,
        mode: 'insensitive',
      }
    }

    // 发布状态筛选
    if (typeof isPublished === 'boolean') {
      where.isPublished = isPublished
    }

    // 漫画ID筛选
    if (comicId) {
      where.comicId = comicId
    }

    // 查看规则筛选
    if (readRule !== undefined) {
      where.readRule = readRule
    }

    // 试读章节筛选
    if (typeof isPreview === 'boolean') {
      where.isPreview = isPreview
    }

    return this.findPagination({
      where,
      omit: {
        contents: true,
        remark: true,
        deletedAt: true,
      },
      orderBy: [
        { comicId: 'asc' },
        { sortOrder: 'asc' },
        { chapterNumber: 'asc' },
      ],
    })
  }

  /**
   * 获取漫画章节详情
   * @param id 章节ID
   * @returns 章节详情信息
   */
  async getComicChapterDetail(id: number) {
    const chapter = await this.findById({
      id,
      include: {
        relatedComic: {
          select: {
            id: true,
            title: true,
            status: true,
          },
        },
      },
    })

    if (!chapter) {
      throw new BadRequestException('章节不存在')
    }

    return {
      ...chapter,
    }
  }

  /**
   * 更新漫画章节信息
   * @param updateComicChapterDto 更新章节的数据
   * @returns 更新后的章节信息
   */
  async updateComicChapter(updateComicChapterDto: UpdateComicChapterDto) {
    const { id, ...updateData } = updateComicChapterDto

    // 验证章节是否存在
    const existingChapter = await this.findById({ id })
    if (!existingChapter) {
      throw new BadRequestException('章节不存在')
    }

    // 如果更新章节号，验证是否与同漫画下其他章节重复
    if (
      updateData.chapterNumber !== undefined &&
      updateData.chapterNumber !== existingChapter.chapterNumber
    ) {
      const duplicateChapter = await this.findFirst({
        where: {
          comicId: existingChapter.comicId,
          chapterNumber: updateData.chapterNumber,
          id: { not: id },
        },
      })
      if (duplicateChapter) {
        throw new BadRequestException('该漫画下章节号已存在')
      }
    }

    // 验证漫画内容格式
    if (updateData.contents) {
      try {
        const contents = JSON.parse(updateData.contents)
        if (!Array.isArray(contents)) {
          throw new Error('内容必须是数组格式')
        }
      } catch {
        throw new BadRequestException(
          '漫画内容格式不正确，请使用有效的JSON数组格式',
        )
      }
    }

    return this.updateById({
      id,
      data: updateData,
    })
  }

  /**
   * 批量更新章节发布状态
   * @param updateChapterPublishStatusDto 批量更新发布状态的数据
   * @returns 更新结果
   */
  async updateChapterPublishStatus(
    updateChapterPublishStatusDto: UpdateChapterPublishStatusDto,
  ) {
    const { ids, isPublished } = updateChapterPublishStatusDto

    const updateData: any = {
      isPublished,
    }

    // 如果是发布操作，设置发布时间
    if (isPublished) {
      updateData.publishAt = new Date()
    }

    return this.updateMany({
      where: {
        id: { in: ids },
      },
      data: updateData,
    })
  }

  /**
   * 批量更新章节查看规则
   * @param updateChapterReadRuleDto 批量更新查看规则的数据
   * @returns 更新结果
   */
  async updateChapterReadRule(
    updateChapterReadRuleDto: UpdateChapterReadRuleDto,
  ) {
    const { ids, readRule } = updateChapterReadRuleDto

    return this.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        readRule,
      },
    })
  }

  /**
   * 软删除章节
   * @param id 章节ID
   * @returns 删除结果
   */
  async deleteComicChapter(id: number) {
    // 验证章节是否存在
    const existingChapter = await this.findById({ id })
    if (!existingChapter) {
      throw new BadRequestException('章节不存在')
    }

    return this.deleteById({ id })
  }

  /**
   * 批量软删除章节
   * @param batchDeleteDto 批量删除的数据
   * @returns 删除结果
   */
  async batchDeleteComicChapter(batchDeleteDto: BatchOperationStatusIdsDto) {
    const { ids } = batchDeleteDto

    return this.deleteMany({
      where: {
        id: { in: ids },
      },
    })
  }

  /**
   * 恢复软删除的章节
   * @param id 章节ID
   * @returns 恢复结果
   */
  async restoreComicChapter(id: number) {
    return this.restoreById({ id })
  }

  /**
   * 获取指定漫画的章节列表（按章节号排序）
   * @param comicId 漫画ID
   * @returns 章节列表
   */
  async getChaptersByComicId(comicId: number) {
    return this.findMany({
      where: {
        comicId,
        isPublished: true,
      },
      orderBy: [
        { sortOrder: 'asc' },
        { chapterNumber: 'asc' },
      ],
      omit: {
        contents: true,
        remark: true,
        deletedAt: true,
      },
    })
  }
}