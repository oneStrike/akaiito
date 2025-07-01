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
import { IdDto } from '@/common/dto/id.dto'
import { PageDto } from '@/common/dto/page.dto'
import {
  ComicCommentPermissionEnum,
  ComicDownloadPermissionEnum,
  ComicPublishStatusEnum,
  ComicReadRuleEnum,
  ComicSerialStatusEnum,
} from '../comic.constant'

/**
 * 漫画基础DTO
 */
export class BaseComicDto {
  @ValidateNumber({
    description: '漫画ID',
    example: 1,
    required: true,
    min: 1,
  })
  id!: number

  @ValidateString({
    description: '漫画名称',
    example: '进击的巨人',
    required: true,
    maxLength: 100,
  })
  name!: string

  @ValidateString({
    description: '漫画别名（支持多别名，用逗号分隔）',
    example: 'Attack on Titan,進撃の巨人',
    required: false,
    maxLength: 200,
  })
  alias?: string

  @ValidateString({
    description: '漫画封面URL',
    example: 'https://example.com/cover.jpg',
    required: true,
    maxLength: 500,
  })
  cover!: string

  @ValidateNumber({
    description: '热度值（用于排序）',
    example: 1000,
    required: true,
    min: 0,
    default: 0,
  })
  popularity!: number

  @ValidateNumber({
    description: '虚拟热度热度权重（影响热度计算）',
    example: 1.0,
    required: true,
    min: 0,
    default: 1.0,
  })
  popularityWeight!: number

  @ValidateString({
    description: '语言代码',
    example: 'en',
    required: true,
  })
  language!: string

  @ValidateString({
    description: '地区代码',
    example: 'CN',
    required: true,
  })
  region!: string

  @ValidateString({
    description: '年龄分级',
    example: 'R14',
    required: true,
  })
  ageRating!: string

  @ValidateEnum({
    description: '发布状态',
    example: ComicPublishStatusEnum.PUBLISHED,
    required: true,
    enum: ComicPublishStatusEnum,
    default: ComicPublishStatusEnum.DRAFT,
  })
  publishStatus!: ComicPublishStatusEnum

  @ValidateDate({
    description: '发布日期',
    example: '2024-01-01T00:00:00.000Z',
    required: false,
  })
  publishedAt?: Date

  @ValidateString({
    description: '漫画简介',
    example: '这是一部关于巨人的漫画...',
    required: true,
  })
  description: string

  @ValidateString({
    description: '出版社',
    example: '讲谈社',
    required: false,
    maxLength: 100,
  })
  publisher?: string

  @ValidateString({
    description: '原始来源',
    example: '官方授权',
    required: false,
    maxLength: 100,
  })
  originalSource?: string

  @ValidateEnum({
    description: '连载状态',
    example: ComicSerialStatusEnum.SERIALIZING,
    required: true,
    enum: ComicSerialStatusEnum,
    default: ComicSerialStatusEnum.SERIALIZING,
  })
  serialStatus!: ComicSerialStatusEnum

  @ValidateBoolean({
    description: '是否完结',
    example: false,
    required: true,
    default: false,
  })
  isFinished!: boolean

  @ValidateEnum({
    description: '下载权限',
    example: ComicDownloadPermissionEnum.ALLOWED,
    required: true,
    enum: ComicDownloadPermissionEnum,
    default: ComicDownloadPermissionEnum.FORBIDDEN,
  })
  downloadPermission!: ComicDownloadPermissionEnum

  @ValidateEnum({
    description: '评论权限',
    example: ComicCommentPermissionEnum.ALLOWED,
    required: true,
    enum: ComicCommentPermissionEnum,
    default: ComicCommentPermissionEnum.ALLOWED,
  })
  commentPermission!: ComicCommentPermissionEnum

  @ValidateEnum({
    description: '阅读规则',
    example: ComicReadRuleEnum.FREE,
    required: true,
    enum: ComicReadRuleEnum,
    default: ComicReadRuleEnum.FREE,
  })
  readRule!: ComicReadRuleEnum

  @ValidateNumber({
    description: '购买金额（分为单位）',
    example: 1000,
    required: false,
    min: 0,
  })
  purchaseAmount?: number

  @ValidateNumber({
    description: '总章节数',
    example: 100,
    required: true,
    min: 0,
    default: 0,
  })
  totalChapters!: number

  @ValidateNumber({
    description: '总阅读次数',
    example: 10000,
    required: true,
    min: 0,
    default: 0,
  })
  totalViews!: number

  @ValidateNumber({
    description: '收藏数',
    example: 500,
    required: true,
    min: 0,
    default: 0,
  })
  favoriteCount!: number

  @ValidateNumber({
    description: '评论总数',
    example: 200,
    required: true,
    min: 0,
    default: 0,
  })
  commentCount!: number

  @ValidateNumber({
    description: '点赞总数',
    example: 1000,
    required: true,
    min: 0,
    default: 0,
  })
  likeCount!: number

