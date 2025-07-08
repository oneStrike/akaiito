import { Module } from '@nestjs/common'
import { WorkComicChapterModule } from './chapter/comic-chapter.module'
import { WorkComicModule } from './core/comic.module'
import { WorkComicVersionModule } from './version/comic-version.module'

/**
 * 漫画管理模块
 * 统一管理漫画相关的所有子模块
 */
@Module({
  imports: [
    WorkComicModule, // 漫画核心模块
    WorkComicChapterModule, // 漫画章节模块
    WorkComicVersionModule, // 漫画版本模块
  ],
  exports: [WorkComicModule, WorkComicChapterModule, WorkComicVersionModule],
})
export class ComicModule {}
