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

/**
 * 接口 [获取登录日志↗](https://yapi.pro/project/11787/interface/api/459220) 的 **请求类型**
 *
 * @分类 [管理端/日志记录↗](https://yapi.pro/project/11787/interface/api/cat_112844)
 * @标签 `管理端/日志记录`
 * @请求头 `GET /admin/log/loginLog`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface AdminLoginLogReq {
  /**
   * 页码
   */
  pageIndex?: string
  /**
   * 单页大小
   */
  pageSize?: string
  /**
   * 排序方式 asc正序 desc倒序
   */
  sort?: string
  /**
   * 排序字段
   */
  sortField?: string
  /**
   * 用户id
   */
  userId?: string
  /**
   * 登录状态 1成功 0失败
   */
  receipt?: string
  /**
   * 开始时间
   */
  startDate?: string
  /**
   * 结束时间
   */
  endStart?: string
}

/**
 * 接口 [获取登录日志↗](https://yapi.pro/project/11787/interface/api/459220) 的 **返回类型**
 *
 * @分类 [管理端/日志记录↗](https://yapi.pro/project/11787/interface/api/cat_112844)
 * @标签 `管理端/日志记录`
 * @请求头 `GET /admin/log/loginLog`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface AdminLoginLogRes {
  list: {
    /**
     * 主键id
     */
    id: number
    /**
     * 操作者账号
     */
    userAccount: string
    /**
     * 操作昵称
     */
    username: string
    /**
     * 操作的用户id
     */
    userId: number
    /**
     * 操作类型
     */
    action: string
    /**
     * 操作者ip
     */
    ip: string
    /**
     * 操作者id映射地址
     */
    ipAddress: string
    /**
     * 操作状态
     */
    receipt: number
    /**
     * 操作状态描述
     */
    receiptDesc: string
    /**
     * 请求参数
     */
    params: string
    /**
     * 浏览器用户UA
     */
    userAgent: string
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

/**
 * 接口 [获取系统信息↗](https://yapi.pro/project/11787/interface/api/459222) 的 **请求类型**
 *
 * @分类 [管理端/系统↗](https://yapi.pro/project/11787/interface/api/cat_112852)
 * @标签 `管理端/系统`
 * @请求头 `GET /admin/system/systemInfo`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface AdminSystemInfoReq {}

/**
 * 接口 [获取系统信息↗](https://yapi.pro/project/11787/interface/api/459222) 的 **返回类型**
 *
 * @分类 [管理端/系统↗](https://yapi.pro/project/11787/interface/api/cat_112852)
 * @标签 `管理端/系统`
 * @请求头 `GET /admin/system/systemInfo`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface AdminSystemInfoRes {
  /**
   * 操作系统
   */
  platform: string
  /**
   * node版本号
   */
  node: string
  /**
   * v8引擎版本
   */
  v8: string
  /**
   * 服务器时间
   */
  serverTime: number
  /**
   * 系统运行时间
   */
  Uptime: number
  /**
   * cpu型号
   */
  cpu: string
  /**
   * cpu使用率
   */
  cpuUsage: string
  /**
   * 内存总大小
   */
  memoryTotal: string
  /**
   * 内存空闲大小
   */
  memoryFree: string
  /**
   * 内存已使用大小
   */
  memoryUsed: string
  /**
   * 磁盘标识符
   */
  diskPath: string
  /**
   * 磁盘剩余容量
   */
  diskFree: string
  /**
   * 磁盘总容量
   */
  diskTotal: string
  /**
   * 磁盘已使用容量
   */
  diskUsed: string
}

/**
 * 接口 [获取素材库分组↗](https://yapi.pro/project/11787/interface/api/459374) 的 **请求类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `GET /admin/materialLibrary/getMaterialGroup`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface AdminGetMaterialGroupReq {}

/**
 * 接口 [获取素材库分组↗](https://yapi.pro/project/11787/interface/api/459374) 的 **返回类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `GET /admin/materialLibrary/getMaterialGroup`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface AdminGetMaterialGroupRes {
  list: {
    /**
     * 主键id
     */
    id: number
    /**
     * 分组名称
     */
    groupName: string
    /**
     * 排序
     */
    sort: number
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

