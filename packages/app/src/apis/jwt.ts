import { httpHandler } from '@/utils/request'
import type { PostJwtGetTokenRequest, PostJwtGetTokenResponse, GetJwtValidateTokenRequest, GetJwtValidateTokenResponse, PostJwtRefreshTokenRequest, PostJwtRefreshTokenResponse } from './types/jwt.d'

/**
 *  @标签 JWT令牌部分/获取令牌
 *  @方式 POST
 *  @地址 /wp-json/zib-app/v1/jwt/get-token
 *  @更新时间 2025-07-17 02:43:09
 */
export const postJwtGetTokenApi = (params: PostJwtGetTokenRequest): Promise<PostJwtGetTokenResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/wp-json/zib-app/v1/jwt/get-token',
    data: params
  })
}

/**
 *  @标签 JWT令牌部分/验证令牌
 *  @方式 GET
 *  @地址 /wp-json/zib-app/v1/jwt/validate-token
 *  @更新时间 2025-07-17 02:43:09
 */
export const getJwtValidateTokenApi = (params: GetJwtValidateTokenRequest): Promise<GetJwtValidateTokenResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/wp-json/zib-app/v1/jwt/validate-token',
    params
  })
}

/**
 *  @标签 JWT令牌部分/刷新令牌
 *  @方式 POST
 *  @地址 /wp-json/zib-app/v1/jwt/refresh-token
 *  @更新时间 2025-07-17 02:43:09
 */
export const postJwtRefreshTokenApi = (params: PostJwtRefreshTokenRequest): Promise<PostJwtRefreshTokenResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/wp-json/zib-app/v1/jwt/refresh-token',
    data: params
  })
}
