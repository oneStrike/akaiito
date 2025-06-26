import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsDate, IsOptional } from 'class-validator'
import { ValidateDateOptions } from './types'

/**
 * 日期类型验证装饰器
 *
 * @description 用于验证日期类型的字段，支持字符串和数字到Date对象的智能转换
 *
 * @example
 * ```typescript
 * class CreateEventDto {
 *   @ValidateDate({
 *     description: '事件开始时间',
 *     example: '2024-01-01T00:00:00.000Z',
 *     required: true
 *   })
 *   startTime: Date
 *
 *   @ValidateDate({
 *     description: '事件结束时间',
 *     example: null,
 *     default: null,
 *     required: false
 *   })
 *   endTime?: Date
 * }
 * ```
 *
 * @param options 验证选项配置
 * @returns 装饰器函数
 */
export function ValidateDate(options: ValidateDateOptions) {
  // 参数验证
  if (!options.description) {
    throw new Error('ValidateDate: description is required')
  }

  // 构建API属性配置
  const apiPropertyOptions: ApiPropertyOptions = {
    description: options.description,
    example: options.example,
    required: options.required ?? true,
    default: options.default,
    nullable: !(options.required ?? true),
    type: Date,
    format: 'date-time',
  }

  // 基础装饰器
  const decorators = [
    ApiProperty(apiPropertyOptions),
    IsDate({ message: '必须是有效的日期格式' }),
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

      // 字符串转Date
      if (typeof value === 'string') {
        const trimmedValue = value.trim()
        if (trimmedValue === '') {
          return undefined
        }
        const dateValue = new Date(trimmedValue)
        return Number.isNaN(dateValue.getTime()) ? value : dateValue
      }

      // 数字转Date（时间戳）
      if (typeof value === 'number') {
        const dateValue = new Date(value)
        return Number.isNaN(dateValue.getTime()) ? value : dateValue
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
