import kRequest from '../index'
import config from '@/config'
import type {
  UserDeleteRequest,
  UserDeleteResponse
} from '@/typings/httpTypes/user/delete'
import type {
  UserLoginRequest,
  UserLoginResponse
} from '@/typings/httpTypes/user/login'
import type { UserRefreshTokenResponse } from '@/typings/httpTypes/user/refreshToken'
import type {
  UserUserInfoRequest,
  UserUserInfoResponse
} from '@/typings/httpTypes/user/userInfo'
import type {
  UserModifyPasswordRequest,
  UserModifyPasswordResponse
} from '@/typings/httpTypes/user/modifyPassword'
import type {
  UserUserListRequest,
  UserUserListResponse
} from '@/typings/httpTypes/user/userList'
import type {
  LogLoginLogRequest,
  LogLoginLogResponse
} from '@/typings/httpTypes/log/loginLog'
import type { UserStatusSwitchRequest } from '@/typings/httpTypes/user/statusSwitch'
import type {
  UserCreateRequest,
  UserCreateResponse
} from '@/typings/httpTypes/user/create'

const context = config.REQUEST_PREFIX + '/user'
const logContext = config.REQUEST_PREFIX + '/log'
const api = {
  login: `${context}/login`,
  refreshTokenApi: `${context}/refreshToken`,
  userInfo: `${context}/userInfo`,
  modifyUserInfo: `${context}/updateUserInfo`,
  modifyPassword: `${context}/modifyPassword`,
  userList: `${context}/userList`,
  loginLog: `${logContext}/loginLog`,
  statusSwitch: `${context}/statusSwitch`,
  delete: `${context}/delete`,
  create: `${context}/create`
}

//登录
export function loginApi(params: UserLoginRequest): Promise<UserLoginResponse> {
  return kRequest.post({
    url: api.login,
    data: params,
    showLoading: true
  })
}

//刷新token
export function refreshTokenApi(): Promise<UserRefreshTokenResponse> {
  return kRequest.post({
    url: api.refreshTokenApi
  })
}

//获取用户信息
export function getUserInfoApi(): Promise<UserUserInfoResponse> {
  return kRequest.get({
    url: api.userInfo
  })
}

//修改用户信息
export function modifyUserInfoApi(
  params: UserUserInfoRequest
): Promise<UserUserInfoResponse> {
  return kRequest.post({
    url: api.modifyUserInfo,
    data: params
  })
}

//修改密码
export function modifyPasswordApi(
  params: UserModifyPasswordRequest
): Promise<UserModifyPasswordResponse> {
  return kRequest.post({
    url: api.modifyPassword,
    data: params
  })
}

//获取用户列表
export function userListApi(
  params: UserUserListRequest
): Promise<UserUserListResponse> {
  return kRequest.get({
    url: api.userList,
    params
  })
}

//获取登录日志
export function loginLogApi(
  params: LogLoginLogRequest
): Promise<LogLoginLogResponse> {
  return kRequest.get({
    url: api.loginLog,
    params
  })
}

//启用或禁用
export function statusSwitchApi(
  params: UserStatusSwitchRequest
): Promise<UserStatusSwitchRequest> {
  return kRequest.post({
    url: api.statusSwitch,
    data: params
  })
}

//删除
export function deleteUserApi(
  params: UserDeleteRequest
): Promise<UserDeleteResponse> {
  return kRequest.post({
    url: api.delete,
    data: params
  })
}

//创建新用户
export function createUserApi(
  params: UserCreateRequest
): Promise<UserCreateResponse> {
  return kRequest.post({
    url: api.create,
    data: params
  })
}
