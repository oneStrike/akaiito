import { httpHandler } from '@/utils/request'
import type {
  JwtGetTokenRequest,
  JwtGetTokenResponse,
  JwtValidateTokenResponse,
  JwtRefreshTokenResponse
} from './types/jwt.d'

/**
 *  @标签 JWT令牌部分/获取令牌
 *  @方式 POST
 *  @地址 /wp-json/zib-app/v1/jwt/get-token
 *  @更新时间 2025-07-17 21:47:34
 */
export const jwtGetTokenApi = (params: JwtGetTokenRequest): Promise<JwtGetTokenResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/wp-json/zib-app/v1/jwt/get-token',
    headers: {},
    data: params,
  })
}

/**
 *  @标签 JWT令牌部分/验证令牌
 *  @方式 GET
 *  @地址 /wp-json/zib-app/v1/jwt/validate-token
 *  @更新时间 2025-07-17 21:47:34
 */
export const jwtValidateTokenApi = (): Promise<JwtValidateTokenResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/wp-json/zib-app/v1/jwt/validate-token',
    headers: {},
  })
}

/**
 *  @标签 JWT令牌部分/刷新令牌
 *  @方式 POST
 *  @地址 /wp-json/zib-app/v1/jwt/refresh-token
 *  @更新时间 2025-07-17 21:47:34
 */
export const jwtRefreshTokenApi = (): Promise<JwtRefreshTokenResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/wp-json/zib-app/v1/jwt/refresh-token',
    headers: {},
  })
}
