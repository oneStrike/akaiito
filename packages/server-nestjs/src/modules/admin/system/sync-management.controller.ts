import { Controller, Get, Post, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { SyncManagerService } from '@/global/services/sync-manager.service'

/**
 * 简化的冗余数据同步管理控制器
 */
@ApiTags('系统管理 - 数据同步')
@Controller('admin/system/sync')
export class SyncManagementController {
  constructor(private readonly syncManager: SyncManagerService) {}

  /**
   * 获取同步统计信息
   */
  @Get('stats')
  @ApiOperation({ summary: '获取同步统计信息' })
  @ApiResponse({ status: 200, description: '统计信息获取成功' })
  getSyncStats() {
    return {
      success: true,
      data: this.syncManager.getSyncStats()
    }
  }

  /**
   * 获取系统健康状态
   */
  @Get('health')
  @ApiOperation({ summary: '获取系统健康状态' })
  @ApiResponse({ status: 200, description: '健康状态获取成功' })
  getHealthStatus() {
    return {
      success: true,
      data: this.syncManager.getHealthStatus()
    }
  }

  /**
   * 手动触发全量同步
   */
  @Post('trigger')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '手动触发全量同步' })
  @ApiResponse({ status: 200, description: '同步触发成功' })
  async triggerSync() {
    const result = await this.syncManager.triggerFullSync()
    return {
      success: result.success,
      message: result.success ? '同步完成' : '部分同步失败',
      data: result.results
    }
  }

  /**
   * 重置统计信息
   */
  @Post('reset-stats')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '重置统计信息' })
  @ApiResponse({ status: 200, description: '重置成功' })
  resetStats() {
    this.syncManager.resetStats()
    return {
      success: true,
      message: '统计信息已重置'
    }
  }

  /**
   * 获取使用指南
   */
  @Get('guide')
  @ApiOperation({ summary: '获取使用指南' })
  @ApiResponse({ status: 200, description: '指南获取成功' })
  getUsageGuide() {
    return {
      success: true,
      data: {
        title: '冗余数据同步使用指南',
        description: '使用 @SyncRedundantData 装饰器实现自动同步',
        example: {
          code: `
@Injectable()
@SyncRedundantData([
  {
    target: 'workCategory',
    relation: 'categoryId',
    fields: [
      { name: 'comicCount', op: 'count' },
      { name: 'totalPopularity', op: 'sum', source: 'popularity' }
    ]
  }
])
export class WorkComicService extends BaseRepositoryService<'workComic'> {
  // 服务实现...
}
          `,
          explanation: [
            '1. 在服务类上添加 @SyncRedundantData 装饰器',
            '2. 配置目标表、关联字段和同步字段',
            '3. 支持 count、sum、avg、max、min 操作',
            '4. 自动拦截 CRUD 操作并同步数据',
            '5. 无需修改现有代码逻辑'
          ]
        },
        features: [
          '零代码侵入：只需添加装饰器',
          '自动同步：拦截所有 CRUD 操作',
          '灵活配置：支持多种聚合操作',
          '性能优化：批量操作和事件驱动',
          '监控管理：提供统计和健康检查'
        ],
        apis: [
          'GET /admin/system/sync/stats - 获取统计信息',
          'GET /admin/system/sync/health - 获取健康状态',
          'POST /admin/system/sync/trigger - 手动触发同步',
          'POST /admin/system/sync/reset-stats - 重置统计'
        ]
      }
    }
  }
}