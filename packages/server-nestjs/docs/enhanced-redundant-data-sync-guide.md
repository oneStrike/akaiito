# 增强冗余数据同步系统使用指南

## 概述

这是一个全新设计的冗余数据同步解决方案，**彻底解决了代码重复问题**。通过继承增强的基础服务类，任何服务都能零代码重复地获得完整的冗余数据同步功能。

## 🎯 核心优势

### 1. **零代码重复**
- 所有服务只需继承 `EnhancedBaseRepositoryService`
- 通过配置 `redundantDataConfig` 即可自动获得同步功能
- 无需为每个模块编写重复的同步逻辑

### 2. **高度自动化**
- 自动拦截所有 CRUD 操作
- 智能处理关联字段变更
- 自动批量同步优化
- 定时全量同步和一致性检查

### 3. **生产就绪**
- 完整的错误处理和重试机制
- 详细的监控和统计信息
- 健康检查和自动修复
- 管理界面和 API 接口

## 🚀 快速开始

### 步骤 1：继承增强基础服务

```typescript
import { Injectable } from '@nestjs/common'
import { EnhancedBaseRepositoryService, RedundantDataConfig } from '@/global/services/enhanced-base-repository.service'
import { PrismaService } from '@/global/services/prisma.service'
import { EventEmitter2 } from '@nestjs/event-emitter'

@Injectable()
export class WorkComicService extends EnhancedBaseRepositoryService<'WorkComic'> {
  protected readonly modelName = 'WorkComic' as const
  protected readonly supportsSoftDelete = true

  // 配置冗余数据同步规则
  protected readonly redundantDataConfig: RedundantDataConfig[] = [
    {
      targetTable: 'WorkCategory',
      relationField: 'categoryId',
      redundantFields: [
        {
          fieldName: 'comicCount',
          operation: 'count',
        },
        {
          fieldName: 'totalPopularity',
          operation: 'sum',
          sourceField: 'popularity',
        },
      ],
      enableRealTimeSync: true,
      enableBatchSync: true,
    },
  ]

  constructor(
    protected readonly prisma: PrismaService,
    protected readonly eventEmitter: EventEmitter2,
  ) {
    super(prisma, eventEmitter)
  }

  // 正常编写业务方法，系统会自动处理同步
  async createComic(data: any) {
    return this.create({ data }) // 自动触发同步
  }

  async updateComic(id: number, data: any) {
    return this.update({ where: { id }, data }) // 自动处理关联变更
  }
}
```

### 步骤 2：在应用模块中导入

```typescript
import { Module } from '@nestjs/common'
import { RedundantDataSyncModule } from '@/global/modules/redundant-data-sync.module'

@Module({
  imports: [
    RedundantDataSyncModule, // 导入全局模块
    // 其他模块...
  ],
})
export class AppModule {}
```

### 步骤 3：开始使用

就这么简单！系统会自动：
- 注册您的服务
- 拦截所有数据变更
- 实时同步冗余数据
- 定时全量同步
- 监控和健康检查

## 📋 配置选项

### RedundantDataConfig 配置

```typescript
interface RedundantDataConfig {
  targetTable: string           // 目标表名
  relationField: string         // 关联字段名
  redundantFields: Array<{      // 冗余字段配置
    fieldName: string           // 字段名
    operation: 'count' | 'sum' | 'avg' | 'max' | 'min'  // 操作类型
    sourceField?: string        // 源字段名（用于 sum/avg/max/min）
    whereCondition?: object     // 过滤条件（可选）
  }>
  enableRealTimeSync?: boolean  // 启用实时同步
  enableBatchSync?: boolean     // 启用批量同步优化
}
```

### 支持的聚合操作

| 操作 | 说明 | 示例 |
|------|------|------|
| `count` | 计数 | 统计分类下的作品数量 |
| `sum` | 求和 | 计算总人气值 |
| `avg` | 平均值 | 计算平均评分 |
| `max` | 最大值 | 获取最高人气值 |
| `min` | 最小值 | 获取最低价格 |

## 🔧 使用示例

### 示例 1：小说服务

```typescript
@Injectable()
export class WorkNovelService extends EnhancedBaseRepositoryService<'WorkNovel'> {
  protected readonly modelName = 'WorkNovel' as const
  
  protected readonly redundantDataConfig: RedundantDataConfig[] = [
    {
      targetTable: 'WorkCategory',
      relationField: 'categoryId',
      redundantFields: [
        { fieldName: 'novelCount', operation: 'count' },
        { fieldName: 'avgRating', operation: 'avg', sourceField: 'rating' },
        { 
          fieldName: 'publishedNovelCount', 
          operation: 'count',
          whereCondition: { status: 'PUBLISHED' }
        },
      ],
      enableRealTimeSync: true,
      enableBatchSync: true,
    },
  ]
}
```

### 示例 2：作者服务

```typescript
@Injectable()
export class WorkAuthorService extends EnhancedBaseRepositoryService<'WorkAuthor'> {
  protected readonly modelName = 'WorkAuthor' as const
  
  protected readonly redundantDataConfig: RedundantDataConfig[] = [
    {
      targetTable: 'AuthorStatistics',
      relationField: 'authorId',
      redundantFields: [
        { fieldName: 'totalWorks', operation: 'count' },
        { fieldName: 'totalViews', operation: 'sum', sourceField: 'viewCount' },
        { fieldName: 'maxPopularity', operation: 'max', sourceField: 'popularity' },
      ],
      enableRealTimeSync: true,
    },
  ]
}
```

