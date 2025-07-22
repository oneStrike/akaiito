/**
 *  接口 [登录]
 *  @标签 用户部分/登录
 *  @方式 
 *  @地址 
 *  @更新时间 2025-07-22 08:26:37
 */
export interface UserLoginRequest {
  /* 用户名（支持手机号） */
  username?: string

  /* 密码 */
  password?: string

  /** 任意合法数值 */
  [property: string]: any
}

export type UserLoginResponse = {
  /* 用户ID */
  user_id: number

  /* 用户名 */
  username: string

  /* 访问令牌有效期（秒） */
  access_token_expires_in: number

  /* 刷新令牌有效期（秒） */
  refresh_token_expires_in: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [注册]
 *  @标签 用户部分/注册
 *  @方式 
 *  @地址 
 *  @更新时间 2025-07-22 08:26:37
 */
export interface UserRegisterRequest {
  /* 用户名 */
  name: string

  /* 密码 */
  password: string

  /* 手机号 */
  phone: string

  /** 任意合法数值 */
  [property: string]: any
}

export type UserRegisterResponse = {
  /* 用户唯一标识 */
  user_id: number

  /* 访问令牌有效期（秒） */
  access_token_expires_in: number

  /* 刷新令牌有效期（秒） */
  refresh_token_expires_in: number

  /** 任意合法数值 */
  [property: string]: any
}