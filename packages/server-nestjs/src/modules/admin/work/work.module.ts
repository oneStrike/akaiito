import { Module } from '@nestjs/common'
import { WorkAuthorModule } from './author/author.module'
import { WorkCategoryModule } from './category/category.module'
import { ComicModule } from './comic/comic.module'

/**
 * 作品管理主模块
 * 统一管理作品相关的子模块
 */
@Module({
  imports: [
    WorkAuthorModule,
    WorkCategoryModule,
    ComicModule,
  ],
  exports: [
    WorkAuthorModule,
    WorkCategoryModule,
    ComicModule,
  ],
})
export class WorkModule {}
