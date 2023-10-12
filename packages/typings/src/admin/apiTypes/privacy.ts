/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File

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
