import { utils } from '@/utils'

// 导入验证函数
const { validEmail, validPhone, validPwd, validUrl } = utils.regexp

// 必填验证规则
function required(label: string, trigger?: 'blue' | 'change') {
  return {
    required: true,
    message: `${label}不能为空`,
    trigger,
  }
}

// 自定义验证规则
function validator(reg: RegExp, message: string, required = true) {
  return {
    trigger: 'blur',
    validator: (rule: any, value: any, callback: any) => {
      if (!value && required) {
        return callback(new Error(`${message}不能为空`))
      } else if (value && !reg.test(value)) {
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
  password: (required = true, text = '密码') => validator(validPwd, text, required), // 密码验证
  mobile: (required = true, text = '手机号') => validator(validPhone, text, required), // 手机号验证
  email: (required = true, text = '邮箱') => validator(validEmail, text, required), // 邮箱验证
  url: (required = true, text = '链接') => validator(validUrl, text, required), // 链接验证
}
