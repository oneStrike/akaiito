/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File

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

/* prettier-ignore-end */
