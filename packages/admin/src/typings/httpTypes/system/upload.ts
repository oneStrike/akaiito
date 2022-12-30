/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File

/**
 * 接口 [资源上传↗](https://yapi.pro/project/4729/interface/api/380517) 的 **请求类型**
 *
 * @分类 [系统↗](https://yapi.pro/project/4729/interface/api/cat_98707)
 * @标签 `系统`
 * @请求头 `POST /admin/system/upload`
 * @更新时间 `2022-12-21 08:21:29`
 */
export interface SystemUploadRequest {}

/**
 * 接口 [资源上传↗](https://yapi.pro/project/4729/interface/api/380517) 的 **返回类型**
 *
 * @分类 [系统↗](https://yapi.pro/project/4729/interface/api/cat_98707)
 * @标签 `系统`
 * @请求头 `POST /admin/system/upload`
 * @更新时间 `2022-12-21 08:21:29`
 */
export type SystemUploadResponse = {
  /**
   * 文件名
   */
  filename: string
  /**
   * 文件类型
   */
  mimeType: string
  /**
   * 文件路径
   */
  path: string
  /**
   * 文件后缀类型
   */
  _ext: string
}[]

/* prettier-ignore-end */