## 🎛️ 管理功能

### API 接口

系统提供完整的管理 API：

```bash
# 获取注册的服务列表
GET /admin/redundant-data/services

# 获取同步统计信息
GET /admin/redundant-data/statistics

# 获取系统健康状态
GET /admin/redundant-data/health

# 触发指定服务的全量同步
POST /admin/redundant-data/sync/:serviceName

# 触发所有服务的全量同步
POST /admin/redundant-data/sync-all

# 执行数据一致性检查
POST /admin/redundant-data/consistency-check

# 修复数据不一致问题
POST /admin/redundant-data/fix-inconsistencies

# 重置统计信息
POST /admin/redundant-data/reset-statistics
```

### 手动操作

```typescript
// 注入服务
constructor(
  private readonly comicService: WorkComicService,
  private readonly redundantDataManager: RedundantDataManagerService,
) {}

// 手动同步指定分类
await this.comicService.syncCategoryData(categoryId)

// 验证数据一致性
const result = await this.comicService.validateCategoryDataConsistency()

// 全量同步
await this.comicService.fullSyncAllCategoryData()

// 获取系统状态
const health = this.redundantDataManager.getHealthStatus()
```

## 🔍 高级功能

### 1. 事件监听

系统会发送详细的事件，您可以监听这些事件：

```typescript
@OnEvent('redundant-data.WorkComic.create')
handleComicCreated(payload: any) {
  console.log('漫画创建事件:', payload)
}

@OnEvent('redundant-data.*.update')
handleAnyUpdate(payload: any) {
  console.log('任何更新事件:', payload)
}
```

### 2. 自定义同步逻辑

如果需要复杂的同步逻辑，可以重写相关方法：

```typescript
export class CustomComicService extends EnhancedBaseRepositoryService<'WorkComic'> {
  // 重写同步逻辑
  protected async syncRedundantDataAfterCreate(data: any): Promise<void> {
    // 先执行默认同步
    await super.syncRedundantDataAfterCreate(data)
    
    // 添加自定义逻辑
    await this.customSyncLogic(data)
  }
  
  private async customSyncLogic(data: any) {
    // 您的自定义同步逻辑
  }
}
```

### 3. 条件同步

```typescript
protected readonly redundantDataConfig: RedundantDataConfig[] = [
  {
    targetTable: 'WorkCategory',
    relationField: 'categoryId',
    redundantFields: [
      {
        fieldName: 'premiumComicCount',
        operation: 'count',
        whereCondition: {
          isPremium: true,
          status: 'PUBLISHED',
        },
      },
    ],
  },
]
```

## 📊 监控和维护

### 定时任务

系统自动运行以下定时任务：

- **每小时**：全量同步所有服务
- **每天凌晨2点**：数据一致性检查和自动修复

### 监控指标

- 同步成功/失败次数
- 最后同步时间
- 数据一致性状态
- 系统健康状态

### 故障排除

1. **数据不一致**：执行一致性检查和修复
2. **同步失败**：查看统计信息和错误日志
3. **性能问题**：启用批量同步优化
4. **监控异常**：检查健康状态接口

## 🎯 最佳实践

### 1. 配置建议

```typescript
// 推荐配置
protected readonly redundantDataConfig: RedundantDataConfig[] = [
  {
    targetTable: 'WorkCategory',
    relationField: 'categoryId',
    redundantFields: [
      // 基础统计
      { fieldName: 'comicCount', operation: 'count' },
      // 条件统计
      { 
        fieldName: 'publishedCount', 
        operation: 'count',
        whereCondition: { status: 'PUBLISHED' }
      },
      // 聚合统计
      { fieldName: 'totalViews', operation: 'sum', sourceField: 'viewCount' },
    ],
    enableRealTimeSync: true,    // 确保数据及时性
    enableBatchSync: true,       // 优化批量操作性能
  },
]
```

### 2. 性能优化

- 启用批量同步优化
- 合理设置过滤条件
- 避免过于复杂的聚合操作
- 定期执行数据一致性检查

### 3. 错误处理

- 监控同步统计信息
- 设置告警机制
- 定期检查健康状态
- 及时修复数据不一致

## 🔄 迁移指南

如果您之前使用了其他冗余数据同步方案，迁移步骤：

1. **移除旧代码**：删除手动同步逻辑
2. **继承新基类**：改为继承 `EnhancedBaseRepositoryService`
3. **配置同步规则**：设置 `redundantDataConfig`
4. **测试验证**：执行一致性检查
5. **全量同步**：初始化冗余数据

## 📝 总结

这个增强的冗余数据同步系统彻底解决了代码重复问题：

✅ **零代码重复**：所有服务通过继承获得同步能力  
✅ **配置驱动**：通过简单配置即可定义同步规则  
✅ **高度自动化**：自动拦截、同步、监控、修复  
✅ **生产就绪**：完整的错误处理、监控、管理功能  
✅ **易于扩展**：支持自定义同步逻辑和事件监听  

现在，您只需要继承一个基类并配置同步规则，就能让任何服务自动获得强大的冗余数据同步功能，再也不用为每个模块编写重复的代码了！