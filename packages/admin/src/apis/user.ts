import { httpHandler } from '@/utils/request'
import type {
  GetCaptchaTypesRes,
  LoginTypesRes,
  LoginTypesReq,
  GetAdminUserPageTypesRes,
  GetAdminUserPageTypesReq,
} from './types/user.d'

/**
 *  接口 [获取验证码](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303144580)
 *  @标签 管理端用户模块/获取验证码
 *  @方式 GET
 *  @地址 /api/admin/user/getCaptcha
 *  @更新时间 2025-05-31 03:40:15
 */

export const getCaptchaApi = (): Promise<GetCaptchaTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/user/getCaptcha',
    headers: {},
  })
}

/**
 *  接口 [用户登录](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303144581)
 *  @标签 管理端用户模块/用户登录
 *  @方式 POST
 *  @地址 /api/admin/user/login
 *  @更新时间 2025-05-31 03:40:15
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
 *  接口 [获取管理端用户分页列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303144582)
 *  @标签 管理端用户模块/获取管理端用户分页列表
 *  @方式 GET
 *  @地址 /api/admin/user/getAdminUserPage
 *  @更新时间 2025-05-31 03:40:15
 */

export const getAdminUserPageApi = (params: GetAdminUserPageTypesReq): Promise<GetAdminUserPageTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/user/getAdminUserPage',
    headers: {},
    params,
  })
}
