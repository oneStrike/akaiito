import { httpClient } from '@/utils/request'
import type {
  GetUserPageTypesRes,
  GetUserPageTypesReq,
  GetUserInfoTypesRes,
  GetUserInfoTypesReq,
  CreateAdminUserTypesRes,
  CreateAdminUserTypesReq,
  UpdateAdminUserInfoTypesRes,
  UpdateAdminUserInfoTypesReq,
  UpdateAdminUserStatusTypesRes,
  UpdateAdminUserStatusTypesReq,
  UpdateAdminUserPasswordTypesRes,
  UpdateAdminUserPasswordTypesReq,
  LoginTypesRes,
  LoginTypesReq,
  RefreshAccessTokenTypesRes,
  RefreshAccessTokenTypesReq,
  DeleteAdminUserTypesRes,
  DeleteAdminUserTypesReq,
} from './types/user.d'

/**
 *  接口 [获取管理员列表](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-144286941)
 *  @标签 管理端/用户/获取管理员列表
 *  @方式 GET
 *  @地址 /admin/user/getUserPage
 *  @更新时间 2024-01-23 23:46:15
 */

export const getUserPageApi = (params: GetUserPageTypesReq): Promise<GetUserPageTypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/admin/user/getUserPage',
    params,
  })
}

/**
 *  接口 [获取用户信息](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-131964178)
 *  @标签 管理端/用户/获取用户信息
 *  @方式 GET
 *  @地址 /admin/user/getUserInfo
 *  @更新时间 2024-01-21 20:47:59
 */

export const getUserInfoApi = (params: GetUserInfoTypesReq): Promise<GetUserInfoTypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/admin/user/getUserInfo',
    params,
  })
}

/**
 *  接口 [创建管理员用户](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-131620160)
 *  @标签 管理端/用户/创建管理员用户
 *  @方式 POST
 *  @地址 /admin/user/createAdminUser
 *  @更新时间 2024-09-17 22:48:52
 */

export const createAdminUserApi = (data: CreateAdminUserTypesReq): Promise<CreateAdminUserTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/user/createAdminUser',
    data,
  })
}

/**
 *  接口 [更新用户信息](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-131972458)
 *  @标签 管理端/用户/更新用户信息
 *  @方式 POST
 *  @地址 /admin/user/updateAdminUserInfo
 *  @更新时间 2024-01-26 22:53:51
 */

export const updateAdminUserInfoApi = (data: UpdateAdminUserInfoTypesReq): Promise<UpdateAdminUserInfoTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/user/updateAdminUserInfo',
    data,
  })
}

/**
 *  接口 [启用或禁用](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-131972472)
 *  @标签 管理端/用户/启用或禁用
 *  @方式 POST
 *  @地址 /admin/user/updateAdminUserStatus
 *  @更新时间 2024-09-17 23:16:50
 */

export const updateAdminUserStatusApi = (
  data: UpdateAdminUserStatusTypesReq,
): Promise<UpdateAdminUserStatusTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/user/updateAdminUserStatus',
    data,
  })
}

/**
 *  接口 [修改密码](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-131972475)
 *  @标签 管理端/用户/修改密码
 *  @方式 POST
 *  @地址 /admin/user/updateAdminUserPassword
 *  @更新时间 2023-12-09 17:17:51
 */

export const updateAdminUserPasswordApi = (
  data: UpdateAdminUserPasswordTypesReq,
): Promise<UpdateAdminUserPasswordTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/user/updateAdminUserPassword',
    data,
  })
}

/**
 *  接口 [登录](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-130086370)
 *  @标签 管理端/用户/登录
 *  @方式 POST
 *  @地址 /admin/user/login
 *  @更新时间 2023-12-11 23:58:17
 */

export const loginApi = (data: LoginTypesReq): Promise<LoginTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/user/login',
    data,
  })
}

/**
 *  接口 [刷新accessToken](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-134115928)
 *  @标签 管理端/用户/刷新accessToken
 *  @方式 POST
 *  @地址 /admin/user/refreshAccessToken
 *  @更新时间 2023-12-16 23:32:51
 */

export const refreshAccessTokenApi = (data: RefreshAccessTokenTypesReq): Promise<RefreshAccessTokenTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/user/refreshAccessToken',
    data,
  })
}

/**
 *  接口 [删除管理员](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-144631484)
 *  @标签 管理端/用户/删除管理员
 *  @方式 POST
 *  @地址 /admin/user/deleteAdminUser
 *  @更新时间 2024-09-17 23:17:48
 */

export const deleteAdminUserApi = (data: DeleteAdminUserTypesReq): Promise<DeleteAdminUserTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/user/deleteAdminUser',
    data,
  })
}
