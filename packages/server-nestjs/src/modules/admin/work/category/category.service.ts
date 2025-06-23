import { BadRequestException, Injectable } from '@nestjs/common'
import { BaseRepositoryService } from '@/global/services/base-repository.service'
import { PrismaService } from '@/global/services/prisma.service'
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  QueryCategoryDto,
  UpdateCategoryStatusDto,
  UpdateCategoryOrderDto,
  CategoryStatsDto,
  UpdateCategoryPopularityDto,
  UpdateCategoryCountDto,
} from './dto/category.dto'
import { CategoryApplicableTypesEnum } from './category.constant'

/**
 * 分类服务类
 * 继承 BaseRepositoryService，提供分类相关的业务逻辑
 */
@Injectable()
export class WorkCategoryService extends BaseRepositoryService<'WorkCategory'> {
  protected readonly modelName = 'WorkCategory' as const
  protected readonly supportsSoftDelete = false // 分类不支持软删除

  constructor(protected readonly prisma: PrismaService) {
    super(prisma)
  }

  /**
   * 创建分类
   * @param createCategoryDto 创建分类的数据
   * @returns 创建的分类信息
   */
  async createCategory(createCategoryDto: CreateCategoryDto) {
    // 验证分类名称是否已存在
    const existingCategory = await this.findByUnique({
      where: { name: createCategoryDto.name },
    })
    if (existingCategory) {
      throw new BadRequestException('分类名称已存在')
    }

    // 验证应用类型的有效性
    if (createCategoryDto.applicableTypes) {
      this.validateApplicableTypes(createCategoryDto.applicableTypes)
    }

    // 如果没有指定排序值，设置为最大值+1
    if (!createCategoryDto.order) {
      const maxOrder = await this.getMaxOrder()
      createCategoryDto.order = maxOrder + 1
    }

    return this.create({
      data: {
        ...createCategoryDto,
        popularity: 0,
        virtualPopularity: 0,
        novelCount: 0,
        comicCount: 0,
        photoCount: 0,
        illustratorCount: 0,
      },
    })
  }

  /**
   * 分页查询分类列表
   * @param queryDto 查询参数
   * @returns 分页结果
   */
  async getCategoryPage(queryDto: QueryCategoryDto) {
    const {
      pageIndex,
      pageSize,
      name,
      isEnabled,
      applicableTypes,
      keyword,
      sortBy = 'order',
      sortOrder = 'asc',
    } = queryDto

    // 构建查询条件
    const where: any = {}

    if (name) {
      where.name = { contains: name }
    }

    if (keyword) {
      where.OR = [
        { name: { contains: keyword } },
      ]
    }

    if (isEnabled !== undefined) {
      where.isEnabled = isEnabled
    }

    if (applicableTypes !== undefined) {
      // 使用简单的等值查询
      where.applicableTypes = applicableTypes
    }

    // 构建排序条件
    const orderBy: any = {}
    if (sortBy === 'createdAt') {
      orderBy.createdAt = sortOrder
    } else {
      orderBy[sortBy] = sortOrder
    }

    return this.findPagination({
      pageIndex,
      pageSize,
      where,
      orderBy,
    })
  }

  /**
   * 获取分类详情
   * @param id 分类ID
   * @returns 分类详情
   */
  async getCategoryDetail(id: number) {
    const category = await this.findById({ id })
    if (!category) {
      throw new BadRequestException('分类不存在')
    }
    return category
  }

  /**
   * 更新分类
   * @param updateCategoryDto 更新数据
   * @returns 更新后的分类信息
   */
  async updateCategory(updateCategoryDto: UpdateCategoryDto) {
    const { id, ...updateData } = updateCategoryDto

    // 验证分类是否存在
    const existingCategory = await this.findById({ id })
    if (!existingCategory) {
      throw new BadRequestException('分类不存在')
    }

    // 如果更新名称，验证名称是否已被其他分类使用
    if (updateData.name && updateData.name !== existingCategory.name) {
      const duplicateCategory = await this.findByUnique({
        where: { name: updateData.name },
      })
      if (duplicateCategory && duplicateCategory.id !== id) {
        throw new BadRequestException('分类名称已存在')
      }
    }

    // 验证应用类型的有效性
    if (updateData.applicableTypes !== undefined) {
      this.validateApplicableTypes(updateData.applicableTypes)
    }

    return this.updateById({
      id,
      data: updateData,
    })
  }

  /**
   * 批量更新分类状态
   * @param updateStatusDto 状态更新数据
   * @returns 更新结果
   */
  async updateCategoryStatus(updateStatusDto: UpdateCategoryStatusDto) {
    const { ids, isEnabled } = updateStatusDto

    // 验证所有分类是否存在
    const categories = await this.findMany({
      where: { id: { in: ids } },
    })
    if (categories.length !== ids.length) {
      throw new BadRequestException('部分分类不存在')
    }

    return this.updateMany({
      where: { id: { in: ids } },
      data: { isEnabled },
    })
  }

  /**
   * 批量更新分类排序
   * @param updateOrderDto 排序更新数据
   * @returns 更新结果
   */
  async updateCategoryOrder(updateOrderDto: UpdateCategoryOrderDto) {
    const { ids } = updateOrderDto

    // 验证所有分类是否存在
    const categories = await this.findMany({
      where: { id: { in: ids } },
    })
    if (categories.length !== ids.length) {
      throw new BadRequestException('部分分类不存在')
    }

    // 使用事务批量更新排序
    return this.transaction(async (prisma) => {
      const updatePromises = ids.map((id, index) =>
        prisma.workCategory.update({
          where: { id },
          data: { order: index + 1 },
        }),
      )
      return Promise.all(updatePromises)
    })
  }

  /**
   * 删除分类
   * @param id 分类ID
   * @returns 删除结果
   */
  async deleteCategory(id: number) {
    // 验证分类是否存在
    const existingCategory = await this.findById({ id })
    if (!existingCategory) {
      throw new BadRequestException('分类不存在')
    }

    // 检查是否有关联的作品
    const hasWorks = await this.checkCategoryHasWorks(id)
    if (hasWorks) {
      throw new BadRequestException('该分类下还有作品，无法删除')
    }

    return this.deleteById({ id })
  }

  /**
   * 验证应用类型
   */
  private validateApplicableTypes(applicableTypes: number): boolean {
    const validTypes = [
      CategoryApplicableTypesEnum.PHOTO,
      CategoryApplicableTypesEnum.NOVEL,
      CategoryApplicableTypesEnum.COMIC,
      CategoryApplicableTypesEnum.ILLUSTRATOR,
    ]
    
    // 检查是否为有效的枚举值
    return validTypes.includes(applicableTypes)
  }

  /**
   * 批量删除分类
   * @param ids 分类ID列表
   * @returns 删除结果
   */
  async deleteCategoryBatch(ids: number[]) {
    // 验证所有分类是否存在
    const categories = await this.findMany({
      where: { id: { in: ids } },
    })
    if (categories.length !== ids.length) {
      throw new BadRequestException('部分分类不存在')
    }

    // 检查是否有关联的作品
    for (const id of ids) {
      const hasWorks = await this.checkCategoryHasWorks(id)
      if (hasWorks) {
        const category = categories.find(c => c.id === id)
        throw new BadRequestException(`分类 ${category?.name} 还有作品，无法删除`)