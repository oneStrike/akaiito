import { BadRequestException, Injectable } from '@nestjs/common'
import { BaseRepositoryService } from '@/global/services/base-repository.service'
import { WorkComicWhereInput } from '@/prisma/client/models/WorkComic'
import {
  CreateComicVersionDto,
  UpdateComicVersionDto,
} from '../version/dto/comic-version.dto'
import {
  BatchOperationStatusIdsDto,
  CreateComicDto,
  QueryComicDto,
  UpdateComicDto,
  UpdateComicHotDto,
  UpdateComicNewDto,
  UpdateComicRecommendedDto,
} from './dto/comic.dto'

/**
 * 漫画服务类
 * 提供漫画的增删改查等核心业务逻辑
 */
@Injectable()
export class WorkComicService extends BaseRepositoryService<'WorkComic'> {
  protected readonly modelName = 'WorkComic' as const
  protected readonly supportsSoftDelete = true

  /**
   * 创建漫画
   * @param createComicDto 创建漫画的数据
   * @returns 创建的漫画信息
   */
  async createComic(createComicDto: CreateComicDto) {
    const { authorIds, categoryIds, ...comicData } = createComicDto

    // 验证漫画名称是否已存在
    const existingComic = await this.findFirst({
      where: {
        name: createComicDto.name,
      },
    })
    if (existingComic) {
      throw new BadRequestException('漫画名称已存在')
    }

    // 验证作者是否存在
    if (!authorIds || authorIds.length === 0) {
      throw new BadRequestException('至少需要关联一个作者')
    }

    const existingAuthors = await this.prisma.workAuthor.findMany({
      where: {
        id: { in: authorIds },
        isEnabled: true,
      },
    })

    if (existingAuthors.length !== authorIds.length) {
      throw new BadRequestException('部分作者不存在或已禁用')
    }

    // 验证分类是否存在
    const existingCategories = await this.prisma.workCategory.findMany({
      where: {
        id: { in: categoryIds },
        isEnabled: true,
      },
    })

    if (existingCategories.length !== categoryIds.length) {
      throw new BadRequestException('部分分类不存在或已禁用')
    }

    return this.create({
      data: {
        ...comicData,
        // 创建作者关联关系
        comicAuthors: {
          create: authorIds.map((authorId, index) => ({
            authorId,
            roleType: 1, // 默认为原作者
            isPrimary: index === 0, // 第一个作者设为主要作者
            sortOrder: index,
          })),
        },
        // 创建分类关联关系
        comicCategories: {
          create: categoryIds.map((categoryId, index) => ({
            categoryId,
            isPrimary: index === 0, // 第一个分类设为主要分类
            weight: categoryIds.length - index, // 权重递减
          })),
        },
      },
    })
  }

