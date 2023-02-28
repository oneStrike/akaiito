import { utils } from '@/utils/index'

/**
 * 必填检验
 */
const required = (label: string, trigger: 'blur' | 'change' = 'blur') => {
  return [{ required: true, message: label + '不能为空', trigger }]
}

/**
 * 密码检验
 */
const validatePwd = [
  ...required('密码'),
  {
    trigger: 'blur',
    validator: (rule: any, value: any, callback: any) => {
      if (!utils.validate.validPsw.test(value)) {
        callback(new Error('密码规则不符合'))
      } else {
        callback()
      }
    }
  }
]

/**
 * 邮箱
 */

const validateEmail = [
  ...required('邮箱'),
  {
    trigger: 'blur',
    validator: (rule: any, value: any, callback: any) => {
      if (!utils.validate.validEmail.test(value)) {
        callback(new Error('邮箱规则不符合'))
      } else {
        callback()
      }
    }
  }
]

/**
 * 手机号
 */

const validateMobile = [
  ...required('手机号'),
  {
    trigger: 'blur',
    validator: (rule: any, value: any, callback: any) => {
      if (!utils.validate.validPhone.test(value)) {
        callback(new Error('邮箱规则不符合'))
      } else {
        callback()
      }
    }
  }
]

export const useValidate = {
  required,
  validatePwd,
  validateEmail,
  validateMobile
}
