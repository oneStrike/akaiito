import { Module } from '@nestjs/common'
import { WorkComicVersionModule } from '../version/comic-version.module'
import { WorkComicChapterController } from './comic-chapter.controller'
import { WorkComicChapterService } from './comic-chapter.service'

/**
 * 漫画章节管理模块
 * 提供漫画章节相关的功能模块
 */
@Module({
  imports: [WorkComicVersionModule],
  controllers: [WorkComicChapterController],
  providers: [WorkComicChapterService],
  exports: [WorkComicChapterService], // 导出服务供其他模块使用
})
export class WorkComicChapterModule {}
