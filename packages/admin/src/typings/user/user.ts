import type { UserUserInfoResponse } from '@/typings/httpTypes/user/userInfo'
import type { UserLoginResponse } from '@/typings/httpTypes/user/login'

/**
 * 用户信息
 */
export type TUserInfo = UserUserInfoResponse

/**
 * token信息
 */
export interface ITokenInfo {
  token: UserLoginResponse['token']
  refreshToken: UserLoginResponse['refreshToken']
  tokenExpiredAt: number | null
  refreshTokenExpiredAt: number | null
}

/**
 * token类型
 */
export type TTokenType = 'token' | 'refreshToken'
