import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNumber, IsOptional, Max, Min } from 'class-validator'
import { ValidateNumberOptions } from './types'

/**
 * 数字类型验证装饰器
 *
 * @description 用于验证数字类型的字段，支持范围限制、默认值等
 *
 * @example
 * ```typescript
 * class CreateProductDto {
 *   @ValidateNumber({
 *     description: '商品价格',
 *     example: 99.99,
 *     min: 0,
 *     max: 10000,
 *     required: true
 *   })
 *   price: number
 *
 *   @ValidateNumber({
 *     description: '商品数量',
 *     example: 10,
 *     min: 1,
 *     default: 1,
 *     required: false
 *   })
 *   quantity?: number
 * }
 * ```
 *
 * @param options 验证选项配置
 * @returns 装饰器函数
 */
export function ValidateNumber(options: ValidateNumberOptions) {
  // 参数验证
  if (!options.description) {
    throw new Error('ValidateNumber: description is required')
  }

  if (
    options.min !== undefined &&
    options.max !== undefined &&
    options.min > options.max
  ) {
    throw new Error('ValidateNumber: min should not be greater than max')
  }

  // 构建API属性配置
  const apiPropertyOptions: ApiPropertyOptions = {
    description: options.description,
    example: options.example,
    required: options.required ?? true,
    default: options.default,
    nullable: !(options.required ?? true),
    type: Number,
  }

  // 添加范围限制到API文档
  if (options.min !== undefined) {
    apiPropertyOptions.minimum = options.min
  }
  if (options.max !== undefined) {
    apiPropertyOptions.maximum = options.max
  }

  // 基础装饰器
  const decorators = [
    ApiProperty(apiPropertyOptions),
    IsNumber({}, { message: '必须是数字类型' }),
  ]

  // 范围验证
  if (options.max !== undefined) {
    decorators.push(
      Max(options.max, {
        message: `数值不能大于${options.max}`,
      }),
    )
  }

  if (options.min !== undefined) {
    decorators.push(
      Min(options.min, {
        message: `数值不能小于${options.min}`,
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

      // 字符串转数字
      if (typeof value === 'string') {
        const trimmedValue = value.trim()
        if (trimmedValue === '') {
          return undefined
        }
        const numValue = Number(trimmedValue)
        return Number.isNaN(numValue) ? value : numValue
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
