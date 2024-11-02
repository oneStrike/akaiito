import type { MakeRequired } from '@/types/global'
import type { UniFormsValidateFunction } from '@uni-helper/uni-types'

export type RulesType = {
  [K in keyof typeof regexpMapping]?: {
    validateFunction: UniFormsValidateFunction
  }
}

export const regexpMapping = {
  // 中文姓名
  chineseName: {
    regexp: /^[\u4E00-\u9FA5·]{2,16}$/,
    message: '请输入正确的中文姓名',
  },
  // 手机号码
  phone: {
    regexp:
      /^(13\d|14[014-9]|15[0-35-9]|16[2567]|17[0-8]|18\d|19[0-35-9])\d{8}$/,
    message: '请输入正确的手机号',
  },

  // 电话号码
  phoneTelSpa: {
    regexp:
      /^\+?\d{0,3}-?(13|14|15|16|17|18|19)\d{9}|0\d{2,3}-\d{7,8}|^0\d{2,3}-\d{7,8}-\d{1,4}$/,
    message: '请输入正确的联系电话',
  },

  // 身份证号码
  idCard: {
    regexp:
      /^\d{6}(18|19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$|^\d{8}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}$/,
    message: '请输入正确的身份证号码',
  },

  // 邮箱
  email: {
    regexp:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: '请输入正确的邮箱地址',
  },

  // 密码
  password: {
    regexp:/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
    message: '密码必须包含字母和数字，长度在6-16之间',
  },
}

export const handlerIdCard = (value: any) => {
  const provinceAndCity = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 ',
  }

  const { regexp } = regexpMapping.idCard
  let res =
    regexp.test(value) &&
    provinceAndCity[value.substring(0, 2) as keyof typeof provinceAndCity]

  if (res && value.length === 18) {
    const a = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]
    let s = 0
    let l = 0

    for (; l < 17; l++) {
      s += Number.parseInt(value.charAt(l), 10) * a[l]
    }

    if ('10X98765432'.charAt(s % 11) !== value.charAt(17)) {
      res = false
    }
  } else if (value.length === 15) {
    // 处理 15 位身份证号
    // 这里可以添加额外的验证逻辑
  }
  return res
}

// 验证身份证号码
const idCardValidator: { validateFunction: UniFormsValidateFunction } = {
  validateFunction: (rule, value, data, callback) => {
    if (handlerIdCard(value)) {
      return true
    } else {
      callback(regexpMapping.idCard.message)
    }
  },
}

const generate = () => {
  const rules: RulesType = { idCard: idCardValidator }

  for (const regexpMappingKey in regexpMapping) {
    rules[regexpMappingKey as keyof typeof regexpMapping] = {
      validateFunction: (rule, value, data, callback) => {
        const { regexp, message } =
          regexpMapping[regexpMappingKey as keyof typeof regexpMapping]
        if (regexp.test(value)) {
          return true
        } else {
          return callback(message)
        }
      },
    }
  }
  return rules
}

export const rules = generate() as MakeRequired<RulesType>
