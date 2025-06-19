import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
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
  NoticePriorityEnum,
  NoticeStatusEnum,
  NoticeTypeEnum,
} from '@/prisma/client/enums'

/**
 * 通知基础DTO
 */
export class NoticeDto {
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
    required: false,
    enum: NoticeTypeEnum,
    default: NoticeTypeEnum.SYSTEM,
  })
  type?: NoticeTypeEnum

  @ValidateEnum({
    description: '优先级',
    example: NoticePriorityEnum.MEDIUM,
    required: false,
    enum: NoticePriorityEnum,
    default: NoticePriorityEnum.MEDIUM,
  })
  priority?: NoticePriorityEnum

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

  @ValidateEnum({
    description: '发布状态',
    example: NoticeStatusEnum.UNPUBLISHED,
    required: false,
    enum: NoticeStatusEnum,
    default: NoticeStatusEnum.UNPUBLISHED,
  })
  status?: NoticeStatusEnum

  @ValidateBoolean({
    description: '是否启用小程序',
    example: true,
    required: false,
    default: true,
  })
  enableApplet?: boolean

  @ValidateBoolean({
    description: '是否启用H5',
    example: true,
    required: false,
    default: true,
  })
  enableWeb?: boolean

  @ValidateBoolean({
    description: '是否启用APP',
    example: true,
    required: false,
    default: true,
  })
  enableApp?: boolean

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

  @ApiProperty({
    description: '软删除时间',
    example: null,
  })
  @Exclude()
  deletedAt?: Date
}

/**
 * 通知基础字段DTO（用于减少重复代码）
 */
export class BaseNoticeFieldsDto {
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
    required: false,
    enum: NoticeTypeEnum,
    default: NoticeTypeEnum.SYSTEM,
  })
  type?: NoticeTypeEnum

  @ValidateEnum({
    description: '优先级',
    example: NoticePriorityEnum.MEDIUM,
    required: false,
    enum: NoticePriorityEnum,
    default: NoticePriorityEnum.MEDIUM,
  })
  priority?: NoticePriorityEnum
}

/**
 * 创建通知DTO
 */
export class CreateNoticeDto extends BaseNoticeFieldsDto {
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
    description: '是否启用小程序',
    example: true,
    required: false,
    default: true,
  })
  enableApplet?: boolean

  @ValidateBoolean({
    description: '是否启用H5',
    example: true,
    required: false,
    default: true,
  })
  enableWeb?: boolean

  @ValidateBoolean({
    description: '是否启用APP',
    example: true,
    required: false,
    default: true,
  })
  enableApp?: boolean

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
}

/**
 * 更新通知DTO
 */
export class UpdateNoticeDto extends IdDto {
  @ValidateString({
    description: '通知标题',
    example: '系统维护通知',
    required: false,
  })
  title?: string

  @ValidateString({
    description: '通知内容详情',
    example: '系统将于今晚进行维护升级...',
    required: false,
  })
  content?: string

  @ValidateEnum({
    description: '通知类型',
    example: NoticeTypeEnum.SYSTEM,
    required: false,
    enum: NoticeTypeEnum,
  })
  type?: NoticeTypeEnum

  @ValidateEnum({
    description: '优先级',
    example: NoticePriorityEnum.MEDIUM,
    required: false,
    enum: NoticePriorityEnum,
  })
  priority?: NoticePriorityEnum

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

  @ValidateEnum({
    description: '发布状态',
    example: NoticeStatusEnum.UNPUBLISHED,
    required: false,
    enum: NoticeStatusEnum,
  })
  status?: NoticeStatusEnum

  @ValidateBoolean({
    description: '是否启用小程序',
    example: true,
    required: false,
  })
  enableApplet?: boolean

  @ValidateBoolean({
    description: '是否启用H5',
    example: true,
    required: false,
  })
  enableWeb?: boolean

  @ValidateBoolean({
    description: '是否启用APP',
    example: true,
    required: false,
  })
  enableApp?: boolean

  @ValidateBoolean({
    description: '是否置顶',
    example: false,
    required: false,
  })
  isTop?: boolean

  @ValidateBoolean({
    description: '是否弹窗显示',
    example: false,
    required: false,
  })
  isPopup?: boolean

  @ValidateNumber({
    description: '排序权重（数值越大越靠前）',
    example: 0,
    required: false,
    min: 0,
  })
  sortOrder?: number
}

/**
 * 通知查询DTO
 */
export class QueryNoticeDto extends PageDto {
  @ValidateString({
    description: '通知标题（模糊搜索）',
    example: '系统',
    required: false,
  })
  title?: string

  @ValidateEnum({
    description: '通知类型',
    example: NoticeTypeEnum.SYSTEM,
    required: false,
    enum: NoticeTypeEnum,
  })
  type?: NoticeTypeEnum

  @ValidateEnum({
    description: '优先级',
    example: NoticePriorityEnum.MEDIUM,
    required: false,
    enum: NoticePriorityEnum,
  })
  priority?: NoticePriorityEnum

  @ValidateEnum({
    description: '发布状态',
    example: NoticeStatusEnum.PUBLISHED,
    required: false,
    enum: NoticeStatusEnum,
  })
  status?: NoticeStatusEnum

  @ValidateBoolean({
    description: '是否置顶',
    example: false,
    required: false,
  })
  isTop?: boolean

  @ValidateBoolean({
    description: '是否弹窗显示',
    example: false,
    required: false,
  })
  isPopup?: boolean
}

/**
 * 通知状态更新DTO
 */
export class UpdateNoticeStatusDto extends IdDto {
  @ValidateEnum({
    description: '发布状态',
    example: NoticeStatusEnum.PUBLISHED,
    required: true,
    enum: NoticeStatusEnum,
  })
  status!: NoticeStatusEnum
}
