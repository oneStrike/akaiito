/**
 *  接口 [注册](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-229394123)
 *  @标签 用户/注册
 *  @方式 POST
 *  @地址 /api/v3/register
 *  @更新时间 2024-11-02 11:44:35
 */

export interface RegisterTypesReq {
  /* 用户名 */
  username: string

  /* 密码 */
  password: string
}

/*  */
export type RegisterTypesRes = undefined

/**
 *  接口 [登录](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-229415236)
 *  @标签 用户/登录
 *  @方式 POST
 *  @地址 /api/v3/login
 *  @更新时间 2024-11-02 15:30:35
 */

export interface LoginTypesReq {
  /* 用户名 */
  username: string

  /* 密码 */
  password: string

  /* 加密盐 */
  salt?: string
}

/*  */
export type LoginTypesRes = undefined
