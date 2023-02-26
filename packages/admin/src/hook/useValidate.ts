import { validEmail, validPhone, validPsw } from '@/utils/validate'
import type { FormItemRule } from 'naive-ui'

const required = (message: string, trigger = 'blur') => {
  return { required: true, message: message + '不能为空', trigger }
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
  password: validator(validPsw, '密码'),
  mobile: validator(validPhone, '手机号'),
  email: validator(validEmail, '邮箱')
}
