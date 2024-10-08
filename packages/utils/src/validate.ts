/**
 * 密码强度校验，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
 */
const validPwd = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*.? ])\S*$/

/**
 * 手机号，起始位置为1即可
 */
export const validPhone = /^(?:(?:\+|00)86)?1\d{10}$/

/**
 * 邮箱
 */
const validEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i

/**
 * url
 */
const validUrl =
  /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/

export const validate = {
  validPwd,
  validPhone,
  validEmail,
  validUrl,
}
