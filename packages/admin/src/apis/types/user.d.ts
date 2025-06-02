/**
 *  接口 [获取验证码](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303144580)
 *  @标签 管理端用户模块/获取验证码
 *  @方式 GET
 *  @地址 /api/admin/user/getCaptcha
 *  @更新时间 2025-06-02 01:25:50
 */

/*  */
export type GetCaptchaTypesRes = {
  /* 验证码 key */
  id: string

  /* 验证码 */
  data: string
}

/**
 *  接口 [用户登录](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303144581)
 *  @标签 管理端用户模块/用户登录
 *  @方式 POST
 *  @地址 /api/admin/user/login
 *  @更新时间 2025-06-02 01:25:50
 */

export interface LoginTypesReq {
  /* 用户名 */
  username: string

  /* 密码 */
  password: string

  /* 验证码 */
  captcha: string

  /* 验证码ID */
  captchaId: string

  /* 密码是否经过RSA加密 */
  encrypted?: boolean
}

/*  */
export type LoginTypesRes = {
  /* 用户ID */
  id: number

  /* 用户名 */
  username: string

  /* 密码 */
  password: string

  /* 用户头像 */
  avatar: string

  /* 用户手机号 */
  mobile: string

  /* 用户状态 */
  status: boolean

  /* 是否为超级管理员 */
  isRoot: boolean

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string
}

/**
 *  接口 [管理员登出](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303281784)
 *  @标签 管理端用户模块/管理员登出
 *  @方式 POST
 *  @地址 /api/admin/user/logout
 *  @更新时间 2025-06-02 01:25:50
 */

export interface LogoutTypesRes {
  /*  */
  success: boolean
}

/**
 *  接口 [用户注册](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303174872)
 *  @标签 管理端用户模块/用户注册
 *  @方式 POST
 *  @地址 /api/admin/user/register
 *  @更新时间 2025-06-02 01:25:50
 */

export interface RegisterTypesReq {
  /* 用户名 */
  username: string

  /* 密码 */
  password: string

  /* 确认密码 */
  confirmPassword: string

  /* 手机号 */
  mobile?: string
}

/*  */
export type RegisterTypesRes = {
  /* 用户ID */
  id: number

  /* 用户名 */
  username: string

  /* 密码 */
  password: string

  /* 用户头像 */
  avatar: string

  /* 用户手机号 */
  mobile: string

  /* 用户状态 */
  status: boolean

  /* 是否为超级管理员 */
  isRoot: boolean

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string
}

/**
 *  接口 [刷新访问令牌](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303174873)
 *  @标签 管理端用户模块/刷新访问令牌
 *  @方式 POST
 *  @地址 /api/admin/user/refreshToken
 *  @更新时间 2025-06-02 01:25:50
 */

export interface RefreshTokenTypesReq {
  /* 刷新令牌 */
  refreshToken: string
}

/*  */
export type RefreshTokenTypesRes = {
  /* 用户ID */
  id: number

  /* 用户名 */
  username: string

  /* 密码 */
  password: string

  /* 用户头像 */
  avatar: string

  /* 用户手机号 */
  mobile: string

  /* 用户状态 */
  status: boolean

  /* 是否为超级管理员 */
  isRoot: boolean

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string
}

/**
 *  接口 [修改密码](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303174892)
 *  @标签 管理端用户模块/修改密码
 *  @方式 POST
 *  @地址 /api/admin/user/updatePassword
 *  @更新时间 2025-06-02 01:25:50
 */

export interface UpdatePasswordTypesReq {
  /* 旧密码 */
  oldPassword: string

  /* 新密码 */
  newPassword: string

  /* 确认新密码 */
  confirmPassword: string
}

/*  */
export type UpdatePasswordTypesRes = {
  /* 用户ID */
  id: number

  /* 用户名 */
  username: string

  /* 密码 */
  password: string

  /* 用户头像 */
  avatar: string

  /* 用户手机号 */
  mobile: string

  /* 用户状态 */
  status: boolean

  /* 是否为超级管理员 */
  isRoot: boolean

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string
}

/**
 *  接口 [更新用户信息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303174893)
 *  @标签 管理端用户模块/更新用户信息
 *  @方式 POST
 *  @地址 /api/admin/user/updateUserInfo
 *  @更新时间 2025-06-02 01:25:50
 */

export interface UpdateUserInfoTypesReq {
  /* 用户名 */
  username?: string

  /* 头像 */
  avatar?: string

  /* 手机号 */
  mobile?: string
}

/*  */
export type UpdateUserInfoTypesRes = {
  /* 用户ID */
  id: number

  /* 用户名 */
  username: string

  /* 密码 */
  password: string

  /* 用户头像 */
  avatar: string

  /* 用户手机号 */
  mobile: string

  /* 用户状态 */
  status: boolean

  /* 是否为超级管理员 */
  isRoot: boolean

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string
}

/**
 *  接口 [获取当前用户信息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303174876)
 *  @标签 管理端用户模块/获取当前用户信息
 *  @方式 GET
 *  @地址 /api/admin/user/getUserInfo
 *  @更新时间 2025-06-02 01:25:50
 */

/*  */
export type GetUserInfoTypesRes = {
  /* 用户ID */
  id: number

  /* 用户名 */
  username: string

  /* 密码 */
  password: string

  /* 用户头像 */
  avatar: string

  /* 用户手机号 */
  mobile: string

  /* 用户状态 */
  status: boolean

  /* 是否为超级管理员 */
  isRoot: boolean

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string
}

/**
 *  接口 [根据ID获取用户信息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303175045)
 *  @标签 管理端用户模块/根据ID获取用户信息
 *  @方式 GET
 *  @地址 /api/admin/user/getUserById
 *  @更新时间 2025-06-02 01:25:50
 */

export interface GetUserByIdTypesReq {
  /* id */
  id: number
}

/*  */
export type GetUserByIdTypesRes = {
  /* 用户ID */
  id: number

  /* 用户名 */
  username: string

  /* 密码 */
  password: string

  /* 用户头像 */
  avatar: string

  /* 用户手机号 */
  mobile: string

  /* 用户状态 */
  status: boolean

  /* 是否为超级管理员 */
  isRoot: boolean

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string
}

/**
 *  接口 [获取管理端用户分页列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303144582)
 *  @标签 管理端用户模块/获取管理端用户分页列表
 *  @方式 GET
 *  @地址 /api/admin/user/getAdminUserPage
 *  @更新时间 2025-06-02 01:25:50
 */

export interface GetAdminUserPageTypesReq {
  /* 单页大小 */
  pageSize?: number

  /* 当前页码 */
  pageIndex?: number

  /* 排序字段，json格式 */
  orderBy?: string

  /* 开始时间 */
  startDate?: string

  /* 结束时间 */
  endDate?: string
}

export interface GetAdminUserPageTypesRes {
  /* 当前页码 */
  pageIndex: number

  /* 每页条数 */
  pageSize: number

  /* 总条数 */
  total: number
  items: {
    /* 用户ID */
    id: number

    /* 用户名 */
    username: string

    /* 密码 */
    password: string

    /* 用户头像 */
    avatar: string

    /* 用户手机号 */
    mobile: string

    /* 用户状态 */
    status: boolean

    /* 是否为超级管理员 */
    isRoot: boolean

    /* 创建时间 */
    createdAt: string

    /* 更新时间 */
    updatedAt: string
  }[]
}
