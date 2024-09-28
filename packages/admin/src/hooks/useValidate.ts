import { utils } from '@/utils'

// 导入验证函数
const { validEmail, validPhone, validPwd, validUrl } = utils.validate

// 必填验证规则
function required(label: string, trigger?: 'blue' | 'change') {
  return {
    required: true,
    message: `${label}不能为空`,
    trigger,
  }
}

// 自定义验证规则
function validator(reg: RegExp, message: string) {
  return {
    trigger: 'blur',
    validator: (rule: any, value: any, callback: any) => {
      if (!value) {
        return callback(new Error(`${message}不能为空`))
      } else if (!reg.test(value)) {
        return callback(new Error(`${message}规则不符合`))
      } else {
        callback()
      }
    },
  }
}

// 导出验证规则
export const useValidate = {
  required, // 必填验证
  password: validator(validPwd, '密码'), // 密码验证
  mobile: validator(validPhone, '手机号'), // 手机号验证
  email: validator(validEmail, '邮箱'), // 邮箱验证
  url: validator(validUrl, '链接'), // 链接验证
}
