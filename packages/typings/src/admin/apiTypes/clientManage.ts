/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File

/**
 * 接口 [获取客户端页面↗](https://yapi.pro/project/11787/interface/api/459248) 的 **请求类型**
 *
 * @分类 [客户端↗](https://yapi.pro/project/11787/interface/api/cat_112876)
 * @标签 `客户端`
 * @请求头 `GET /admin/clientManage/getClientPage`
 * @更新时间 `2023-01-02 20:17:17`
 */
export interface AdminGetClientPageReq {}

/**
 * 接口 [获取客户端页面↗](https://yapi.pro/project/11787/interface/api/459248) 的 **返回类型**
 *
 * @分类 [客户端↗](https://yapi.pro/project/11787/interface/api/cat_112876)
 * @标签 `客户端`
 * @请求头 `GET /admin/clientManage/getClientPage`
 * @更新时间 `2023-01-02 20:17:17`
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
  vipLevel: string
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
