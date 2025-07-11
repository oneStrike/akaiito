import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger'
import {
  ValidateArray,
  ValidateBoolean,
  ValidateDate,
  ValidateEnum,
  ValidateNumber,
  ValidateString,
} from '@/common/decorators/validate.decorator'
import { IdDto } from '@/common/dto/id.dto'
import { PageDto } from '@/common/dto/page.dto'
import { ChapterReadRuleEnum } from '../comic-chapter.constant'

/**
 * 漫画章节基础DTO
 */
export class BaseComicChapterDto {
  @ValidateNumber({
    description: '章节ID',
    example: 1,
    required: true,
    min: 1,
  })
  id!: number

  @ValidateString({
    description: '章节标题',
    example: '第一话：开始的故事',
    required: true,
    maxLength: 100,
  })
  title!: string

  @ValidateString({
    description: '章节副标题或描述',
    example: '主角的冒险开始了',
    required: false,
    maxLength: 200,
  })
  subtitle?: string

  @ValidateBoolean({
    description: '发布状态（true: 已发布, false: 未发布）',
    example: true,
    required: true,
    default: false,
  })
  isPublished!: boolean

  @ValidateNumber({
    description: '关联的漫画ID',
    example: 1,
    required: true,
    min: 1,
  })
  comicId!: number

  @ValidateNumber({
    description: '关联的漫画版本ID',
    example: 1,
    required: false,
    min: 1,
  })
  versionId?: number

  @ValidateNumber({
    description: '章节序号（用于排序）',
    example: 1.0,
    required: true,
    min: 0,
  })
  chapterNumber!: number

  @ValidateEnum({
    description: '查看规则（0: 公开, 1: 登录, 2: 会员, 3: 购买）',
    example: ChapterReadRuleEnum.PUBLIC,
    required: true,
    enum: ChapterReadRuleEnum,
    default: ChapterReadRuleEnum.PUBLIC,
  })
  readRule!: ChapterReadRuleEnum

  @ValidateNumber({
    description: '购买需要消耗的金额（分为单位）',
    example: 100,
    required: true,
    min: 0,
    default: 0,
  })
  purchaseAmount!: number

  @ValidateString({
    description: '漫画内容（JSON格式存储图片URL数组）',
    example:
      '["https://example.com/page1.jpg", "https://example.com/page2.jpg"]',
    required: true,
    default: '[]',
  })
  contents!: string

  @ValidateBoolean({
    description: '是否为试读章节',
    example: false,
    required: true,
    default: false,
  })
  isPreview!: boolean

  @ValidateDate({
    description: '发布时间',
    example: '2024-01-01T00:00:00.000Z',
    required: false,
  })
  publishAt?: Date

  @ValidateString({
    description: '章节缩略图',
    example: 'https://example.com/thumbnail.jpg',
    required: false,
    maxLength: 255,
  })
  thumbnail?: string

  @ValidateNumber({
    description: '阅读次数',
    example: 1000,
    required: true,
    min: 0,
    default: 0,
  })
  viewCount!: number

  @ValidateNumber({
    description: '点赞数',
    example: 100,
    required: true,
    min: 0,
    default: 0,
  })
  likeCount!: number

  @ValidateNumber({
    description: '评论数',
    example: 50,
    required: true,
    min: 0,
    default: 0,
  })
  commentCount!: number

  @ValidateString({
    description: '管理员备注',
    example: '优质章节，内容丰富',
    required: false,
    maxLength: 1000,
  })
  remark?: string

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
 * 创建漫画章节DTO
 */
export class CreateComicChapterDto extends OmitType(BaseComicChapterDto, [
  'id',
  'createdAt',
  'updatedAt',
  'viewCount',
  'likeCount',
  'commentCount',
]) {}

/**
 * 添加章节内容DTO
 */
export class AddChapterContentDto extends IdDto {
  @ValidateString({
    description: '要添加的内容（图片URL）',
    example: 'https://example.com/new-page.jpg',
    required: true,
  })
  content!: string

  @ValidateNumber({
    description: '插入位置索引（可选，默认添加到末尾）',
    example: 2,
    required: false,
    min: 0,
  })
  index?: number
}

/**
 * 更新章节内容DTO
 */
export class UpdateChapterContentDto extends OmitType(AddChapterContentDto, [
  'index',
]) {
  @ValidateNumber({
    description: '插入位置索引（可选，默认添加到末尾）',
    example: 2,
    required: true,
    min: 0,
  })
  index!: number
}

/**
 * 删除章节内容DTO
 */
export class DeleteChapterContentDto extends OmitType(UpdateChapterContentDto, [
  'content',
]) {}

/**
 * 移动章节内容DTO（用于排序）
 */
export class MoveChapterContentDto extends IdDto {
  @ValidateNumber({
    description: '源索引位置',
    example: 2,
    required: true,
    min: 0,
  })
  fromIndex!: number

  @ValidateNumber({
    description: '目标索引位置',
    example: 0,
    required: true,
    min: 0,
  })
  toIndex!: number
}

/**
 * 批量更新章节内容DTO
 */
export class BatchUpdateChapterContentsDto extends IdDto {
  @ValidateString({
    description: '新的内容数组（JSON格式）',
    example: '["https://example.com/page1.jpg"]',
    required: true,
  })
  contents!: string
}

/**
 * 更新漫画章节DTO
 */
export class UpdateComicChapterDto extends IntersectionType(
  PartialType(
    OmitType(BaseComicChapterDto, [
      'id',
      'createdAt',
      'updatedAt',
      'viewCount',
      'likeCount',
      'commentCount',
    ]),
  ),
  IdDto,
) {}

/**
 * 查询漫画章节DTO
 */
export class QueryComicChapterDto extends IntersectionType(
  PageDto,
  PickType(PartialType(BaseComicChapterDto), [
    'title',
    'isPublished',
    'versionId',
    'readRule',
    'isPreview',
  ]),
) {
  @ValidateString({
    description: '章节标题（模糊搜索）',
    example: '第一话',
    required: false,
  })
  title?: string

  @ValidateNumber({
    description: '漫画ID（精确匹配）',
    example: 1,
    required: true,
    min: 1,
  })
  comicId: number
}

/**
 * 批量更新章节发布状态DTO
 */
export class UpdateChapterPublishStatusDto {
  @ValidateArray({
    description: '章节ID列表',
    itemType: 'number',
    example: [1, 2, 3],
    required: true,
  })
  ids!: number[]

  @ValidateBoolean({
    description: '发布状态（true: 发布, false: 取消发布）',
    example: true,
    required: true,
  })
  isPublished!: boolean
}

/**
 * 批量更新章节查看规则DTO
 */
export class UpdateChapterReadRuleDto {
  @ValidateArray({
    description: '章节ID列表',
    itemType: 'number',
    example: [1, 2, 3],
    required: true,
  })
  ids!: number[]

  @ValidateEnum({
    description: '查看规则（0: 公开, 1: 登录, 2: 会员, 3: 购买）',
    example: ChapterReadRuleEnum.PUBLIC,
    required: true,
    enum: ChapterReadRuleEnum,
  })
  readRule!: ChapterReadRuleEnum
}

/**
 * 漫画章节分页响应DTO
 */
export class ComicChapterPageResponseDto extends OmitType(BaseComicChapterDto, [
  'contents',
  'remark',
]) {}
