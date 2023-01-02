import kRequest from '../index'
import config from '@/config'
import type {
  AdminCreateUserReq,
  AdminCreateUserRes,
  AdminDeleteUserReq,
  AdminDeleteUserRes,
  AdminLoginReq,
  AdminLoginRes,
  AdminRefreshTokenRes,
  AdminSwitchUserStatusReq,
  AdminSwitchUserStatusRes,
  AdminUpdatePasswordReq,
  AdminUpdatePasswordRes,
  AdminUpdateUserInfoReq,
  AdminUpdateUserInfoRes,
  AdminUserInfoRes,
  AdminUserListReq,
  AdminUserListRes
} from '~@/apiTypes/user'

import type { AdminLoginLogReq, AdminLoginLogRes } from '~@/apiTypes/log'

const context = config.REQUEST_PREFIX + '/user'
const logContext = config.REQUEST_PREFIX + '/log'
const api = {
  login: `${context}/login`,
  refreshTokenApi: `${context}/refreshToken`,
  userInfo: `${context}/userInfo`,
  updateUserInfo: `${context}/updateUserInfo`,
  updatePassword: `${context}/updatePassword`,
  userList: `${context}/userList`,
  loginLog: `${logContext}/loginLog`,
  switchUserStatus: `${context}/switchUserStatus`,
  deleteUser: `${context}/deleteUser`,
  createUser: `${context}/createUser`
}

//登录
export function loginApi(params: AdminLoginReq): Promise<AdminLoginRes> {
  return kRequest.post({
    url: api.login,
    data: params,
    showLoading: true
  })
}

//刷新token
export function refreshTokenApi(): Promise<AdminRefreshTokenRes> {
  return kRequest.post({
    url: api.refreshTokenApi
  })
}

//获取用户信息
export function getUserInfoApi(): Promise<AdminUserInfoRes> {
  return kRequest.get({
    url: api.userInfo
  })
}

//修改用户信息
export function updateUserInfoApi(
  params: AdminUpdateUserInfoReq
): Promise<AdminUpdateUserInfoRes> {
  return kRequest.post({
    url: api.updateUserInfo,
    data: params
  })
}

//修改密码
export function updatePasswordApi(
  params: AdminUpdatePasswordReq
): Promise<AdminUpdatePasswordRes> {
  return kRequest.post({
    url: api.updatePassword,
    data: params
  })
}

//获取用户列表
export function userListApi(
  params: AdminUserListReq
): Promise<AdminUserListRes> {
  return kRequest.get({
    url: api.userList,
    params
  })
}

//获取登录日志
export function loginLogApi(
  params: AdminLoginLogReq
): Promise<AdminLoginLogRes> {
  return kRequest.get({
    url: api.loginLog,
    params
  })
}

//启用或禁用
export function statusSwitchApi(
  params: AdminSwitchUserStatusReq
): Promise<AdminSwitchUserStatusRes> {
  return kRequest.post({
    url: api.switchUserStatus,
    data: params
  })
}

//删除
export function deleteUserApi(
  params: AdminDeleteUserReq
): Promise<AdminDeleteUserRes> {
  return kRequest.post({
    url: api.deleteUser,
    data: params
  })
}

//创建新用户
export function createUserApi(
  params: AdminCreateUserReq
): Promise<AdminCreateUserRes> {
  return kRequest.post({
    url: api.createUser,
    data: params
  })
}
