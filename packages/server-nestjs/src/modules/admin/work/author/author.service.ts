import { BadRequestException, Injectable } from '@nestjs/common'
import { BatchOperationStatusIdsDto } from '@/common/dto/batch.dto'
import { BaseRepositoryService } from '@/global/services/base-repository.service'
import { PrismaService } from '@/global/services/prisma.service'
import { WorkAuthorWhereInput } from '@/prisma/client/models/WorkAuthor'
import {
  CreateAuthorDto,
  QueryAuthorDto,
  UpdateAuthorDto,
  UpdateAuthorFeaturedDto,
} from './dto/author.dto'

/**
 * 作者服务类
 * 提供作者的增删改查等核心业务逻辑
 */
@Injectable()
export class WorkAuthorService extends BaseRepositoryService<'WorkAuthor'> {
  protected readonly modelName = 'WorkAuthor' as const
  protected readonly supportsSoftDelete = true

  constructor(protected readonly prisma: PrismaService) {
    super(prisma)
  }

  /**
   * 创建作者
   * @param createAuthorDto 创建作者的数据
   * @returns 创建的作者信息
   */
  async createAuthor(createAuthorDto: CreateAuthorDto) {
    // 验证作者姓名是否已存在
    const existingAuthor = await this.findByUnique({
      where: { name: createAuthorDto.name },
    })
    if (existingAuthor) {
      throw new BadRequestException('作者姓名已存在')
    }

    // 验证社交媒体链接格式
    if (createAuthorDto.socialLinks) {
      try {
        JSON.parse(createAuthorDto.socialLinks)
      } catch {
        throw new BadRequestException(
          '社交媒体链接格式不正确，请使用有效的JSON格式',
        )
      }
    }

    return this.create({ data: createAuthorDto })
  }

  /**
   * 分页查询作者列表
   * @param queryAuthorDto 查询条件
   * @returns 分页作者列表
   */
  async getAuthorPage(queryAuthorDto: QueryAuthorDto) {
    const {
      name,
      isEnabled,
      roles,
      nationality,
      gender,
      featured,
    } = queryAuthorDto

    // 构建查询条件
    const where: WorkAuthorWhereInput = {}

    // 姓名模糊搜索
    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      }
    }

    // 启用状态筛选
    if (typeof isEnabled === 'boolean') {
      where.isEnabled = isEnabled
    }

    // 角色筛选（位运算）
    if (roles !== undefined) {
      where.roles = {
        equals: roles,
      }
    }

    // 国籍筛选
    if (nationality) {
      where.nationality = nationality
    }

    // 性别筛选
    if (gender !== undefined) {
      where.gender = gender
    }

    // 推荐状态筛选
    if (typeof featured === 'boolean') {
      where.featured = featured
    }

    return this.findPagination({
      where,
      omit: {
        remark: true,
        socialLinks: true,
        nationality: true,
        description: true,
        deletedAt: true,
      },
    })
  }

  /**
   * 获取作者详情
   * @param id 作者ID
   * @returns 作者详情信息
   */
  async getAuthorDetail(id: number) {
    const author = await this.findById({
      id,
    })

    if (!author) {
      throw new BadRequestException('作者不存在')
    }

    return {
      ...author,
    }
  }

  /**
   * 更新作者信息
   * @param updateAuthorDto 更新作者的数据
   * @returns 更新后的作者信息
   */
  async updateAuthor(updateAuthorDto: UpdateAuthorDto) {
    const { id, ...updateData } = updateAuthorDto

    // 验证作者是否存在
    const existingAuthor = await this.findById({ id })
    if (!existingAuthor) {
      throw new BadRequestException('作者不存在')
    }

    // 如果更新姓名，验证是否与其他作者重复
    if (updateData.name && updateData.name !== existingAuthor.name) {
      const duplicateAuthor = await this.findFirst({
        where: {
          name: updateData.name,
          id: { not: id },
        },
      })
      if (duplicateAuthor) {
        throw new BadRequestException('作者姓名已存在')
      }
    }

    // 验证社交媒体链接格式
    if (updateData.socialLinks) {
      try {
        JSON.parse(updateData.socialLinks)
      } catch {
        throw new BadRequestException(
          '社交媒体链接格式不正确，请使用有效的JSON格式',
        )
      }
    }

    return this.updateById({
      id,
      data: updateData,
    })
  }

  /**
   * 批量更新作者状态
   * @param updateAuthorStatusDto 批量更新状态的数据
   * @returns 更新结果
   */
  async updateAuthorStatus(updateAuthorStatusDto: BatchOperationStatusIdsDto) {
    const { ids, isEnabled } = updateAuthorStatusDto

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
   * 批量更新作者推荐状态
   * @param updateAuthorFeaturedDto 批量更新推荐状态的数据
   * @returns 更新结果
   */
  async updateAuthorFeatured(updateAuthorFeaturedDto: UpdateAuthorFeaturedDto) {
    const { ids, featured } = updateAuthorFeaturedDto

    return this.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        featured,
      },
    })
  }

  /**
   * 软删除作者
   * @param id 作者ID
   * @returns 删除结果
   */
  async deleteAuthor(id: number) {
    // 验证作者是否存在
    const existingAuthor = await this.findById({ id })
    if (!existingAuthor) {
      throw new BadRequestException('作者不存在')
    }
    if (existingAuthor.worksCount && existingAuthor.worksCount > 0) {
      throw new BadRequestException(
        `该作者还有 ${existingAuthor.worksCount} 个关联作品，无法删除`,
      )
    }

    return this.softDelete(id)
  }

  /**
   * 更新作者作品数量（冗余字段维护）
   * @param authorId 作者ID
   * @returns 更新结果
   */
  async updateAuthorWorksCount(authorId: number) {
    const worksCount = await this.prisma.workComic.count({
      where: {
        authorId,
        deletedAt: null,
      },
    })

    return this.updateById({
      id: authorId,
      data: {
        worksCount,
      },
    })
  }
}
