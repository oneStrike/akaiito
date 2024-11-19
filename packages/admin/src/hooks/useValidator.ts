import type { Rule } from 'ant-design-vue/es/form'

enum TRIGGER_ENUM {
  BLUR = 'blur',
  CHANGE = 'change',
}

const validateOptions = {
  password: {
    trigger: TRIGGER_ENUM.BLUR,
    reg: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-z\s]).{8,18}$/,
    requiredMessage: '密码不能为空',
    errorMessage: '密码规则不符合',
  },
  phone: {
    trigger: TRIGGER_ENUM.BLUR,
    reg: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
    requiredMessage: '手机号不能为空',
    errorMessage: '请输入正确的手机号',
  },
  email: {
    trigger: TRIGGER_ENUM.BLUR,
    reg: /^[A-Z0-9\u4E00-\u9FA5]+@[\w-]+(\.[\w-]+)+$/i,
    requiredMessage: '邮箱不能为空',
    errorMessage: '请输入正确的邮箱',
  },
}

const validator = (tips: string, trigger: TRIGGER_ENUM = TRIGGER_ENUM.BLUR): Rule[] => [
  { required: true, message: `${tips}不能为空`, trigger },
]

const validateHandler = {
  validator,
} as Record<keyof typeof validateOptions, Rule[]> & { validator: typeof validator }

Object.keys(validateOptions).forEach((item) => {
  const { reg, requiredMessage, errorMessage, trigger } = validateOptions[item as keyof typeof validateOptions]
  const validator = (rule: any, value: any) => {
    if (!value) {
      return Promise.reject(new Error(requiredMessage))
    } else if (!reg.test(value)) {
      return Promise.reject(new Error(errorMessage))
    } else {
      return Promise.resolve()
    }
  }
  validateHandler[item as keyof typeof validateOptions] = [{ required: true, validator, trigger }]
})

export const useValidator = validateHandler
