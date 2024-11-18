import type { Rule } from 'ant-design-vue/es/form'
import type { ValidatorRule } from 'ant-design-vue/es/form/interface'
import { validEmail, validPhone, validPsw } from '@/utils/regexp'

const normal = (tips: string, trigger: 'blur' | 'change' = 'blur'): Rule[] => [
  { required: true, message: `${tips}不能为空`, trigger },
]

const validator = (validator: ValidatorRule['validator'], trigger: 'blur' | 'change' = 'blur'): Rule[] => [
  { required: true, validator, trigger },
]

const passwordRule = (rule: any, value: any) => {
  if (!value) {
    return Promise.reject(new Error('密码不能为空'))
  } else if (!validPsw.test(value)) {
    return Promise.reject(new Error('密码规则不符合'))
  } else {
    return Promise.resolve()
  }
}

const mobileRule = (rule: any, value: any) => {
  if (!value) {
    return Promise.reject(new Error('手机号不能为空'))
  } else if (!validPhone.test(value)) {
    return Promise.reject(new Error('请输入正确的手机号'))
  } else {
    return Promise.resolve()
  }
}

const emailRule = (rule: any, value: any) => {
  if (!value) {
    return Promise.reject(new Error('邮箱不能为空'))
  } else if (!validEmail.test(value)) {
    return Promise.reject(new Error('请输入正确的邮箱'))
  } else {
    return Promise.resolve()
  }
}
export const useValidate = {
  normal,
  pwd: validator(passwordRule),
  mobile: validator(mobileRule),
  email: validator(emailRule),
}
