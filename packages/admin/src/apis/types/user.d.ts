/**
 *  接口 [获取验证码](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090628)
 *  @标签 管理端用户模块/获取验证码
 *  @方式 GET
 *  @地址 /api/admin/user/get-captcha
 *  @更新时间 2025-07-02 23:25:13
 */

/*  */
export type GetCaptchaResponse = {
  /* 验证码 key */
  id: string

  /* 验证码 */
  data: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [管理员登录](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090629)
 *  @标签 管理端用户模块/管理员登录
 *  @方式 POST
 *  @地址 /api/admin/user/user-login
 *  @更新时间 2025-07-02 23:25:13
 */

export interface UserLoginRequest {
  /* 用户名 */
  username: string

  /* 密码 */
  password: string

  /* 验证码 */
  captcha: string

  /* 验证码ID */
  captchaId: string
}

/*  */
export type UserLoginResponse = {
  /* 令牌信息 */
  tokens: {
    /* 账号令牌 */
    accessToken: string

    /* 刷新令牌 */
    refreshToken: string
  }

  /* 用户信息 */
  user: {
    /* 用户ID */
    id: number

    /* 用户名 */
    username: string

    /* 手机号 */
    mobile: string

    /* 头像 */
    avatar?: string | null

    /* 是否启用 */
    isEnabled: boolean

    /* 角色 0普通管理员 1超级管理员 */
    role: number

    /* 最后登录时间 */
    lastLoginAt?: string

    /* 最后登录IP */
    lastLoginIp?: string

    /* 登录失败次数 */
    loginFailCount: number

    /* 是否锁定 */
    isLocked: boolean

    /* 创建时间 */
    createdAt: string

    /* 更新时间 */
    updatedAt: string
  }

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [管理员登出](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090630)
 *  @标签 管理端用户模块/管理员登出
 *  @方式 POST
 *  @地址 /api/admin/user/user-logout
 *  @更新时间 2025-07-02 23:25:13
 */

export interface UserLogoutRequest {
  /* 账号令牌 */
  accessToken: string

  /* 刷新令牌 */
  refreshToken: string
}

/*  */
export type UserLogoutResponse = boolean

/**
 *  接口 [用户注册](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090631)
 *  @标签 管理端用户模块/用户注册
 *  @方式 POST
 *  @地址 /api/admin/user/user-register
 *  @更新时间 2025-07-02 23:25:13
 */

export interface UserRegisterRequest {
  /* 用户名 */
  username: string

  /* 手机号 */
  mobile: string

  /* 头像 */
  avatar?: string | null

  /* 角色 0普通管理员 1超级管理员 */
  role: number

  /* 密码 */
  password: string

  /* 密码 */
  confirmPassword: string
}

/*  */
export type UserRegisterResponse = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [刷新访问令牌](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090632)
 *  @标签 管理端用户模块/刷新访问令牌
 *  @方式 POST
 *  @地址 /api/admin/user/user-refresh-token
 *  @更新时间 2025-07-02 23:25:13
 */

export interface UserRefreshTokenRequest {
  /* 刷新令牌 */
  refreshToken: string
}

/*  */
export type UserRefreshTokenResponse = {
  /* 刷新令牌响应 */
  tokens: {
    /* 账号令牌 */
    accessToken: string

    /* 刷新令牌 */
    refreshToken: string
  }

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [修改密码](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090633)
 *  @标签 管理端用户模块/修改密码
 *  @方式 POST
 *  @地址 /api/admin/user/user-update-password
 *  @更新时间 2025-07-02 23:25:13
 */

export interface UserUpdatePasswordRequest {
  /* 刷新令牌 */
  refreshToken: string

  /* 密码 */
  oldPassword: string

  /* 密码 */
  newPassword: string

  /* 密码 */
  confirmPassword: string
}

/*  */
export type UserUpdatePasswordResponse = {
  /* 用户ID */
  id: number

  /* 用户名 */
  username: string

  /* 手机号 */
  mobile: string

  /* 头像 */
  avatar?: string | null

  /* 是否启用 */
  isEnabled: boolean

  /* 角色 0普通管理员 1超级管理员 */
  role: number

  /* 最后登录时间 */
  lastLoginAt?: string

  /* 最后登录IP */
  lastLoginIp?: string

  /* 登录失败次数 */
  loginFailCount: number

  /* 是否锁定 */
  isLocked: boolean

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [更新用户信息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090634)
 *  @标签 管理端用户模块/更新用户信息
 *  @方式 POST
 *  @地址 /api/admin/user/user-update-info
 *  @更新时间 2025-07-02 23:25:13
 */

export interface UserUpdateInfoRequest {
  /* 用户名 */
  username: string

  /* 手机号 */
  mobile: string

  /* 头像 */
  avatar?: string | null

  /* 是否启用 */
  isEnabled: boolean

  /* 角色 0普通管理员 1超级管理员 */
  role: number

  /* 用户ID */
  id?: number | null
}

/*  */
export type UserUpdateInfoResponse = {
  /* 用户ID */
  id: number

  /* 用户名 */
  username: string

  /* 手机号 */
  mobile: string

  /* 头像 */
  avatar?: string | null

  /* 是否启用 */
  isEnabled: boolean

  /* 角色 0普通管理员 1超级管理员 */
  role: number

  /* 最后登录时间 */
  lastLoginAt?: string

  /* 最后登录IP */
  lastLoginIp?: string

  /* 登录失败次数 */
  loginFailCount: number

  /* 是否锁定 */
  isLocked: boolean

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [获取当前用户信息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090635)
 *  @标签 管理端用户模块/获取当前用户信息
 *  @方式 GET
 *  @地址 /api/admin/user/user-Info
 *  @更新时间 2025-07-02 23:25:13
 */

/*  */
export type UserInfoResponse = {
  /* 用户ID */
  id: number

  /* 用户名 */
  username: string

  /* 手机号 */
  mobile: string

  /* 头像 */
  avatar?: string | null

  /* 是否启用 */
  isEnabled: boolean

  /* 角色 0普通管理员 1超级管理员 */
  role: number

  /* 最后登录时间 */
  lastLoginAt?: string

  /* 最后登录IP */
  lastLoginIp?: string

  /* 登录失败次数 */
  loginFailCount: number

  /* 是否锁定 */
  isLocked: boolean

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [根据ID获取用户信息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090636)
 *  @标签 管理端用户模块/根据ID获取用户信息
 *  @方式 GET
 *  @地址 /api/admin/user/user-info-by-id
 *  @更新时间 2025-07-02 23:25:13
 */

export interface UserInfoByIdRequest {
  /* 主键id */
  id: number
}

/*  */
export type UserInfoByIdResponse = {
  /* 用户ID */
  id: number

  /* 用户名 */
  username: string

  /* 手机号 */
  mobile: string

  /* 头像 */
  avatar?: string | null

  /* 是否启用 */
  isEnabled: boolean

  /* 角色 0普通管理员 1超级管理员 */
  role: number

  /* 最后登录时间 */
  lastLoginAt?: string

  /* 最后登录IP */
  lastLoginIp?: string

  /* 登录失败次数 */
  loginFailCount: number

  /* 是否锁定 */
  isLocked: boolean

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [获取管理端用户分页列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090637)
 *  @标签 管理端用户模块/获取管理端用户分页列表
 *  @方式 GET
 *  @地址 /api/admin/user/user-page
 *  @更新时间 2025-07-02 23:25:13
 */

export interface UserPageRequest {
  /* 单页大小，最大500，默认15 */
  pageSize?: number

  /* 当前页码 */
  pageIndex?: number

  /* 排序字段，json格式 */
  orderBy?: string

  /* 开始时间 */
  startDate?: string

  /* 结束时间 */
  endDate?: string

  /* 用户名 */
  username?: string

  /* 是否启用 */
  isEnabled?: boolean

  /* 角色 0普通管理员 1超级管理员 */
  role?: number
}

export interface UserPageResponse {
  /* 当前页码 */
  pageIndex: number

  /* 每页条数 */
  pageSize: number

  /* 总条数 */
  total: number
  list: {
    /* 用户ID */
    id: number

    /* 用户名 */
    username: string

    /* 手机号 */
    mobile: string

    /* 头像 */
    avatar?: string | null

    /* 是否启用 */
    isEnabled: boolean

    /* 角色 0普通管理员 1超级管理员 */
    role: number

    /* 最后登录时间 */
    lastLoginAt?: string

    /* 最后登录IP */
    lastLoginIp?: string

    /* 登录失败次数 */
    loginFailCount: number

    /* 是否锁定 */
    isLocked: boolean

    /* 创建时间 */
    createdAt: string

    /* 更新时间 */
    updatedAt: string

    /** 任意合法数值 */
    [property: string]: any
  }[]
  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [删除用户](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090638)
 *  @标签 管理端用户模块/删除用户
 *  @方式 POST
 *  @地址 /api/admin/user/user-delete
 *  @更新时间 2025-07-02 23:25:13
 */

export interface UserDeleteRequest {
  /* 主键id */
  id: number
}

/*  */
export type UserDeleteResponse = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}
