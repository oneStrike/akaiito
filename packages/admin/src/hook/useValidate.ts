import type { FormItemRule } from 'naive-ui'
import { utils } from '@/utils/index'

const { validEmail, validPhone, validPsw } = utils.validate

const required = (options: FormItemRule) => {
  const { type, message, trigger } = options
  return {
    required: true,
    type,
    message: message + '不能为空',
    trigger
  }
}

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

export const useValidate = {
  required,
  len: (options: Omit<LenOptions, 'validateType'>) =>
    lengthRule({ ...options, validateType: 'len' }),
  min: (options: Omit<LenOptions, 'validateType'>) =>
    lengthRule({ ...options, validateType: 'min' }),
  max: (options: Omit<LenOptions, 'validateType'>) =>
    lengthRule({ ...options, validateType: 'max' }),
  between: (options: BetweenRuleOptions) => betweenRule(options),
  password: validator(validPsw, '密码'),
  mobile: validator(validPhone, '手机号'),
  email: validator(validEmail, '邮箱')
}
