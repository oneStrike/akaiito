import { Injectable } from '@nestjs/common'
import { EnhancedBaseRepositoryService, RedundantDataConfig } from '@/global/services/enhanced-base-repository.service'
import { PrismaService } from '@/global/services/prisma.service'
import { EventEmitter2 } from '@nestjs/event-emitter'

/**
 * 增强的漫画服务，自动支持冗余数据同步
 * 只需要配置同步规则，无需编写重复的同步代码
 */
@Injectable()
export class EnhancedWorkComicService extends EnhancedBaseRepositoryService<'WorkComic'> {
  protected readonly modelName = 'WorkComic' as const
  protected readonly supportsSoftDelete = true

  /**
   * 配置冗余数据同步规则
   * 当WorkComic发生增删改时，自动更新WorkCategory表的相关统计字段
   */
  protected readonly redundantDataConfig: RedundantDataConfig[] = [
    {
      // 目标表：WorkCategory
      targetTable: 'WorkCategory',
      // 关联字段：categoryId
      relationField: 'categoryId',
      // 冗余字段配置
      redundantFields: [
        {
          // 更新漫画数量
          fieldName: 'comicCount',
          operation: 'count',
        },
        {
          // 更新总人气值（所有漫画的人气值之和）
          fieldName: 'totalPopularity',
          operation: 'sum',
          sourceField: 'popularity',
        },
        {
          // 更新平均人气值
          fieldName: 'avgPopularity',
          operation: 'avg',
          sourceField: 'popularity',
        },
        {
          // 更新最高人气值
          fieldName: 'maxPopularity',
          operation: 'max',
          sourceField: 'popularity',
        },
        {
          // 更新已发布漫画数量（只统计已发布的）
          fieldName: 'publishedComicCount',
          operation: 'count',
          whereCondition: {
            status: 'PUBLISHED',
          },
        },
      ],
      // 启用实时同步
      enableRealTimeSync: true,
      // 启用批量同步优化
      enableBatchSync: true,
    },
  ]

  constructor(
    protected readonly prisma: PrismaService,
    protected readonly eventEmitter: EventEmitter2,
  ) {
    super(prisma, eventEmitter)
  }

  /**
   * 创建漫画
   * 自动触发冗余数据同步，无需额外代码
   */
  async createComic(data: {
    title: string
    categoryId: number
    authorId: number
    description?: string
    coverImage?: string
    status?: string
    popularity?: number
  }) {
    return this.create({
      data: {
        ...data,
        popularity: data.popularity || 0,
        status: data.status || 'DRAFT',
      },
    })
  }

  /**
   * 更新漫画
   * 自动处理分类变更时的冗余数据同步
   */
  async updateComic(
    id: number,
    data: {
      title?: string
      categoryId?: number
      description?: string
      coverImage?: string
      status?: string
      popularity?: number
    },
  ) {
    return this.update({
      where: { id },
      data,
    })
  }

  /**
   * 删除漫画
   * 自动触发冗余数据同步
   */
  async deleteComic(id: number) {
    return this.delete({ where: { id } })
  }

  /**
   * 批量创建漫画
   * 自动触发批量冗余数据同步优化
   */
  async batchCreateComics(comicsData: Array<{
    title: string
    categoryId: number
    authorId: number
    description?: string
    coverImage?: string
    status?: string
    popularity?: number
  }>) {
    const processedData = comicsData.map(data => ({
      ...data,
      popularity: data.popularity || 0,
      status: data.status || 'DRAFT',
    }))

    return this.createMany({
      data: processedData,
    })
  }

  /**
   * 更新漫画人气值
   * 自动同步到分类统计
   */
  async updateComicPopularity(id: number, popularity: number) {
    return this.updateComic(id, { popularity })
  }

  /**
   * 发布漫画
   * 自动更新已发布漫画数量统计
   */
  async publishComic(id: number) {
    return this.updateComic(id, { status: 'PUBLISHED' })
  }

  /**
   * 获取分类下的漫画列表
   */
  async getComicsByCategory(categoryId: number, options?: {
    pageSize?: number
    pageIndex?: number
    status?: string
  }) {
    return this.findPagination({
      where: {
        categoryId,
        ...(options?.status && { status: options.status }),
      },
      pageSize: options?.pageSize,
      pageIndex: options?.pageIndex,
      orderBy: { createdAt: 'desc' },
    })
  }

  /**
   * 获取热门漫画
   */
  async getPopularComics(limit = 10) {
    return this.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { popularity: 'desc' },
    })
  }

  /**
   * 手动同步指定分类的冗余数据
   * 用于数据修复或定期维护
   */
  async syncCategoryData(categoryId: number) {
    return this.manualSyncRedundantData(categoryId)
  }

  /**
   * 验证所有分类的冗余数据一致性
   * 用于数据质量检查
   */
  async validateCategoryDataConsistency() {
    return this.validateRedundantDataConsistency()
  }

  /**
   * 全量同步所有分类的冗余数据
   * 用于数据初始化或修复
   */
  async fullSyncAllCategoryData() {
    return this.fullSyncRedundantData()
  }
}