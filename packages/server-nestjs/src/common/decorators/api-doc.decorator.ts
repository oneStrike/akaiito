import type { Type } from '@nestjs/common'
import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'
import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiResponse, getSchemaPath } from '@nestjs/swagger'

// 基础响应结构（不含 data）
const baseResponse = (summary: string) => ({
  status: 200,
  description: `${summary}成功`,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          code: {
            type: 'number',
            description: '响应状态码',
            example: 200,
          },
          message: {
            type: 'string',
            description: '响应消息',
            example: 'success',
          },
        },
      },
    },
  },
})

// 分页数据结构（直接返回完整的 SchemaObject）
const pageDataSchema = <T>(model: Type<T>): SchemaObject => ({
  type: 'object',
  properties: {
    pageIndex: { type: 'number', description: '当前页码', example: 1 },
    pageSize: { type: 'number', description: '每页条数', example: 15 },
    total: { type: 'number', description: '总条数', example: 100 },
    items: {
      type: 'array',
      items: { $ref: getSchemaPath(model) },
    },
  },
})

// 参数校验工具函数
const validateArgs = (summary: string, model: Type<unknown>) => {
  if (!summary || !model) {
    throw new Error('ApiDoc 参数不能为空')
  }
}

// 新增自定义装饰器定义
export function ApiDoc<T>(summary: string, model: Type<T>) {
  validateArgs(summary, model)
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      ...baseResponse(summary),
      content: {
        'application/json': {
          schema: {
            ...baseResponse(summary).content['application/json'].schema,
            properties: {
              ...baseResponse(summary).content['application/json'].schema.properties,
              data: { $ref: getSchemaPath(model) },
            },
          },
        },
      },
    }),
  )
}

export function ApiPageDoc<T>(summary: string, model: Type<T>) {
  validateArgs(summary, model)
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      ...baseResponse(summary),
      content: {
        'application/json': {
          schema: {
            ...baseResponse(summary).content['application/json'].schema,
            properties: {
              ...baseResponse(summary).content['application/json'].schema.properties,
              data: pageDataSchema(model), // 直接使用完整的 SchemaObject
            },
          },
        },
      },
    }),
  )
}
