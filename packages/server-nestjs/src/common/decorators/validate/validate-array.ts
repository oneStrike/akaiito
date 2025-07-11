import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateBy,
} from 'class-validator'
import { ValidateArrayOptions } from './types'

/**
 * 通用数组验证装饰器
 *
 * @description 用于验证不同类型数组的字段，支持长度限制、类型转换和自定义验证
 *
 * @example
 * ```typescript
 * class CreateOrderDto {
 *   @ValidateArray({
 *     description: '商品ID列表',
 *     itemType: 'number',
 *     example: [1, 2, 3],
 *     minLength: 1,
 *     maxLength: 10,
 *     required: true
 *   })
 *   productIds: number[]
 *
 *   @ValidateArray({
 *     description: '标签名称列表',
 *     itemType: 'string',
 *     example: ['tag1', 'tag2'],
 *     default: [],
 *     required: false
 *   })
 *   tagNames?: string[]
 *
 *   @ValidateArray({
 *     description: '配置对象列表',
 *     itemType: 'object',
 *     example: [{ key: 'value' }],
 *     itemValidator: (value) => typeof value === 'object' && value !== null,
 *     itemErrorMessage: '数组中的每个元素都必须是有效的对象',
 *     required: true
 *   })
 *   configs: object[]
 * }
 * ```
 *
 * @param options 验证选项配置
 * @returns 装饰器函数
 */
export function ValidateArray<T = any>(options: ValidateArrayOptions<T>) {
  // 参数验证
  if (!options.description) {
    throw new Error('ValidateArray: description is required')
  }

  if (!options.itemType) {
    throw new Error('ValidateArray: itemType is required')
  }

  if (
    options.minLength !== undefined &&
    options.maxLength !== undefined &&
    options.minLength > options.maxLength
  ) {
    throw new Error(
      'ValidateArray: minLength should not be greater than maxLength',
    )
  }

  // 根据itemType确定API文档中的类型
  const getApiType = () => {
    switch (options.itemType) {
      case 'string':
        return String
      case 'number':
        return Number
      case 'boolean':
        return Boolean
      case 'object':
        return Object
      default:
        return String
    }
  }

  // 构建API属性配置
  const apiPropertyOptions: ApiPropertyOptions = {
    description: options.description,
    example: options.example,
    required: options.required ?? true,
    default: options.default,
    nullable: !(options.required ?? true),
    type: getApiType(),
    isArray: true,
  }

  // 添加长度限制到API文档
  if (options.minLength !== undefined) {
    apiPropertyOptions.minItems = options.minLength
  }
  if (options.maxLength !== undefined) {
    apiPropertyOptions.maxItems = options.maxLength
  }

  // 根据itemType获取相应的验证器
  const getItemValidator = () => {
    switch (options.itemType) {
      case 'string':
        return IsString({
          each: true,
          message:
            options.itemErrorMessage || '数组中的每个元素都必须是字符串类型',
        })
      case 'number':
        return IsNumber(
          {},
          {
            each: true,
            message:
              options.itemErrorMessage || '数组中的每个元素都必须是数字类型',
          },
        )
      case 'boolean':
        return IsBoolean({
          each: true,
          message:
            options.itemErrorMessage || '数组中的每个元素都必须是布尔类型',
        })
      case 'object':
        return IsObject({
          each: true,
          message:
            options.itemErrorMessage || '数组中的每个元素都必须是对象类型',
        })
      default:
        return IsString({
          each: true,
          message:
            options.itemErrorMessage || '数组中的每个元素都必须是字符串类型',
        })
    }
  }

  // 基础装饰器
  const decorators = [
    ApiProperty(apiPropertyOptions),
    IsArray({ message: '必须是数组类型' }),
    getItemValidator(),
  ]

  // 自定义验证器（如果提供）
  if (options.itemValidator) {
    decorators.push(
      ValidateBy({
        name: 'customItemValidator',
        validator: {
          validate: (value: any[]) => {
            if (!Array.isArray(value)) return true // 数组验证由IsArray处理
            return value.every(options.itemValidator!)
          },
          defaultMessage: () =>
            options.itemErrorMessage || '数组中的元素验证失败',
        },
      }),
    )
  }

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

      // 根据itemType进行类型转换
      if (Array.isArray(value)) {
        return value.map((item) => {
          switch (options.itemType) {
            case 'number':
              if (typeof item === 'string') {
                const trimmedItem = item.trim()
                if (trimmedItem === '') {
                  return item // 保持原值，让验证器处理错误
                }
                const numValue = Number(trimmedItem)
                return Number.isNaN(numValue) ? item : numValue
              }
              return item
            case 'boolean':
              if (typeof item === 'string') {
                const lowerItem = item.toLowerCase().trim()
                if (lowerItem === 'true' || lowerItem === '1') return true
                if (lowerItem === 'false' || lowerItem === '0') return false
                return item // 保持原值，让验证器处理错误
              }
              return item
            case 'string':
              return typeof item === 'string' ? item : String(item)
            case 'object':
              // 如果是字符串，尝试解析为JSON
              if (typeof item === 'string') {
                try {
                  return JSON.parse(item)
                } catch {
                  return item // 保持原值，让验证器处理错误
                }
              }
              return item
            default:
              return item
          }
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
