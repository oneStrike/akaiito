import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import {
  ValidateBoolean,
  ValidateDate,
  ValidateNumber,
  ValidateNumberArray,
  ValidateString,
} from '@/common/decorators/validate.decorator'
import { IdDto } from '@/common/dto/id.dto'
import { PageDto } from '@/common/dto/page.dto'

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

  @ValidateNumber({
    description: '通知类型：1-系统通知，2-活动公告，3-维护通知，4-更新公告',
    example: 1,
    required: false,
    min: 1,
    max: 4,
    default: 1,
  })
  type?: number

  @ValidateNumber({
    description: '优先级：1-低，2-中，3-高，4-紧急',
    example: 2,
    required: false,
    min: 1,
    max: 4,
    default: 2,
  })
  priority?: number

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

  @ValidateNumber({
    description: '发布状态：0-未发布，1-已发布，2-已下线',
    example: 0,
    required: false,
    min: 0,
    max: 2,
    default: 0,
  })
  status?: number

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
 * 创建通知DTO
 */
export class CreateNoticeDto {
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

  @ValidateNumber({
    description: '通知类型：1-系统通知，2-活动公告，3-维护通知，4-更新公告',
    example: 1,
    required: false,
    min: 1,
    max: 4,
    default: 1,
  })
  type?: number

  @ValidateNumber({
    description: '优先级：1-低，2-中，3-高，4-紧急',
    example: 2,
    required: false,
    min: 1,
    max: 4,
    default: 2,
  })
  priority?: number

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

  @ValidateNumber({
    description: '通知类型：1-系统通知，2-活动公告，3-维护通知，4-更新公告',
    example: 1,
    required: false,
    min: 1,
    max: 4,
  })
  type?: number

  @ValidateNumber({
    description: '优先级：1-低，2-中，3-高，4-紧急',
    example: 2,
    required: false,
    min: 1,
    max: 4,
  })
  priority?: number

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

  @ValidateNumber({
    description: '发布状态：0-未发布，1-已发布，2-已下线',
    example: 0,
    required: false,
    min: 0,
    max: 2,
  })
  status?: number

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

  @ValidateNumber({
    description: '通知类型：1-系统通知，2-活动公告，3-维护通知，4-更新公告',
    example: 1,
    required: false,
    min: 1,
    max: 4,
  })
  type?: number

  @ValidateNumber({
    description: '优先级：1-低，2-中，3-高，4-紧急',
    example: 2,
    required: false,
    min: 1,
    max: 4,
  })
  priority?: number

  @ValidateNumber({
    description: '发布状态：0-未发布，1-已发布，2-已下线',
    example: 1,
    required: false,
    min: 0,
    max: 2,
  })
  status?: number

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
  @ValidateNumber({
    description: '发布状态：0-未发布，1-已发布，2-已下线',
    example: 1,
    required: true,
    min: 0,
    max: 2,
  })
  status!: number
}

/**
 * 通知阅读DTO
 */
export class ReadNoticeDto extends IdDto {}

/**
 * 批量删除通知DTO
 */
export class BatchDeleteNoticeDto {
  @ValidateNumberArray({
    description: '通知ID列表',
    example: [1, 2, 3],
    required: true,
    minLength: 1,
    maxLength: 100,
  })
  ids!: number[]
}
