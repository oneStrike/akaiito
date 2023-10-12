/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File

/**
 * 接口 [获取客户端页面列表↗](https://yapi.pro/project/11787/interface/api/461968) 的 **请求类型**
 *
 * @分类 [管理端/客户端管理↗](https://yapi.pro/project/11787/interface/api/cat_114804)
 * @标签 `管理端/客户端管理`
 * @请求头 `GET /admin/clientManage/getClientPage`
 * @更新时间 `2023-04-13 23:03:13`
 */
export interface AdminGetClientPageReq {}

/**
 * 接口 [获取客户端页面列表↗](https://yapi.pro/project/11787/interface/api/461968) 的 **返回类型**
 *
 * @分类 [管理端/客户端管理↗](https://yapi.pro/project/11787/interface/api/cat_114804)
 * @标签 `管理端/客户端管理`
 * @请求头 `GET /admin/clientManage/getClientPage`
 * @更新时间 `2023-04-13 23:03:13`
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
 * @更新时间 `2023-04-13 23:03:14`
 */
export interface AdminGetSystemConfigReq {}

/**
 * 接口 [获取客户端配置信息↗](https://yapi.pro/project/11787/interface/api/492540) 的 **返回类型**
 *
 * @分类 [管理端/客户端管理↗](https://yapi.pro/project/11787/interface/api/cat_114804)
 * @标签 `管理端/客户端管理`
 * @请求头 `GET /admin/clientManage/getSystemConfig`
 * @更新时间 `2023-04-13 23:03:14`
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

/* prettier-ignore-end */
