import { validEmail, validPhone, validPsw } from '@/utils/validate'

export const requiredRule = (tips: string) => [
  { required: true, message: tips + '不能为空' }
]

export const passwordRule = [
  {
    validator: (rule: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else if (!validPsw.test(value)) {
        callback(new Error('密码规则不符合'))
      } else {
        callback()
      }
    }
  }
]

export const mobileRule = [
  requiredRule('手机号')[0],
  {
    validator: (rule: any, value: any, callback: any) => {
      if (!validPhone.test(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
  }
]

export const emailRule = [
  requiredRule('邮箱')[0],
  {
    validator: (rule: any, value: any, callback: any) => {
      if (!validEmail.test(value)) {
        callback(new Error('请输入正确的邮箱'))
      } else {
        callback()
      }
    }
  }
]
