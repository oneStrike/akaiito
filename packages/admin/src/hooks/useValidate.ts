import type { FormItemRule } from 'naive-ui'
import { utils } from '@/utils/index'

// 导入验证函数
const { validEmail, validPhone, validPsw, validUrl } = utils.validate

// 必填验证规则
const required = (options: FormItemRule) => {
  const { type = 'any', message, trigger } = options
  return {
    required: true,
    type,
    message: message + '不能为空',
    trigger
  }
}

// 长度验证规则
interface LenOptions {
  message: string
  validateType: 'max' | 'min' | 'len'
  type?: FormItemRule['type']
  value: number
  trigger?: FormItemRule['trigger']
}

const lengthRule = (options: LenOptions) => {
  const { type, value, trigger, validateType, message } = options
  let typeText = ''
  switch (validateType) {
    case 'len':
      typeText = '只能'
      break
    case 'max':
      typeText = '最多'
      break
    case 'min':
      typeText = '最少'
  }
  return {
    required: true,
    type,
    message: `${message}不能为空且${typeText + value}位字符`,
    trigger,
    [validateType]: value
  }
}

// 范围验证规则
interface BetweenRuleOptions
  extends Pick<FormItemRule, 'type' | 'min' | 'max' | 'trigger' | 'message'> {}

const betweenRule = (options: BetweenRuleOptions) => {
  const { type, min, max, trigger, message } = options
  return {
    required: true,
    type,
    message: `${message}不能为空且${min + '至' + max}位字符之间`,
    min,
    max,
    trigger
  }
}

// 自定义验证规则
const validator = (reg: RegExp, message: string) => {
  return {
    trigger: 'blur',
    required: true,
    validator: (rule: FormItemRule, value: string) => {
      if (!value) {
        return new Error(message + '不能为空')
      } else if (!reg.test(value)) {
        return new Error(message + '规则不符合')
      }
      return true
    }
  }
}

// 导出验证规则
export const useValidate = {
  required, // 必填验证
  len: (options: Omit<LenOptions, 'validateType'>) =>
    lengthRule({ ...options, validateType: 'len' }), // 长度验证
  min: (options: Omit<LenOptions, 'validateType'>) =>
    lengthRule({ ...options, validateType: 'min' }), // 最小长度验证
  max: (options: Omit<LenOptions, 'validateType'>) =>
    lengthRule({ ...options, validateType: 'max' }), // 最大长度验证
  between: (options: BetweenRuleOptions) => betweenRule(options), // 范围验证
  password: validator(validPsw, '密码'), // 密码验证
  mobile: validator(validPhone, '手机号'), // 手机号验证
  email: validator(validEmail, '邮箱'), // 邮箱验证
  url: validator(validUrl, '链接') // 链接验证
}
