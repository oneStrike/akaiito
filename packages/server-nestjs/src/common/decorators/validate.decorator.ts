import type { TransformFnParams } from 'class-transformer'
import { applyDecorators } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator'

interface ValidateOptions {
  description: string
  example?: string
  required?: boolean
  default?: string
  transform?: (params: TransformFnParams) => any
}

interface ValidateNumberOptions
  extends Pick<ValidateOptions, 'description' | 'required' | 'transform'> {
  example?: number
  max?: number
  min?: number
  default?: number
}

interface ValidateNumberArrayOptions
  extends Pick<ValidateOptions, 'description' | 'required' | 'transform'> {
  example?: number[]
  maxLength?: number
  minLength?: number
  default?: number[]
}

interface ValidateDateOptions extends Omit<ValidateOptions, 'default'> {
  default?: Date | null
}

interface ValidateBooleanOptions
  extends Pick<ValidateOptions, 'description' | 'required'> {
  example?: boolean
  default?: boolean
}

interface ValidateStringOptions extends ValidateOptions {
  type?: 'ISO8601'
  maxLength?: number
  minLength?: number
  password?: boolean
}

interface ValidateRegexOptions extends ValidateOptions {
  regex: RegExp
  message?: string
}

/**
 * 校验字符串类型
 * @param options
 * @constructor
 */
export function ValidateString(options: ValidateStringOptions) {
  const decorators = [
    ApiProperty({
      description: options.description,
      example: options.example,
      required: options.required,
      default: options.default,
      nullable: !options.required,
    }),
    IsString(),
  ]
  if (options.password) {
    decorators.push(
      IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minSymbols: 1,
      }),
    )
  }

  if (options.maxLength) {
    decorators.push(MaxLength(options.maxLength))
  }
  if (options.minLength) {
    decorators.push(MinLength(options.minLength))
  }

  if (options.type === 'ISO8601') {
    decorators.push(IsISO8601())
  }

  if (!options.required) {
    decorators.push(IsOptional())
  }
  if (options.transform) {
    decorators.push(Transform(options.transform))
  }
  return applyDecorators(...decorators)
}

/**
 * 校验数字类型
 * @param options
 * @constructor
 */
export function ValidateNumber(options: ValidateNumberOptions) {
  // 验证options参数的有效性
  if (
    typeof options.min === 'number' &&
    typeof options.max === 'number' &&
    options.min > options.max
  ) {
    throw new Error('min value should not be greater than max value')
  }

  // 创建基础装饰器
  const decorators = [
    ApiProperty({
      description: options.description,
      example: options.example,
      required: options.required,
      default: options.default,
    }),
    IsNumber(),
    IsNotEmpty(),
  ]

  // 添加可选验证
  if (!options.required) {
    decorators.push(IsOptional())
  }

  // 添加范围验证
  if (typeof options.min === 'number') {
    decorators.push(Min(options.min))
  }
  if (typeof options.max === 'number') {
    decorators.push(Max(options.max))
  }

  // 添加转换逻辑
  decorators.push(
    Transform((transformData) => {
      try {
        // 防止原型污染
        if (Object.prototype.hasOwnProperty.call(transformData, 'value')) {
          let returnValue = transformData.value
            ? Number(transformData.value)
            : transformData.value

          // 仅当值为空且有默认值时使用默认值
          if (
            (returnValue === undefined || returnValue === null) &&
            options.default !== undefined
          ) {
            returnValue = options.default
          }

          // 执行自定义转换
          if (options.transform) {
            returnValue = options.transform(transformData)
          }

          return returnValue
        }
        return transformData.value
      } catch (error) {
        // 记录并抛出转换错误
        console.error(`Transform error: ${error.message}`, error)
        throw error
      }
    }),
  )

  return applyDecorators(...decorators)
}

/**
 * 校验布尔类型
 * @param options
 * @constructor
 */
