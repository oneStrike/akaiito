import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger'
import {
  ValidateBoolean,
  ValidateNumber,
  ValidateNumberArray,
  ValidateString,
} from '@/common/decorators/validate.decorator'

/**
 * 分类基础 DTO
 */
export class BaseCategoryDto {
  @ValidateNumber({
    description: '分类ID',
    example: 1,
    required: true,
    min: 1,
  })
  id!: number

  @ValidateString({
    description: '分类名称',
    example: '科幻',
    required: true,
    maxLength: 20,
  })
  name!: string

  @ValidateString({
    description: '分类图标URL',
    example: 'https://example.com/icon.png',
    required: false,
    maxLength: 200,
  })
  icon?: string

  @ValidateNumber({
    description: '人气值',
    example: 1000,
    required: false,
    min: 0,
  })
  popularity!: number

  @ValidateNumber({
    description: '辅助人气值',
    example: 500,
    required: false,
    min: 0,
  })
  popularityWeight!: number

  @ValidateNumber({
    description: '排序值',
    example: 1,
    required: false,
    min: 0,
    max: 32767,
  })
  order!: number

  @ValidateNumber({
    description: '小说数量',
    example: 100,
    required: false,
    min: 0,
  })
  novelCount!: number

  @ValidateNumber({
    description: '漫画数量',
    example: 50,
    required: false,
    min: 0,
  })
  comicCount!: number

  @ValidateNumber({
    description: '图片数量',
    example: 200,
    required: false,
    min: 0,
  })
  imageSetCount!: number

  @ValidateNumber({
    description: '插画数量',
    example: 80,
    required: false,
    min: 0,
  })
  artworkCount!: number

  @ValidateBoolean({
    description: '是否启用',
    example: true,
    required: false,
  })
  isEnabled!: boolean

  @ValidateNumber({
    description: '应用类型',
    example: 2,
    required: false,
    min: 1,
    max: 32767,
  })
  applicableContentTypes!: number

  @ValidateString({
    description: '创建时间',
    example: '2024-01-01T00:00:00.000Z',
    required: false,
  })
  createdAt!: string

  @ValidateString({
    description: '更新时间',
    example: '2024-01-01T00:00:00.000Z',
    required: false,
  })
  updatedAt!: string
}

/**
 * 创建分类 DTO
 */
export class CreateCategoryDto extends OmitType(BaseCategoryDto, [
  'id',
  'createdAt',
  'updatedAt',
  'novelCount',
  'comicCount',
  'imageSetCount',
  'artworkCount',
  'popularity',
  'popularityWeight',
]) {}

/**
 * 更新分类 DTO
 */
export class UpdateCategoryDto extends IntersectionType(
  PartialType(
    OmitType(BaseCategoryDto, [
      'id',
      'createdAt',
      'updatedAt',
      'novelCount',
      'comicCount',
      'imageSetCount',
      'artworkCount',
    ]),
  ),
  IdDto,
) {}

/**
 * 查询分类 DTO
 */
export class QueryCategoryDto extends IntersectionType(
  PageDto,
  PickType(PartialType(BaseCategoryDto), [
    'name',
    'isEnabled',
    'applicableContentTypes',
  ]),
) {
  @ValidateString({
    description: '分类名称（模糊搜索）',
    example: '科幻',
    required: false,
  })
  keyword?: string

  @ValidateString({
    description: '排序字段',
    example: 'order',
    required: false,
    enum: ['order', 'popularity', 'novelCount', 'comicCount', 'createdAt'],
  })
  sortBy?: string

  @ValidateString({
    description: '排序方向',
    example: 'asc',
    required: false,
    enum: ['asc', 'desc'],
  })
  sortOrder?: 'asc' | 'desc'
}

/**
 * 批量更新分类状态 DTO
 */
export class UpdateCategoryStatusDto extends PickType(BaseCategoryDto, [
  'isEnabled',
]) {
  @ValidateNumberArray({
    description: '分类ID列表',
    example: [1, 2, 3],
    required: true,
  })
  ids!: number[]
}

/**
 * 批量更新分类排序 DTO
 */
export class UpdateCategoryOrderDto {
  @ValidateNumberArray({
    description: '分类ID列表（按新排序顺序）',
    example: [3, 1, 2],
    required: true,
  })
  ids!: number[]
}

/**
 * 分页响应 DTO
 */
export class CategoryPageResponseDto extends BaseCategoryDto {}

/**
 * 分类详情响应 DTO
 */
export class CategoryDetailResponseDto extends BaseCategoryDto {}

/**
 * 分类统计 DTO
 */
export class CategoryStatsDto {
  @ValidateNumber({
    description: '总分类数',
    example: 50,
    required: true,
  })
  totalCategories!: number

  @ValidateNumber({
    description: '启用分类数',
    example: 40,
    required: true,
  })
  enabledCategories!: number

  @ValidateNumber({
    description: '禁用分类数',
    example: 10,
    required: true,
  })
  disabledCategories!: number

  @ValidateNumber({
    description: '总作品数',
    example: 1000,
    required: true,
  })
  totalWorks!: number

  @ValidateNumber({
    description: '总人气值',
    example: 50000,
    required: true,
  })
  totalPopularity!: number

  @ValidateNumber({
    description: '平均人气值',
    example: 1000,
    required: true,
  })
  averagePopularity!: number
}

/**
 * 分类人气更新 DTO
 */
export class UpdateCategoryPopularityDto extends IdDto {
  @ValidateNumber({
    description: '人气值增量',
    example: 10,
    required: true,
  })
  increment!: number

  @ValidateNumber({
    description: '辅助人气值增量',
    example: 5,
    required: false,
  })
  virtualIncrement?: number
}

/**
 * 分类作品数量更新 DTO
 */
export class UpdateCategoryCountDto extends IdDto {
  @ValidateString({
    description: '作品类型',
    example: 'novel',
    required: true,
    enum: ['novel', 'comic', 'photo', 'illustrator'],
  })
  workType!: 'novel' | 'comic' | 'photo' | 'illustrator'

  @ValidateNumber({
    description: '数量增量（可为负数）',
    example: 1,
    required: true,
  })
  increment!: number
}
