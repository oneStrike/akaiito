import { ApiProperty } from '@nestjs/swagger'
import {
  ValidateNumber,
  ValidateString,
} from '@/common/decorators/validate.decorator'
import { PageDto } from '@/common/dto/page.dto'

/**
 * 系统请求日志响应DTO
 * 用于返回请求日志的详细信息
 */
export class RequestLogDto {
  @ApiProperty({
    description: '主键ID',
    example: 1,
  })
  id!: number

  @ApiProperty({
    description: '用户名',
    example: 'admin001',
    required: false,
  })
  username?: string

  @ApiProperty({
    description: '用户主键ID',
    example: 1,
    required: false,
  })
  userId?: number

  @ApiProperty({
    description: '调用IP地址',
    example: '192.168.1.100',
    required: true,
  })
  ipAddress!: string

  @ApiProperty({
    description: 'IP映射地址',
    example: '北京市朝阳区',
    required: true,
  })
  ipLocation!: string

  @ApiProperty({
    description: '响应状态码',
    example: 200,
    required: true,
  })
  responseCode!: number

  @ApiProperty({
    description: '响应描述',
    example: '请求成功',
    required: true,
  })
  responseMessage!: string

  @ApiProperty({
    description: '请求方法',
    example: 'GET',
    required: true,
  })
  httpMethod!: string

  @ApiProperty({
    description: '请求路径',
    example: '/api/admin/users',
    required: true,
  })
  requestPath!: string

  @ApiProperty({
    description: '接口描述信息',
    example: '获取用户列表',
    required: true,
  })
  operationDescription!: string

  @ApiProperty({
    description: '浏览器信息标识',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    required: true,
  })
  userAgent!: string

  @ApiProperty({
    description: '请求参数',
    example: '{"page": 1, "pageSize": 10}',
    required: false,
  })
  requestParams?: string

  @ApiProperty({
    description: '创建时间',
    example: '2024-01-01T00:00:00.000Z',
    required: true,
  })
  createdAt!: Date

  @ApiProperty({
    description: '更新时间',
    example: '2024-01-01T00:00:00.000Z',
    required: true,
  })
  updatedAt!: Date
}

/**
 * 创建请求日志DTO
 * 用于记录新的请求日志信息
 */
export class CreateRequestLogDto {
  @ValidateString({
    description: '用户名',
    example: 'admin001',
    required: false,
    maxLength: 20,
  })
  username?: string

  @ValidateNumber({
    description: '用户主键ID',
    example: 1,
    required: false,
    min: 1,
  })
  userId?: number

  @ValidateString({
    description: '调用IP地址',
    example: '192.168.1.100',
    required: true,
    maxLength: 20,
  })
  ipAddress!: string

  @ValidateString({
    description: 'IP映射地址',
    example: '北京市朝阳区',
    required: true,
    maxLength: 300,
  })
  ipLocation!: string

  @ValidateNumber({
    description: '响应状态码',
    example: 200,
    required: true,
    min: 100,
    max: 599,
  })
  responseCode!: number

  @ValidateString({
    description: '响应描述',
    example: '请求成功',
    required: true,
    maxLength: 300,
  })
  responseMessage!: string

  @ValidateString({
    description: '请求方法',
    example: 'GET',
    required: true,
    maxLength: 10,
  })
  httpMethod!: string

  @ValidateNumber({
    description: '请求耗时',
    example: 200,
    required: true,
  })
  duration!: number

  @ValidateString({
    description: '请求路径',
    example: '/api/admin/users',
    required: true,
    maxLength: 100,
  })
  requestPath!: string

  @ValidateString({
    description: '接口描述信息',
    example: '获取用户列表',
    required: true,
    maxLength: 255,
  })
  operationDescription!: string

  @ValidateString({
    description: '浏览器信息标识',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    required: true,
    maxLength: 1000,
  })
  userAgent!: string

  @ValidateString({
    description: '请求参数',
    example: '{"page": 1, "pageSize": 10}',
    required: false,
  })
  requestParams?: string
}

/**
 * 请求日志查询DTO
 * 继承分页DTO，添加特定的查询条件
 */
export class QueryRequestLogDto extends PageDto {
  @ValidateString({
    description: '用户名模糊查询',
    example: 'admin',
    required: false,
    maxLength: 20,
  })
  username?: string

  @ValidateNumber({
    description: '用户ID精确查询',
    example: 1,
    required: false,
    min: 1,
  })
  userId?: number

  @ValidateString({
    description: 'IP地址模糊查询',
    example: '192.168',
    required: false,
    maxLength: 20,
  })
  ipAddress?: string

  @ValidateNumber({
    description: '响应状态码',
    example: 200,
    required: false,
    min: 100,
    max: 599,
  })
  responseCode?: number

  @ValidateString({
    description: '请求方法',
    example: 'GET',
    required: false,
    maxLength: 10,
  })
  httpMethod?: string

  @ValidateString({
    description: '请求路径模糊查询',
    example: '/api/admin',
    required: false,
    maxLength: 100,
  })
  requestPath?: string
}

/**
 * 请求日志分页响应DTO
 * 用于返回分页查询结果
 */
export class RequestLogPageResponseDto {
  @ApiProperty({
    description: '请求日志列表',
    type: [RequestLogDto],
  })
  data!: RequestLogDto[]

  @ValidateNumber({
    description: '总记录数',
    example: 100,
    required: true,
    min: 0,
  })
  total!: number

  @ValidateNumber({
    description: '当前页码',
    example: 0,
    required: true,
    min: 0,
  })
  page!: number

  @ValidateNumber({
    description: '每页大小',
    example: 15,
    required: true,
    min: 1,
    max: 500,
  })
  pageSize!: number

  @ValidateNumber({
    description: '总页数',
    example: 7,
    required: true,
    min: 0,
  })
  totalPages!: number
}
