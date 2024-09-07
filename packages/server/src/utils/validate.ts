import { RuleType } from '@midwayjs/validate'
import { utils } from './index'

/**
 * 限定为字符串类型
 */
export const validateString = RuleType.string().empty('')

/**
 * 限定为必传字符串类型
 */
export const requiredString = validateString.required()

/**
 * 指定长度字符串
 * @param length
 */
export const specifyLengthString = (length: number) => requiredString.length(length)

/**
 * 指定长度范围的字符串
 * @param min 最小长度，缺省 1
 * @param max 最大长度 缺省 99
 */
export const scopeLengthString = (min = 1, max = 99) => requiredString.min(min).max(max)

/**
 * 多类型校验
 * @param values
 */
export const multiTypeChecks = (values: any[]) => RuleType.alternatives(values)

/**
 * 限定为邮箱
 */
export const validateEmail = requiredString.email()

/**
 * 限定为密码（至少包含大小写字母、数字、特殊字符、8~16位！）
 */
export const validatePwd = requiredString.pattern(utils.validate.validPwd)

/**
 * 限定为国内手机号
 */
export const validatePhone = requiredString.pattern(utils.validate.validPhone)

/**
 /**
 * 限定为url
 */
export const validateUrl = requiredString.uri()

/**
 * 限定为数字类型
 */
export const validateNumber = RuleType.number().empty('')

/**
 * 限定为必传数字类型
 */
export const requiredNumber = validateNumber.required()

/**
 * 数字小于
 */
export const validateNumberLess = (less: number) => RuleType.number().less(less).empty('')

/**
 * 限定为必传数字小于
 */
export function requiredNumberLess(less: number) {
  return validateNumberLess(less).required()
}

/**
 * 限定为给定值
 * @param values 给定值
 * @param isRequired 是否必须
 */
export function givenValue(values: any[], isRequired = true) {
  values.push(...values.map((item) => item.toString()))
  const rule = RuleType.valid(...utils._.uniq(values))
  return isRequired ? rule.required() : rule.empty([''])
}

/**
 * 限定为给定范围，仅限数字类型
 * @param values 给定值
 * @param isRequired 是否必须
 */
export function givenRange([max, min]: [number, number], isRequired = true) {
  const rule = validateNumber.max(max).min(min)
  return isRequired ? rule.required() : rule
}

/**
 * 限定为日期类型
 */
export const validateDate = RuleType.date().empty('')

/**
 * 限定为必传日期类型
 */
export const requiredDate = validateDate.required()

/**
 * 数字类型的数组
 */
export const validateNumberArray = RuleType.array().items(requiredNumber)
/**
 * 限定为数字类型的数组
 */
export const requiredNumberArray = RuleType.array().items(requiredNumber).required()
