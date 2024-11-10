import { httpClient } from '@/utils/request'
import type {
  UserCreateClientUserTypesRes,
  UserCreateClientUserTypesReq,
  UserLoginTypesRes,
  UserLoginTypesReq,
  UserUserInfoTypesRes,
  UserRefreshTokenTypesRes,
  UserRefreshTokenTypesReq,
} from './types/user.d'

/**
 *  接口 [创建客户端用户](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-231861661)
 *  @标签 用户/创建客户端用户
 *  @方式 POST
 *  @地址 /client/user/createClientUser
 *  @更新时间 2024-11-09 15:58:43
 */

export const userCreateClientUserApi = (data: UserCreateClientUserTypesReq): Promise<UserCreateClientUserTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/client/user/createClientUser',
    header: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [登录](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-231863976)
 *  @标签 用户/登录
 *  @方式 POST
 *  @地址 /client/user/login
 *  @更新时间 2024-11-09 16:21:45
 */

export const userLoginApi = (data: UserLoginTypesReq): Promise<UserLoginTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/client/user/login',
    header: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [获取用户详细信息](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-231866054)
 *  @标签 用户/获取用户详细信息
 *  @方式 GET
 *  @地址 /client/user/userInfo
 *  @更新时间 2024-11-09 16:31:15
 */

export const userUserInfoApi = (): Promise<UserUserInfoTypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/client/user/userInfo',
    header: {},
  })
}

/**
 *  接口 [刷新用户token](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-231877829)
 *  @标签 用户/刷新用户token
 *  @方式 POST
 *  @地址 /client/user/refreshToken
 *  @更新时间 2024-11-09 17:25:38
 */

export const userRefreshTokenApi = (data: UserRefreshTokenTypesReq): Promise<UserRefreshTokenTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/client/user/refreshToken',
    header: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
