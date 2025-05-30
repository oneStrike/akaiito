/**
 *  接口 [获取验证码](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-303134064)
 *  @标签 管理端用户模块/获取验证码
 *  @方式 GET
 *  @地址 /admin/user/getCaptcha
 *  @更新时间 2025-05-30 23:02:40
 */

/*  */
export type GetCaptchaTypesRes = {
  /* 验证码 key */
  id: string

  /* 验证码 */
  data: string
}

/**
 *  接口 [用户登录](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-303134065)
 *  @标签 管理端用户模块/用户登录
 *  @方式 POST
 *  @地址 /admin/user/login
 *  @更新时间 2025-05-30 23:02:40
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
 *  接口 [获取管理端用户分页列表](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-303134066)
 *  @标签 管理端用户模块/获取管理端用户分页列表
 *  @方式 GET
 *  @地址 /admin/user/getAdminUserPage
 *  @更新时间 2025-05-30 23:02:40
 */

export interface GetAdminUserPageTypesRes {
  /* 当前页码 */
  pageIndex: number

  /* 每页条数 */
  pageSize: number

  /* 总条数 */
  total: number

  /*  */
  items: undefined[]
}
