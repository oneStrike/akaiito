import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator'
import { ValidateNumberArrayOptions } from './types'

/**
 * 数字数组验证装饰器
 *
 * @description 用于验证数字数组类型的字段，支持长度限制、字符串数组到数字数组的智能转换
 *
 * @example
 * ```typescript
 * class CreateOrderDto {
 *   @ValidateNumberArray({
 *     description: '商品ID列表',
 *     example: [1, 2, 3],
 *     minLength: 1,
 *     maxLength: 10,
 *     required: true
 *   })
 *   productIds: number[]
 *
 *   @ValidateNumberArray({
 *     description: '标签ID列表',
 *     example: [],
 *     default: [],
 *     required: false
 *   })
 *   tagIds?: number[]
 * }
 * ```
 *
 * @param options 验证选项配置
 * @returns 装饰器函数
 */
export function ValidateNumberArray(options: ValidateNumberArrayOptions) {
  // 参数验证
  if (!options.description) {
    throw new Error('ValidateNumberArray: description is required')
  }

  if (
    options.minLength !== undefined &&
    options.maxLength !== undefined &&
    options.minLength > options.maxLength
  ) {
    throw new Error(
      'ValidateNumberArray: minLength should not be greater than maxLength',
    )
  }

  // 构建API属性配置
  const apiPropertyOptions: ApiPropertyOptions = {
    description: options.description,
    example: options.example,
    required: options.required ?? true,
    default: options.default,
    nullable: !(options.required ?? true),
    type: Number,
    isArray: true,
  }

  // 添加长度限制到API文档
  if (options.minLength !== undefined) {
    apiPropertyOptions.minItems = options.minLength
  }
  if (options.maxLength !== undefined) {
    apiPropertyOptions.maxItems = options.maxLength
  }

  // 基础装饰器
  const decorators = [
    ApiProperty(apiPropertyOptions),
    IsArray({ message: '必须是数组类型' }),
    IsNumber({}, { each: true, message: '数组中的每个元素都必须是数字类型' }),
  ]

  // 非空验证（如果是必填字段）
  if (options.required ?? true) {
    decorators.push(IsNotEmpty({ message: '数组不能为空' }))
  }

  // 长度验证
  if (options.maxLength !== undefined) {
    decorators.push(
      MaxLength(options.maxLength, {
        message: `数组长度不能超过${options.maxLength}个元素`,
      }),
    )
  }

  if (options.minLength !== undefined) {
    decorators.push(
      MinLength(options.minLength, {
        message: `数组长度不能少于${options.minLength}个元素`,
      }),
    )
  }

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

      // 字符串数组转数字数组
      if (Array.isArray(value)) {
        return value.map((item) => {
          if (typeof item === 'string') {
            const trimmedItem = item.trim()
            if (trimmedItem === '') {
              return item // 保持原值，让验证器处理错误
            }
            const numValue = Number(trimmedItem)
            return Number.isNaN(numValue) ? item : numValue
          }
          return item
        })
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
