import { Global, Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { SyncManagerService } from '../services/sync-manager.service'
import { SyncManagementController } from '@/modules/admin/system/sync-management.controller'

/**
 * 简化的冗余数据同步模块
 * 使用装饰器模式，大幅降低复杂度
 */
@Global()
@Module({
  imports: [
    // 定时任务支持
    ScheduleModule.forRoot(),
    // 事件系统支持
    EventEmitterModule.forRoot({
      maxListeners: 10,
      wildcard: false
    })
  ],
  providers: [SyncManagerService],
  controllers: [SyncManagementController],
  exports: [SyncManagerService]
})
export class SimpleSyncModule {}