import type { AdminUserInfoRes, AdminLoginRes } from '~@/apiTypes/user'

/**
 * 用户信息
 */
export type UserInfo = AdminUserInfoRes

/**
 * token信息
 */
export interface TokenInfo {
  token: AdminLoginRes['token']
  refreshToken: AdminLoginRes['refreshToken']
  tokenExpiredAt: number | null
  refreshTokenExpiredAt: number | null
}

/**
 * token类型
 */
export type TokenType = 'token' | 'refreshToken'
