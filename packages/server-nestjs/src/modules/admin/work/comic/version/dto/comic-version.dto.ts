import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger'
import {
  ValidateBoolean,
  ValidateDate,
  ValidateEnum,
  ValidateNumber,
  ValidateNumberArray,
  ValidateString,
} from '@/common/decorators/validate.decorator'
import { BatchOperationStatusIdsDto } from '@/common/dto/batch.dto'
import { IdDto } from '@/common/dto/id.dto'
import { PageDto } from '@/common/dto/page.dto'
import { VersionReadRuleEnum } from '../comic-version.constant'

/**
 * 漫画版本基础DTO
 */
export class BaseComicVersionDto {
  @ValidateNumber({
    description: '版本ID',
    example: 1,
    required: true,
    min: 1,
  })
  id!: number

  @ValidateNumber({
    description: '关联的原始漫画ID',
    example: 1,
    required: true,
    min: 1,
  })
  comicId!: number

  @ValidateString({
    description: '版本名称（如：英语版、日语版、XX汉化组等）',
    example: '中文版',
    required: true,
    maxLength: 100,
  })
  versionName!: string

  @ValidateString({
    description: '语言代码（如：zh-CN, en-US, ja-JP）',
    example: 'zh-CN',
    required: true,
    maxLength: 10,
  })
  language!: string

  @ValidateString({
    description: '翻译组/汉化组名称',
    example: '某某汉化组',
    required: false,
    maxLength: 100,
  })
  translatorGroup?: string

  @ValidateString({
    description: '版本描述',
    example: '高质量中文翻译版本',
    required: false,
  })
  description?: string

  @ValidateBoolean({
    description: '是否为推荐版本',
    example: true,
    required: true,
    default: false,
  })
  isRecommended!: boolean

  @ValidateBoolean({
    description: '是否启用',
    example: true,
    required: true,
    default: true,
  })
  isEnabled!: boolean

  @ValidateBoolean({
    description: '发布状态',
    example: true,
    required: true,
    default: false,
  })
  isPublished!: boolean

  @ValidateDate({
    description: '发布时间',
    example: '2024-01-01T00:00:00.000Z',
    required: false,
  })
  publishAt?: Date

  @ValidateDate({
    description: '最后更新时间',
    example: '2024-01-01T00:00:00.000Z',
    required: false,
  })
  lastUpdated?: Date

  @ValidateNumber({
    description: '总阅读次数',
    example: 1000,
    required: true,
    min: 0,
    default: 0,
  })
  totalViews!: number

  @ValidateNumber({
    description: '收藏数',
    example: 100,
    required: true,
    min: 0,
    default: 0,
  })
  favoriteCount!: number

  @ValidateNumber({
    description: '点赞数',
    example: 50,
    required: true,
    min: 0,
    default: 0,
  })
  likeCount!: number

  @ValidateNumber({
    description: '评分（1-10分，保留一位小数）',
    example: 8.5,
    required: false,
    min: 1,
    max: 10,
  })
  rating?: number

  @ValidateNumber({
    description: '评分人数',
    example: 200,
    required: true,
    min: 0,
    default: 0,
  })
  ratingCount!: number

  @ValidateEnum({
    description: '查看规则（0=所有人, 1=登录用户, 2=会员, 3=积分购买）',
    example: VersionReadRuleEnum.PUBLIC,
    required: true,
    enum: VersionReadRuleEnum,
    default: VersionReadRuleEnum.PUBLIC,
  })
  readRule!: VersionReadRuleEnum

  @ValidateNumber({
    description: '购买需要消耗的金额（分为单位）',
    example: 100,
    required: true,
    min: 0,
    default: 0,
  })
  purchaseAmount!: number

  @ValidateString({
    description: '版权信息',
    example: '版权所有 © 2024',
    required: false,
    maxLength: 500,
  })
  copyright?: string

  @ValidateString({
    description: '免责声明',
    example: '本内容仅供学习交流使用',
    required: false,
  })
  disclaimer?: string

  @ValidateString({
    description: '备注（内部使用）',
    example: '内部备注信息',
    required: false,
    maxLength: 1000,
  })
  remark?: string

  @ValidateNumber({
    description: '排序权重（用于版本列表排序）',
    example: 100,
    required: true,
    min: 0,
    default: 0,
  })
  sortOrder!: number

  @ValidateDate({
    description: '创建时间',
    example: '2024-01-01T00:00:00.000Z',
    required: true,
  })
  createdAt!: Date

  @ValidateDate({
    description: '更新时间',
    example: '2024-01-01T00:00:00.000Z',
    required: true,
  })
  updatedAt!: Date
}

/**
 * 创建漫画版本DTO
 */
export class CreateComicVersionDto extends OmitType(BaseComicVersionDto, [
  'id',
  'totalViews',
  'favoriteCount',
  'likeCount',
  'rating',
  'ratingCount',
  'createdAt',
  'updatedAt',
]) {}

/**
 * 更新漫画版本DTO
 */
export class UpdateComicVersionDto extends IntersectionType(
  PartialType(
    OmitType(BaseComicVersionDto, [
      'id',
      'comicId',
      'totalViews',
      'favoriteCount',
      'likeCount',
      'rating',
      'ratingCount',
      'createdAt',
      'updatedAt',
    ]),
  ),
  IdDto,
) {}

/**
 * 查询漫画版本DTO
 */
export class QueryComicVersionDto extends IntersectionType(
  PageDto,
  PickType(PartialType(BaseComicVersionDto), [
    'comicId',
    'language',
    'translatorGroup',
    'isRecommended',
    'isEnabled',
    'isPublished',
    'readRule',
  ]),
) {
  @ValidateString({
    description: '版本名称（模糊搜索）',
    example: '中文版',
    required: false,
  })
  versionName?: string

  @ValidateNumber({
    description: '漫画ID（精确匹配）',
    example: 1,
    required: false,
    min: 1,
  })
  comicId?: number

  @ValidateString({
    description: '翻译组名称（模糊搜索）',
    example: '汉化组',
    required: false,
  })
  translatorGroup?: string
}

/**
 * 批量更新版本发布状态DTO
 */
export class UpdateVersionPublishStatusDto extends BatchOperationStatusIdsDto {
  @ValidateBoolean({
    description: '发布状态',
    example: true,
    required: true,
  })
  isPublished!: boolean
}

/**
 * 批量更新版本推荐状态DTO
 */
export class UpdateVersionRecommendedStatusDto extends BatchOperationStatusIdsDto {
  @ValidateBoolean({
    description: '推荐状态',
    example: true,
    required: true,
  })
  isRecommended!: boolean
}

/**
 * 批量更新版本启用状态DTO
 */
export class UpdateVersionEnabledStatusDto extends BatchOperationStatusIdsDto {}

/**
 * 批量更新版本查看规则DTO
 */
export class UpdateVersionReadRuleDto {
  @ValidateNumberArray({
    description: '版本ID列表',
    example: [1, 2, 3],
    required: true,
  })
  ids!: number[]

  @ValidateEnum({
    description: '查看规则（0=所有人, 1=登录用户, 2=会员, 3=积分购买）',
    example: VersionReadRuleEnum.PUBLIC,
    required: true,
    enum: VersionReadRuleEnum,
  })
  readRule!: VersionReadRuleEnum
}

/**
 * 漫画版本分页响应DTO
 */
export class ComicVersionPageResponseDto extends OmitType(BaseComicVersionDto, [
  'description',
  'disclaimer',
  'remark',
]) {}

/**
 * 漫画版本详情响应DTO
 */
export class ComicVersionDetailResponseDto extends BaseComicVersionDto {}
