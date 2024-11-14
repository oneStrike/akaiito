/**
 *  接口 [创建客户端用户](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-231861661)
 *  @标签 用户/创建客户端用户
 *  @方式 POST
 *  @地址 /client/user/createClientUser
 *  @更新时间 2024-11-09 15:58:43
 */

export interface CreateClientUserTypesReq {
  /* 用户昵称 */
  username: string

  /* 密码 */
  password: string

  /* 确认密码 */
  confirmPassword: string
}

export interface CreateClientUserTypesRes {
  /* 主键id */
  id: number
}

/**
 *  接口 [登录](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-231863976)
 *  @标签 用户/登录
 *  @方式 POST
 *  @地址 /client/user/login
 *  @更新时间 2024-11-09 16:21:45
 */

export interface LoginTypesReq {
  /* 用户名 */
  username: string

  /* 密码 */
  password: string
}

export interface LoginTypesRes {
  /* undefined */
  token: {
    /* 账号token */
    accessToken: string

    /* 刷新token */
    refreshToken: string
  }

  /* undefined */
  userInfo: {
    /* 主键id */
    id: number

    /* 用户名 */
    username: string

    /* 手机号 */
    mobile: string | null

    /* 用户头像 */
    avatar: string | null

    /* 性别  0 未知  1男  2女 */
    sex: number

    /* 状态，1启用0禁用 */
    status: number

    /* 创建时间 */
    createdAt: string

    /* 更新时间 */
    updatedAt: string
  }
}

/**
 *  接口 [获取用户详细信息](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-231866054)
 *  @标签 用户/获取用户详细信息
 *  @方式 GET
 *  @地址 /client/user/userInfo
 *  @更新时间 2024-11-09 16:31:15
 */

export interface UserInfoTypesReq {}

export interface UserInfoTypesRes {
  /* 主键id */
  id: number

  /* 用户名 */
  username: string

  /* 手机号 */
  mobile: string | null

  /* 用户头像 */
  avatar: string | null

  /* 性别  0 未知  1男  2女 */
  sex: number

  /* 状态，1启用0禁用 */
  status: number

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string
}

/**
 *  接口 [刷新用户token](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-231877829)
 *  @标签 用户/刷新用户token
 *  @方式 POST
 *  @地址 /client/user/refreshToken
 *  @更新时间 2024-11-09 17:25:38
 */

export interface RefreshTokenTypesReq {
  /* 账号token */
  accessToken: string

  /* 刷新token */
  refreshToken: string
}

/* 账号token */
export type RefreshTokenTypesRes = string
