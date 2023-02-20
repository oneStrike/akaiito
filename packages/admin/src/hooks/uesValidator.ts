import { validEmail, validPhone, validPsw } from '@/utils/regexp'
import type { FieldRule } from '@arco-design/web-vue'

const normal = (tips: string): FieldRule[] => [
  { required: true, message: tips + '不能为空' }
]

const validator = (validator: FieldRule['validator']): FieldRule[] => [
  { required: true, validator }
]

const passwordRule: FieldRule['validator'] = (value, callback) => {
  if (!value) {
    callback('密码不能为空')
  } else if (!validPsw.test(value)) {
    callback('密码规则不符合')
  } else {
    callback()
  }
}

const mobileRule: FieldRule['validator'] = (value, callback) => {
  if (!value) {
    callback('手机号不能为空')
  } else if (!validPhone.test(value)) {
    callback('请输入正确的手机号')
  } else {
    callback()
  }
}

const emailRule: FieldRule['validator'] = (value, callback) => {
  if (!value) {
    callback('邮箱不能为空')
  } else if (!validEmail.test(value)) {
    callback('请输入正确的邮箱')
  } else {
    callback()
  }
}
export const useValidate = {
  normal,
  pwd: validator(passwordRule),
  mobile: validator(mobileRule),
  email: validator(emailRule)
}
