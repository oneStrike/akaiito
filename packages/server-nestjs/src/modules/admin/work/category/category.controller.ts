import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc, ApiPageDoc } from '@/common/decorators/api-doc.decorator'
import { IdDto } from '@/common/dto/id.dto'
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
  @Put('/status')
  @ApiDoc({
    summary: '批量更新分类状态',
    model: Object,
  })
  async updateStatus(@Body() body: UpdateCategoryStatusDto) {
    return this.categoryService.updateCategoryStatus(body)
  }

  /**
   * 批量更新分类排序
   */
  @Put('/order')
  @ApiDoc({
    summary: '批量更新分类排序',
    model: Object,
  })
  async updateOrder(@Body() body: UpdateCategoryOrderDto) {
    return this.categoryService.updateCategoryOrder(body)
  }

  /**
   * 删除分类
   */
  @Delete('/delete-category/:id')
  @ApiDoc({
    summary: '删除分类',
    model: CategoryDetailResponseDto,
  })
  async delete(@Param() params: IdDto) {
    return this.categoryService.deleteCategory(params.id)
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

  /**
   * 获取分类统计信息
   */
  @Get('/stats')
  @ApiDoc({
    summary: '获取分类统计信息',
    model: CategoryStatsDto,
  })
  async getStats() {
    return this.categoryService.getCategoryStats()
  }

  /**
   * 根据应用类型查询分类
   */
  @Get('/by-type/:applicableContentTypes')
  @ApiDoc({
    summary: '根据应用类型查询分类',
    model: [CategoryPageResponseDto],
  })
  async getByType(
    @Param('applicableContentTypes') applicableContentTypes: string,
  ) {
    return this.categoryService.getCategoriesByType(
      Number(applicableContentTypes),
    )
  }

  /**
   * 搜索分类
   */
  @Get('/search')
  @ApiDoc({
    summary: '搜索分类',
    model: [CategoryPageResponseDto],
  })
  async search(
    @Query('keyword') keyword: string,
    @Query('limit') limit?: string,
  ) {
    return this.categoryService.searchCategories(
      keyword,
      limit ? Number(limit) : undefined,
    )
  }

  /**
   * 获取热门分类
   */
  @Get('/popular')
  @ApiDoc({
    summary: '获取热门分类',
    model: [CategoryPageResponseDto],
  })
  async getPopular(@Query('limit') limit?: string) {
    return this.categoryService.getPopularCategories(
      limit ? Number(limit) : undefined,
    )
  }

  /**
   * 更新分类人气值
   */
  @Put('/popularity')
  @ApiDoc({
    summary: '更新分类人气值',
    model: CategoryDetailResponseDto,
  })
  async updatePopularity(@Body() body: UpdateCategoryPopularityDto) {
    return this.categoryService.updateCategoryPopularity(body)
  }

  /**
   * 更新分类作品数量
   */
  @Put('/count')
  @ApiDoc({
    summary: '更新分类作品数量',
    model: CategoryDetailResponseDto,
  })
  async updateCount(@Body() body: UpdateCategoryCountDto) {
    return this.categoryService.updateCategoryCount(body)
  }
}
