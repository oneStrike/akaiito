import { httpHandler } from '@/utils/request'
import type {
  UserLoginRequest,
  UserLoginResponse,
  UserRegisterRequest,
  UserRegisterResponse
} from './types/user.d'

/**
 *  @标签 用户部分/登录
 *  @方式 GET
 *  @地址 /wp-json/zib-app/v1/user/login
 *  @更新时间 2025-07-22 08:26:37
 */
export const userLoginApi = (params: UserLoginRequest): Promise<UserLoginResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/wp-json/zib-app/v1/user/login',
    headers: {},
    params,
  })
}

/**
 *  @标签 用户部分/注册
 *  @方式 POST
 *  @地址 /wp-json/zib-app/v1/user/register
 *  @更新时间 2025-07-22 08:26:37
 */
export const userRegisterApi = (params: UserRegisterRequest): Promise<UserRegisterResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/wp-json/zib-app/v1/user/register',
    headers: {},
    data: params,
  })
}
