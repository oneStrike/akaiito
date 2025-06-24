import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { BaseRepositoryService } from '@/global/services/base-repository.service'
import { PrismaService } from '@/global/services/prisma.service'
import { SyncRedundantData } from '@/global/decorators/sync-redundant-data.decorator'

/**
 * 漫画服务
 * 使用装饰器自动处理冗余数据同步
 */
@Injectable()
@SyncRedundantData([
  {
    // 目标表为作品分类表
    target: 'workCategory',
    // 关联字段为分类ID
    relation: 'categoryId',
    // 需要同步的字段
    fields: [
      // 漫画总数
      { name: 'comicCount', op: 'count' },
      // 总人气值
      { name: 'totalPopularity', op: 'sum', source: 'popularity' },
      // 平均人气值
      { name: 'avgPopularity', op: 'avg', source: 'popularity' },
      // 最高人气值
      { name: 'maxPopularity', op: 'max', source: 'popularity' },
      // 已发布漫画数量
      {
        name: 'publishedComicCount',
        op: 'count',
        where: { status: 'PUBLISHED' }
      }
    ],
    // 启用实时同步
    realtime: true
  }
])
export class WorkComicService extends BaseRepositoryService<'workComic'> {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly eventEmitter: EventEmitter2
  ) {
    super(prisma)
  }
  
  /**
   * 创建漫画
   */
  async createComic(data: any) {
    return this.create({ data })
  }
  
  /**
   * 批量创建漫画
   */
  async createComics(dataList: any[]) {
    return this.createMany({ data: dataList })
  }
  
  /**
   * 更新漫画
   */
  async updateComic(id: number, data: any) {
    return this.update({
      where: { id },
      data
    })
  }
  
  /**
   * 删除漫画
   */
  async deleteComic(id: number) {
    return this.delete({ where: { id } })
  }
  
  /**
   * 手动触发全量同步
   * 可以在管理界面提供此功能
   */
  async manualSync() {
    // 获取所有分类ID
    const categories = await this.prisma.workCategory.findMany({
      select: { id: true }
    })
    
    // 为每个分类执行同步
    for (const { id } of categories) {
      await this.syncCategoryStats(id)
    }
    
    return { success: true, syncedCount: categories.length }
  }
  
  /**
   * 同步指定分类的统计数据
   */
  private async syncCategoryStats(categoryId: number) {
    // 计算统计数据
    const comicCount = await this.prisma.workComic.count({
      where: { categoryId, deletedAt: null }
    })
    
    const publishedCount = await this.prisma.workComic.count({
      where: { categoryId, status: 'PUBLISHED', deletedAt: null }
    })
    
    const popularityStats = await this.prisma.workComic.aggregate({
      where: { categoryId, deletedAt: null },
      _sum: { popularity: true },
      _avg: { popularity: true },
      _max: { popularity: true }
    })
    
    // 更新分类
    await this.prisma.workCategory.update({
      where: { id: categoryId },
      data: {
        comicCount,
        publishedComicCount: publishedCount,
        totalPopularity: popularityStats._sum.popularity || 0,
        avgPopularity: popularityStats._avg.popularity || 0,
        maxPopularity: popularityStats._max.popularity || 0
      }
    })
  }
}