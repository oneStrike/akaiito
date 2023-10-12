/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File

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

/* prettier-ignore-end */
