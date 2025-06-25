import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc, ApiPageDoc } from '@/common/decorators/api-doc.decorator'
import { BatchOperationStatusIdsDto } from '@/common/dto/batch.dto'
import { IdDto } from '@/common/dto/id.dto'
import { WorkAuthorService } from './author.service'
import {
  AuthorDetailResponseDto,
  AuthorPageResponseDto,
  BaseAuthorDto,
  CreateAuthorDto,
  QueryAuthorDto,
  UpdateAuthorDto,
  UpdateAuthorFeaturedDto,
} from './dto/author.dto'

/**
 * 作者管理控制器
 * 提供作者相关的API接口
 */
@ApiTags('作者管理模块')
@Controller('admin/work/author')
export class WorkAuthorController {
  constructor(private readonly authorService: WorkAuthorService) {}

  /**
   * 创建作者
   */
  @Post('/create-author')
  @ApiDoc({
    summary: '创建作者',
    model: IdDto,
  })
  async create(@Body() body: CreateAuthorDto) {
    return this.authorService.createAuthor(body)
  }

  /**
   * 分页查询作者列表
   */
  @Get('/author-page')
  @ApiPageDoc({
    summary: '分页查询作者列表',
    model: AuthorPageResponseDto,
  })
  async getPage(@Query() query: QueryAuthorDto) {
    return this.authorService.getAuthorPage(query)
  }

  /**
   * 获取作者详情
   */
  @Get('/author-detail')
  @ApiDoc({
    summary: '获取作者详情',
    model: AuthorDetailResponseDto,
  })
  async getDetail(@Query() query: IdDto) {
    return this.authorService.getAuthorDetail(query.id)
  }

  /**
   * 更新作者信息
   */
  @Put('/update-author')
  @ApiDoc({
    summary: '更新作者信息',
    model: BaseAuthorDto,
  })
  async update(@Body() body: UpdateAuthorDto) {
    return this.authorService.updateAuthor(body)
  }

  /**
   * 批量更新作者状态
   */
  @Put('/batch-update-author-status')
  @ApiDoc({
    summary: '批量更新作者状态',
    model: { count: 'number' },
  })
  async updateStatus(@Body() body: BatchOperationStatusIdsDto) {
    return this.authorService.updateAuthorStatus(body)
  }

  /**
   * 批量更新作者推荐状态
   */
  @Put('/batch-update-author-featured')
  @ApiDoc({
    summary: '批量更新作者推荐状态',
    model: { count: 'number' },
  })
  async updateFeatured(@Body() body: UpdateAuthorFeaturedDto) {
    return this.authorService.updateAuthorFeatured(body)
  }

  /**
   * 软删除作者
   */
  @Post('/delete-author')
  @ApiDoc({
    summary: '软删除作者',
    model: IdDto,
  })
  async delete(@Body() body: IdDto) {
    return this.authorService.deleteAuthor(body.id)
  }
}
