import { Module } from '@nestjs/common'
import { WorkComicVersionModule } from '../version/comic-version.module'
import { WorkComicController } from './comic.controller'
import { WorkComicService } from './comic.service'

/**
 * 漫画模块
 * 提供漫画管理的完整功能
 */
@Module({
  imports: [WorkComicVersionModule],
  controllers: [WorkComicController],
  providers: [WorkComicService],
  exports: [WorkComicService],
})
export class WorkComicModule {}
