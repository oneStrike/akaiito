import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger'
import {
  ValidateBoolean,
  ValidateNumber,
  ValidateString,
} from '@/common/decorators/validate.decorator'
import { IdDto } from '@/common/dto/id.dto'
import { PageDto } from '@/common/dto/page.dto'

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
  illustrationCount!: number

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
  contentTypes!: number

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
  'illustrationCount',
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
      'illustrationCount',
    ]),
  ),
  IdDto,
) {}

/**
 * 查询分类 DTO
 */
export class QueryCategoryDto extends IntersectionType(
  PageDto,
  PickType(PartialType(BaseCategoryDto), ['name', 'isEnabled', 'contentTypes']),
) {}
