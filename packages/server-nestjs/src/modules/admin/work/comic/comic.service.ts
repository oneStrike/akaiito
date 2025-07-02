import { BadRequestException, Injectable } from '@nestjs/common'
import { BaseRepositoryService } from '@/global/services/base-repository.service'
import { WorkComicWhereInput } from '@/prisma/client/models/WorkComic'
import { ComicPublishStatusEnum } from './comic.constant'
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
      publishStatus,
      serialStatus,
      language,
      region,
      ageRating,
      readRule,
      isFinished,
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
    if (publishStatus !== undefined) {
      where.publishStatus = publishStatus
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

    // 完结状态筛选
    if (typeof isFinished === 'boolean') {
      where.isFinished = isFinished
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

    return this.findPagination({
      where,
      omit: {
        remark: true,
        copyright: true,
        description: true,
        disclaimer: true,
        seoTitle: true,
        seoKeywords: true,
        seoDescription: true,
      },
    })
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
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true,
                description: true,
              },
            },
          },
          orderBy: {
            sortOrder: 'asc',
          },
        },
        comicCategories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
                icon: true,
              },
            },
          },
          orderBy: {
            weight: 'desc',
          },
        },
        relatedChapters: {
          select: {
            id: true,
            title: true,
            chapterNumber: true,
            isPublished: true,
          },
          orderBy: {
            chapterNumber: 'asc',
          },
        },
      },
    })

    if (!comic) {
      throw new BadRequestException('漫画不存在')
    }

    return comic
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
    const { ids, publishStatus } = updateStatusDto

    return this.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        publishStatus,
        // 如果设置为已发布且没有发布时间，则设置当前时间
        ...(publishStatus === ComicPublishStatusEnum.PUBLISHED && {
          publishAt: new Date(),
        }),
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
    // 验证漫画是否存在
    const existingComic = await this.findById({ id })
    if (!existingComic) {
      throw new BadRequestException('漫画不存在')
    }

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
   * 更新漫画统计数据（冗余字段维护）
   * @param comicId 漫画ID
   * @returns 更新结果
   */
  async updateComicStats(comicId: number) {
    // 统计章节数
    const totalChapters = await this.prisma.workComicChapter.count({
      where: {
        comicId,
        deletedAt: null,
      },
    })

    // 统计总阅读数（从章节阅读数汇总）
    const chapterViews = await this.prisma.workComicChapter.aggregate({
      where: {
        comicId,
        deletedAt: null,
      },
      _sum: {
        viewCount: true,
      },
    })

    const totalViews = chapterViews._sum.viewCount || 0

    return this.updateById({
      id: comicId,
      data: {
        totalChapters,
        totalViews,
      },
    })
  }

  /**
   * 更新漫画评分
   * @param comicId 漫画ID
   * @param rating 新评分
   * @param userId 用户ID（可选，用于防重复评分）
   * @returns 更新结果
   */
  async updateComicRating(comicId: number, rating: number, userId?: number) {
    if (rating < 1 || rating > 10) {
      throw new BadRequestException('评分必须在1-10之间')
    }

    // 验证漫画是否存在
    const existingComic = await this.findById({ id: comicId })
    if (!existingComic) {
      throw new BadRequestException('漫画不存在')
    }

    // 这里可以添加用户评分记录的逻辑
    // 暂时简化处理，直接更新平均评分
    const currentRating = existingComic.rating || 0
    const currentCount = existingComic.ratingCount || 0
    const newCount = currentCount + 1
    const newRating = (currentRating * currentCount + rating) / newCount

    return this.updateById({
      id: comicId,
      data: {
        rating: Math.round(newRating * 10) / 10, // 保留1位小数
        ratingCount: newCount,
      },
    })
  }

  /**
   * 增加漫画收藏数
   * @param comicId 漫画ID
   * @param increment 增量（默认为1）
   * @returns 更新结果
   */
  async incrementFavoriteCount(comicId: number, increment: number = 1) {
    return this.updateById({
      id: comicId,
      data: {
        favoriteCount: {
          increment,
        },
      },
    })
  }

  /**
   * 增加漫画点赞数
   * @param comicId 漫画ID
   * @param increment 增量（默认为1）
   * @returns 更新结果
   */
  async incrementLikeCount(comicId: number, increment: number = 1) {
    return this.updateById({
      id: comicId,
      data: {
        likeCount: {
          increment,
        },
      },
    })
  }

  /**
   * 增加漫画评论数
   * @param comicId 漫画ID
   * @param increment 增量（默认为1）
   * @returns 更新结果
   */
  async incrementCommentCount(comicId: number, increment: number = 1) {
    return this.updateById({
      id: comicId,
      data: {
        commentCount: {
          increment,
        },
      },
    })
  }
}
