import { httpHandler } from '@/utils/request'
import type {
  GetCaptchaResponse,
  UserLoginResponse,
  UserLoginRequest,
  UserLogoutResponse,
  UserLogoutRequest,
  UserRegisterResponse,
  UserRegisterRequest,
  UserRefreshTokenResponse,
  UserRefreshTokenRequest,
  UserUpdatePasswordResponse,
  UserUpdatePasswordRequest,
  UserUpdateInfoResponse,
  UserUpdateInfoRequest,
  UserInfoResponse,
  UserInfoByIdResponse,
  UserInfoByIdRequest,
  UserPageResponse,
  UserPageRequest,
  UserDeleteResponse,
  UserDeleteRequest,
} from './types/user.d'

/**
 *  接口 [获取验证码](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090628)
 *  @标签 管理端用户模块/获取验证码
 *  @方式 GET
 *  @地址 /api/admin/user/get-captcha
 *  @更新时间 2025-06-30 00:37:37
 */

export const getCaptchaApi = (): Promise<GetCaptchaResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/user/get-captcha',
    headers: {},
  })
}

/**
 *  接口 [管理员登录](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090629)
 *  @标签 管理端用户模块/管理员登录
 *  @方式 POST
 *  @地址 /api/admin/user/user-login
 *  @更新时间 2025-06-30 00:37:37
 */

export const userLoginApi = (data: UserLoginRequest): Promise<UserLoginResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/user/user-login',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [管理员登出](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090630)
 *  @标签 管理端用户模块/管理员登出
 *  @方式 POST
 *  @地址 /api/admin/user/user-logout
 *  @更新时间 2025-06-30 00:37:37
 */

export const userLogoutApi = (data: UserLogoutRequest): Promise<UserLogoutResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/user/user-logout',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [用户注册](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090631)
 *  @标签 管理端用户模块/用户注册
 *  @方式 POST
 *  @地址 /api/admin/user/user-register
 *  @更新时间 2025-06-30 00:37:37
 */

export const userRegisterApi = (data: UserRegisterRequest): Promise<UserRegisterResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/user/user-register',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [刷新访问令牌](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090632)
 *  @标签 管理端用户模块/刷新访问令牌
 *  @方式 POST
 *  @地址 /api/admin/user/user-refresh-token
 *  @更新时间 2025-06-30 00:37:37
 */

export const userRefreshTokenApi = (data: UserRefreshTokenRequest): Promise<UserRefreshTokenResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/user/user-refresh-token',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [修改密码](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090633)
 *  @标签 管理端用户模块/修改密码
 *  @方式 POST
 *  @地址 /api/admin/user/user-update-password
 *  @更新时间 2025-06-30 00:37:37
 */

export const userUpdatePasswordApi = (data: UserUpdatePasswordRequest): Promise<UserUpdatePasswordResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/user/user-update-password',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [更新用户信息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090634)
 *  @标签 管理端用户模块/更新用户信息
 *  @方式 POST
 *  @地址 /api/admin/user/user-update-info
 *  @更新时间 2025-06-30 00:37:37
 */

export const userUpdateInfoApi = (data: UserUpdateInfoRequest): Promise<UserUpdateInfoResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/user/user-update-info',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [获取当前用户信息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090635)
 *  @标签 管理端用户模块/获取当前用户信息
 *  @方式 GET
 *  @地址 /api/admin/user/user-Info
 *  @更新时间 2025-06-30 00:37:37
 */

export const userInfoApi = (): Promise<UserInfoResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/user/user-Info',
    headers: {},
  })
}

/**
 *  接口 [根据ID获取用户信息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090636)
 *  @标签 管理端用户模块/根据ID获取用户信息
 *  @方式 GET
 *  @地址 /api/admin/user/user-info-by-id
 *  @更新时间 2025-06-30 00:37:37
 */

export const userInfoByIdApi = (params: UserInfoByIdRequest): Promise<UserInfoByIdResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/user/user-info-by-id',
    headers: {},
    params,
  })
}

/**
 *  接口 [获取管理端用户分页列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090637)
 *  @标签 管理端用户模块/获取管理端用户分页列表
 *  @方式 GET
 *  @地址 /api/admin/user/user-page
 *  @更新时间 2025-06-30 00:37:37
 */

export const userPageApi = (params: UserPageRequest): Promise<UserPageResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/user/user-page',
    headers: {},
    params,
  })
}

/**
 *  接口 [删除用户](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090638)
 *  @标签 管理端用户模块/删除用户
 *  @方式 POST
 *  @地址 /api/admin/user/user-delete
 *  @更新时间 2025-06-30 00:37:37
 */

export const userDeleteApi = (data: UserDeleteRequest): Promise<UserDeleteResponse> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/user/user-delete',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
