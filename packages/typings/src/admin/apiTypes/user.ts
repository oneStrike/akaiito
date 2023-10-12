/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File

/**
 * 接口 [创建管理员用户↗](https://yapi.pro/project/11787/interface/api/459202) 的 **请求类型**
 *
 * @分类 [管理端/用户↗](https://yapi.pro/project/11787/interface/api/cat_112836)
 * @标签 `管理端/用户`
 * @请求头 `POST /admin/user/createUser`
 * @更新时间 `2023-06-24 16:44:20`
 */
export interface AdminCreateUserReq {
  /**
   * 用户名
   */
  username: string
  /**
   * 账号
   */
  account: string
  /**
   * 用户头像
   */
  avatar?: string
  /**
   * 手机号
   */
  mobile: string
  /**
   * 邮箱
   */
  email: string
  /**
   * 是否是超管，1是，0否
   */
  isRoot: number
  /**
   * 状态，1启用，0禁用
   */
  status: number
  /**
   * 密码
   */
  password: string
  /**
   * 确认密码
   */
  confirmPassword: string
}

/**
 * 接口 [创建管理员用户↗](https://yapi.pro/project/11787/interface/api/459202) 的 **返回类型**
 *
 * @分类 [管理端/用户↗](https://yapi.pro/project/11787/interface/api/cat_112836)
 * @标签 `管理端/用户`
 * @请求头 `POST /admin/user/createUser`
 * @更新时间 `2023-06-24 16:44:20`
 */
export type AdminCreateUserRes = number

/**
 * 接口 [更新用户信息↗](https://yapi.pro/project/11787/interface/api/459204) 的 **请求类型**
 *
 * @分类 [管理端/用户↗](https://yapi.pro/project/11787/interface/api/cat_112836)
 * @标签 `管理端/用户`
 * @请求头 `POST /admin/user/updateUserInfo`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface AdminUpdateUserInfoReq {
  /**
   * 主键id
   */
  id: number
  /**
   * 用户名
   */
  username: string
  /**
   * 账号
   */
  account: string
  /**
   * 用户头像
   */
  avatar?: string
  /**
   * 手机号
   */
  mobile: string
  /**
   * 邮箱
   */
  email: string
  /**
   * 是否是超管，1是，0否
   */
  isRoot: number
  /**
   * 状态，1启用，0禁用
   */
  status: number
}

/**
 * 接口 [更新用户信息↗](https://yapi.pro/project/11787/interface/api/459204) 的 **返回类型**
 *
 * @分类 [管理端/用户↗](https://yapi.pro/project/11787/interface/api/cat_112836)
 * @标签 `管理端/用户`
 * @请求头 `POST /admin/user/updateUserInfo`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface AdminUpdateUserInfoRes {}

/**
 * 接口 [登录↗](https://yapi.pro/project/11787/interface/api/459206) 的 **请求类型**
 *
 * @分类 [管理端/用户↗](https://yapi.pro/project/11787/interface/api/cat_112836)
 * @标签 `管理端/用户`
 * @请求头 `POST /admin/user/login`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface AdminLoginReq {
  /**
   * 账号
   */
  account: string
  /**
   * 密码
   */
  password: string
  /**
   * 验证码
   */
  captcha: string
  /**
   * 验证码id
   */
  captchaId?: string
}

/**
 * 接口 [登录↗](https://yapi.pro/project/11787/interface/api/459206) 的 **返回类型**
 *
 * @分类 [管理端/用户↗](https://yapi.pro/project/11787/interface/api/cat_112836)
 * @标签 `管理端/用户`
 * @请求头 `POST /admin/user/login`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface AdminLoginRes {
  /**
   * token
   */
  token: string
  /**
   * 刷新token
   */
  refreshToken: string
  /**
   * 用户信息
   */
  user: {
    /**
     * 主键id
     */
    id: number
    /**
     * 用户名
     */
    username: string
    /**
     * 账号
     */
    account: string
    /**
     * 用户头像
     */
    avatar?: string
    /**
     * 手机号
     */
    mobile: string
    /**
     * 邮箱
     */
    email: string
    /**
     * 是否是超管，1是，0否
     */
    isRoot: number
    /**
     * 状态，1启用，0禁用
     */
    status: number
    /**
     * 创建日期
     */
    createdAt?: string
    /**
     * 更新日期
     */
    updatedAt?: string
  }
}

/**
 * 接口 [获取用户信息↗](https://yapi.pro/project/11787/interface/api/459208) 的 **请求类型**
 *
 * @分类 [管理端/用户↗](https://yapi.pro/project/11787/interface/api/cat_112836)
 * @标签 `管理端/用户`
 * @请求头 `GET /admin/user/UserInfo`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface AdminUserInfoReq {}

/**
 * 接口 [获取用户信息↗](https://yapi.pro/project/11787/interface/api/459208) 的 **返回类型**
 *
 * @分类 [管理端/用户↗](https://yapi.pro/project/11787/interface/api/cat_112836)
 * @标签 `管理端/用户`
 * @请求头 `GET /admin/user/UserInfo`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface AdminUserInfoRes {
  /**
   * 主键id
   */
  id: number
  /**
   * 用户名
   */
  username: string
  /**
   * 账号
   */
  account: string
  /**
   * 用户头像
   */
  avatar?: string
  /**
   * 手机号
   */
  mobile: string
  /**
   * 邮箱
   */
  email: string
  /**
   * 是否是超管，1是，0否
   */
  isRoot: number
  /**
   * 状态，1启用，0禁用
   */
  status: number
  /**
   * 创建日期
   */
  createdAt?: string
  /**
   * 更新日期
   */
  updatedAt?: string
}

