import { BadRequestException, Injectable } from '@nestjs/common'
import { BaseRepositoryService } from '@/global/services/base-repository.service'
import { PrismaService } from '@/global/services/prisma.service'
import { WorkComicVersionWhereInput } from '@/prisma/client/models/WorkComicVersion'
import {
  CreateComicVersionDto,
  QueryComicVersionDto,
  UpdateComicVersionDto,
  UpdateVersionEnabledStatusDto,
  UpdateVersionPublishStatusDto,
  UpdateVersionReadRuleDto,
  UpdateVersionRecommendedStatusDto,
} from './dto/comic-version.dto'

/**
 * 漫画版本服务类
 * 提供漫画版本的增删改查等核心业务逻辑
 */
@Injectable()
export class WorkComicVersionService extends BaseRepositoryService<'WorkComicVersion'> {
  protected readonly modelName = 'WorkComicVersion' as const
  protected readonly supportsSoftDelete = true

  constructor(protected readonly prisma: PrismaService) {
    super(prisma)
  }

  /**
   * 创建漫画版本
   * @param createComicVersionDto 创建版本的数据
   * @returns 创建的版本信息
   */
  async createComicVersion(createComicVersionDto: CreateComicVersionDto) {
    const { comicId, language, versionName } = createComicVersionDto

    // 验证漫画是否存在
    const comic = await this.prisma.workComic.findUnique({
      where: { id: comicId },
    })
    if (!comic) {
      throw new BadRequestException('关联的漫画不存在')
    }

    // 验证同一漫画下的同语言版本名称是否已存在
    const existingVersion = await this.findFirst({
      where: {
        comicId,
        language,
        versionName,
      },
    })
    if (existingVersion) {
      throw new BadRequestException('该漫画下的同语言版本名称已存在')
    }

    // 如果设置为推荐版本，需要取消同一漫画下其他版本的推荐状态
    if (createComicVersionDto.isRecommended) {
      await this.updateMany({
        where: {
          comicId,
          isRecommended: true,
        },
        data: {
          isRecommended: false,
        },
      })
    }

    return this.create({ data: createComicVersionDto })
  }

  /**
   * 分页查询漫画版本列表
   * @param queryComicVersionDto 查询条件
   * @returns 分页版本列表
   */
  async getComicVersionPage(queryComicVersionDto: QueryComicVersionDto) {
    if (!queryComicVersionDto.comicId) {
      throw new BadRequestException('comicId不能为空')
    }
    const {
      versionName,
      comicId,
      language,
      translatorGroup,
      isRecommended,
      isEnabled,
      isPublished,
      readRule,
    } = queryComicVersionDto

    // 构建查询条件
    const where: WorkComicVersionWhereInput = {}

    // 版本名称模糊搜索
    if (versionName) {
      where.versionName = {
        contains: versionName,
        mode: 'insensitive',
      }
    }

    // 漫画ID筛选
    if (comicId) {
      where.comicId = comicId
    }

    // 语言筛选
    if (language) {
      where.language = language
    }

    // 翻译组模糊搜索
    if (translatorGroup) {
      where.translatorGroup = {
        contains: translatorGroup,
        mode: 'insensitive',
      }
    }

    // 推荐状态筛选
    if (typeof isRecommended === 'boolean') {
      where.isRecommended = isRecommended
    }

    // 启用状态筛选
    if (typeof isEnabled === 'boolean') {
      where.isEnabled = isEnabled
    }

    // 发布状态筛选
    if (typeof isPublished === 'boolean') {
      where.isPublished = isPublished
    }

    // 查看规则筛选
    if (readRule !== undefined) {
      where.readRule = readRule
    }

    return this.findPagination({
      where,
      omit: {
        description: true,
        disclaimer: true,
        remark: true,
        deletedAt: true,
      },
      include: {
        comic: {
          select: {
            id: true,
            name: true,
            cover: true,
          },
        },
      },
      orderBy: [
        { comicId: 'asc' },
        { isRecommended: 'desc' },
        { sortOrder: 'desc' },
        { createdAt: 'desc' },
      ],
    })
  }

  /**
   * 获取漫画版本详情
   * @param id 版本ID
   * @returns 版本详情信息
   */
  async getComicVersionDetail(id: number) {
    const version = await this.findById({
      id,
      include: {
        comic: {
          select: {
            id: true,
            name: true,
            cover: true,
            alias: true,
          },
        },
      },
    })

    if (!version) {
      throw new BadRequestException('版本不存在')
    }

    return version
  }

  /**
   * 更新漫画版本信息
   * @param updateComicVersionDto 更新版本的数据
   * @returns 更新后的版本信息
   */
  async updateComicVersion(updateComicVersionDto: UpdateComicVersionDto) {
    const { id, ...updateData } = updateComicVersionDto

    // 验证版本是否存在
    const existingVersion = await this.findById({ id })
    if (!existingVersion) {
      throw new BadRequestException('版本不存在')
    }

    // 如果更新版本名称或语言，验证是否与同漫画下其他版本重复
    if (
      (updateData.versionName !== undefined &&
        updateData.versionName !== existingVersion.versionName) ||
      (updateData.language !== undefined &&
        updateData.language !== existingVersion.language)
    ) {
      const duplicateVersion = await this.findFirst({
        where: {
          comicId: existingVersion.comicId,
          language: updateData.language || existingVersion.language,
          versionName: updateData.versionName || existingVersion.versionName,
          id: { not: id },
        },
      })
      if (duplicateVersion) {
        throw new BadRequestException('该漫画下的同语言版本名称已存在')
      }
    }

    // 如果设置为推荐版本，需要取消同一漫画下其他版本的推荐状态
    if (updateData.isRecommended === true) {
      await this.updateMany({
        where: {
          comicId: existingVersion.comicId,
          isRecommended: true,
          id: { not: id },
        },
        data: {
          isRecommended: false,
        },
      })
    }

    return this.updateById({
      id,
      data: updateData,
    })
  }

