import { httpClient } from '@/utils/request'
import type {
  CreateAdminUserTypings,
  GetUserInfoTypings,
  UpdateAdminUserInfoTypings,
  UpdateAdminUserStatusTypings,
  UpdateAdminUserPasswordTypings,
  UpdateAdminUserPermissionsTypings,
  LoginTypings,
  RefreshAccessTokenTypings
} from './user.d'

export const createAdminUserApi = (
  data: CreateAdminUserTypings['Request']
): Promise<CreateAdminUserTypings['Response']> => {
  return httpClient({
    method: 'post',
    url: '/admin/user/createAdminUser',
    data
  })
}

export const getUserInfoApi = (
  params?: GetUserInfoTypings['Request']
): Promise<GetUserInfoTypings['Response']> => {
  return httpClient({
    method: 'get',
    url: '/admin/user/getUserInfo',
    params
  })
}

export const updateAdminUserInfoApi = (
  data: UpdateAdminUserInfoTypings['Request']
): Promise<UpdateAdminUserInfoTypings['Response']> => {
  return httpClient({
    method: 'post',
    url: '/admin/user/updateAdminUserInfo',
    data
  })
}

export const updateAdminUserStatusApi = (): Promise<
  UpdateAdminUserStatusTypings['Response']
> => {
  return httpClient({
    method: 'post',
    url: '/admin/user/updateAdminUserStatus'
  })
}

export const updateAdminUserPasswordApi = (
  data: UpdateAdminUserPasswordTypings['Request']
): Promise<UpdateAdminUserPasswordTypings['Response']> => {
  return httpClient({
    method: 'post',
    url: '/admin/user/updateAdminUserPassword',
    data
  })
}

export const updateAdminUserPermissionsApi = (): Promise<
  UpdateAdminUserPermissionsTypings['Response']
> => {
  return httpClient({
    method: 'post',
    url: '/admin/user/updateAdminUserPermissions'
  })
}

export const loginApi = (
  data: LoginTypings['Request']
): Promise<LoginTypings['Response']> => {
  return httpClient({
    method: 'post',
    url: '/admin/user/login',
    data
  })
}

export const refreshAccessTokenApi = (
  data: RefreshAccessTokenTypings['Request']
): Promise<RefreshAccessTokenTypings['Response']> => {
  return httpClient({
    method: 'post',
    url: '/admin/user/refreshAccessToken',
    data
  })
}