/**
 * 接口 [刷新账号token↗](https://yapi.pro/project/11787/interface/api/459210) 的 **请求类型**
 *
 * @分类 [管理端/用户↗](https://yapi.pro/project/11787/interface/api/cat_112836)
 * @标签 `管理端/用户`
 * @请求头 `POST /admin/user/refreshToken`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface AdminRefreshTokenReq {}

/**
 * 接口 [刷新账号token↗](https://yapi.pro/project/11787/interface/api/459210) 的 **返回类型**
 *
 * @分类 [管理端/用户↗](https://yapi.pro/project/11787/interface/api/cat_112836)
 * @标签 `管理端/用户`
 * @请求头 `POST /admin/user/refreshToken`
 * @更新时间 `2023-06-24 16:44:21`
 */
export type AdminRefreshTokenRes = string

/**
 * 接口 [删除用户↗](https://yapi.pro/project/11787/interface/api/459212) 的 **请求类型**
 *
 * @分类 [管理端/用户↗](https://yapi.pro/project/11787/interface/api/cat_112836)
 * @标签 `管理端/用户`
 * @请求头 `POST /admin/user/deleteUser`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface AdminDeleteUserReq {
  /**
   * 被删除的用户 id
   */
  id: number
}

/**
 * 接口 [删除用户↗](https://yapi.pro/project/11787/interface/api/459212) 的 **返回类型**
 *
 * @分类 [管理端/用户↗](https://yapi.pro/project/11787/interface/api/cat_112836)
 * @标签 `管理端/用户`
 * @请求头 `POST /admin/user/deleteUser`
 * @更新时间 `2023-06-24 16:44:21`
 */
export type AdminDeleteUserRes = number

/**
 * 接口 [启用或者禁用↗](https://yapi.pro/project/11787/interface/api/459214) 的 **请求类型**
 *
 * @分类 [管理端/用户↗](https://yapi.pro/project/11787/interface/api/cat_112836)
 * @标签 `管理端/用户`
 * @请求头 `POST /admin/user/switchUserStatus`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface AdminSwitchUserStatusReq {
  /**
   * 用户id
   */
  ids: number[]
  /**
   * 状态，1启用，0禁用
   */
  status: number
}

/**
 * 接口 [启用或者禁用↗](https://yapi.pro/project/11787/interface/api/459214) 的 **返回类型**
 *
 * @分类 [管理端/用户↗](https://yapi.pro/project/11787/interface/api/cat_112836)
 * @标签 `管理端/用户`
 * @请求头 `POST /admin/user/switchUserStatus`
 * @更新时间 `2023-06-24 16:44:21`
 */
export type AdminSwitchUserStatusRes = number

/**
 * 接口 [修改密码↗](https://yapi.pro/project/11787/interface/api/459216) 的 **请求类型**
 *
 * @分类 [管理端/用户↗](https://yapi.pro/project/11787/interface/api/cat_112836)
 * @标签 `管理端/用户`
 * @请求头 `POST /admin/user/updatePassword`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface AdminUpdatePasswordReq {
  /**
   * 密码
   */
  password: string
  /**
   * 确认密码
   */
  confirmPassword: string
  /**
   * 原密码
   */
  originalPassword: string
}

/**
 * 接口 [修改密码↗](https://yapi.pro/project/11787/interface/api/459216) 的 **返回类型**
 *
 * @分类 [管理端/用户↗](https://yapi.pro/project/11787/interface/api/cat_112836)
 * @标签 `管理端/用户`
 * @请求头 `POST /admin/user/updatePassword`
 * @更新时间 `2023-06-24 16:44:21`
 */
export type AdminUpdatePasswordRes = number

/**
 * 接口 [获取用户列表↗](https://yapi.pro/project/11787/interface/api/459218) 的 **请求类型**
 *
 * @分类 [管理端/用户↗](https://yapi.pro/project/11787/interface/api/cat_112836)
 * @标签 `管理端/用户`
 * @请求头 `GET /admin/user/userList`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface AdminUserListReq {
  /**
   * 排序方式，asc正序，desc倒序
   */
  sort?: string
  /**
   * 排序字段
   */
  sortField?: string
  /**
   * 页码
   */
  pageIndex?: string
  /**
   * 单页大小
   */
  pageSize?: string
}

/**
 * 接口 [获取用户列表↗](https://yapi.pro/project/11787/interface/api/459218) 的 **返回类型**
 *
 * @分类 [管理端/用户↗](https://yapi.pro/project/11787/interface/api/cat_112836)
 * @标签 `管理端/用户`
 * @请求头 `GET /admin/user/userList`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface AdminUserListRes {
  list: {
    /**
     * 主键id
     */
    id: number
    /**
     * 用户名
     */
    username: string
    /**
     * 账号
     */
    account: string
    /**
     * 用户头像
     */
    avatar?: string
    /**
     * 手机号
     */
    mobile: string
    /**
     * 邮箱
     */
    email: string
    /**
     * 是否是超管，1是，0否
     */
    isRoot: number
    /**
     * 状态，1启用，0禁用
     */
    status: number
    /**
     * 创建日期
     */
    createdAt?: string
    /**
     * 更新日期
     */
    updatedAt?: string
  }[]
  /**
   * 总数据数量
   */
  total: number
  /**
   * 返回的数据数量
   */
  count: number
  /**
   * 单页大小
   */
  pageSize: number
  /**
   * 页码
   */
  pageIndex: number
  /**
   * 排序方式，asc正序，desc倒序
   */
  sort?: string
  /**
   * 排序字段
   */
  sortField?: string
}

/* prettier-ignore-end */
