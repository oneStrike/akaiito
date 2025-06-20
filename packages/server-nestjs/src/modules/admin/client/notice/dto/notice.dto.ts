import {
  ApiProperty,
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
import { PageDto } from '@/common/dto/page.dto'
import { NoticePriorityEnum, NoticeTypeEnum } from '../notice.constant'

/**
 * 通知基础DTO
 */
export class BaseNoticeDto {
  @ValidateNumber({
    description: '通知ID',
    example: 1,
    required: true,
    min: 1,
  })
  id!: number

  @ValidateString({
    description: '通知标题',
    example: '系统维护通知',
    required: true,
  })
  title!: string

  @ValidateString({
    description: '通知内容详情',
    example: '系统将于今晚进行维护升级...',
    required: true,
  })
  content!: string

  @ValidateEnum({
    description: '通知类型',
    example: NoticeTypeEnum.SYSTEM,
    required: true,
    enum: NoticeTypeEnum,
    default: NoticeTypeEnum.SYSTEM,
  })
  type!: NoticeTypeEnum

  @ValidateEnum({
    description: '优先级',
    example: NoticePriorityEnum.MEDIUM,
    required: true,
    enum: NoticePriorityEnum,
    default: NoticePriorityEnum.MEDIUM,
  })
  priority!: NoticePriorityEnum

  @ValidateDate({
    description: '发布开始时间',
    example: '2024-01-01T00:00:00.000Z',
    required: false,
  })
  startTime?: Date

  @ValidateDate({
    description: '发布结束时间',
    example: '2024-12-31T23:59:59.999Z',
    required: false,
  })
  endTime?: Date

  @ValidateString({
    description: '关联页面代码',
    example: 'home',
    required: false,
  })
  pageCode?: string

  @ValidateString({
    description: '通知弹窗背景图片URL',
    example: 'https://example.com/bg.jpg',
    required: false,
  })
  backgroundImage?: string

  @ValidateBoolean({
    description: '是否发布',
    example: false,
    required: true,
    default: false,
  })
  isPublish!: boolean

  @ValidateBoolean({
    description: '是否启用小程序',
    example: true,
    required: true,
    default: true,
  })
  enableApplet!: boolean

  @ValidateBoolean({
    description: '是否启用H5',
    example: true,
    required: true,
    default: true,
  })
  enableWeb!: boolean

  @ValidateBoolean({
    description: '是否启用APP',
    example: true,
    required: true,
    default: true,
  })
  enableApp!: boolean

  @ValidateBoolean({
    description: '是否置顶',
    example: false,
    required: false,
    default: false,
  })
  isTop?: boolean

  @ValidateBoolean({
    description: '是否弹窗显示',
    example: false,
    required: false,
    default: false,
  })
  isPopup?: boolean

  @ValidateNumber({
    description: '排序权重（数值越大越靠前）',
    example: 0,
    required: false,
    min: 0,
    default: 0,
  })
  sortOrder?: number

  @ValidateNumber({
    description: '阅读次数',
    example: 0,
    required: false,
    min: 0,
    default: 0,
  })
  viewCount?: number

  @ApiProperty({
    description: '创建时间',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt?: Date

  @ApiProperty({
    description: '更新时间',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt?: Date
}

/**
 * 创建通知DTO
 */
export class CreateNoticeDto extends OmitType(BaseNoticeDto, [
  'id',
  'isPublish',
  'viewCount',
  'createdAt',
  'updatedAt',
]) {}

/**
 * 更新通知DTO
 */
export class UpdateNoticeDto extends PartialType(
  OmitType(BaseNoticeDto, ['viewCount', 'isPublish', 'createdAt', 'updatedAt']),
) {}

/**
 * 通知查询DTO
 */
export class QueryNoticeDto extends IntersectionType(
  PageDto,
  PickType(PartialType(BaseNoticeDto), [
    'title',
    'type',
    'priority',
    'isPublish',
    'isTop',
  ]),
) {}

/**
 * 通知状态更新DTO
 */
export class UpdateNoticeStatusDto extends PickType(BaseNoticeDto, [
  'isPublish',
]) {
  @ValidateNumberArray({
    description: '通知ID列表',
    example: [1, 2, 3],
    required: true,
  })
  ids!: number[]
}

/**
 * 分页接口返回DTO
 */

export class NoticePageResponseDto extends OmitType(BaseNoticeDto, [
  'content',
]) {}
