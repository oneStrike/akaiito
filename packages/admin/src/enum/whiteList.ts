export enum ApiWhiteListEnum {
  LOGIN = '/admin/user/login', //登录
  CAPTCHA = '/open/captcha/getCaptcha', //获取验证码
  REFRESH_TOKEN = '/admin/user/refreshToken', //刷新token
  PRIVACY_DETAIL = '/admin/privacy/getPrivacyDetail' //获取隐私协议详情
}

export enum RouterWhiteListEnum {
  viewPrivacy = 'viewPrivacy'
}
