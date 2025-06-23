import { Module } from '@nestjs/common'
import { WorkCategoryController } from './category.controller'
import { WorkCategoryService } from './category.service'

/**
 * 分类管理模块
 * 提供分类相关的功能和服务
 */
@Module({
  controllers: [WorkCategoryController],
  providers: [WorkCategoryService],
  exports: [WorkCategoryService],
})
export class WorkCategoryModule {}