  /**
   * 批量更新版本发布状态
   * @param updateStatusDto 批量更新状态的数据
   * @returns 更新结果
   */
  async updateVersionPublishStatus(
    updateStatusDto: UpdateVersionPublishStatusDto,
  ) {
    const { ids, isPublished } = updateStatusDto

    return this.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        isPublished,
        publishAt: isPublished ? new Date() : null,
      },
    })
  }

  /**
   * 批量更新版本推荐状态
   * @param updateRecommendedDto 批量更新推荐状态的数据
   * @returns 更新结果
   */
  async updateVersionRecommendedStatus(
    updateRecommendedDto: UpdateVersionRecommendedStatusDto,
  ) {
    const { ids, isRecommended } = updateRecommendedDto

    // 如果设置为推荐，需要先获取这些版本所属的漫画ID
    if (isRecommended) {
      const versions = await this.findMany({
        where: { id: { in: ids } },
        select: { id: true, comicId: true },
      })

      const comicIds = [...new Set(versions.map((v) => v.comicId))]

      // 取消这些漫画下其他版本的推荐状态
      await this.updateMany({
        where: {
          comicId: { in: comicIds },
          isRecommended: true,
          id: { notIn: ids },
        },
        data: {
          isRecommended: false,
        },
      })
    }

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
   * 批量更新版本启用状态
   * @param updateEnabledDto 批量更新启用状态的数据
   * @returns 更新结果
   */
  async updateVersionEnabledStatus(
    updateEnabledDto: UpdateVersionEnabledStatusDto,
  ) {
    const { ids, isEnabled } = updateEnabledDto

    return this.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        isEnabled,
      },
    })
  }

  /**
   * 批量更新版本查看规则
   * @param updateReadRuleDto 批量更新查看规则的数据
   * @returns 更新结果
   */
  async updateVersionReadRule(updateReadRuleDto: UpdateVersionReadRuleDto) {
    const { ids, readRule } = updateReadRuleDto

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
   * 获取指定漫画的版本列表
   * @param comicId 漫画ID
   * @returns 版本列表
   */
  async getVersionsByComicId(comicId: number) {
    return this.findMany({
      where: {
        comicId,
        isEnabled: true,
      },
      omit: {
        description: true,
        disclaimer: true,
        remark: true,
        deletedAt: true,
      },
      orderBy: [
        { isRecommended: 'desc' },
        { sortOrder: 'desc' },
        { createdAt: 'desc' },
      ],
    })
  }

  /**
   * 软删除版本
   * @param id 版本ID
   * @returns 删除结果
   */
  async deleteComicVersion(id: number) {
    // 验证版本是否存在
    const existingVersion = await this.findById({ id })
    if (!existingVersion) {
      throw new BadRequestException('版本不存在')
    }

    return this.deleteById({ id })
  }

  /**
   * 增加版本阅读次数
   * @param id 版本ID
   * @param increment 增加的次数，默认为1
   * @returns 更新结果
   */
  async incrementViewCount(id: number, increment = 1) {
    return this.updateById({
      id,
      data: {
        totalViews: {
          increment,
        },
        lastUpdated: new Date(),
      },
    })
  }

  /**
   * 增加版本收藏数
   * @param id 版本ID
   * @param increment 增加的数量，默认为1
   * @returns 更新结果
   */
  async incrementFavoriteCount(id: number, increment = 1) {
    return this.updateById({
      id,
      data: {
        favoriteCount: {
          increment,
        },
      },
    })
  }

  /**
   * 增加版本点赞数
   * @param id 版本ID
   * @param increment 增加的数量，默认为1
   * @returns 更新结果
   */
  async incrementLikeCount(id: number, increment = 1) {
    return this.updateById({
      id,
      data: {
        likeCount: {
          increment,
        },
      },
    })
  }

  /**
   * 更新版本评分
   * @param id 版本ID
   * @param rating 新评分
   * @returns 更新结果
   */
  async updateVersionRating(id: number, rating: number) {
    // 验证评分范围
    if (rating < 1 || rating > 10) {
      throw new BadRequestException('评分必须在1-10之间')
    }

    const version = await this.findById({ id })
    if (!version) {
      throw new BadRequestException('版本不存在')
    }

    // 计算新的平均评分
    const currentRating = version.rating || 0
    const currentCount = version.ratingCount || 0
    const newCount = currentCount + 1
    const newRating = (currentRating * currentCount + rating) / newCount

    return this.updateById({
      id,
      data: {
        rating: Math.round(newRating * 10) / 10, // 保留一位小数
        ratingCount: newCount,
      },
    })
  }
}
