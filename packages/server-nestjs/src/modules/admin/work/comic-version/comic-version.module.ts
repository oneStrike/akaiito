import { Module } from '@nestjs/common'
import { WorkComicVersionController } from './comic-version.controller'
import { WorkComicVersionService } from './comic-version.service'

/**
 * 漫画版本模块
 * 提供漫画版本管理的完整功能
 */
@Module({
  controllers: [WorkComicVersionController],
  providers: [WorkComicVersionService],
  exports: [WorkComicVersionService],
})
export class WorkComicVersionModule {}
