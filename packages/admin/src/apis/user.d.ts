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
 * @更新时间 `2023-12-09T09:08:03.000Z`
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
 * @更新时间 `2023-12-09T09:18:59.000Z`
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
 * 接口 [更新权限↗](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-131972552)
 * @标签 `管理端/用户/更新权限`
 * @请求头 `POST /admin/user/updateAdminUserPermissions`
 * @更新时间 `2023-12-09T09:18:00.000Z`
 */

export interface UpdateAdminUserPermissionsTypings {
  Request: null
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
     * token
     */
    token: string
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
