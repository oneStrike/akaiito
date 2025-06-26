import { applyDecorators } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNumber, IsOptional, Validate } from 'class-validator'
import { BitmaskValidator } from './bitmask-validator'
import { ValidateBitmaskOptions } from './types'
import { isNumberEnum } from './utils'

/**
 * 位掩码验证装饰器
 *
 * @description 用于验证位掩码值是否为指定数字枚举的有效组合
 *
 * @example
 * ```typescript
 * enum Permission {
 *   READ = 1,
 *   WRITE = 2,
 *   DELETE = 4,
 *   ADMIN = 8
 * }
 *
 * class CreateRoleDto {
 *   @ValidateBitmask({
 *     description: '权限位掩码',
 *     example: 7, // READ | WRITE | DELETE
 *     enum: Permission,
 *     required: true
 *   })
 *   permissions: number
 *
 *   @ValidateBitmask({
 *     description: '扩展权限',
 *     example: 0,
 *     enum: Permission,
 *     default: 0,
 *     required: false
 *   })
 *   extendedPermissions?: number
 * }
 * ```
 *
 * @param options 验证选项配置
 * @returns 装饰器函数
 */
export function ValidateBitmask(options: ValidateBitmaskOptions) {
  // 参数验证
  if (!options.description) {
    throw new Error('ValidateBitmask: description is required')
  }

  if (!options.enum) {
    throw new Error('ValidateBitmask: enum is required')
  }

  if (!isNumberEnum(options.enum)) {
    throw new Error('ValidateBitmask: enum must be a number enum')
  }

  // 计算有效范围
  const enumValues = Object.values(options.enum).filter(
    (value): value is number => typeof value === 'number',
  )
  const maxValue = enumValues.reduce((acc, value) => acc | value, 0)

  // 构建API属性配置
  const apiPropertyOptions: ApiPropertyOptions = {
    description: options.description,
    example: options.example,
    required: options.required ?? true,
    default: options.default,
    nullable: !(options.required ?? true),
    type: Number,
    minimum: 0,
    maximum: maxValue,
  }

  // 基础装饰器
  const decorators = [
    ApiProperty(apiPropertyOptions),
    IsNumber({}, { message: '必须是数字类型' }),
    Validate(BitmaskValidator, [options.enum], {
      message: '位掩码值无效',
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

      // 处理空值和可选字段
      if (value === undefined || value === null) {
        return value
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
