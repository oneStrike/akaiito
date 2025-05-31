/**
 *  接口 [获取验证码](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303144580)
 *  @标签 管理端用户模块/获取验证码
 *  @方式 GET
 *  @地址 /api/admin/user/getCaptcha
 *  @更新时间 2025-05-31 03:40:15
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
 *  @更新时间 2025-05-31 03:40:15
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
}

/*  */
export type LoginTypesRes = {
  /* 用户名 */
  username: string

  /* 密码 */
  password: string

  /* 验证码 */
  captcha: string

  /* 验证码ID */
  captchaId: string
}

/**
 *  接口 [获取管理端用户分页列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303144582)
 *  @标签 管理端用户模块/获取管理端用户分页列表
 *  @方式 GET
 *  @地址 /api/admin/user/getAdminUserPage
 *  @更新时间 2025-05-31 03:40:15
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
