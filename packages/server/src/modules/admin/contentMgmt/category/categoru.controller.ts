import { BasicIdDto, BasicIdStatusDto } from '@/basic/dto/basic.dto'
import { CategoryService } from '@/modules/admin/contentMgmt/category/category.service'
import {
  CategoryListDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@/modules/admin/contentMgmt/category/dto/category.dto'
import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'

@Controller('/admin/contentMgmt/category')
export class CategoryController {
  @Inject()
  categoryService: CategoryService

  @Get('/getCategoryPage', { summary: '获取内容分类' })
  async getCategoryPage(@Query() params: CategoryListDto) {
    console.log(params)
    return this.categoryService.findPage({
      ...params,
      fuzzy: ['name'],
    })
  }

  @Post('/createCategory', { summary: '创建内容分类' })
  async createCategory(@Body() body: CreateCategoryDto) {
    return this.categoryService.create(body)
  }

  @Post('/updateCategory', { summary: '更新内容分类' })
  async updateCategory(@Body() body: UpdateCategoryDto) {
    return this.categoryService.update({ id: body.id }, body)
  }

  @Post('/updateCategoryStatus', { summary: '更新内容分类状态' })
  async updateCategoryStatus(@Body() body: BasicIdStatusDto) {
    return this.categoryService.update({ id: body.id }, body)
  }

  @Post('/deleteCategory', { summary: '删除内容分类' })
  async deleteCategory(@Body() body: BasicIdDto) {
    return this.categoryService.delete({ id: body.id })
  }
}
