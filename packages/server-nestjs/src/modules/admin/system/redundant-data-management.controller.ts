import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger'
import { RedundantDataManagerService, SyncStatistics, ConsistencyCheckResult } from '@/global/services/redundant-data-manager.service'
import { AdminAuthGuard } from '@/common/guards/admin-auth.guard'
import { AdminPermissionGuard } from '@/common/guards/admin-permission.guard'
import { RequirePermissions } from '@/common/decorators/require-permissions.decorator'

/**
 * 冗余数据管理控制器
 * 提供冗余数据同步的管理接口
 */
@ApiTags('冗余数据管理')
@Controller('admin/redundant-data')
@UseGuards(AdminAuthGuard, AdminPermissionGuard)
export class RedundantDataManagementController {
  constructor(
    private readonly redundantDataManager: RedundantDataManagerService,
  ) {}

  /**
   * 获取所有注册的服务列表
   */
  @Get('services')
  @ApiOperation({ summary: '获取注册的服务列表' })
  @ApiResponse({ status: 200, description: '成功获取服务列表' })
  @RequirePermissions('system:redundant-data:read')
  getRegisteredServices() {
    return {
      success: true,
      data: this.redundantDataManager.getRegisteredServices(),
    }
  }

  /**
   * 获取同步统计信息
   */
  @Get('statistics')
  @ApiOperation({ summary: '获取同步统计信息' })
  @ApiResponse({ status: 200, description: '成功获取统计信息' })
  @ApiQuery({ name: 'serviceName', required: false, description: '服务名称，不传则返回所有服务的统计' })
  @RequirePermissions('system:redundant-data:read')
  getSyncStatistics(@Query('serviceName') serviceName?: string) {
    const statistics = this.redundantDataManager.getSyncStatistics(serviceName)
    
    if (serviceName && !statistics) {
      return {
        success: false,
        message: `服务 ${serviceName} 不存在`,
      }
    }

    return {
      success: true,
      data: serviceName ? statistics : Object.fromEntries(statistics as Map<string, SyncStatistics>),
    }
  }

  /**
   * 获取系统健康状态
   */
  @Get('health')
  @ApiOperation({ summary: '获取系统健康状态' })
  @ApiResponse({ status: 200, description: '成功获取健康状态' })
  @RequirePermissions('system:redundant-data:read')
  getHealthStatus() {
    return {
      success: true,
      data: this.redundantDataManager.getHealthStatus(),
    }
  }

  /**
   * 手动触发指定服务的全量同步
   */
  @Post('sync/:serviceName')
  @ApiOperation({ summary: '触发指定服务的全量同步' })
  @ApiParam({ name: 'serviceName', description: '服务名称' })
  @ApiResponse({ status: 200, description: '同步成功' })
  @ApiResponse({ status: 400, description: '服务不存在或同步失败' })
  @HttpCode(HttpStatus.OK)
  @RequirePermissions('system:redundant-data:sync')
  async triggerServiceSync(@Param('serviceName') serviceName: string) {
    try {
      await this.redundantDataManager.triggerFullSync(serviceName)
      return {
        success: true,
        message: `服务 ${serviceName} 同步完成`,
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : '同步失败',
      }
    }
  }

  /**
   * 触发所有服务的全量同步
   */
  @Post('sync-all')
  @ApiOperation({ summary: '触发所有服务的全量同步' })
  @ApiResponse({ status: 200, description: '同步成功' })
  @ApiResponse({ status: 400, description: '同步失败' })
  @HttpCode(HttpStatus.OK)
  @RequirePermissions('system:redundant-data:sync')
  async triggerFullSyncAll() {
    try {
      await this.redundantDataManager.triggerFullSyncAll()
      return {
        success: true,
        message: '所有服务同步完成',
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : '同步失败',
      }
    }
  }

  /**
   * 执行数据一致性检查
   */
  @Post('consistency-check')
  @ApiOperation({ summary: '执行数据一致性检查' })
  @ApiResponse({ status: 200, description: '检查完成' })
  @HttpCode(HttpStatus.OK)
  @RequirePermissions('system:redundant-data:check')
  async performConsistencyCheck() {
    try {
      const result = await this.redundantDataManager.performConsistencyCheck()
      return {
        success: true,
        data: result,
        message: result.inconsistencies.length === 0 
          ? '所有数据一致' 
          : `发现 ${result.inconsistencies.length} 个不一致问题`,
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : '检查失败',
      }
    }
  }

