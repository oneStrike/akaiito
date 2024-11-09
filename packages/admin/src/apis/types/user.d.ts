/**
 *  接口 [获取管理员列表](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-144286941)
 *  @标签 管理端/用户/获取管理员列表
 *  @方式 GET
 *  @地址 /admin/user/getUserPage
 *  @更新时间 2024-01-23 23:46:15
 */

export interface GetUserPageTypesReq {
  /* 页码 */
  pageIndex?: string

  /* 单页数量 */
  pageSize?: string

  /* 排序 */
  sortBy?: string

  /* 管理员手机号 */
  mobile?: string

  /* 启用状态，1启用，0禁用 */
  status?: string

  /* 是否是超管，1是0否 */
  isRoot?: string

  /* 姓名 */
  username?: string
}

export interface GetUserPageTypesRes {
  list: {
    /* 主键id */
    id: number

    /* 用户名 */
    username: string

    /* 手机号 */
    mobile: string

    /* 用户头像 */
    avatar: string | null

    /* 管理员状态，1启用0禁用 */
    status: number

    /* 是否为超管，1是0否 */
    isRoot: number

    /* 创建时间 */
    createdAt: string

    /* 更新时间 */
    updatedAt: string
  }[]
  /* 页码 */
  pageIndex: number

  /* 单页大小 */
  pageSize: number

  /* 总条数 */
  total: number
}

/**
 *  接口 [获取用户信息](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-131964178)
 *  @标签 管理端/用户/获取用户信息
 *  @方式 GET
 *  @地址 /admin/user/getUserInfo
 *  @更新时间 2024-01-21 20:47:59
 */

export interface GetUserInfoTypesReq {
  /* 用户id */
  id?: string
}

export interface GetUserInfoTypesRes {
  /* 主键id */
  id: number

  /* 用户名 */
  username: string

  /* 手机号 */
  mobile: string

  /* 用户头像 */
  avatar: string | null

  /* 管理员状态，1启用0禁用 */
  status: number

  /* 是否为超管，1是0否 */
  isRoot: number

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string
}

/**
 *  接口 [创建管理员用户](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-131620160)
 *  @标签 管理端/用户/创建管理员用户
 *  @方式 POST
 *  @地址 /admin/user/createAdminUser
 *  @更新时间 2024-09-17 22:48:52
 */

export interface CreateAdminUserTypesReq {
  /* 密码 */
  password: string

  /* 确认密码 */
  confirmPassword: string

  /* 用户名 */
  username: string

  /* 手机号 */
  mobile: string

  /* 用户头像 */
  avatar: string | null

  /* 管理员状态，1启用0禁用 */
  status: number

  /* 是否为超管，1是0否 */
  isRoot: number
}

/* 主键id */
export type CreateAdminUserTypesRes = number

/**
 *  接口 [更新用户信息](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-131972458)
 *  @标签 管理端/用户/更新用户信息
 *  @方式 POST
 *  @地址 /admin/user/updateAdminUserInfo
 *  @更新时间 2024-01-26 22:53:51
 */

export interface UpdateAdminUserInfoTypesReq {
  /* 主键id */
  id: number

  /* 是否为超管，1是0否 */
  isRoot: number
}

/* 主键id */
export type UpdateAdminUserInfoTypesRes = number | null

/**
 *  接口 [启用或禁用](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-131972472)
 *  @标签 管理端/用户/启用或禁用
 *  @方式 POST
 *  @地址 /admin/user/updateAdminUserStatus
 *  @更新时间 2024-09-17 23:16:50
 */

export interface UpdateAdminUserStatusTypesReq {
  /* 主键id */
  id: number

  /* 管理员状态，1启用0禁用 */
  status: number
}

/* 主键id */
export type UpdateAdminUserStatusTypesRes = number | null

/**
 *  接口 [修改密码](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-131972475)
 *  @标签 管理端/用户/修改密码
 *  @方式 POST
 *  @地址 /admin/user/updateAdminUserPassword
 *  @更新时间 2023-12-09 17:17:51
 */

export interface UpdateAdminUserPasswordTypesReq {
  /* 旧密码 */
  oldPassword: string

  /* 新密码 */
  newPassword: string

  /* 确认新密码 */
  confirmNewPassword: string

  /* 用户主键id */
  id: number
}

/* 主键id */
export type UpdateAdminUserPasswordTypesRes = number | null

/**
 *  接口 [登录](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-130086370)
 *  @标签 管理端/用户/登录
 *  @方式 POST
 *  @地址 /admin/user/login
 *  @更新时间 2023-12-11 23:58:17
 */

export interface LoginTypesReq {
  /* 密码 */
  password: string

  /* 验证码 */
  captcha: string

  /* 验证码id */
  captchaId: string

  /* 手机号 */
  mobile: string
}

export interface LoginTypesRes {
  /* token信息 */
  token: {
    /* 账号token */
    accessToken: string

    /* 刷新token */
    refreshToken: string
  }

  /* 用户信息 */
  userInfo: {
    /* 主键id */
    id: number

    /* 用户名 */
    username: string

    /* 手机号 */
    mobile: string

    /* 用户头像 */
    avatar: string | null

    /* 管理员状态，1启用0禁用 */
    status: number

    /* 是否为超管，1是0否 */
    isRoot: number

    /* 创建时间 */
    createdAt: string

    /* 更新时间 */
    updatedAt: string
  }
}

/**
 *  接口 [刷新accessToken](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-134115928)
 *  @标签 管理端/用户/刷新accessToken
 *  @方式 POST
 *  @地址 /admin/user/refreshAccessToken
 *  @更新时间 2024-11-09 14:07:28
 */

export interface RefreshAccessTokenTypesReq {
  /* accessToken */
  accessToken: string

  /* refreshToken */
  refreshToken: string
}

/* accessToken */
export type RefreshAccessTokenTypesRes = string

/**
 *  接口 [删除管理员](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-144631484)
 *  @标签 管理端/用户/删除管理员
 *  @方式 POST
 *  @地址 /admin/user/deleteAdminUser
 *  @更新时间 2024-09-17 23:17:48
 */

export interface DeleteAdminUserTypesReq {
  /* 主键id */
  id: number
}

/* 删除的主键id */
export type DeleteAdminUserTypesRes = number
