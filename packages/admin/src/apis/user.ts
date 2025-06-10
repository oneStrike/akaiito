import { httpHandler } from '@/utils/request'
import type {
  GetCaptchaTypesRes,
  LoginTypesRes,
  LoginTypesReq,
  LogoutTypesRes,
  RegisterTypesRes,
  RegisterTypesReq,
  RefreshTokenTypesRes,
  RefreshTokenTypesReq,
  UpdatePasswordTypesRes,
  UpdatePasswordTypesReq,
  UpdateUserInfoTypesRes,
  UpdateUserInfoTypesReq,
  GetUserInfoTypesRes,
  GetUserByIdTypesRes,
  GetUserByIdTypesReq,
  GetAdminUserPageTypesRes,
  GetAdminUserPageTypesReq,
} from './types/user.d'

/**
 *  接口 [获取验证码](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303144580)
 *  @标签 管理端用户模块/获取验证码
 *  @方式 GET
 *  @地址 /api/admin/user/getCaptcha
 *  @更新时间 2025-06-10 00:29:31
 */

export const getCaptchaApi = (): Promise<GetCaptchaTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/user/getCaptcha',
    headers: {},
  })
}

/**
 *  接口 [管理员登录](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303144581)
 *  @标签 管理端用户模块/管理员登录
 *  @方式 POST
 *  @地址 /api/admin/user/login
 *  @更新时间 2025-06-10 00:29:31
 */

export const loginApi = (data: LoginTypesReq): Promise<LoginTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/user/login',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [管理员登出](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303281784)
 *  @标签 管理端用户模块/管理员登出
 *  @方式 POST
 *  @地址 /api/admin/user/logout
 *  @更新时间 2025-06-10 00:29:31
 */

export const logoutApi = (): Promise<LogoutTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/user/logout',
    headers: {},
  })
}

/**
 *  接口 [用户注册](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303174872)
 *  @标签 管理端用户模块/用户注册
 *  @方式 POST
 *  @地址 /api/admin/user/register
 *  @更新时间 2025-06-10 00:29:31
 */

export const registerApi = (data: RegisterTypesReq): Promise<RegisterTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/user/register',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [刷新访问令牌](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303174873)
 *  @标签 管理端用户模块/刷新访问令牌
 *  @方式 POST
 *  @地址 /api/admin/user/refreshToken
 *  @更新时间 2025-06-10 00:29:31
 */

export const refreshTokenApi = (data: RefreshTokenTypesReq): Promise<RefreshTokenTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/user/refreshToken',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [修改密码](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303174892)
 *  @标签 管理端用户模块/修改密码
 *  @方式 POST
 *  @地址 /api/admin/user/updatePassword
 *  @更新时间 2025-06-10 00:29:31
 */

export const updatePasswordApi = (data: UpdatePasswordTypesReq): Promise<UpdatePasswordTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/user/updatePassword',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [更新用户信息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303174893)
 *  @标签 管理端用户模块/更新用户信息
 *  @方式 POST
 *  @地址 /api/admin/user/updateUserInfo
 *  @更新时间 2025-06-10 00:29:31
 */

export const updateUserInfoApi = (data: UpdateUserInfoTypesReq): Promise<UpdateUserInfoTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/user/updateUserInfo',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [获取当前用户信息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303174876)
 *  @标签 管理端用户模块/获取当前用户信息
 *  @方式 GET
 *  @地址 /api/admin/user/getUserInfo
 *  @更新时间 2025-06-10 00:29:31
 */

export const getUserInfoApi = (): Promise<GetUserInfoTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/user/getUserInfo',
    headers: {},
  })
}

/**
 *  接口 [根据ID获取用户信息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303175045)
 *  @标签 管理端用户模块/根据ID获取用户信息
 *  @方式 GET
 *  @地址 /api/admin/user/getUserById
 *  @更新时间 2025-06-10 00:29:31
 */

export const getUserByIdApi = (params: GetUserByIdTypesReq): Promise<GetUserByIdTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/user/getUserById',
    headers: {},
    params,
  })
}

/**
 *  接口 [获取管理端用户分页列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303144582)
 *  @标签 管理端用户模块/获取管理端用户分页列表
 *  @方式 GET
 *  @地址 /api/admin/user/getAdminUserPage
 *  @更新时间 2025-06-10 00:29:31
 */

export const getAdminUserPageApi = (params: GetAdminUserPageTypesReq): Promise<GetAdminUserPageTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/user/getAdminUserPage',
    headers: {},
    params,
  })
}
