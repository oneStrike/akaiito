import { TransformFnParams } from 'class-transformer'

/**
 * 基础验证选项接口
 */
export interface BaseValidateOptions {
  /** 字段描述，用于API文档 */
  description: string
  /** 是否必填，默认为true */
  required?: boolean
  /** 自定义转换函数 */
  transform?: (params: TransformFnParams) => any
}

/**
 * 字符串验证选项
 */
export interface ValidateStringOptions extends BaseValidateOptions {
  /** 示例值 */
  example?: string | null
  /** 默认值 */
  default?: string
  /** 字符串类型，支持ISO8601日期格式 */
  type?: 'ISO8601'
  /** 最大长度 */
  maxLength?: number
  /** 最小长度 */
  minLength?: number
  /** 是否为强密码验证 */
  password?: boolean
}

/**
 * 数字验证选项
 */
export interface ValidateNumberOptions extends BaseValidateOptions {
  /** 示例值 */
  example?: number
  /** 最大值 */
  max?: number
  /** 最小值 */
  min?: number
  /** 默认值 */
  default?: number
}

/**
 * 数字数组验证选项
 */
export interface ValidateNumberArrayOptions extends BaseValidateOptions {
  /** 示例值 */
  example?: number[]
  /** 数组最大长度 */
  maxLength?: number
  /** 数组最小长度 */
  minLength?: number
  /** 默认值 */
  default?: number[]
}

/**
 * 日期验证选项
 */
export interface ValidateDateTimeOptions extends BaseValidateOptions {
  /** 示例值 */
  example?: string | Date | null
  /** 默认值 */
  default?: Date | null
}

/**
 * 布尔值验证选项
 */
export interface ValidateBooleanOptions extends BaseValidateOptions {
  /** 示例值 */
  example?: boolean
  /** 默认值 */
  default?: boolean
}

/**
 * JSON验证选项
 */
export interface ValidateJsonOptions extends BaseValidateOptions {
  /** 示例值 */
  example?: string | object | null
  /** 默认值 */
  default?: string
}

/**
 * 正则表达式验证选项
 */
export interface ValidateRegexOptions extends BaseValidateOptions {
  /** 示例值 */
  example?: string | null
  /** 默认值 */
  default?: string
  /** 正则表达式 */
  regex: RegExp
  /** 验证失败时的错误消息 */
  message?: string
}

/**
 * 枚举类型定义
 * 支持TypeScript原生枚举和手动定义的枚举对象
 */
export type EnumLike = Record<string | number, string | number>

/**
 * 数字枚举类型定义
 * 专门用于位掩码验证，支持TypeScript数字枚举的双向映射
 * 允许字符串键映射到数字值，数字键映射到字符串值（反向映射）
 */
export type NumberEnumLike =
  | Record<string, number>
  | Record<number, string>
  | (Record<string, number> & Record<number, string>)

/**
 * 枚举验证选项
 */
export interface ValidateEnumOptions extends BaseValidateOptions {
  /** 示例值 */
  example?: any
  /** 枚举对象，支持字符串和数字枚举 */
  enum: EnumLike
  /** 默认值 */
  default?: any
}

/**
 * 位掩码验证选项
 */
export interface ValidateBitmaskOptions extends BaseValidateOptions {
  /** 示例值 */
  example?: number
  /** 枚举对象，必须为数字枚举 */
  enum: NumberEnumLike
  /** 默认值 */
  default?: number
}
