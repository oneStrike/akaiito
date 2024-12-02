import { BasicIdDTO, BasicIdStatusDTO } from '@/basic/dto/basic.dto'
import { CategoryService } from '@/service/contentMgmt/category.service'
import {
  CategoryListDTO,
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from '@/modules/admin/contentMgmt/category/dto/category.dto'
import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'

@Controller('/admin/contentMgmt/category')
export class CategoryController {
  @Inject()
  categoryService: CategoryService

  @Get('/getCategoryPage', { summary: '获取内容分类' })
  async getCategoryPage(@Query() params: CategoryListDTO) {
    return this.categoryService.findPage({
      where: params,
      like: {
        name: 'contains',
      },
    })
  }

  @Post('/createCategory', { summary: '创建内容分类' })
  async createCategory(@Body() body: CreateCategoryDTO) {
    return this.categoryService.create({ data: body })
  }

  @Post('/updateCategory', { summary: '更新内容分类' })
  async updateCategory(@Body() body: UpdateCategoryDTO) {
    return this.categoryService.update({ where: { id: body.id }, data: body })
  }

  @Post('/updateCategoryStatus', { summary: '更新内容分类状态' })
  async updateCategoryStatus(@Body() body: BasicIdStatusDTO) {
    return this.categoryService.update({ where: { id: body.id }, data: body })
  }

  @Post('/deleteCategory', { summary: '删除内容分类' })
  async deleteCategory(@Body() body: BasicIdDTO) {
    return this.categoryService.delete({ where: { id: body.id } })
  }
}
