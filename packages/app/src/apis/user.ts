import { httpHandler } from '@/utils/request'
import type {
  CreateAppUserTypesRes,
  CreateAppUserTypesReq,
  LoginTypesRes,
  LoginTypesReq,
  UserInfoTypesRes,
  RefreshTokenTypesRes,
  RefreshTokenTypesReq,
} from './types/user.d'

/**
 *  接口 [创建客户端用户](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-231861661)
 *  @标签 用户/创建客户端用户
 *  @方式 POST
 *  @地址 /app/user/createAppUser
 *  @更新时间 2024-11-24 12:52:30
 */

export const createAppUserApi = (data: CreateAppUserTypesReq): Promise<CreateAppUserTypesRes> => {
  return undefined({
    method: 'POST',
    url: '/app/user/createAppUser',
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
 *  @地址 /app/user/login
 *  @更新时间 2024-11-24 12:52:38
 */

export const loginApi = (data: LoginTypesReq): Promise<LoginTypesRes> => {
  return undefined({
    method: 'POST',
    url: '/app/user/login',
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
 *  @地址 /app/user/userInfo
 *  @更新时间 2024-11-24 12:52:47
 */

export const userInfoApi = (): Promise<UserInfoTypesRes> => {
  return undefined({
    method: 'GET',
    url: '/app/user/userInfo',
    header: {},
  })
}

/**
 *  接口 [刷新用户token](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-231877829)
 *  @标签 用户/刷新用户token
 *  @方式 POST
 *  @地址 /app/user/refreshToken
 *  @更新时间 2024-11-24 12:52:53
 */

export const refreshTokenApi = (data: RefreshTokenTypesReq): Promise<RefreshTokenTypesRes> => {
  return undefined({
    method: 'POST',
    url: '/app/user/refreshToken',
    header: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
