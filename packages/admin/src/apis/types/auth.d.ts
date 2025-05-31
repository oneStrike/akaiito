/**
 *  接口 [管理员登录](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303144583)
 *  @标签 管理端认证模块/管理员登录
 *  @方式 POST
 *  @地址 /api/admin/auth/login
 *  @更新时间 2025-05-31 03:40:15
 */

export interface LoginTypesReq {
  /* 用户名 */
  username: string

  /* 密码 */
  password: string

  /* 验证码 */
  captcha: string

  /* 验证码ID */
  captchaId: string
}

/*  */
export type LoginTypesRes = {
  /* 用户名 */
  username: string

  /* 密码 */
  password: string

  /* 验证码 */
  captcha: string

  /* 验证码ID */
  captchaId: string
}

/**
 *  接口 [刷新令牌](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303144584)
 *  @标签 管理端认证模块/刷新令牌
 *  @方式 POST
 *  @地址 /api/admin/auth/refresh
 *  @更新时间 2025-05-31 03:40:15
 */

export interface RefreshTypesReq {
  /* 刷新令牌 */
  refreshToken: string
}

/*  */
export type RefreshTypesRes = {
  /* 刷新令牌 */
  refreshToken: string
}

/**
 *  接口 [管理员登出](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303144585)
 *  @标签 管理端认证模块/管理员登出
 *  @方式 POST
 *  @地址 /api/admin/auth/logout
 *  @更新时间 2025-05-31 03:40:15
 */

/*  */
export type LogoutTypesRes = any

/**
 *  接口 [获取当前用户信息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303144586)
 *  @标签 管理端认证模块/获取当前用户信息
 *  @方式 POST
 *  @地址 /api/admin/auth/profile
 *  @更新时间 2025-05-31 03:40:15
 */

/*  */
export type ProfileTypesRes = any
