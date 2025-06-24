import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Prisma } from '@/prisma/client'
import { BaseRepositoryService, BatchResult } from './base-repository.service'
import { PrismaService } from './prisma.service'

/**
 * 冗余数据同步配置接口
 */
export interface RedundantDataConfig {
  /** 目标表名 */
  targetTable: string
  /** 关联字段名 */
  relationField: string
  /** 冗余字段配置 */
  redundantFields: {
    /** 字段名 */
    fieldName: string
    /** 操作类型：count(计数), sum(求和), avg(平均值), max(最大值), min(最小值) */
    operation: 'count' | 'sum' | 'avg' | 'max' | 'min'
    /** 源字段名（用于sum/avg/max/min操作） */
    sourceField?: string
    /** 过滤条件（可选） */
    whereCondition?: Record<string, any>
  }[]
  /** 是否启用实时同步 */
  enableRealTimeSync?: boolean
  /** 是否启用批量同步优化 */
  enableBatchSync?: boolean
}

/**
 * Prisma 所有模型名称类型
 */
type ModelName = keyof typeof Prisma.ModelName

/**
 * 针对指定模型名，推导出常用的 Prisma 类型
 */
interface ModelTypes<T extends ModelName> {
  Model: Prisma.TypeMap['model'][T]['operations']['findUnique']['result']
  WhereInput: Prisma.TypeMap['model'][T]['operations']['findFirst']['args']['where']
  CreateInput: Prisma.TypeMap['model'][T]['operations']['create']['args']['data']
  UpdateInput: Prisma.TypeMap['model'][T]['operations']['update']['args']['data']
  OrderByInput: Prisma.TypeMap['model'][T]['operations']['findMany']['args']['orderBy']
  WhereUniqueInput: Prisma.TypeMap['model'][T]['operations']['findUnique']['args']['where']
  Include: Prisma.TypeMap['model'][T]['operations']['findFirst']['args'] extends {
    include?: infer I
  }
    ? I
    : never
  Select: Prisma.TypeMap['model'][T]['operations']['findFirst']['args']['select']
}

/**
 * 查询选项类型，支持 include/select/omit
 */
interface QueryOptions<T extends ModelName> {
  include?: ModelTypes<T>['Include']
  select?: ModelTypes<T>['Select']
  omit?: string[]
}

/**
 * 增强的基础仓储服务，自动支持冗余数据同步
 * @template T Prisma 模型名称
 */
@Injectable()
export abstract class EnhancedBaseRepositoryService<
  T extends ModelName,
