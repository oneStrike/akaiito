/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File

/**
 * 接口 [获取首页布局↗](https://yapi.pro/project/11787/interface/api/459394) 的 **请求类型**
 *
 * @分类 [客户端/首页diy↗](https://yapi.pro/project/11787/interface/api/cat_112988)
 * @标签 `客户端/首页diy`
 * @请求头 `GET /client/layout/homeLayout`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface ClientHomeLayoutReq {}

/**
 * 接口 [获取首页布局↗](https://yapi.pro/project/11787/interface/api/459394) 的 **返回类型**
 *
 * @分类 [客户端/首页diy↗](https://yapi.pro/project/11787/interface/api/cat_112988)
 * @标签 `客户端/首页diy`
 * @请求头 `GET /client/layout/homeLayout`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface ClientHomeLayoutRes {
  /**
   * 主键id
   */
  id: number
  /**
   * 布局名称
   */
  diyName: string
  /**
   * 布局数据
   */
  diyData: string
  /**
   * 是否使用，1使用，0未使用
   */
  use: string
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
 * 接口 [获取客户端页面列表↗](https://yapi.pro/project/11787/interface/api/461972) 的 **请求类型**
 *
 * @分类 [客户端/客户端管理↗](https://yapi.pro/project/11787/interface/api/cat_114820)
 * @标签 `客户端/客户端管理`
 * @请求头 `GET /client/manage/getPages`
 * @更新时间 `2023-06-24 16:44:21`
 */
export interface ClientGetPagesReq {}

/**
 * 接口 [获取客户端页面列表↗](https://yapi.pro/project/11787/interface/api/461972) 的 **返回类型**
 *
 * @分类 [客户端/客户端管理↗](https://yapi.pro/project/11787/interface/api/cat_114820)
 * @标签 `客户端/客户端管理`
 * @请求头 `GET /client/manage/getPages`
 * @更新时间 `2023-06-24 16:44:21`
 */
export type ClientGetPagesRes = {
  /**
   * 主键id
   */
  id: number
  /**
   * 页面名称
   */
  pageName: string
  /**
   * 页面地址
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
 * 接口 [获取系统配置信息↗](https://yapi.pro/project/11787/interface/api/477556) 的 **请求类型**
 *
 * @分类 [客户端/客户端管理↗](https://yapi.pro/project/11787/interface/api/cat_114820)
 * @标签 `客户端/客户端管理`
 * @请求头 `GET /client/manage/systemInfo`
 * @更新时间 `2023-02-01 21:42:17`
 */
export interface ClientSystemInfoReq {}

/**
 * 接口 [获取系统配置信息↗](https://yapi.pro/project/11787/interface/api/477556) 的 **返回类型**
 *
 * @分类 [客户端/客户端管理↗](https://yapi.pro/project/11787/interface/api/cat_114820)
 * @标签 `客户端/客户端管理`
 * @请求头 `GET /client/manage/systemInfo`
 * @更新时间 `2023-02-01 21:42:17`
 */
export interface ClientSystemInfoRes {
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
 * 接口 [获取系统配置信息↗](https://yapi.pro/project/11787/interface/api/492548) 的 **请求类型**
 *
 * @分类 [客户端/客户端管理↗](https://yapi.pro/project/11787/interface/api/cat_114820)
 * @标签 `客户端/客户端管理`
 * @请求头 `GET /client/manage/getSystemConfig`
 * @更新时间 `2023-06-24 16:44:22`
 */
export interface ClientGetSystemConfigReq {}

/**
 * 接口 [获取系统配置信息↗](https://yapi.pro/project/11787/interface/api/492548) 的 **返回类型**
 *
 * @分类 [客户端/客户端管理↗](https://yapi.pro/project/11787/interface/api/cat_114820)
 * @标签 `客户端/客户端管理`
 * @请求头 `GET /client/manage/getSystemConfig`
 * @更新时间 `2023-06-24 16:44:22`
 */
export interface ClientGetSystemConfigRes {
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
 * 接口 [登录↗](https://yapi.pro/project/11787/interface/api/465158) 的 **请求类型**
 *
 * @分类 [客户端/用户↗](https://yapi.pro/project/11787/interface/api/cat_117060)
 * @标签 `客户端/用户`
 * @请求头 `POST /client/user/login`
 * @更新时间 `2023-06-24 16:44:22`
 */
export interface ClientLoginReq {}

/**
 * 接口 [登录↗](https://yapi.pro/project/11787/interface/api/465158) 的 **返回类型**
 *
 * @分类 [客户端/用户↗](https://yapi.pro/project/11787/interface/api/cat_117060)
 * @标签 `客户端/用户`
 * @请求头 `POST /client/user/login`
 * @更新时间 `2023-06-24 16:44:22`
 */
export interface ClientLoginRes {
  /**
   * 用户id
   */
  id: number
  /**
   * 用户昵称
   */
  username: string
  /**
   * 用户头像
   */
  avatar: string
  /**
   * vip状态，1是，0否
   */
  vipStatus: number
  /**
   * vip等级
   */
  vipLevel: number
}

/* prettier-ignore-end */
