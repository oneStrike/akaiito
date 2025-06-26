import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  IsISO8601,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator'
import { ValidateStringOptions } from './types'

/**
 * 字符串类型验证装饰器
 *
 * @description 用于验证字符串类型的字段，支持长度限制、密码强度验证、ISO8601日期格式等
 *
 * @example
 * ```typescript
 * class CreateUserDto {
 *   @ValidateString({
 *     description: '用户名',
 *     example: 'john_doe',
 *     minLength: 3,
 *     maxLength: 20,
 *     required: true
 *   })
 *   username: string
 *
 *   @ValidateString({
 *     description: '用户密码',
 *     password: true,
 *     required: true
 *   })
 *   password: string
 * }
 * ```
 *
 * @param options 验证选项配置
 * @returns 装饰器函数
 */
export function ValidateString(options: ValidateStringOptions) {
  // 参数验证
  if (!options.description) {
    throw new Error('ValidateString: description is required')
  }

  if (
    options.minLength &&
    options.maxLength &&
    options.minLength > options.maxLength
  ) {
    throw new Error(
      'ValidateString: minLength should not be greater than maxLength',
    )
  }

  // 构建API属性配置
  const apiPropertyOptions: ApiPropertyOptions = {
    description: options.description,
    example: options.example,
    required: options.required ?? true,
    default: options.default,
    nullable: !(options.required ?? true),
    type: String,
  }

  // 添加长度限制到API文档
  if (options.minLength !== undefined || options.maxLength !== undefined) {
    apiPropertyOptions.minLength = options.minLength
    apiPropertyOptions.maxLength = options.maxLength
  }

  // 基础装饰器
  const decorators = [
    ApiProperty(apiPropertyOptions),
    IsString({ message: '必须是字符串类型' }),
  ]

  // 密码强度验证
  if (options.password) {
    decorators.push(
      IsStrongPassword(
        {
          minLength: 8,
          minUppercase: 1,
          minLowercase: 1,
          minSymbols: 1,
        },
        {
          message: '密码必须包含至少8个字符，包括大写字母、小写字母和特殊符号',
        },
      ),
    )
  }

  // 长度验证
  if (options.maxLength !== undefined) {
    decorators.push(
      MaxLength(options.maxLength, {
        message: `字符串长度不能超过${options.maxLength}个字符`,
      }),
    )
  }

  if (options.minLength !== undefined) {
    decorators.push(
      MinLength(options.minLength, {
        message: `字符串长度不能少于${options.minLength}个字符`,
      }),
    )
  }

  // ISO8601日期格式验证
  if (options.type === 'ISO8601') {
    decorators.push(IsISO8601({}, { message: '必须是有效的ISO8601日期格式' }))
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