> extends BaseRepositoryService<T> {
  /**
   * 子类需要配置冗余数据同步规则
   */
  protected abstract readonly redundantDataConfig?: RedundantDataConfig[]

  constructor(
    protected readonly prisma: PrismaService,
    protected readonly eventEmitter?: EventEmitter2,
  ) {
    super(prisma)
  }

  /**
   * 增强的创建方法，自动触发冗余数据同步
   */
  async create(
    options: { data: ModelTypes<T>['CreateInput'] } & Partial<QueryOptions<T>>,
  ): Promise<ModelTypes<T>['Model']> {
    const result = await super.create(options)
    await this.syncRedundantDataAfterCreate(result)
    return result
  }

  /**
   * 增强的批量创建方法，自动触发冗余数据同步
   */
  async createMany(options: {
    data: ModelTypes<T>['CreateInput'][]
    skipDuplicates?: boolean
  }): Promise<BatchResult> {
    const result = await super.createMany(options)
    await this.batchSyncRedundantDataAfterCreate(options.data)
    return result
  }

  /**
   * 增强的更新方法，自动触发冗余数据同步
   */
  async update(
    options: {
      where: ModelTypes<T>['WhereUniqueInput']
      data: ModelTypes<T>['UpdateInput']
    } & Partial<QueryOptions<T>>,
  ): Promise<ModelTypes<T>['Model']> {
    // 获取更新前的数据，用于比较关联字段是否变化
    const beforeData = await this.findByUnique({ where: options.where })
    const result = await super.update(options)
    await this.syncRedundantDataAfterUpdate(beforeData, result)
    return result
  }

  /**
   * 增强的删除方法，自动触发冗余数据同步
   */
  async delete(
    options: { where: ModelTypes<T>['WhereUniqueInput'] } & Partial<
      QueryOptions<T>
    >,
  ): Promise<ModelTypes<T>['Model']> {
    // 获取删除前的数据，用于同步
    const beforeData = await this.findByUnique({ where: options.where })
    const result = await super.delete(options)
    await this.syncRedundantDataAfterDelete(beforeData)
    return result
  }

  /**
   * 增强的批量删除方法，自动触发冗余数据同步
   */
  async deleteMany(where?: ModelTypes<T>['WhereInput']): Promise<BatchResult> {
    // 获取删除前的数据，用于同步
    const beforeData = await this.findMany({ where })
    const result = await super.deleteMany(where)
    await this.batchSyncRedundantDataAfterDelete(beforeData)
    return result
  }

  /**
   * 创建后同步冗余数据
   */
  private async syncRedundantDataAfterCreate(data: any): Promise<void> {
    if (!this.redundantDataConfig || !data) return

    for (const config of this.redundantDataConfig) {
      if (!config.enableRealTimeSync) continue

      const relationId = data[config.relationField]
      if (relationId) {
        await this.updateRedundantFields(config, relationId)
      }
    }

    // 发送事件用于异步处理
    this.emitRedundantDataEvent('create', data)
  }

  /**
   * 批量创建后同步冗余数据
   */
  private async batchSyncRedundantDataAfterCreate(
    dataList: any[],
  ): Promise<void> {
    if (!this.redundantDataConfig || !dataList.length) return

    for (const config of this.redundantDataConfig) {
      if (!config.enableBatchSync) continue

      // 收集所有需要更新的关联ID
      const relationIds = new Set(
        dataList
          .map((data) => data[config.relationField])
          .filter((id) => id != null),
      )

      // 批量更新
      for (const relationId of relationIds) {
        await this.updateRedundantFields(config, relationId)
      }
    }

    // 发送批量事件
    this.emitRedundantDataEvent('batchCreate', dataList)
  }

  /**
   * 更新后同步冗余数据
   */
  private async syncRedundantDataAfterUpdate(
    beforeData: any,
    afterData: any,
  ): Promise<void> {
    if (!this.redundantDataConfig || !beforeData || !afterData) return

    for (const config of this.redundantDataConfig) {
      if (!config.enableRealTimeSync) continue

      const beforeRelationId = beforeData[config.relationField]
      const afterRelationId = afterData[config.relationField]

      // 如果关联字段发生变化，需要同时更新新旧关联记录
      if (beforeRelationId !== afterRelationId) {
        if (beforeRelationId) {
          await this.updateRedundantFields(config, beforeRelationId)
        }
        if (afterRelationId) {
          await this.updateRedundantFields(config, afterRelationId)
        }
      } else if (afterRelationId) {
        // 关联字段未变化，只更新当前关联记录
        await this.updateRedundantFields(config, afterRelationId)
      }
    }

    // 发送事件
    this.emitRedundantDataEvent('update', {
      before: beforeData,
      after: afterData,
    })
  }

  /**
   * 删除后同步冗余数据
   */
  private async syncRedundantDataAfterDelete(data: any): Promise<void> {
    if (!this.redundantDataConfig || !data) return

    for (const config of this.redundantDataConfig) {
      if (!config.enableRealTimeSync) continue

      const relationId = data[config.relationField]
      if (relationId) {
        await this.updateRedundantFields(config, relationId)
      }
    }

    // 发送事件
    this.emitRedundantDataEvent('delete', data)
  }

  /**
   * 批量删除后同步冗余数据
   */
  private async batchSyncRedundantDataAfterDelete(
    dataList: any[],
  ): Promise<void> {
    if (!this.redundantDataConfig || !dataList.length) return

    for (const config of this.redundantDataConfig) {
      if (!config.enableBatchSync) continue

      // 收集所有需要更新的关联ID
      const relationIds = new Set(
        dataList
          .map((data) => data[config.relationField])
          .filter((id) => id != null),
      )

      // 批量更新
      for (const relationId of relationIds) {
        await this.updateRedundantFields(config, relationId)
      }
    }

    // 发送批量事件
    this.emitRedundantDataEvent('batchDelete', dataList)
  }

  /**
   * 更新冗余字段
   */
  private async updateRedundantFields(
    config: RedundantDataConfig,
    relationId: any,
  ): Promise<void> {
    try {
      const updateData: Record<string, any> = {}

      for (const field of config.redundantFields) {
        const value = await this.calculateRedundantFieldValue(
          config,
          field,
          relationId,
        )
        updateData[field.fieldName] = value
      }

      // 更新目标表
      const targetModel = (this.prisma as any)[config.targetTable]
      await targetModel.update({
        where: { id: relationId },
        data: updateData,
      })
    } catch (error) {
      console.error(
        `更新冗余数据失败: ${config.targetTable}.${relationId}`,
        error,
      )
      // 可以选择重新抛出错误或记录日志
    }
  }

  /**
   * 计算冗余字段值
   */
  private async calculateRedundantFieldValue(
    config: RedundantDataConfig,
    field: RedundantDataConfig['redundantFields'][0],
    relationId: any,
  ): Promise<number> {
    const sourceModel = this.model
    const baseWhere = {
      [config.relationField]: relationId,
      ...field.whereCondition,
    }

    // 如果支持软删除，排除已删除的记录
    const where = this.supportsSoftDelete
      ? this.getWhereWithoutDeleted(baseWhere)
      : baseWhere

    switch (field.operation) {
      case 'count':
        return await sourceModel.count({ where })

      case 'sum':
        if (!field.sourceField) throw new Error(`sum操作需要指定sourceField`)
        const sumResult = await sourceModel.aggregate({
          where,
          _sum: { [field.sourceField]: true },
        })
        return sumResult._sum[field.sourceField] || 0

      case 'avg':
        if (!field.sourceField) throw new Error(`avg操作需要指定sourceField`)
        const avgResult = await sourceModel.aggregate({
          where,
          _avg: { [field.sourceField]: true },
        })
        return avgResult._avg[field.sourceField] || 0

      case 'max':
        if (!field.sourceField) throw new Error(`max操作需要指定sourceField`)
        const maxResult = await sourceModel.aggregate({
          where,
          _max: { [field.sourceField]: true },
        })
        return maxResult._max[field.sourceField] || 0

      case 'min':
        if (!field.sourceField) throw new Error(`min操作需要指定sourceField`)
        const minResult = await sourceModel.aggregate({
          where,
          _min: { [field.sourceField]: true },
        })
        return minResult._min[field.sourceField] || 0

      default:
        throw new Error(`不支持的操作类型: ${field.operation}`)
    }
  }

  /**
   * 发送冗余数据事件
   */
  private emitRedundantDataEvent(eventType: string, data: any): void {
    if (!this.eventEmitter) return

    const eventName = `redundant-data.${this.modelName}.${eventType}`
    this.eventEmitter.emit(eventName, {
      modelName: this.modelName,
      eventType,
      data,
      timestamp: new Date(),
    })
  }

  /**
   * 手动同步指定关联ID的冗余数据
   */
  async manualSyncRedundantData(relationId: any): Promise<void> {
    if (!this.redundantDataConfig) return

    for (const config of this.redundantDataConfig) {
      await this.updateRedundantFields(config, relationId)
    }
  }

  /**
   * 全量同步冗余数据
   */
  async fullSyncRedundantData(): Promise<void> {
    if (!this.redundantDataConfig) return

    for (const config of this.redundantDataConfig) {
      // 获取所有唯一的关联ID
      const relationIds = await this.model.findMany({
        select: { [config.relationField]: true },
        distinct: [config.relationField],
        where: this.supportsSoftDelete ? { deletedAt: null } : undefined,
      })

      // 逐个同步
      for (const item of relationIds) {
        const relationId = item[config.relationField]
        if (relationId) {
          await this.updateRedundantFields(config, relationId)
        }
      }
    }
  }

  /**
   * 验证冗余数据一致性
   */
  async validateRedundantDataConsistency(): Promise<{
    isConsistent: boolean
    inconsistencies: Array<{
      targetTable: string
      relationId: any
      field: string
      expected: number
      actual: number
    }>
  }> {
    const inconsistencies: Array<{
      targetTable: string
      relationId: any
      field: string
      expected: number
      actual: number
    }> = []

    if (!this.redundantDataConfig) {
      return { isConsistent: true, inconsistencies }
    }

    for (const config of this.redundantDataConfig) {
      // 获取所有目标记录
      const targetModel = (this.prisma as any)[config.targetTable]
      const targetRecords = await targetModel.findMany({
        select: {
          id: true,
          ...config.redundantFields.reduce(
            (acc, field) => {
              acc[field.fieldName] = true
              return acc
            },
            {} as Record<string, boolean>,
          ),
        },
      })

      // 验证每个目标记录的冗余数据
      for (const record of targetRecords) {
        for (const field of config.redundantFields) {
          const expected = await this.calculateRedundantFieldValue(
            config,
            field,
            record.id,
          )
          const actual = record[field.fieldName]

          if (expected !== actual) {
            inconsistencies.push({
              targetTable: config.targetTable,
              relationId: record.id,
              field: field.fieldName,
              expected,
              actual,
            })
          }
        }
      }
    }

    return {
      isConsistent: inconsistencies.length === 0,
      inconsistencies,
    }
  }
}
