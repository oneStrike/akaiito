import type { Type } from '@nestjs/common'
import { applyDecorators } from '@nestjs/common'
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger'

// 工具函数：判断是否是类
const isClass = (model: any): model is Type<unknown> =>
  typeof model === 'function' && model.prototype

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

export function ApiDoc<TModel extends Type<any>>(
  summary: string,
  model: Type<TModel> | Record<string, any>,
) {
  let dataSchema
  const decorators = [ApiOperation({ summary })]

  if (isClass(model)) {
    decorators.push(ApiExtraModels(model))
    dataSchema = { $ref: getSchemaPath(model) }
  } else {
    dataSchema = model
  }

  decorators.push(
    ApiResponse({
      ...baseResponse(summary),
      content: {
        'application/json': {
          schema: {
            ...baseResponse(summary).content['application/json'].schema,
            properties: {
              ...baseResponse(summary).content['application/json'].schema.properties,
              data: dataSchema,
            },
          },
        },
      },
    }),
  )

  return applyDecorators(...decorators)
}

export function ApiPageDoc<TModel extends Type<any>>(
  summary: string,
  model: TModel | Record<string, any>,
) {
  let dataSchema
  const decorators = [ApiOperation({ summary })]

  if (isClass(model)) {
    decorators.push(ApiExtraModels(model))
    dataSchema = { $ref: getSchemaPath(model) }
  } else {
    dataSchema = model
  }

  decorators.push(
    ApiResponse({
      ...baseResponse(summary),
      content: {
        'application/json': {
          schema: {
            ...baseResponse(summary).content['application/json'].schema,
            properties: {
              ...baseResponse(summary).content['application/json'].schema.properties,
              data: {
                type: 'object',
                properties: {
                  pageIndex: {
                    type: 'number',
                    description: '当前页码',
                    example: 0,
                  },
                  pageSize: {
                    type: 'number',
                    description: '每页条数',
                    example: 15,
                  },
                  total: {
                    type: 'number',
                    description: '总条数',
                    example: 100,
                  },
                  items: {
                    type: 'array',
                    items: dataSchema,
                  },
                },
              },
            },
          },
        },
      },
    }),
  )

  return applyDecorators(...decorators)
}
