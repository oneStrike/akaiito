import { httpClient } from '@/utils/request'
import type {
  CreateAdminUserTypings,
  DeleteAdminUserTypings,
  GetUserInfoTypings,
  GetUserPageTypings,
  LoginTypings,
  RefreshAccessTokenTypings,
  UpdateAdminUserInfoTypings,
  UpdateAdminUserPasswordTypings,
  UpdateAdminUserStatusTypings,
} from './user.d'

export function createAdminUserApi(
  data: CreateAdminUserTypings['Request'],
): Promise<CreateAdminUserTypings['Response']> {
  return httpClient({
    method: 'POST',
    url: '/admin/user/createAdminUser',
    data,
  })
}

export function getUserInfoApi(
  params?: GetUserInfoTypings['Request'],
): Promise<GetUserInfoTypings['Response']> {
  return httpClient({
    method: 'GET',
    url: '/admin/user/getUserInfo',
    params,
  })
}

export function updateAdminUserInfoApi(
  data: UpdateAdminUserInfoTypings['Request'],
): Promise<UpdateAdminUserInfoTypings['Response']> {
  return httpClient({
    method: 'POST',
    url: '/admin/user/updateAdminUserInfo',
    data,
  })
}

export function updateAdminUserStatusApi(): Promise<
  UpdateAdminUserStatusTypings['Response']
> {
  return httpClient({
    method: 'POST',
    url: '/admin/user/updateAdminUserStatus',
  })
}

export function updateAdminUserPasswordApi(
  data: UpdateAdminUserPasswordTypings['Request'],
): Promise<UpdateAdminUserPasswordTypings['Response']> {
  return httpClient({
    method: 'POST',
    url: '/admin/user/updateAdminUserPassword',
    data,
  })
}

export function loginApi(
  data: LoginTypings['Request'],
): Promise<LoginTypings['Response']> {
  return httpClient({
    method: 'POST',
    url: '/admin/user/login',
    data,
  })
}

export function refreshAccessTokenApi(
  data: RefreshAccessTokenTypings['Request'],
): Promise<RefreshAccessTokenTypings['Response']> {
  return httpClient({
    method: 'POST',
    url: '/admin/user/refreshAccessToken',
    data,
  })
}

export function getUserPageApi(
  params?: GetUserPageTypings['Request'],
): Promise<GetUserPageTypings['Response']> {
  return httpClient({
    method: 'GET',
    url: '/admin/user/getUserPage',
    params,
  })
}

export function deleteAdminUserApi(
  data: DeleteAdminUserTypings['Request'],
): Promise<DeleteAdminUserTypings['Response']> {
  return httpClient({
    method: 'POST',
    url: '/admin/user/deleteAdminUser',
    data,
  })
}