/**
 * 接口 [创建素材库分组↗](https://yapi.pro/project/11787/interface/api/459376) 的 **请求类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `POST /admin/materialLibrary/createMaterialGroup`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface AdminCreateMaterialGroupReq {
  /**
   * 素材库分组名称
   */
  groupName: string
}

/**
 * 接口 [创建素材库分组↗](https://yapi.pro/project/11787/interface/api/459376) 的 **返回类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `POST /admin/materialLibrary/createMaterialGroup`
 * @更新时间 `2023-06-24 16:44:21`
 */
export type AdminCreateMaterialGroupRes = number

/**
 * 接口 [删除素材库分组↗](https://yapi.pro/project/11787/interface/api/459380) 的 **请求类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `POST /admin/materialLibrary/deleteMaterialGroup`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface AdminDeleteMaterialGroupReq {
  /**
   * 分组id
   */
  id: number
}

/**
 * 接口 [删除素材库分组↗](https://yapi.pro/project/11787/interface/api/459380) 的 **返回类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `POST /admin/materialLibrary/deleteMaterialGroup`
 * @更新时间 `2023-06-24 16:44:21`
 */
export type AdminDeleteMaterialGroupRes = number

/**
 * 接口 [添加素材↗](https://yapi.pro/project/11787/interface/api/459382) 的 **请求类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `POST /admin/materialLibrary/createMaterial`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface AdminCreateMaterialReq {
  /**
   * 分组id
   */
  groupId: number
  /**
   * 素材名称
   */
  material: {
    /**
     * 素材路径
     */
    path: string
    /**
     * 素材名称
     */
    materialName: string
    /**
     * 素材类型，url，image，video
     */
    materialType: string
  }[]
}

/**
 * 接口 [添加素材↗](https://yapi.pro/project/11787/interface/api/459382) 的 **返回类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `POST /admin/materialLibrary/createMaterial`
 * @更新时间 `2023-06-24 16:44:21`
 */
export type AdminCreateMaterialRes = number[]

/**
 * 接口 [获取素材列表↗](https://yapi.pro/project/11787/interface/api/459384) 的 **请求类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `GET /admin/materialLibrary/getMaterial`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface AdminGetMaterialReq {
  /**
   * 分组id
   */
  groupId?: string
  /**
   * 素材类型,iamge,video,url
   */
  materialType?: string
  /**
   * 素材名称
   */
  materialName?: string
  /**
   * 单页数量
   */
  pageSize?: string
  /**
   * 页码
   */
  pageIndex?: string
  /**
   * 排序
   */
  sort?: string
  /**
   * 排序字段,asc正序，desc倒序
   */
  sortField?: string
}

/**
 * 接口 [获取素材列表↗](https://yapi.pro/project/11787/interface/api/459384) 的 **返回类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `GET /admin/materialLibrary/getMaterial`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface AdminGetMaterialRes {
  list: {
    /**
     * 主键id
     */
    id: number
    /**
     * 素材路径
     */
    path: string
    /**
     * 分组id
     */
    groupId: number
    /**
     * 素材名称
     */
    materialName: string
    /**
     * 素材类型
     */
    materialType: string
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

/**
 * 接口 [删除素材↗](https://yapi.pro/project/11787/interface/api/459386) 的 **请求类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `POST /admin/materialLibrary/deleteMaterial`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface AdminDeleteMaterialReq {
  /**
   * 素材id
   */
  id: number
}

/**
 * 接口 [删除素材↗](https://yapi.pro/project/11787/interface/api/459386) 的 **返回类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `POST /admin/materialLibrary/deleteMaterial`
 * @更新时间 `2023-06-24 16:44:21`
 */
export type AdminDeleteMaterialRes = string

/**
 * 接口 [修改素材库分组名称↗](https://yapi.pro/project/11787/interface/api/459388) 的 **请求类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `POST /admin/materialLibrary/updateMaterialGroup`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface AdminUpdateMaterialGroupReq {
  /**
   * 主键 id
   */
  id: number
  /**
   * 分组新名称
   */
  groupName: string
}

