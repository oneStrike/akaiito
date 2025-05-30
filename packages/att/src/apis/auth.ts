import { httpHandler } from '@/utils/request'
import type {
  LoginTypesRes,
  LoginTypesReq,
  RefreshTypesRes,
  RefreshTypesReq,
  LogoutTypesRes,
  ProfileTypesRes,
} from './types/auth.d'

/**
 *  接口 [管理员登录](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303134067)
 *  @标签 管理端认证模块/管理员登录
 *  @方式 POST
 *  @地址 /admin/auth/login
 *  @更新时间 2025-05-30 23:02:40
 */

export const loginApi = (data: LoginTypesReq): Promise<LoginTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/auth/login',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [刷新令牌](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303134068)
 *  @标签 管理端认证模块/刷新令牌
 *  @方式 POST
 *  @地址 /admin/auth/refresh
 *  @更新时间 2025-05-30 23:02:40
 */

export const refreshApi = (data: RefreshTypesReq): Promise<RefreshTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/auth/refresh',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [管理员登出](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303134069)
 *  @标签 管理端认证模块/管理员登出
 *  @方式 POST
 *  @地址 /admin/auth/logout
 *  @更新时间 2025-05-30 23:02:40
 */

export const logoutApi = (data: LogoutTypesReq): Promise<LogoutTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/auth/logout',
    headers: {},
    data,
  })
}

/**
 *  接口 [获取当前用户信息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303134070)
 *  @标签 管理端认证模块/获取当前用户信息
 *  @方式 POST
 *  @地址 /admin/auth/profile
 *  @更新时间 2025-05-30 23:02:40
 */

export const profileApi = (data: ProfileTypesReq): Promise<ProfileTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/auth/profile',
    headers: {},
    data,
  })
}
