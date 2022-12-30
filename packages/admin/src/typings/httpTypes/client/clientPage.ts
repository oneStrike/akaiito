/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File

/**
 * 接口 [获取客户端页面信息列表↗](https://yapi.pro/project/4729/interface/api/433173) 的 **请求类型**
 *
 * @分类 [客户端↗](https://yapi.pro/project/4729/interface/api/cat_106326)
 * @标签 `客户端`
 * @请求头 `GET /admin/client/clientPage`
 * @更新时间 `2022-12-21 08:21:30`
 */
export interface ClientClientPageRequest {}

/**
 * 接口 [获取客户端页面信息列表↗](https://yapi.pro/project/4729/interface/api/433173) 的 **返回类型**
 *
 * @分类 [客户端↗](https://yapi.pro/project/4729/interface/api/cat_106326)
 * @标签 `客户端`
 * @请求头 `GET /admin/client/clientPage`
 * @更新时间 `2022-12-21 08:21:30`
 */
export type ClientClientPageResponse = {
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
   * 创建时间
   */
  createdAt: string
  /**
   * 更新时间
   */
  updatedAt: string
}[]

/* prettier-ignore-end */
