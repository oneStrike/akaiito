import { BadRequestException, Injectable } from '@nestjs/common'
import { BatchOperationStatusIdsDto } from '@/common/dto/batch.dto'
import { OrderDto } from '@/common/dto/order.dto'
import { BaseRepositoryService } from '@/global/services/base-repository.service'
import { PrismaService } from '@/global/services/prisma.service'
import { WorkComicChapterWhereInput } from '@/prisma/client/models/WorkComicChapter'
import {
  CreateComicChapterDto,
  QueryComicChapterDto,
  UpdateChapterPublishStatusDto,
  UpdateChapterReadRuleDto,
  UpdateComicChapterDto,
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
    const { comicId, versionId, chapterNumber } = createComicChapterDto

    // 验证漫画是否存在
    const comic = await this.prisma.workComic.findUnique({
      where: { id: comicId },
    })
    if (!comic) {
      throw new BadRequestException('关联的漫画不存在')
    }

    // 如果提供了版本ID，验证版本是否存在且属于该漫画
    if (versionId) {
      const version = await this.prisma.workComicVersion.findUnique({
        where: { id: versionId },
      })
      if (!version) {
        throw new BadRequestException('关联的漫画版本不存在')
      }
      if (version.comicId !== comicId) {
        throw new BadRequestException('漫画版本与漫画不匹配')
      }
    }

    // 验证同一漫画下章节号是否已存在（考虑版本）
    const whereCondition: any = {
      comicId,
      chapterNumber,
    }
    if (versionId) {
      whereCondition.versionId = versionId
    }

    const existingChapter = await this.findFirst({
      where: whereCondition,
    })
    if (existingChapter) {
      throw new BadRequestException('该漫画下章节号已存在')
    }

    return this.create({ data: createComicChapterDto })
  }

  /**
   * 分页查询漫画章节列表
   * @param queryComicChapterDto 查询条件
   * @returns 分页章节列表
   */
  async getComicChapterPage(queryComicChapterDto: QueryComicChapterDto) {
    const { title, isPublished, comicId, versionId, readRule, isPreview } =
      queryComicChapterDto

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

    // 版本ID筛选
    if (versionId) {
      where.versionId = versionId
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
      orderBy: [{ comicId: 'asc' }, { chapterNumber: 'asc' }],
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
            name: true,
          },
        },
        relatedVersion: {
          select: {
            id: true,
            versionName: true,
            language: true,
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

    // 如果更新版本ID，验证版本是否存在且属于该漫画
    if (updateData.versionId !== undefined) {
      if (updateData.versionId) {
        const version = await this.prisma.workComicVersion.findUnique({
          where: { id: updateData.versionId },
        })
        if (!version) {
          throw new BadRequestException('关联的漫画版本不存在')
        }
        if (version.comicId !== existingChapter.comicId) {
          throw new BadRequestException('漫画版本与漫画不匹配')
        }
      }
    }

    // 如果更新章节号，验证是否与同漫画下其他章节重复（考虑版本）
    if (
      updateData.chapterNumber !== undefined &&
      updateData.chapterNumber !== existingChapter.chapterNumber
    ) {
      const whereCondition: any = {
        comicId: existingChapter.comicId,
        chapterNumber: updateData.chapterNumber,
        id: { not: id },
      }

      // 使用更新后的版本ID或现有的版本ID进行重复检查
      const targetVersionId =
        updateData.versionId !== undefined
          ? updateData.versionId
          : existingChapter.versionId
      if (targetVersionId) {
        whereCondition.versionId = targetVersionId
      }

      const duplicateChapter = await this.findFirst({
        where: whereCondition,
      })
      if (duplicateChapter) {
        throw new BadRequestException('该漫画下章节号已存在')
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
      id: { in: ids },
    })
  }

  /**
   * 获取指定漫画的章节列表（按章节号排序）
   * @param comicId 漫画ID
   * @param versionId 可选的版本ID
   * @returns 章节列表
   */
  async getChaptersByComicId(comicId: number, versionId?: number) {
    const where: any = {
      comicId,
      isPublished: true,
    }

    // 如果指定了版本ID，添加版本筛选条件
    if (versionId) {
      where.versionId = versionId
    }

    return this.findMany({
      where,
      orderBy: [{ chapterNumber: 'asc' }],
      omit: {
        contents: true,
        remark: true,
        deletedAt: true,
      },
    })
  }

  /**
   * 根据版本ID获取章节列表
   * @param versionId 版本ID
   * @returns 章节列表
   */
  async getChaptersByVersionId(versionId: number) {
    const chapters = await this.prisma.workComicChapter.findMany({
      where: { versionId },
      orderBy: { chapterNumber: 'asc' },
      select: {
        id: true,
        chapterNumber: true,
        title: true,
        isPublished: true,
        readRule: true,
        createdAt: true,
        updatedAt: true,
        versionId: true,
        relatedVersion: {
          select: {
            id: true,
            versionName: true,
          },
        },
      },
    })

    return chapters.map((chapter) => ({
      id: chapter.id,
      chapterNumber: chapter.chapterNumber,
      title: chapter.title,
      isPublished: chapter.isPublished,
      readRule: chapter.readRule,
      createdAt: chapter.createdAt,
      updatedAt: chapter.updatedAt,
      version: chapter.relatedVersion
        ? {
            id: chapter.relatedVersion.id,
            versionName: chapter.relatedVersion.versionName,
          }
        : null,
    }))
  }

  /**
   * 批量移动章节到指定版本
   * @param chapterIds 章节ID列表
   * @param targetVersionId 目标版本ID
   * @returns 更新数量
   */
  async batchMoveChaptersToVersion(
    chapterIds: number[],
    targetVersionId: number,
  ) {
    const result = await this.prisma.workComicChapter.updateMany({
      where: {
        id: { in: chapterIds },
      },
      data: {
        versionId: targetVersionId,
      },
    })

    return { count: result.count }
  }

  /**
   * 复制章节到指定版本
   * @param chapterId 章节ID
   * @param targetVersionId 目标版本ID
   * @returns 新章节ID
   */
  async copyChapterToVersion(chapterId: number, targetVersionId: number) {
    // 获取原章节信息
    const originalChapter = await this.prisma.workComicChapter.findUnique({
      where: { id: chapterId },
    })

    if (!originalChapter) {
      throw new BadRequestException('章节不存在')
    }

    // 检查目标版本中是否已存在相同章节号
    const existingChapter = await this.prisma.workComicChapter.findFirst({
      where: {
        comicId: originalChapter.comicId,
        versionId: targetVersionId,
        chapterNumber: originalChapter.chapterNumber,
      },
    })

    if (existingChapter) {
      throw new BadRequestException('目标版本中已存在相同章节号的章节')
    }

    // 创建新章节
    const newChapter = await this.prisma.workComicChapter.create({
      data: {
        comicId: originalChapter.comicId,
        versionId: targetVersionId,
        chapterNumber: originalChapter.chapterNumber,
        title: originalChapter.title,
        contents: originalChapter.contents,
        isPublished: originalChapter.isPublished,
        readRule: originalChapter.readRule,
        isPreview: originalChapter.isPreview,
        remark: originalChapter.remark,
      },
    })

    return { id: newChapter.id }
  }

  /**
   * 获取章节内容
   * @param chapterId 章节ID
   * @returns 章节内容数组
   */
  async getChapterContents(chapterId: number) {
    const chapter = await this.findById({
      id: chapterId,
      select: {
        id: true,
        contents: true,
      },
    })

    if (!chapter) {
      throw new BadRequestException('章节不存在')
    }

    let contents: string[] = []
    try {
      contents = JSON.parse(chapter.contents || '[]')
      if (!Array.isArray(contents)) {
        contents = []
      }
    } catch {
      contents = []
    }

    return {
      id: chapter.id,
      contents,
    }
  }

  /**
   * 添加章节内容
   * @param chapterId 章节ID
   * @param content 内容
   * @param index 插入位置（可选）
   * @returns 更新后的章节内容
   */
  async addChapterContent(chapterId: number, content: string, index?: number) {
    const chapter = await this.findById({
      id: chapterId,
      select: {
        id: true,
        contents: true,
      },
    })

    if (!chapter) {
      throw new BadRequestException('章节不存在')
    }

    let contents: string[] = []
    try {
      contents = JSON.parse(chapter.contents || '[]')
      if (!Array.isArray(contents)) {
        contents = []
      }
    } catch {
      contents = []
    }

    // 添加内容到指定位置或末尾
    if (index !== undefined && index >= 0 && index <= contents.length) {
      contents.splice(index, 0, content)
    } else {
      contents.push(content)
    }

    // 更新数据库
    await this.updateById({
      id: chapterId,
      data: { contents: JSON.stringify(contents) },
    })

    return {
      id: chapter.id,
      contents,
    }
  }

  /**
   * 更新章节内容
   * @param chapterId 章节ID
   * @param index 内容索引
   * @param content 新内容
   * @returns 更新后的章节内容
   */
  async updateChapterContent(
    chapterId: number,
    index: number,
    content: string,
  ) {
    const chapter = await this.findById({
      id: chapterId,
      select: {
        id: true,
        contents: true,
      },
    })

    if (!chapter) {
      throw new BadRequestException('章节不存在')
    }

    let contents: string[] = []
    try {
      contents = JSON.parse(chapter.contents || '[]')
      if (!Array.isArray(contents)) {
        contents = []
      }
    } catch {
      contents = []
    }

    // 验证索引是否有效
    if (index < 0 || index >= contents.length) {
      throw new BadRequestException('索引超出范围')
    }

    // 更新指定位置的内容
    contents[index] = content

    // 更新数据库
    await this.updateById({
      id: chapterId,
      data: { contents: JSON.stringify(contents) },
    })

    return {
      id: chapter.id,
      contents,
    }
  }

  /**
   * 删除章节内容
   * @param chapterId 章节ID
   * @param index 内容索引
   * @returns 更新后的章节内容
   */
  async deleteChapterContent(chapterId: number, index: number) {
    const chapter = await this.findById({
      id: chapterId,
      select: {
        id: true,
        contents: true,
      },
    })

    if (!chapter) {
      throw new BadRequestException('章节不存在')
    }

    let contents: string[] = []
    try {
      contents = JSON.parse(chapter.contents || '[]')
      if (!Array.isArray(contents)) {
        contents = []
      }
    } catch {
      contents = []
    }

    // 验证索引是否有效
    if (index < 0 || index >= contents.length) {
      throw new BadRequestException('索引超出范围')
    }

    // 删除指定位置的内容
    contents.splice(index, 1)

    // 更新数据库
    await this.updateById({
      id: chapterId,
      data: { contents: JSON.stringify(contents) },
    })

    return {
      id: chapter.id,
      contents,
    }
  }

  /**
   * 移动章节内容（用于排序）
   * @param chapterId 章节ID
   * @param fromIndex 源位置索引
   * @param toIndex 目标位置索引
   * @returns 更新后的章节内容
   */
  async moveChapterContent(
    chapterId: number,
    fromIndex: number,
    toIndex: number,
  ) {
    const chapter = await this.findById({
      id: chapterId,
      select: {
        id: true,
        contents: true,
      },
    })

    if (!chapter) {
      throw new BadRequestException('章节不存在')
    }

    let contents: string[] = []
    try {
      contents = JSON.parse(chapter.contents || '[]')
      if (!Array.isArray(contents)) {
        contents = []
      }
    } catch {
      contents = []
    }

    // 验证索引是否有效
    if (
      fromIndex < 0 ||
      fromIndex >= contents.length ||
      toIndex < 0 ||
      toIndex >= contents.length
    ) {
      throw new BadRequestException('索引超出范围')
    }

    // 移动内容
    const [movedContent] = contents.splice(fromIndex, 1)
    contents.splice(toIndex, 0, movedContent)

    // 更新数据库
    await this.updateById({
      id: chapterId,
      data: { contents: JSON.stringify(contents) },
    })

    return {
      id: chapter.id,
      contents,
    }
  }

  /**
   * 批量更新章节内容
   * @param chapterId 章节ID
   * @param contents 内容数组
   * @returns 更新后的章节内容
   */
  async batchUpdateChapterContents(chapterId: number, contents: string[]) {
    const chapter = await this.findById({
      id: chapterId,
      select: {
        id: true,
      },
    })

    if (!chapter) {
      throw new BadRequestException('章节不存在')
    }

    if (!Array.isArray(contents)) {
      throw new BadRequestException('内容格式必须是字符串数组')
    }

    // 更新数据库
    await this.updateById({
      id: chapterId,
      data: { contents: JSON.stringify(contents) },
    })

    return {
      id: chapter.id,
      contents,
    }
  }

  /**
   * 交换两个章节的章节号
   * @param swapChapterNumberDto 交换章节号的数据
   * @returns 交换结果
   */
  async swapChapterNumbers(swapChapterNumberDto: OrderDto) {
    const { targetId, dragId } = swapChapterNumberDto

    // 验证两个章节ID不能相同
    if (targetId === dragId) {
      throw new BadRequestException('不能交换相同的章节')
    }

    // 获取两个章节的信息
    const [targetChapter, dragChapter] = await Promise.all([
      this.findById({ id: targetId }),
      this.findById({ id: dragId }),
    ])

    // 验证章节是否存在
    if (!targetChapter) {
      throw new BadRequestException(`章节ID ${targetId} 不存在`)
    }
    if (!dragChapter) {
      throw new BadRequestException(`章节ID ${dragId} 不存在`)
    }

    // 验证两个章节是否属于同一漫画
    if (targetChapter.comicId !== dragChapter.comicId) {
      throw new BadRequestException('只能交换同一漫画下的章节号')
    }

    // 验证两个章节是否属于同一版本（都有版本ID或都没有版本ID）
    if (targetChapter.versionId !== dragChapter.versionId) {
      throw new BadRequestException('只能交换同一版本下的章节号')
    }

    // 使用事务确保数据一致性
    return this.prisma.$transaction(async (tx) => {
      // 临时章节号，避免唯一约束冲突
      const tempChapterNumber = -Math.random() * 1000000

      // 第一步：将拖拽章节的章节号设为临时值
      await tx.workComicChapter.update({
        where: { id: dragId },
        data: { chapterNumber: tempChapterNumber },
      })

      // 第二步：将目标章节的章节号设为拖拽章节的原章节号
      await tx.workComicChapter.update({
        where: { id: targetId },
        data: { chapterNumber: dragChapter.chapterNumber },
      })

      // 第三步：将拖拽章节的章节号设为目标章节的原章节号
      await tx.workComicChapter.update({
        where: { id: dragId },
        data: { chapterNumber: targetChapter.chapterNumber },
      })

      return {
        message: '章节号交换成功',
        swappedChapters: {
          targetChapter: {
            id: targetId,
            oldChapterNumber: targetChapter.chapterNumber,
            newChapterNumber: dragChapter.chapterNumber,
          },
          dragChapter: {
            id: dragId,
            oldChapterNumber: dragChapter.chapterNumber,
            newChapterNumber: targetChapter.chapterNumber,
          },
        },
      }
    })
  }
}