  /**
   * 分页查询漫画列表
   * @param queryComicDto 查询条件
   * @returns 分页的漫画列表
   */
  async getComicPage(queryComicDto: QueryComicDto) {
    const {
      name,
      isPublished,
      serialStatus,
      language,
      region,
      ageRating,
      readRule,
      isRecommended,
      isHot,
      isNew,
      publisher,
    } = queryComicDto

    // 构建查询条件
    const where: WorkComicWhereInput = {}

    // 漫画名称模糊搜索
    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      }
    }

    // 发布状态筛选
    if (isPublished !== undefined) {
      where.isPublished = isPublished
    }

    // 连载状态筛选
    if (serialStatus !== undefined) {
      where.serialStatus = serialStatus
    }

    // 语言筛选
    if (language) {
      where.language = language
    }

    // 地区筛选
    if (region) {
      where.region = region
    }

    // 年龄分级筛选
    if (ageRating) {
      where.ageRating = ageRating
    }

    // 阅读规则筛选
    if (readRule !== undefined) {
      where.readRule = readRule
    }

    // 推荐状态筛选
    if (typeof isRecommended === 'boolean') {
      where.isRecommended = isRecommended
    }

    // 热门状态筛选
    if (typeof isHot === 'boolean') {
      where.isHot = isHot
    }

    // 新作状态筛选
    if (typeof isNew === 'boolean') {
      where.isNew = isNew
    }

    // 出版社模糊搜索
    if (publisher) {
      where.publisher = {
        contains: publisher,
        mode: 'insensitive',
      }
    }

    const pageData = await this.findPagination({
      where,
      select: {
        // 必须明确指定需要的所有字段
        id: true,
        name: true,
        alias: true,
        cover: true,
        serialStatus: true,
        readRule: true,
        isHot: true,
        isNew: true,
        createdAt: true,
        updatedAt: true,
        publishAt: true,
        isPublished: true,
        // 关联关系
        comicAuthors: {
          select: {
            isPrimary: true,
            sortOrder: true,
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        // 版本数量统计
        _count: {
          select: {
            comicVersions: {
              where: {
                deletedAt: null,
              },
            },
          },
        },
      },
    })
    pageData.list = pageData.list.map((item) => {
      const result = {
        ...item,
        comicAuthors: item.comicAuthors.map((author) => ({
          ...author.author,
          roleType: author.roleType,
          isPrimary: author.isPrimary,
          sortOrder: author.sortOrder,
        })),
      }
      // 删除_count字段，因为它不应该暴露给前端
      delete (result as any)._count
      return result
    })
    return pageData
  }

  /**
   * 获取漫画详情
   * @param id 漫画ID
   * @returns 漫画详情信息
   */
  async getComicDetail(id: number) {
    const comic = await this.findById({
      id,
      include: {
        comicAuthors: {
          select: {
            isPrimary: true,
            sortOrder: true,
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        comicCategories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            weight: 'desc',
          },
        },
        // 版本数量统计
        _count: {
          select: {
            comicVersions: {
              where: {
                deletedAt: null,
              },
            },
          },
        },
      },
    })

    if (!comic) {
      throw new BadRequestException('漫画不存在')
    }

    const result = {
      ...comic,
      comicAuthors: comic.comicAuthors!.map((author) => ({
        ...author.author,
        isPrimary: author.isPrimary,
        sortOrder: author.sortOrder,
      })),
      comicCategories: comic.comicCategories!.map((category) => ({
        ...category.category,
      })),
    }

    // 删除_count字段，因为它不应该暴露给前端
    delete (result as any)._count

    return result
  }

  /**
   * 更新漫画信息
   * @param updateComicDto 更新漫画的数据
   * @returns 更新后的漫画信息
   */
  async updateComic(updateComicDto: UpdateComicDto) {
    const { id, authorIds, categoryIds, ...updateData } = updateComicDto

    // 验证漫画是否存在
    const existingComic = await this.findById({ id })
    if (!existingComic) {
      throw new BadRequestException('漫画不存在')
    }

    // 如果更新名称，验证是否与其他漫画重复
    if (updateData.name && updateData.name !== existingComic.name) {
      const duplicateComic = await this.findFirst({
        where: {
          name: updateData.name,
          id: { not: id },
        },
      })
      if (duplicateComic) {
        throw new BadRequestException('漫画名称已存在')
      }
    }

    // 验证作者是否存在（如果提供了authorIds）
    if (authorIds && authorIds.length > 0) {
      const existingAuthors = await this.prisma.workAuthor.findMany({
        where: {
          id: { in: authorIds },
          isEnabled: true,
        },
      })

      if (existingAuthors.length !== authorIds.length) {
        throw new BadRequestException('部分作者不存在或已禁用')
      }
    }

    // 验证分类是否存在（如果提供了categoryIds）
    if (categoryIds && categoryIds.length > 0) {
      const existingCategories = await this.prisma.workCategory.findMany({
        where: {
          id: { in: categoryIds },
          isEnabled: true,
        },
      })

      if (existingCategories.length !== categoryIds.length) {
        throw new BadRequestException('部分分类不存在或已禁用')
      }
    }

    // 使用事务更新漫画及其关联关系
    return this.prisma.$transaction(async (tx) => {
      // 更新漫画基本信息
      const updatedComic = await tx.workComic.update({
        where: { id },
        data: updateData,
      })

      // 更新作者关联关系（如果提供了authorIds）
      if (authorIds !== undefined) {
        // 删除现有的作者关联
        await tx.workComicAuthor.deleteMany({
          where: { comicId: id },
        })

        // 创建新的作者关联
        if (authorIds.length > 0) {
          await tx.workComicAuthor.createMany({
            data: authorIds.map((authorId, index) => ({
              comicId: id,
              authorId,
              roleType: 1, // 默认为原作者
              isPrimary: index === 0, // 第一个作者设为主要作者
              sortOrder: index,
            })),
          })
        }
      }

      // 更新分类关联关系（如果提供了categoryIds）
      if (categoryIds !== undefined) {
        // 删除现有的分类关联
        await tx.workComicCategory.deleteMany({
          where: { comicId: id },
        })

        // 创建新的分类关联
        if (categoryIds.length > 0) {
          await tx.workComicCategory.createMany({
            data: categoryIds.map((categoryId, index) => ({
              comicId: id,
              categoryId,
              isPrimary: index === 0, // 第一个分类设为主要分类
              weight: categoryIds.length - index, // 权重递减
            })),
          })
        }
      }

      return updatedComic
    })
  }

  /**
   * 批量更新漫画发布状态
   * @param updateStatusDto 批量更新状态的数据
   * @returns 更新结果
   */
  async updateComicStatus(updateStatusDto: BatchOperationStatusIdsDto) {
    const { ids, isPublished } = updateStatusDto

    return this.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        isPublished,
      },
    })
  }

  /**
   * 批量更新漫画推荐状态
   * @param updateRecommendedDto 批量更新推荐状态的数据
   * @returns 更新结果
   */
  async updateComicRecommended(
    updateRecommendedDto: UpdateComicRecommendedDto,
  ) {
    const { ids, isRecommended } = updateRecommendedDto

    return this.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        isRecommended,
      },
    })
  }

  /**
   * 批量更新漫画热门状态
   * @param updateHotDto 批量更新热门状态的数据
   * @returns 更新结果
   */
  async updateComicHot(updateHotDto: UpdateComicHotDto) {
    const { ids, isHot } = updateHotDto

    return this.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        isHot,
      },
    })
  }

  /**
   * 批量更新漫画新作状态
   * @param updateNewDto 批量更新新作状态的数据
   * @returns 更新结果
   */
  async updateComicNew(updateNewDto: UpdateComicNewDto) {
    const { ids, isNew } = updateNewDto

    return this.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        isNew,
      },
    })
  }

  /**
   * 软删除漫画
   * @param id 漫画ID
   * @returns 删除结果
   */
  async deleteComic(id: number) {
    // 检查是否有关联的章节
    const chapterCount = await this.prisma.workComicChapter.count({
      where: {
        comicId: id,
        deletedAt: null,
      },
    })

    if (chapterCount > 0) {
      throw new BadRequestException(
        `该漫画还有 ${chapterCount} 个关联章节，无法删除`,
      )
    }

    return this.softDelete(id)
  }

  /**
   * 获取指定漫画的版本列表
   * @param comicId 漫画ID
   * @returns 版本列表
   */
  async getVersionsByComicId(comicId: number) {
    // 验证漫画是否存在
    const comic = await this.findById({ id: comicId })
    if (!comic) {
      throw new BadRequestException('漫画不存在')
    }

    return this.prisma.workComicVersion.findMany({
      where: {
        comicId,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        versionName: true,
        isPublished: true,
        isRecommended: true,
        isEnabled: true,
        readRule: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }

  /**
   * 创建漫画版本
   * @param comicId 漫画ID
   * @param createVersionDto 创建版本的数据
   * @returns 创建的版本信息
   */
  async createComicVersion(
    comicId: number,
    createVersionDto: CreateComicVersionDto,
  ) {
    // 验证漫画是否存在
    const comic = await this.findById({ id: comicId })
    if (!comic) {
      throw new BadRequestException('漫画不存在')
    }

    // 验证版本名称是否已存在
    const existingVersion = await this.prisma.workComicVersion.findFirst({
      where: {
        comicId,
        versionName: createVersionDto.versionName,
        deletedAt: null,
      },
    })

    if (existingVersion) {
      throw new BadRequestException('版本名称已存在')
    }

    return this.prisma.workComicVersion.create({
      data: {
        ...createVersionDto,
        comicId,
      },
    })
  }

  /**
   * 更新漫画版本
   * @param comicId 漫画ID
   * @param versionId 版本ID
   * @param updateVersionDto 更新版本的数据
   * @returns 更新后的版本信息
   */
  async updateComicVersion(
    comicId: number,
    versionId: number,
    updateVersionDto: UpdateComicVersionDto,
  ) {
    // 验证版本是否存在且属于指定漫画
    const existingVersion = await this.prisma.workComicVersion.findFirst({
      where: {
        id: versionId,
        comicId,
        deletedAt: null,
      },
    })

    if (!existingVersion) {
      throw new BadRequestException('版本不存在')
    }

    // 如果更新版本名称，验证是否与其他版本重复
    if (
      updateVersionDto.versionName &&
      updateVersionDto.versionName !== existingVersion.versionName
    ) {
      const duplicateVersion = await this.prisma.workComicVersion.findFirst({
        where: {
          comicId,
          versionName: updateVersionDto.versionName,
          id: { not: versionId },
          deletedAt: null,
        },
      })

      if (duplicateVersion) {
        throw new BadRequestException('版本名称已存在')
      }
    }

    return this.prisma.workComicVersion.update({
      where: { id: versionId },
      data: updateVersionDto,
    })
  }

  /**
   * 删除漫画版本
   * @param comicId 漫画ID
   * @param versionId 版本ID
   * @returns 删除结果
   */
  async deleteComicVersion(comicId: number, versionId: number) {
    // 验证版本是否存在且属于指定漫画
    const existingVersion = await this.prisma.workComicVersion.findFirst({
      where: {
        id: versionId,
        comicId,
        deletedAt: null,
      },
    })

    if (!existingVersion) {
      throw new BadRequestException('版本不存在')
    }

    // 检查是否有关联的章节
    const chapterCount = await this.prisma.workComicChapter.count({
      where: {
        versionId,
        deletedAt: null,
      },
    })

    if (chapterCount > 0) {
      throw new BadRequestException(
        `该版本还有 ${chapterCount} 个关联章节，无法删除`,
      )
    }

    return this.prisma.workComicVersion.update({
      where: { id: versionId },
      data: {
        deletedAt: new Date(),
      },
    })
  }
}