  /**
   * 修复数据不一致问题
   */
  @Post('fix-inconsistencies')
  @ApiOperation({ summary: '修复数据不一致问题' })
  @ApiResponse({ status: 200, description: '修复完成' })
  @ApiQuery({ 
    name: 'services', 
    required: false, 
    description: '要修复的服务名称，多个用逗号分隔，不传则修复所有服务' 
  })
  @HttpCode(HttpStatus.OK)
  @RequirePermissions('system:redundant-data:fix')
  async fixInconsistencies(@Query('services') services?: string) {
    try {
      const serviceNames = services ? services.split(',').map(s => s.trim()) : undefined
      await this.redundantDataManager.fixInconsistencies(serviceNames)
      
      return {
        success: true,
        message: serviceNames 
          ? `服务 ${serviceNames.join(', ')} 修复完成` 
          : '所有服务修复完成',
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : '修复失败',
      }
    }
  }

  /**
   * 重置统计信息
   */
  @Post('reset-statistics')
  @ApiOperation({ summary: '重置统计信息' })
  @ApiResponse({ status: 200, description: '重置成功' })
  @ApiQuery({ name: 'serviceName', required: false, description: '服务名称，不传则重置所有服务的统计' })
  @HttpCode(HttpStatus.OK)
  @RequirePermissions('system:redundant-data:manage')
  resetStatistics(@Query('serviceName') serviceName?: string) {
    this.redundantDataManager.resetStatistics(serviceName)
    
    return {
      success: true,
      message: serviceName 
        ? `服务 ${serviceName} 统计信息已重置` 
        : '所有服务统计信息已重置',
    }
  }

  /**
   * 获取冗余数据同步配置信息
   */
  @Get('config')
  @ApiOperation({ summary: '获取冗余数据同步配置信息' })
  @ApiResponse({ status: 200, description: '成功获取配置信息' })
  @RequirePermissions('system:redundant-data:read')
  getConfigInfo() {
    return {
      success: true,
      data: {
        description: '冗余数据同步系统配置',
        features: [
          '自动实时同步：数据变更时自动触发同步',
          '批量同步优化：批量操作时优化同步性能',
          '定时全量同步：每小时执行一次全量同步',
          '数据一致性检查：每天凌晨2点自动检查',
          '自动修复：发现不一致时自动修复',
          '监控统计：记录同步成功/失败次数',
          '健康检查：提供系统健康状态',
        ],
        supportedOperations: [
          'count - 计数操作',
          'sum - 求和操作',
          'avg - 平均值操作',
          'max - 最大值操作',
          'min - 最小值操作',
        ],
        scheduledTasks: [
          {
            name: '定时全量同步',
            schedule: '每小时执行一次',
            description: '确保数据同步的及时性',
          },
          {
            name: '数据一致性检查',
            schedule: '每天凌晨2点执行',
            description: '检查并自动修复数据不一致问题',
          },
        ],
      },
    }
  }

  /**
   * 获取使用指南
   */
  @Get('guide')
  @ApiOperation({ summary: '获取使用指南' })
  @ApiResponse({ status: 200, description: '成功获取使用指南' })
  @RequirePermissions('system:redundant-data:read')
  getUsageGuide() {
    return {
      success: true,
      data: {
        title: '冗余数据同步系统使用指南',
        quickStart: [
          '1. 继承 EnhancedBaseRepositoryService 类',
          '2. 配置 redundantDataConfig 属性',
          '3. 在构造函数中注册到 RedundantDataManagerService',
          '4. 正常使用 CRUD 方法，系统会自动同步',
        ],
        configExample: {
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
        bestPractices: [
          '启用实时同步以确保数据及时性',
          '启用批量同步优化以提高性能',
          '定期检查数据一致性',
          '监控同步统计信息',
          '在数据迁移后执行全量同步',
        ],
        troubleshooting: [
          '如果发现数据不一致，可以执行一致性检查',
          '使用修复功能自动修复不一致问题',
          '查看统计信息了解同步成功率',
          '检查健康状态确保系统正常运行',
        ],
      },
    }
  }
}