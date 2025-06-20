import {
  ApiProperty,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger'
import {
  ValidateEnum,
  ValidateNumber,
  ValidateString,
} from '@/common/decorators/validate.decorator'
import { IdDto } from '@/common/dto/id.dto'
import { PageDto } from '@/common/dto/page.dto'
import { PageRuleEnum, PageStatusEnum } from '../page-code.constant'

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
export class UpdateClientPageConfigDto extends PartialType(
  BasePageConfigFieldsDto,
) {
  @ValidateNumber({
    description: '页面ID',
    example: 1,
    required: true,
  })
  id!: number
}

/**
 * 页面配置查询DTO
 */
export class QueryClientPageConfigDto extends IntersectionType(
  PageDto,
  PickType(PartialType(BasePageConfigFieldsDto), [
    'pageName',
    'pageCode',
    'pageRule',
    'status',
  ]),
) {}

/**
 * 页面配置响应DTO
 */
export class ClientPageConfigResponseDto extends IntersectionType(
  BasePageConfigFieldsDto,
  IdDto,
) {
  @ApiProperty({
    description: '访问次数统计',
    example: 100,
  })
  viewCount!: number

  @ApiProperty({
    description: '创建时间',
    example: '2021-01-01 00:00:00',
  })
  createdAt!: Date

  @ApiProperty({
    description: '更新时间',
    example: '2021-01-01 00:00:00',
  })
  updatedAt!: Date
}

/**
 * 页面配置分页响应DTO
 */
export class ClientPageConfigPageResponseDto extends OmitType(
  ClientPageConfigResponseDto,
  ['description'],
) {}
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
