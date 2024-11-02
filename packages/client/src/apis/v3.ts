import { httpClient } from '@/utils/request'
import type { RegisterTypesRes, RegisterTypesReq, LoginTypesRes, LoginTypesReq } from './types/v3.d'

/**
 *  接口 [注册](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-229394123)
 *  @标签 用户/注册
 *  @方式 POST
 *  @地址 /api/v3/register
 *  @更新时间 2024-11-02 11:44:35
 */

export const registerApi = (data: RegisterTypesReq): Promise<RegisterTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/api/v3/register',
    header: {
      'content-type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [登录](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-229415236)
 *  @标签 用户/登录
 *  @方式 POST
 *  @地址 /api/v3/login
 *  @更新时间 2024-11-02 15:34:19
 */

export const loginApi = (data: LoginTypesReq): Promise<LoginTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/api/v3/login',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    data,
  })
}
