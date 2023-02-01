/**
 * 密码（密码至少包含大小写字母、数字、特殊字符、8~16位！）
 */
export const validPsw =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!_#%&@*.?+$^[\](){}|/\\])[0-9A-Za-z!_#%&@*.?+$^[\](){}|/\\].{7,15}$/

/**
 * 手机号码或者固话或者特殊电话
 */
export const validPhoneTelSpa =
  /^((1[0-2|6-9]\d{+})|([0-9]{3,4}-)?[0-9]{7,8}|(1[3-9]\d{9}))$/

/**
 * 手机号码或者固话
 */
export const validPhoneTel = /^(([0-9]{3,4}-)?[0-9]{7,8}|(1[3-9]\d{9}))$/

/**
 * 固话
 */
export const validTel = /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/

/**
 * 手机号
 */
export const validPhone = /^1[3-9]\d{9}$/

/**
 * 微信号
 */
export const validWeChartAccount = /^[a-zA-Z][a-zA-Z\d_-]{5,19}$/

/**
 * 社会信用代码
 */
export const validSocialCredit = /(?!^[A-Z]+$)[0-9A-Z]{18}/
