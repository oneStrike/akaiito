import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsOptional, IsString, Matches } from 'class-validator'
import { ValidateRegexOptions } from './types'

/**
 * 正则表达式验证装饰器
 *
 * @description 用于通过正则表达式验证字符串格式的字段
 *
 * @example
 * ```typescript
 * class CreateUserDto {
 *   @ValidateByRegex({
 *     description: '手机号码',
 *     example: '13800138000',
 *     regex: /^1[3-9]\d{9}$/,
 *     message: '请输入有效的手机号码',
 *     required: true
 *   })
 *   phone: string
 *
 *   @ValidateByRegex({
 *     description: '邮政编码',
 *     example: '100000',
 *     regex: /^\d{6}$/,
 *     message: '邮政编码必须是6位数字',
 *     required: false
 *   })
 *   zipCode?: string
 * }
 * ```
 *
 * @param options 验证选项配置
 * @returns 装饰器函数
 */
export function ValidateByRegex(options: ValidateRegexOptions) {
  // 参数验证
  if (!options.description) {
    throw new Error('ValidateByRegex: description is required')
  }

  if (!options.regex) {
    throw new Error('ValidateByRegex: regex is required')
  }

  // 构建API属性配置
  const apiPropertyOptions: ApiPropertyOptions = {
    description: options.description,
    example: options.example,
    required: options.required ?? true,
    default: options.default,
    nullable: !(options.required ?? true),
    type: String,
    pattern: options.regex.source,
  }

  // 基础装饰器
  const decorators = [
    ApiProperty(apiPropertyOptions),
    IsString({ message: '必须是字符串类型' }),
    Matches(options.regex, {
      message: options.message || '格式不正确',
    }),
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
