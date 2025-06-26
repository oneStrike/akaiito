import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'
import { ValidateBooleanOptions } from './types'

/**
 * 布尔类型验证装饰器
 *
 * @description 用于验证布尔类型的字段，支持字符串和数字到布尔值的智能转换
 *
 * @example
 * ```typescript
 * class UpdateSettingsDto {
 *   @ValidateBoolean({
 *     description: '是否启用通知',
 *     example: true,
 *     default: false,
 *     required: false
 *   })
 *   enableNotifications?: boolean
 *
 *   @ValidateBoolean({
 *     description: '是否公开资料',
 *     example: false,
 *     required: true
 *   })
 *   isPublic: boolean
 * }
 * ```
 *
 * @param options 验证选项配置
 * @returns 装饰器函数
 */
export function ValidateBoolean(options: ValidateBooleanOptions) {
  // 参数验证
  if (!options.description) {
    throw new Error('ValidateBoolean: description is required')
  }

  // 构建API属性配置
  const apiPropertyOptions: ApiPropertyOptions = {
    description: options.description,
    example: options.example,
    required: options.required ?? true,
    default: options.default,
    nullable: !(options.required ?? true),
    type: Boolean,
  }

  // 基础装饰器
  const decorators = [
    ApiProperty(apiPropertyOptions),
    IsBoolean({ message: '必须是布尔类型' }),
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

      // 字符串转布尔值
      if (typeof value === 'string') {
        const trimmedValue = value.trim().toLowerCase()
        if (trimmedValue === 'true' || trimmedValue === '1') {
          return true
        }
        if (trimmedValue === 'false' || trimmedValue === '0') {
          return false
        }
        return value // 保持原值，让验证器处理错误
      }

      // 数字转布尔值
      if (typeof value === 'number') {
        return value !== 0
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