  @ValidateNumber({
    description: '评分（1-10分，保留1位小数）',
    example: 8.5,
    required: false,
    min: 0,
    max: 10,
  })
  rating?: number

  @ValidateNumber({
    description: '评分人数',
    example: 100,
    required: true,
    min: 0,
    default: 0,
  })
  ratingCount!: number

  @ValidateString({
    description: 'SEO标题',
    example: '进击的巨人 - 热门漫画在线阅读',
    required: false,
    maxLength: 100,
  })
  seoTitle?: string

  @ValidateString({
    description: 'SEO描述',
    example: '进击的巨人是一部精彩的漫画作品...',
    required: false,
    maxLength: 200,
  })
  seoDescription?: string

  @ValidateString({
    description: 'SEO关键词',
    example: '进击的巨人,漫画,在线阅读',
    required: false,
    maxLength: 200,
  })
  seoKeywords?: string

  @ValidateNumber({
    description: '推荐权重（影响推荐排序）',
    example: 1.0,
    required: true,
    min: 0,
    default: 1.0,
  })
  recommendWeight!: number

  @ValidateBoolean({
    description: '是否推荐',
    example: false,
    required: true,
    default: false,
  })
  isRecommended!: boolean

  @ValidateBoolean({
    description: '是否热门',
    example: false,
    required: true,
    default: false,
  })
  isHot!: boolean

  @ValidateBoolean({
    description: '是否新作',
    example: true,
    required: true,
    default: false,
  })
  isNew!: boolean

  @ValidateString({
    description: '版权信息',
    example: '© 2024 作者名',
    required: false,
    maxLength: 200,
  })
  copyright?: string

  @ValidateString({
    description: '免责声明',
    example: '本作品仅供娱乐，不代表任何立场',
    required: false,
  })
  disclaimer?: string

  @ValidateString({
    description: '管理员备注',
    example: '优质漫画，推荐首页展示',
    required: false,
  })
  remark?: string

  @ValidateDate({
    description: '软删除时间',
    example: null,
    required: false,
  })
  deletedAt?: Date | null

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
 * 创建漫画DTO
 */
export class CreateComicDto extends OmitType(BaseComicDto, [
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt',
  'totalChapters',
  'totalViews',
  'favoriteCount',
  'commentCount',
  'likeCount',
  'ratingCount',
  'isRecommended',
  'isHot',
  'isNew',
]) {}

/**
 * 更新漫画DTO
 */
export class UpdateComicDto extends IntersectionType(
  PartialType(
    OmitType(BaseComicDto, [
      'id',
      'createdAt',
      'updatedAt',
      'deletedAt',
      'totalViews',
      'favoriteCount',
      'commentCount',
      'likeCount',
      'ratingCount',
    ]),
  ),
  IdDto,
) {}

/**
 * 查询漫画DTO
 */
export class QueryComicDto extends IntersectionType(
  PageDto,
  PickType(PartialType(BaseComicDto), [
    'name',
    'publishStatus',
    'serialStatus',
    'language',
    'region',
    'ageRating',
    'readRule',
    'isFinished',
    'isRecommended',
    'isHot',
    'isNew',
  ]),
) {
  @ValidateString({
    description: '漫画名称（模糊搜索）',
    example: '进击',
    required: false,
  })
  name?: string

  @ValidateString({
    description: '出版社（模糊搜索）',
    example: '讲谈社',
    required: false,
  })
  publisher?: string

  @ValidateString({
    description: '标签搜索',
    example: '热血',
    required: false,
  })
  tag?: string
}

/**
 * 更新漫画推荐状态DTO
 */
export class UpdateComicRecommendedDto extends PickType(BaseComicDto, [
  'isRecommended',
]) {
  @ValidateNumberArray({
    description: '漫画ID列表',
    example: [1, 2, 3],
    required: true,
  })
  ids!: number[]
}

/**
 * 更新漫画热门状态DTO
 */
export class UpdateComicHotDto extends PickType(BaseComicDto, ['isHot']) {
  @ValidateNumberArray({
    description: '漫画ID列表',
    example: [1, 2, 3],
    required: true,
  })
  ids!: number[]
}

/**
 * 更新漫画新作状态DTO
 */
export class UpdateComicNewDto extends PickType(BaseComicDto, ['isNew']) {
  @ValidateNumberArray({
    description: '漫画ID列表',
    example: [1, 2, 3],
    required: true,
  })
  ids!: number[]
}

/**
 * 批量操作状态DTO
 */
export class BatchOperationStatusIdsDto {
  @ValidateNumberArray({
    description: 'ID列表',
    example: [1, 2, 3],
    required: true,
  })
  ids!: number[]

  @ValidateEnum({
    description: '发布状态',
    example: ComicPublishStatusEnum.PUBLISHED,
    required: true,
    enum: ComicPublishStatusEnum,
  })
  publishStatus!: ComicPublishStatusEnum
}
