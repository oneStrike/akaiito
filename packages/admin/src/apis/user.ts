import { httpClient } from '@/utils/request'
import type {
  GetUserPageTypings,
  GetUserInfoTypings,
  CreateAdminUserTypings,
  UpdateAdminUserInfoTypings,
  UpdateAdminUserStatusTypings,
  UpdateAdminUserPasswordTypings,
  LoginTypings,
  RefreshAccessTokenTypings,
  DeleteAdminUserTypings
} from './user.d'

export const getUserPageApi = (
  params?: GetUserPageTypings['Request']
): Promise<GetUserPageTypings['Response']> => {
  return httpClient({
    method: 'GET',
    url: '/admin/user/getUserPage',
    params
  })
}

export const getUserInfoApi = (
  params?: GetUserInfoTypings['Request']
): Promise<GetUserInfoTypings['Response']> => {
  return httpClient({
    method: 'GET',
    url: '/admin/user/getUserInfo',
    params
  })
}

export const createAdminUserApi = (
  data: CreateAdminUserTypings['Request']
): Promise<CreateAdminUserTypings['Response']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/user/createAdminUser',
    data
  })
}

export const updateAdminUserInfoApi = (
  data: UpdateAdminUserInfoTypings['Request']
): Promise<UpdateAdminUserInfoTypings['Response']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/user/updateAdminUserInfo',
    data
  })
}

export const updateAdminUserStatusApi = (): Promise<
  UpdateAdminUserStatusTypings['Response']
> => {
  return httpClient({
    method: 'POST',
    url: '/admin/user/updateAdminUserStatus'
  })
}

export const updateAdminUserPasswordApi = (
  data: UpdateAdminUserPasswordTypings['Request']
): Promise<UpdateAdminUserPasswordTypings['Response']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/user/updateAdminUserPassword',
    data
  })
}

export const loginApi = (
  data: LoginTypings['Request']
): Promise<LoginTypings['Response']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/user/login',
    data
  })
}

export const refreshAccessTokenApi = (
  data: RefreshAccessTokenTypings['Request']
): Promise<RefreshAccessTokenTypings['Response']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/user/refreshAccessToken',
    data
  })
}

export const deleteAdminUserApi = (): Promise<
  DeleteAdminUserTypings['Response']
> => {
  return httpClient({
    method: 'POST',
    url: '/admin/user/deleteAdminUser'
  })
}
