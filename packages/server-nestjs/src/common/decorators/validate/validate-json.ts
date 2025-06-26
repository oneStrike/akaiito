import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsJSON, IsOptional } from 'class-validator'
import { ValidateJsonOptions } from './types'

/**
 * JSON字符串验证装饰器
 *
 * @description 用于验证JSON字符串格式的字段，支持对象到JSON字符串的自动转换
 *
 * @example
 * ```typescript
 * class CreateConfigDto {
 *   @ValidateJson({
 *     description: '配置数据',
 *     example: '{"theme": "dark", "language": "zh-CN"}',
 *     required: true
 *   })
 *   configData: string
 *
 *   @ValidateJson({
 *     description: '元数据',
 *     example: null,
 *     default: '{}',
 *     required: false
 *   })
 *   metadata?: string
 * }
 * ```
 *
 * @param options 验证选项配置
 * @returns 装饰器函数
 */
export function ValidateJson(options: ValidateJsonOptions) {
  // 参数验证
  if (!options.description) {
    throw new Error('ValidateJson: description is required')
  }

  // 构建API属性配置
  const apiPropertyOptions: ApiPropertyOptions = {
    description: options.description,
    example: options.example,
    required: options.required ?? true,
    default: options.default,
    nullable: !(options.required ?? true),
    type: String,
    format: 'json',
  }

  // 基础装饰器
  const decorators = [
    ApiProperty(apiPropertyOptions),
    IsJSON({ message: '必须是有效的JSON字符串格式' }),
  ]

  // 可选字段处理
  if (!(options.required ?? true)) {
    decorators.push(IsOptional())
  }

  // 转换逻辑
  decorators.push(
    Transform(({ value }) => {
      // 处理默认值
      if (
        (value === undefined || value === null) &&
        options.default !== undefined
      ) {
        return options.default
      }

      // 对象转JSON字符串
      if (typeof value === 'object' && value !== null) {
        try {
          return JSON.stringify(value)
        } catch {
          return value // 保持原值，让验证器处理错误
        }
      }

      // 字符串trim处理
      if (typeof value === 'string') {
        return value.trim()
      }

      return value
    }),
  )

  // 自定义转换函数
  if (options.transform) {
    decorators.push(Transform(options.transform))
  }

  return applyDecorators(...decorators)
}