export function ValidateBoolean(options: ValidateBooleanOptions) {
  const decorators = [
    ApiProperty({
      description: options.description,
      example: options.example,
      required: options.required,
      default: options.default,
    }),
    Transform(({ value }) => {
      // 处理默认值
      if (value === undefined || value === null) {
        return typeof options.default === 'boolean' ? options.default : value
      }

      // 处理布尔字符串转换
      if (typeof value === 'string') {
        const lowerValue = value.toLowerCase().trim()
        if (lowerValue === 'true' || lowerValue === '1') {
          return true
        }
        if (lowerValue === 'false' || lowerValue === '0') {
          return false
        }
      }

      return value
    }),
    IsBoolean(),
  ]

  if (!options.required) {
    decorators.push(IsOptional())
  }

  return applyDecorators(...decorators)
}

/**
 * 校验JSON类型
 * @param options
 * @constructor
 */
export function ValidateJson(options: ValidateOptions) {
  const decorators = [
    ApiProperty({
      description: options.description,
      example: options.example,
      required: options.required,
      default: options.default,
    }),
    IsJSON(),
  ]

  if (!options.required) {
    decorators.push(IsOptional())
  }
  if (options.transform) {
    decorators.push(Transform(options.transform))
  }
  if (options.default && !options.transform) {
    decorators.push(Transform(({ value }) => value || options.default))
  }
  return applyDecorators(...decorators)
}

/**
 * 校验日期类型
 * @param options
 * @constructor
 */
export function ValidateDate(options: ValidateDateOptions) {
  const decorators = [
    ApiProperty({
      description: options.description,
      example: options.example,
      required: options.required,
      default: options.default,
    }),
    IsDate(),
  ]

  if (!options.required) {
    decorators.push(
      IsOptional(),
      Transform(({ value }) => {
        if (!value && !options.default) {
          return null
        } else {
          return value ? new Date(value) : options.default
        }
      }),
    )
  }
  if (options.transform) {
    decorators.push(Transform(options.transform))
  }

  return applyDecorators(...decorators)
}

/**
 * 校验数字数组类型
 * @param options
 * @constructor
 */
export function ValidateNumberArray(options: ValidateNumberArrayOptions) {
  const decorators = [
    ApiProperty({
      description: options.description,
      example: options.example,
      required: options.required,
      default: options.default,
      type: [Number],
    }),
    IsArray(),
    IsNumber({}, { each: true }),
    IsNotEmpty(),
  ]

  // 添加可选验证
  if (!options.required) {
    decorators.push(IsOptional())
  }

  // 添加长度验证
  if (typeof options.maxLength === 'number') {
    decorators.push(MaxLength(options.maxLength))
  }
  if (typeof options.minLength === 'number') {
    decorators.push(MinLength(options.minLength))
  }

  // 添加转换逻辑
  decorators.push(
    Transform((transformData) => {
      try {
        if (Object.prototype.hasOwnProperty.call(transformData, 'value')) {
          let returnValue = transformData.value
          if (Array.isArray(returnValue)) {
            returnValue = returnValue.map((item) =>
              item ? Number(item) : item,
            )
          }

          // 仅当值为空且有默认值时使用默认值
          if (
            (returnValue === undefined || returnValue === null) &&
            options.default !== undefined
          ) {
            returnValue = options.default
          }

          // 执行自定义转换
          if (options.transform) {
            returnValue = options.transform(transformData)
          }

          return returnValue
        }
        return transformData.value
      } catch (error) {
        // 记录并抛出转换错误
        console.error(`Transform error: ${error.message}`, error)
        throw error
      }
    }),
  )

  return applyDecorators(...decorators)
}

/**
 * 根据正则表达式自定义校验字符串
 * @param options
 * @constructor
 */
export function ValidateByRegex(options: ValidateRegexOptions) {
  const decorators = [
    ApiProperty({
      description: options.description,
      example: options.example,
      required: options.required,
      default: options.default,
      nullable: !options.required,
    }),
    IsString(),
    Matches(options.regex, {
      message: options.message || '格式不正确',
    }),
  ]

  if (!options.required) {
    decorators.push(IsOptional())
  }
  if (options.transform) {
    decorators.push(Transform(options.transform))
  }
  return applyDecorators(...decorators)
}
