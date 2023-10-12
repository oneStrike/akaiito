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

/* prettier-ignore-end */
