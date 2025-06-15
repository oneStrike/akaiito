import { Module } from '@nestjs/common'
import { MaxMindModule as CommonMaxMindModule } from '../../../common/module/maxmind/maxmind.module'
import { MaxMindController } from './maxmind.controller'

/**
 * MaxMind管理模块
 * 提供MaxMind数据库管理功能
 */
@Module({
  imports: [CommonMaxMindModule],
  controllers: [MaxMindController],
})
export class AdminMaxMindModule {}