/**
 * 接口 [修改素材库分组名称↗](https://yapi.pro/project/11787/interface/api/459388) 的 **返回类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `POST /admin/materialLibrary/updateMaterialGroup`
 * @更新时间 `2023-06-24 16:44:21`
 */
export type AdminUpdateMaterialGroupRes = number

/**
 * 接口 [创建diy页面↗](https://yapi.pro/project/11787/interface/api/459238) 的 **请求类型**
 *
 * @分类 [管理端/diy客户端首页↗](https://yapi.pro/project/11787/interface/api/cat_112868)
 * @标签 `管理端/diy客户端首页`
 * @请求头 `POST /admin/diyClientPage/createDiyPage`
 * @更新时间 `2023-02-01 21:42:16`
 */
export interface AdminCreateDiyPageReq {
  /**
   * diy名称
   */
  diyName: string
  /**
   * diy数据
   */
  diyData: string
}

/**
 * 接口 [创建diy页面↗](https://yapi.pro/project/11787/interface/api/459238) 的 **返回类型**
 *
 * @分类 [管理端/diy客户端首页↗](https://yapi.pro/project/11787/interface/api/cat_112868)
 * @标签 `管理端/diy客户端首页`
 * @请求头 `POST /admin/diyClientPage/createDiyPage`
 * @更新时间 `2023-02-01 21:42:16`
 */
export type AdminCreateDiyPageRes = number

/**
 * 接口 [修改diy页面↗](https://yapi.pro/project/11787/interface/api/459240) 的 **请求类型**
 *
 * @分类 [管理端/diy客户端首页↗](https://yapi.pro/project/11787/interface/api/cat_112868)
 * @标签 `管理端/diy客户端首页`
 * @请求头 `POST /admin/diyClientPage/updateDiyPage`
 * @更新时间 `2023-02-01 21:42:16`
 */
export interface AdminUpdateDiyPageReq {
  /**
   * 主键id
   */
  id: number
  /**
   * diy名称
   */
  diyName: string
  /**
   * diy数据
   */
  diyData: string
}

/**
 * 接口 [修改diy页面↗](https://yapi.pro/project/11787/interface/api/459240) 的 **返回类型**
 *
 * @分类 [管理端/diy客户端首页↗](https://yapi.pro/project/11787/interface/api/cat_112868)
 * @标签 `管理端/diy客户端首页`
 * @请求头 `POST /admin/diyClientPage/updateDiyPage`
 * @更新时间 `2023-02-01 21:42:16`
 */
export type AdminUpdateDiyPageRes = number

/**
 * 接口 [获取diy列表数据↗](https://yapi.pro/project/11787/interface/api/459242) 的 **请求类型**
 *
 * @分类 [管理端/diy客户端首页↗](https://yapi.pro/project/11787/interface/api/cat_112868)
 * @标签 `管理端/diy客户端首页`
 * @请求头 `GET /admin/diyClientPage/getDiyPage`
 * @更新时间 `2023-02-01 21:42:16`
 */
export interface AdminGetDiyPageReq {}

/**
 * 接口 [获取diy列表数据↗](https://yapi.pro/project/11787/interface/api/459242) 的 **返回类型**
 *
 * @分类 [管理端/diy客户端首页↗](https://yapi.pro/project/11787/interface/api/cat_112868)
 * @标签 `管理端/diy客户端首页`
 * @请求头 `GET /admin/diyClientPage/getDiyPage`
 * @更新时间 `2023-02-01 21:42:16`
 */
