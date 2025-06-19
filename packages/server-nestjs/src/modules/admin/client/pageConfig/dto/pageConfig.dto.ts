import { Exclude } from 'class-transformer'
import {
  ValidateEnum,
  ValidateNumber,
  ValidateString,
} from '@/common/decorators/validate.decorator'
import { IdDto } from '@/common/dto/id.dto'
import { PageDto } from '@/common/dto/page.dto'
import { PageRuleEnum, PageStatusEnum } from '@/prisma/client/enums'

/**
 * 页面配置基础字段DTO
 */
export class BasePageConfigFieldsDto {
  @ValidateString({
    description: '页面编码（唯一标识）',
    example: 'home',
    required: true,
    maxLength: 50,
  })
  pageCode!: string

  @ValidateString({
    description: '页面路径（URL路径）',
    example: '/home',
    required: true,
    maxLength: 300,
  })
  pagePath!: string

  @ValidateString({
    description: '页面名称',
    example: '首页',
    required: true,
    maxLength: 100,
  })
  pageName!: string

  @ValidateString({
    description: '页面标题（用于SEO）',
    example: '首页 - 我的应用',
    required: false,
    maxLength: 200,
  })
  pageTitle?: string

  @ValidateEnum({
    description: '页面权限级别',
    example: PageRuleEnum.GUEST,
    required: true,
    enum: PageRuleEnum,
    default: PageRuleEnum.GUEST,
  })
  pageRule!: PageRuleEnum

  @ValidateEnum({
    description: '页面状态',
    example: PageStatusEnum.ENABLED,
    required: true,
    enum: PageStatusEnum,
    default: PageStatusEnum.ENABLED,
  })
  status!: PageStatusEnum

  @ValidateString({
    description: '页面描述信息',
    example: '应用首页，展示主要功能和内容',
    required: false,
    maxLength: 500,
  })
  description?: string

  @ValidateNumber({
    description: '排序权重（数值越大越靠前）',
    example: 100,
    required: false,
    min: 0,
    default: 0,
  })
  sortOrder?: number
}

/**
 * 创建页面配置DTO
 */
export class CreateClientPageConfigDto extends BasePageConfigFieldsDto {}

/**
 * 更新页面配置DTO
 */
export class UpdateClientPageConfigDto extends IdDto {
  @ValidateString({
    description: '页面编码（唯一标识）',
    example: 'home',
    required: false,
    maxLength: 50,
  })
  pageCode?: string

  @ValidateString({
    description: '页面路径（URL路径）',
    example: '/home',
    required: false,
    maxLength: 300,
  })
  pagePath?: string

  @ValidateString({
    description: '页面名称',
    example: '首页',
    required: false,
    maxLength: 100,
  })
  pageName?: string

  @ValidateString({
    description: '页面标题（用于SEO）',
    example: '首页 - 我的应用',
    required: false,
    maxLength: 200,
  })
  pageTitle?: string

  @ValidateEnum({
    description: '页面权限级别',
    example: PageRuleEnum.GUEST,
    required: false,
    enum: PageRuleEnum,
  })
  pageRule?: PageRuleEnum

  @ValidateEnum({
    description: '页面状态',
    example: PageStatusEnum.ENABLED,
    required: false,
    enum: PageStatusEnum,
  })
  status?: PageStatusEnum

  @ValidateString({
    description: '页面描述信息',
    example: '应用首页，展示主要功能和内容',
    required: false,
    maxLength: 500,
  })
  description?: string

  @ValidateNumber({
    description: '排序权重（数值越大越靠前）',
    example: 100,
    required: false,
    min: 0,
  })
  sortOrder?: number
}

/**
 * 页面配置查询DTO
 */
export class QueryClientPageConfigDto extends PageDto {
  @ValidateString({
    description: '页面名称（模糊搜索）',
    example: '首页',
    required: false,
  })
  pageName?: string

  @ValidateString({
    description: '页面编码（精确搜索）',
    example: 'home',
    required: false,
  })
  pageCode?: string

  @ValidateEnum({
    description: '页面权限级别',
    example: PageRuleEnum.GUEST,
    required: false,
    enum: PageRuleEnum,
  })
  pageRule?: PageRuleEnum

  @ValidateEnum({
    description: '页面状态',
    example: PageStatusEnum.ENABLED,
    required: false,
    enum: PageStatusEnum,
  })
  status?: PageStatusEnum
}

/**
 * 页面配置响应DTO
 */
export class ClientPageConfigDto {
  /// 主键id
  id!: number
  /// 页面编码（唯一标识）
  pageCode!: string
  /// 页面路径（URL路径）
  pagePath!: string
  /// 页面名称
  pageName!: string
  /// 页面标题（用于SEO）
  pageTitle?: string
  /// 页面权限级别
  pageRule!: PageRuleEnum
  /// 页面状态
  status!: PageStatusEnum
  /// 页面描述信息
  description?: string
  /// 排序权重（数值越大越靠前）
  sortOrder!: number
  /// 访问次数统计
  viewCount!: number
  /// 创建时间
  createdAt!: Date
  /// 更新时间
  updatedAt!: Date

  @Exclude()
  deletedAt?: Date
}

/**
 * 增加页面访问次数DTO
 */
export class IncrementViewCountDto {
  @ValidateString({
    description: '页面编码',
    example: 'home',
    required: true,
  })
  pageCode!: string
}
