import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc, ApiPageDoc } from '@/common/decorators/api-doc.decorator'
import { BatchOperationStatusIdsDto } from '@/common/dto/batch.dto'
import { IdDto, IdsDto } from '@/common/dto/id.dto'
import { WorkCategoryService } from './category.service'
import {
  BaseCategoryDto,
  CreateCategoryDto,
  QueryCategoryDto,
  UpdateCategoryDto,
} from './dto/category.dto'

/**
 * 分类管理控制器
 * 提供分类相关的 RESTful API 接口
 */
@ApiTags('分类管理模块')
@Controller('admin/work/category')
export class WorkCategoryController {
  constructor(private readonly categoryService: WorkCategoryService) {}

  /**
   * 创建分类
   */
  @Post('/create-category')
  @ApiDoc({
    summary: '创建分类',
    model: IdDto,
  })
  async create(@Body() body: CreateCategoryDto) {
    return this.categoryService.createCategory(body)
  }

  /**
   * 分页查询分类列表
   */
  @Get('/category-page')
  @ApiPageDoc({
    summary: '分页查询分类列表',
    model: BaseCategoryDto,
  })
  async getPage(@Query() query: QueryCategoryDto) {
    return this.categoryService.getCategoryPage(query)
  }

  /**
   * 获取分类详情
   */
  @Get('/category-detail')
  @ApiDoc({
    summary: '获取分类详情',
    model: BaseCategoryDto,
  })
  async getDetail(@Query() query: IdDto) {
    return this.categoryService.getCategoryDetail(query.id)
  }

  /**
   * 更新分类信息
   */
  @Put('/update-category')
  @ApiDoc({
    summary: '更新分类信息',
    model: IdDto,
  })
  async update(@Body() body: UpdateCategoryDto) {
    return this.categoryService.updateCategory(body)
  }

  /**
   * 批量更新分类状态
   */
  @Put('/batch-update-category-status')
  @ApiDoc({
    summary: '批量更新分类状态',
    model: IdsDto,
  })
  async updateStatus(@Body() body: BatchOperationStatusIdsDto) {
    return this.categoryService.updateCategoryStatus(body)
  }

  /**
   * 批量删除分类
   */
  @Delete('/delete-batch')
  @ApiDoc({
    summary: '批量删除分类',
    model: Object,
  })
  async deleteBatch(@Body() body: { ids: number[] }) {
    return this.categoryService.deleteCategoryBatch(body.ids)
  }
}