export type AdminGetDiyPageRes = {
  /**
   * 主键id
   */
  id: number
  /**
   * diy名称
   */
  diyName: string
  /**
   * diy数据
   */
  diyData: string
  /**
   * 是否使用1使用0未使用
   */
  use: number
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
 * 接口 [切换diy页面使用状态↗](https://yapi.pro/project/11787/interface/api/459244) 的 **请求类型**
 *
 * @分类 [管理端/diy客户端首页↗](https://yapi.pro/project/11787/interface/api/cat_112868)
 * @标签 `管理端/diy客户端首页`
 * @请求头 `POST /admin/diyClientPage/switchPageStatus`
 * @更新时间 `2023-02-01 21:42:17`
 */
export interface AdminSwitchPageStatusReq {
  /**
   * 主键id
   */
  id: number
  /**
   * 是否使用1使用0未使用
   */
  use: number
}

/**
 * 接口 [切换diy页面使用状态↗](https://yapi.pro/project/11787/interface/api/459244) 的 **返回类型**
 *
 * @分类 [管理端/diy客户端首页↗](https://yapi.pro/project/11787/interface/api/cat_112868)
 * @标签 `管理端/diy客户端首页`
 * @请求头 `POST /admin/diyClientPage/switchPageStatus`
 * @更新时间 `2023-02-01 21:42:17`
 */
export type AdminSwitchPageStatusRes = number

/**
 * 接口 [删除diy数据↗](https://yapi.pro/project/11787/interface/api/459246) 的 **请求类型**
 *
 * @分类 [管理端/diy客户端首页↗](https://yapi.pro/project/11787/interface/api/cat_112868)
 * @标签 `管理端/diy客户端首页`
 * @请求头 `POST /admin/diyClientPage/deleteDiyPage`
 * @更新时间 `2023-02-01 21:42:17`
 */
export interface AdminDeleteDiyPageReq {
  /**
   * 主键id
   */
  id: number
}

/**
 * 接口 [删除diy数据↗](https://yapi.pro/project/11787/interface/api/459246) 的 **返回类型**
 *
 * @分类 [管理端/diy客户端首页↗](https://yapi.pro/project/11787/interface/api/cat_112868)
 * @标签 `管理端/diy客户端首页`
 * @请求头 `POST /admin/diyClientPage/deleteDiyPage`
 * @更新时间 `2023-02-01 21:42:17`
 */
export type AdminDeleteDiyPageRes = number

/**
 * 接口 [获取客户端页面列表↗](https://yapi.pro/project/11787/interface/api/461968) 的 **请求类型**
 *
 * @分类 [管理端/客户端管理↗](https://yapi.pro/project/11787/interface/api/cat_114804)
 * @标签 `管理端/客户端管理`
 * @请求头 `GET /admin/clientManage/getClientPage`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface AdminGetClientPageReq {}

/**
 * 接口 [获取客户端页面列表↗](https://yapi.pro/project/11787/interface/api/461968) 的 **返回类型**
 *
 * @分类 [管理端/客户端管理↗](https://yapi.pro/project/11787/interface/api/cat_114804)
 * @标签 `管理端/客户端管理`
 * @请求头 `GET /admin/clientManage/getClientPage`
 * @更新时间 `2023-06-24 16:44:21`
 */
export type AdminGetClientPageRes = {
  /**
   * 主键id
   */
  id: number
  /**
   * 页面名称
   */
  pageName: string
  /**
   * 页面路径
   */
  pagePath: string
  /**
   * 页面标题
   */
  pageTitle: string
  /**
   * 页面权限，normal不限制，vip限制会员
   */
  role: string
  /**
   * 会员等级，只有页面权限是vip时才可以有值
   */
  vipLevel: number
  /**
   * 页面状态1启用2禁用3开发中
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
 * 接口 [获取客户端配置信息↗](https://yapi.pro/project/11787/interface/api/477548) 的 **请求类型**
 *
 * @分类 [管理端/客户端管理↗](https://yapi.pro/project/11787/interface/api/cat_114804)
 * @标签 `管理端/客户端管理`
 * @请求头 `GET /admin/clientManage/systemConfig`
 * @更新时间 `2023-02-01 21:42:17`
 */
export interface AdminSystemConfigReq {}

/**
 * 接口 [获取客户端配置信息↗](https://yapi.pro/project/11787/interface/api/477548) 的 **返回类型**
 *
 * @分类 [管理端/客户端管理↗](https://yapi.pro/project/11787/interface/api/cat_114804)
 * @标签 `管理端/客户端管理`
 * @请求头 `GET /admin/clientManage/systemConfig`
 * @更新时间 `2023-02-01 21:42:17`
 */
export interface AdminSystemConfigRes {
  /**
   * 引导图类型，banner和personalize
   */
  guideType: string
  /**
   * 是否引用引导，1是0否
   */
  guide: number
}

/**
 * 接口 [获取客户端配置信息↗](https://yapi.pro/project/11787/interface/api/492540) 的 **请求类型**
 *
 * @分类 [管理端/客户端管理↗](https://yapi.pro/project/11787/interface/api/cat_114804)
 * @标签 `管理端/客户端管理`
 * @请求头 `GET /admin/clientManage/getSystemConfig`
 * @更新时间 `2023-05-02 16:22:57`
 */
export interface AdminGetSystemConfigReq {}

/**
 * 接口 [获取客户端配置信息↗](https://yapi.pro/project/11787/interface/api/492540) 的 **返回类型**
 *
 * @分类 [管理端/客户端管理↗](https://yapi.pro/project/11787/interface/api/cat_114804)
 * @标签 `管理端/客户端管理`
 * @请求头 `GET /admin/clientManage/getSystemConfig`
 * @更新时间 `2023-05-02 16:22:57`
 */
export interface AdminGetSystemConfigRes {
  /**
   * 引导图类型，banner和personalize
   */
  guideType: string
  /**
   * 是否引用引导，1是0否
   */
  guide: number
}

/**
 * 接口 [更新客户端的配置信息↗](https://yapi.pro/project/11787/interface/api/754116) 的 **请求类型**
 *
 * @分类 [管理端/客户端管理↗](https://yapi.pro/project/11787/interface/api/cat_114804)
 * @标签 `管理端/客户端管理`
 * @请求头 `POST /admin/clientConfigure/updateConfigure`
 * @更新时间 `2023-04-13 23:03:14`
 */
export interface AdminUpdateConfigureReq {
  /**
   * 服务协议链接
   */
  service_agreement: string
  /**
   * 隐私协议链接
   */
  privacy_agreement: string
}

/**
 * 接口 [更新客户端的配置信息↗](https://yapi.pro/project/11787/interface/api/754116) 的 **返回类型**
 *
 * @分类 [管理端/客户端管理↗](https://yapi.pro/project/11787/interface/api/cat_114804)
 * @标签 `管理端/客户端管理`
 * @请求头 `POST /admin/clientConfigure/updateConfigure`
 * @更新时间 `2023-04-13 23:03:14`
 */
export type AdminUpdateConfigureRes = null

/**
 * 接口 [更新客户端配置信息↗](https://yapi.pro/project/11787/interface/api/798849) 的 **请求类型**
 *
 * @分类 [管理端/客户端管理↗](https://yapi.pro/project/11787/interface/api/cat_114804)
 * @标签 `管理端/客户端管理`
 * @请求头 `POST /admin/clientManage/updateClientConfig`
 * @更新时间 `2023-06-24 16:44:22`
 */
export interface AdminUpdateClientConfigReq {
  /**
   * 协议标题
   */
  privacyTitle: string
  /**
   * 协议内容
   */
  privacyMessage: string
  /**
   * 二级协议标题
   */
  privacySecondTitle: string
  /**
   * 二级协议内容
   */
  privacySecondMessage: string
}

/**
 * 接口 [更新客户端配置信息↗](https://yapi.pro/project/11787/interface/api/798849) 的 **返回类型**
 *
 * @分类 [管理端/客户端管理↗](https://yapi.pro/project/11787/interface/api/cat_114804)
 * @标签 `管理端/客户端管理`
 * @请求头 `POST /admin/clientManage/updateClientConfig`
 * @更新时间 `2023-06-24 16:44:22`
 */
export type AdminUpdateClientConfigRes = null

/**
 * 接口 [获取客户端配置信息↗](https://yapi.pro/project/11787/interface/api/800365) 的 **请求类型**
 *
 * @分类 [管理端/客户端管理↗](https://yapi.pro/project/11787/interface/api/cat_114804)
 * @标签 `管理端/客户端管理`
 * @请求头 `GET /admin/clientManage/getClientConfig`
 * @更新时间 `2023-06-24 16:44:22`
 */
export interface AdminGetClientConfigReq {}

/**
 * 接口 [获取客户端配置信息↗](https://yapi.pro/project/11787/interface/api/800365) 的 **返回类型**
 *
 * @分类 [管理端/客户端管理↗](https://yapi.pro/project/11787/interface/api/cat_114804)
 * @标签 `管理端/客户端管理`
 * @请求头 `GET /admin/clientManage/getClientConfig`
 * @更新时间 `2023-06-24 16:44:22`
 */
export interface AdminGetClientConfigRes {
  /**
   * 协议标题
   */
  privacyTitle: string
  /**
   * 协议内容
   */
  privacyMessage: string
  /**
   * 二级协议标题
   */
  privacySecondTitle: string
  /**
   * 二级协议内容
   */
  privacySecondMessage: string
}

/**
 * 接口 [导出客户端代码包↗](https://yapi.pro/project/11787/interface/api/959158) 的 **请求类型**
 *
 * @分类 [管理端/客户端管理↗](https://yapi.pro/project/11787/interface/api/cat_114804)
 * @标签 `管理端/客户端管理`
 * @请求头 `GET /admin/clientManage/exportClientPackage`
 * @更新时间 `2023-06-24 16:44:22`
 */
export interface AdminExportClientPackageReq {}

/**
 * 接口 [导出客户端代码包↗](https://yapi.pro/project/11787/interface/api/959158) 的 **返回类型**
 *
 * @分类 [管理端/客户端管理↗](https://yapi.pro/project/11787/interface/api/cat_114804)
 * @标签 `管理端/客户端管理`
 * @请求头 `GET /admin/clientManage/exportClientPackage`
 * @更新时间 `2023-06-24 16:44:22`
 */
export type AdminExportClientPackageRes = null

/**
 * 接口 [获取隐私申明列表↗](https://yapi.pro/project/11787/interface/api/492556) 的 **请求类型**
 *
 * @分类 [管理端/隐私声明↗](https://yapi.pro/project/11787/interface/api/cat_128796)
 * @标签 `管理端/隐私声明`
 * @请求头 `GET /admin/privacy/getPrivacyPage`
 * @更新时间 `2023-06-24 16:44:22`
 */
export interface AdminGetPrivacyPageReq {
  /**
   * 页码
   */
  pageIndex: string
  /**
   * 单页大小
   */
  pageSize: string
  /**
   * 排序字段
   */
  sortField: string
  /**
   * 排序 asc正序 desc倒序
   */
  sort: string
  /**
   * 协议名称
   */
  name: string
  /**
   * 平台，可多选 1>APP 2>web 3>小程序
   */
  platform: string
  /**
   * 状态 1启用 0禁用
   */
  status?: string
}

/**
 * 接口 [获取隐私申明列表↗](https://yapi.pro/project/11787/interface/api/492556) 的 **返回类型**
 *
 * @分类 [管理端/隐私声明↗](https://yapi.pro/project/11787/interface/api/cat_128796)
 * @标签 `管理端/隐私声明`
 * @请求头 `GET /admin/privacy/getPrivacyPage`
 * @更新时间 `2023-06-24 16:44:22`
 */
export interface AdminGetPrivacyPageRes {
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
  list: {
    /**
     * 主键id
     */
    id: number
    /**
     * 协议名称
     */
    name: string
    /**
     * 平台，可多选 1>APP 2>web 3>小程序
     */
    platform: string
    /**
     * 状态 1启用 0 禁用
     */
    status: number
    /**
     * 备注
     */
    remark: string
  }[]
}

/**
 * 接口 [获取隐私声明详情↗](https://yapi.pro/project/11787/interface/api/492564) 的 **请求类型**
 *
 * @分类 [管理端/隐私声明↗](https://yapi.pro/project/11787/interface/api/cat_128796)
 * @标签 `管理端/隐私声明`
 * @请求头 `GET /admin/privacy/getPrivacyDetail`
 * @更新时间 `2023-06-24 16:44:22`
 */
export interface AdminGetPrivacyDetailReq {
  /**
   * 主键id
   */
  id?: string
}

/**
 * 接口 [获取隐私声明详情↗](https://yapi.pro/project/11787/interface/api/492564) 的 **返回类型**
 *
 * @分类 [管理端/隐私声明↗](https://yapi.pro/project/11787/interface/api/cat_128796)
 * @标签 `管理端/隐私声明`
 * @请求头 `GET /admin/privacy/getPrivacyDetail`
 * @更新时间 `2023-06-24 16:44:22`
 */
export interface AdminGetPrivacyDetailRes {
  /**
   * 主键id
   */
  id: number
  /**
   * 协议名称
   */
  name: string
  /**
   * 协议内容
   */
  content: string
  /**
   * 平台，可多选 1>APP 2>web 3>小程序
   */
  platform: string
  /**
   * 状态 1启用 0 禁用
   */
  status: number
  /**
   * 备注
   */
  remark: string
}

/**
 * 接口 [添加隐私声明↗](https://yapi.pro/project/11787/interface/api/492572) 的 **请求类型**
 *
 * @分类 [管理端/隐私声明↗](https://yapi.pro/project/11787/interface/api/cat_128796)
 * @标签 `管理端/隐私声明`
 * @请求头 `POST /admin/privacy/addPrivacy`
 * @更新时间 `2023-06-24 16:44:22`
 */
export interface AdminAddPrivacyReq {
  /**
   * 协议名称
   */
  name: string
  /**
   * 协议内容
   */
  content: string
  /**
   * 平台，可多选 1>APP 2>web 3>小程序
   */
  platform: string
  /**
   * 状态 1启用 0 禁用
   */
  status?: number
  /**
   * 备注
   */
  remark: string
}

/**
 * 接口 [添加隐私声明↗](https://yapi.pro/project/11787/interface/api/492572) 的 **返回类型**
 *
 * @分类 [管理端/隐私声明↗](https://yapi.pro/project/11787/interface/api/cat_128796)
 * @标签 `管理端/隐私声明`
 * @请求头 `POST /admin/privacy/addPrivacy`
 * @更新时间 `2023-06-24 16:44:22`
 */
export interface AdminAddPrivacyRes {
  /**
   * 状态码
   */
  code: number
  /**
   * 状态描述
   */
  status: string
  /**
   * 错误场景描述
   */
  desc?: string
  /**
   * 主键id
   */
  id: number
}

/**
 * 接口 [启用或禁用隐私声明↗](https://yapi.pro/project/11787/interface/api/492580) 的 **请求类型**
 *
 * @分类 [管理端/隐私声明↗](https://yapi.pro/project/11787/interface/api/cat_128796)
 * @标签 `管理端/隐私声明`
 * @请求头 `POST /admin/privacy/switchPrivacyStatus`
 * @更新时间 `2023-06-24 16:44:22`
 */
export interface AdminSwitchPrivacyStatusReq {
  /**
   * 以id为内容的数组
   */
  ids: number[]
  /**
   * 状态 1启用 0 禁用
   */
  status: number
}

/**
 * 接口 [启用或禁用隐私声明↗](https://yapi.pro/project/11787/interface/api/492580) 的 **返回类型**
 *
 * @分类 [管理端/隐私声明↗](https://yapi.pro/project/11787/interface/api/cat_128796)
 * @标签 `管理端/隐私声明`
 * @请求头 `POST /admin/privacy/switchPrivacyStatus`
 * @更新时间 `2023-06-24 16:44:22`
 */
export type AdminSwitchPrivacyStatusRes = number[]

/**
 * 接口 [删除隐私声明↗](https://yapi.pro/project/11787/interface/api/492588) 的 **请求类型**
 *
 * @分类 [管理端/隐私声明↗](https://yapi.pro/project/11787/interface/api/cat_128796)
 * @标签 `管理端/隐私声明`
 * @请求头 `POST /admin/privacy/deletePrivacy`
 * @更新时间 `2023-06-24 16:44:22`
 */
export interface AdminDeletePrivacyReq {
  /**
   * 主键id
   */
  ids: number[]
}

/**
 * 接口 [删除隐私声明↗](https://yapi.pro/project/11787/interface/api/492588) 的 **返回类型**
 *
 * @分类 [管理端/隐私声明↗](https://yapi.pro/project/11787/interface/api/cat_128796)
 * @标签 `管理端/隐私声明`
 * @请求头 `POST /admin/privacy/deletePrivacy`
 * @更新时间 `2023-06-24 16:44:22`
 */
export type AdminDeletePrivacyRes = number

/* prettier-ignore-end */
