/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File

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

/* prettier-ignore-end */
