/**
 * 接口 [创建管理员用户↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-131620160)
 * @标签 `管理端/用户/创建管理员用户`
 * @请求头 `POST /admin/user/createAdminUser`
 * @更新时间 `2023-12-07T13:39:24.000Z`
 */

export interface CreateAdminUserTypings {
  Request: {
    /*
     * 用户名
     */
    username: string
    /*
     * 用户头像
     */
    avatar?: string
    /*
     * 手机号
     */
    mobile?: string
    /*
     * 用户状态，1启用0禁用
     */
    status?: number
    /*
     * 是否为超管，1是0否
     */
    isRoot?: number
    /*
     * 密码
     */
    password: string
    /*
     * 确认密码
     */
    confirmPassword: string
  }
  /*
   * 主键id
   */
  Response: number
}
/**
 * 接口 [获取用户信息↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-131964178)
 * @标签 `管理端/用户/获取用户信息`
 * @请求头 `GET /admin/user/getUserInfo`
 * @更新时间 `2024-01-21T12:47:59.000Z`
 */

export interface GetUserInfoTypings {
  Request: {
    /*
     * 用户id
     */
    id?: string
  }

  Response: {
    /*
     * 主键id
     */
    id: number
    /*
     * 用户名
     */
    username: string
    /*
     * 手机号
     */
    mobile: string
    /*
     * 用户头像
     */
    avatar?: string | null
    /*
     * 管理员状态，1启用0禁用
     */
    status: number
    /*
     * 是否为超管，1是0否
     */
    isRoot: number
    /*
     * 创建时间
     */
    createdAt: string
    /*
     * 更新时间
     */
    updatedAt: string
  }
}
/**
 * 接口 [更新用户信息↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-131972458)
 * @标签 `管理端/用户/更新用户信息`
 * @请求头 `POST /admin/user/updateAdminUserInfo`
 * @更新时间 `2024-01-26T14:53:51.000Z`
 */

export interface UpdateAdminUserInfoTypings {
  Request: {
    /*
     * 用户名
     */
    username: string
    /*
     * 手机号
     */
    mobile: string
    /*
     * 用户头像
     */
    avatar?: string | null
  }
  /*
   * 主键id
   */
  Response: number | null
}
/**
 * 接口 [启用或禁用↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-131972472)
 * @标签 `管理端/用户/启用或禁用`
 * @请求头 `POST /admin/user/updateAdminUserStatus`
 * @更新时间 `2023-12-09T07:37:29.000Z`
 */

export interface UpdateAdminUserStatusTypings {
  Request: null
  /*
   * 主键id
   */
  Response: number | null
}
/**
 * 接口 [修改密码↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-131972475)
 * @标签 `管理端/用户/修改密码`
 * @请求头 `POST /admin/user/updateAdminUserPassword`
 * @更新时间 `2023-12-09T09:17:51.000Z`
 */

export interface UpdateAdminUserPasswordTypings {
  Request: {
    /*
     * 用户主键id
     */
    id: number
    /*
     * 旧密码
     */
    oldPassword: string
    /*
     * 新密码
     */
    newPassword: string
    /*
     * 确认新密码
     */
    confirmNewPassword: string
  }
  /*
   * 主键id
   */
  Response: number | null
}
/**
 * 接口 [登录↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-130086370)
 * @标签 `管理端/用户/登录`
 * @请求头 `POST /admin/user/login`
 * @更新时间 `2023-12-11T15:58:17.000Z`
 */

export interface LoginTypings {
  Request: {
    /*
     * 手机号
     */
    mobile: string
    /*
     * 密码
     */
    password: string
    /*
     * 验证码
     */
    captcha: string
    /*
     * 验证码id
     */
    captchaId: string
  }

  Response: {
    /*
     * token信息
     */
    token: {
      /*
       * 账号token
       */
      accessToken: string
      /*
       * 刷新token
       */
      refreshToken: string
    }

    /*
     * 用户信息
     */
    userInfo: {
      /*
       * 主键id
       */
      id: number
      /*
       * 用户名
       */
      username: string
      /*
       * 手机号
       */
      mobile: string
      /*
       * 用户头像
       */
      avatar?: string | null
      /*
       * 管理员状态，1启用0禁用
       */
      status: number
      /*
       * 是否为超管，1是0否
       */
      isRoot: number
      /*
       * 创建时间
       */
      createdAt: string
      /*
       * 更新时间
       */
      updatedAt: string
    }
  }
}
/**
 * 接口 [刷新accessToken↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-134115928)
 * @标签 `管理端/用户/刷新accessToken`
 * @请求头 `POST /admin/user/refreshAccessToken`
 * @更新时间 `2023-12-16T15:32:51.000Z`
 */

export interface RefreshAccessTokenTypings {
  Request: {
    /*
     * accessToken
     */
    accessToken: string
  }
  /*
   * accessToken
   */
  Response: string
}
/**
 * 接口 [获取管理员列表↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-144286941)
 * @标签 `管理端/用户/获取管理员列表`
 * @请求头 `GET /admin/user/getUserPage`
 * @更新时间 `2024-01-23T15:46:15.000Z`
 */

export interface GetUserPageTypings {
  Request: {
    /*
     * 页码
     */
    pageIndex?: string
    /*
     * 单页数量
     */
    pageSize?: string
    /*
     * 排序
     */
    sortBy?: string
    /*
     * 管理员手机号
     */
    mobile?: string
    /*
     * 启用状态，1启用，0禁用
     */
    status?: string
    /*
     * 是否是超管，1是0否
     */
    isRoot?: string
    /*
     * 姓名
     */
    username?: string
  }

  Response: {
    /*
     * 单页数量
     */
    pageSize: number
    /*
     * 页码
     */
    pageIndex: number
    /*
     * 总记录条数
     */
    total: number
    /*
     *
     */
    list: {
      /*
       * 主键id
       */
      id: number
      /*
       * 用户名
       */
      username: string
      /*
       * 手机号
       */
      mobile: string
      /*
       * 用户头像
       */
      avatar?: string | null
      /*
       * 管理员状态，1启用0禁用
       */
      status: number
      /*
       * 是否为超管，1是0否
       */
      isRoot: number
      /*
       * 创建时间
       */
      createdAt: string
      /*
       * 更新时间
       */
      updatedAt: string
    }[]
  }
}
/**
 * 接口 [删除管理员↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-144631484)
 * @标签 `管理端/用户/删除管理员`
 * @请求头 `POST /admin/user/deleteAdminUser`
 * @更新时间 `2024-01-24T13:51:12.000Z`
 */

export interface DeleteAdminUserTypings {
  Request: {
    /*
     * 主键id
     */
    id: number
  }
  /*
   * 删除的主键id
   */
  Response: number
}
