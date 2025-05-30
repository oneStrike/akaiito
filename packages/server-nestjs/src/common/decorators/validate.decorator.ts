import type { TransformFnParams } from 'class-transformer'
import { applyDecorators } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  IsDate,
  IsISO8601,
  IsJSON,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator'

interface ValidateOptions {
  description: string
  example?: string
  required?: boolean
  default?: string
  transform?: (params: TransformFnParams) => any
}

interface ValidateNumberOptions
  extends Pick<ValidateOptions, 'description' | 'required'> {
  example?: number
  max?: number
  min?: number
  default?: number
}

interface ValidateDateOptions extends Omit<ValidateOptions, 'default'> {
  default?: Date | null
}

interface ValidateStringOptions extends ValidateOptions {
  type?: 'ISO8601'
}

/**
 * 校验字符串类型
 */
export function ValidateString(options: ValidateStringOptions) {
  const decorators = [
    ApiProperty({
      description: options.description,
      example: options.example,
      required: options.required,
      default: options.default,
    }),
    IsString(),
  ]

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
  const decorators = [
    ApiProperty({
      description: options.description,
      example: options.example,
      required: options.required,
      default: options.default,
    }),
    IsNumber(),
  ]
  if (!options.required) {
    decorators.push(IsOptional)
  }
  if (typeof options.min === 'number') {
    decorators.push(Min(options.min))
  }
  if (typeof options.max === 'number') {
    decorators.push(Max(options.max))
  }

  if (typeof options.default === 'number') {
    decorators.push(Transform(({ value }) => Number(value) || options.default))
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
