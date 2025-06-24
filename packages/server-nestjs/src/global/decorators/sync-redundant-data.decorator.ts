import { SetMetadata } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { PrismaService } from '../services/prisma.service'

/**
 * 冗余数据同步配置
 */
export interface SyncConfig {
  /** 目标表名 */
  target: string
  /** 关联字段 */
  relation: string
  /** 同步字段配置 */
  fields: {
    /** 目标字段名 */
    name: string
    /** 操作类型 */
    op: 'count' | 'sum' | 'avg' | 'max' | 'min'
    /** 源字段（非count操作必需） */
    source?: string
    /** 过滤条件 */
    where?: Record<string, any>
  }[]
  /** 是否实时同步（默认true） */
  realtime?: boolean
}

/**
 * 冗余数据同步装饰器
 * 使用方式：@SyncRedundantData([配置...])
 */
export const SyncRedundantData = (configs: SyncConfig[]) => {
  return (target: any) => {
    // 存储配置到元数据
    SetMetadata('SYNC_CONFIGS', configs)(target)
    
    // 增强原型方法
    enhanceServiceMethods(target.prototype, configs)
    
    return target
  }
}

/**
 * 增强服务方法，自动添加同步逻辑
 */
function enhanceServiceMethods(prototype: any, configs: SyncConfig[]) {
  const methods = ['create', 'createMany', 'update', 'delete', 'deleteMany']
  
  methods.forEach(methodName => {
    const originalMethod = prototype[methodName]
    if (!originalMethod) return
    
    prototype[methodName] = async function(...args: any[]) {
      // 对于需要前置数据的操作，先获取数据
      let beforeData: any = null
      if (['update', 'delete', 'deleteMany'].includes(methodName)) {
        beforeData = await getBeforeData(this, methodName, args)
      }
      
      // 执行原始方法
      const result = await originalMethod.apply(this, args)
      
      // 执行同步
      await performSync(this, configs, methodName, {
        before: beforeData,
        after: result,
        args
      })
      
      return result
    }
  })
}

/**
 * 获取操作前的数据
 */
async function getBeforeData(service: any, methodName: string, args: any[]) {
  try {
    if (methodName === 'update' || methodName === 'delete') {
      return await service.findByUnique({ where: args[0].where })
    }
    if (methodName === 'deleteMany') {
      return await service.findMany({ where: args[0] })
    }
  } catch {
    return null
  }
}

/**
 * 执行同步逻辑
 */
async function performSync(
  service: any, 
  configs: SyncConfig[], 
  operation: string, 
  data: any
) {
  if (!configs?.length) return
  
  const prisma: PrismaService = service.prisma
  const eventEmitter: EventEmitter2 = service.eventEmitter
  
  for (const config of configs) {
    if (config.realtime === false) continue
    
    try {
      const relationIds = extractRelationIds(config, operation, data)
      
      for (const relationId of relationIds) {
        await updateTargetFields(prisma, config, relationId)
      }
      
      // 发送事件（可选）
      eventEmitter?.emit('redundant.sync', {
        config: config.target,
        operation,
        relationIds: Array.from(relationIds)
      })
    } catch (error) {
      console.error(`同步失败 [${config.target}]:`, error)
    }
  }
}

/**
 * 提取需要同步的关联ID
 */
function extractRelationIds(config: SyncConfig, operation: string, data: any): Set<any> {
  const ids = new Set<any>()
  
  switch (operation) {
    case 'create':
      const id = data.after?.[config.relation]
      if (id) ids.add(id)
      break
      
    case 'createMany':
      data.args?.[0]?.data?.forEach((item: any) => {
        const id = item[config.relation]
        if (id) ids.add(id)
      })
      break
      
    case 'update':
      const beforeId = data.before?.[config.relation]
      const afterId = data.after?.[config.relation]
      if (beforeId) ids.add(beforeId)
      if (afterId && afterId !== beforeId) ids.add(afterId)
      break
      
    case 'delete':
      const deleteId = data.before?.[config.relation]
      if (deleteId) ids.add(deleteId)
      break
      
    case 'deleteMany':
      data.before?.forEach((item: any) => {
        const id = item[config.relation]
        if (id) ids.add(id)
      })
      break
  }
  
  return ids
}

/**
 * 更新目标表字段
 */
async function updateTargetFields(
  prisma: PrismaService, 
  config: SyncConfig, 
  relationId: any
) {
  const updateData: Record<string, any> = {}
  
  for (const field of config.fields) {
    const value = await calculateFieldValue(prisma, config, field, relationId)
    updateData[field.name] = value
  }
  
  // 动态更新目标表
  await (prisma as any)[config.target].update({
    where: { id: relationId },
    data: updateData
  })
}

/**
 * 计算字段值
 */
async function calculateFieldValue(
  prisma: PrismaService,
  config: SyncConfig,
  field: any,
  relationId: any
): Promise<number> {
  const modelName = getModelNameFromConfig(config)
  const model = (prisma as any)[modelName]
  
  const where = {
    [config.relation]: relationId,
    deletedAt: null, // 排除软删除
    ...field.where
  }
  
  switch (field.op) {
    case 'count':
      return await model.count({ where })
      
    case 'sum':
    case 'avg':
    case 'max':
    case 'min':
      const result = await model.aggregate({
        where,
        _sum: field.op === 'sum' ? { [field.source!]: true } : undefined,
        _avg: field.op === 'avg' ? { [field.source!]: true } : undefined,
        _max: field.op === 'max' ? { [field.source!]: true } : undefined,
        _min: field.op === 'min' ? { [field.source!]: true } : undefined,
      })
      
      return result[`_${field.op}`]?.[field.source!] || 0
      
    default:
      return 0
  }
}

/**
 * 从配置推导模型名称
 */
function getModelNameFromConfig(config: SyncConfig): string {
  // 简单的命名转换：WorkCategory -> workComic
  // 这里可以根据实际项目的命名规范调整
  const target = config.target
  if (target === 'workCategory') return 'workComic'
  if (target === 'userProfile') return 'userPost'
  // 添加更多映射规则...
  
  // 默认规则：去掉末尾的复数形式，转为驼峰
  return target.replace(/ies$/, 'y').replace(/s$/, '')
}