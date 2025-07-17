/**
 *  接口 [获取令牌]
 *  @标签 JWT令牌部分/获取令牌
 *  @方式 
 *  @地址 
 *  @更新时间 2025-07-17 16:53:45
 */
export interface JwtGetTokenRequest {
  /* 用户名 */
  username: string

  /* 密码 */
  password: string

  /** 任意合法数值 */
  [property: string]: any
}

export type JwtGetTokenResponse = {
  /* 用户唯一标识 */
  id: number

  /* 登录用户名： */
  username: string

  /* 显示名称 */
  display_name: string

  /* 用户角色列表 */
  roles: string[]

  /* 访问令牌有效期（秒） */
  access_token_expires_in: number

  /* 刷新令牌有效期（秒） */
  refresh_token_expires_in: number

  /** 任意合法数值 */
  [property: string]: any
}

export type JwtValidateTokenResponse = {
  /* 令牌有效性标识：true表示令牌当前可正常使用 */
  valid: boolean

  /* 剩余有效期（秒） */
  expires_in: number

  /* 令牌签发时间（时间戳）：对应Unix时间 */
  issued_at: number

  /* 关联用户ID */
  user_id: number

  /* 用户角色列表 */
  roles: string[]

  /** 任意合法数值 */
  [property: string]: any
}

export type JwtRefreshTokenResponse = {
  /* 新访问令牌的有效期（单位：秒） */
  access_token_expires_in: number

  /* 新刷新令牌的有效期（单位：秒） */
  refresh_token_expires_in: number

  /** 任意合法数值 */
  [property: string]: any
}