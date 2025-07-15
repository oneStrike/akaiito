import { Module } from '@nestjs/common'
import { WorkAuthorModule } from './author/author.module'
import { WorkCategoryModule } from './category/category.module'
import { ComicModule } from './comic/comic.module'
import { WorkComicThirdPartyModule } from './comic/third-party/third-party.module'

/**
 * 作品管理主模块
 * 统一管理作品相关的子模块
 */
@Module({
  imports: [
    WorkAuthorModule,
    WorkCategoryModule,
    ComicModule,
    WorkComicThirdPartyModule,
  ],
  exports: [
    WorkAuthorModule,
    WorkCategoryModule,
    ComicModule,
    WorkComicThirdPartyModule,
  ],
})
export class WorkModule {}
