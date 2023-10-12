/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File

/**
 * 接口 [文件上传↗](https://yapi.pro/project/11787/interface/api/459200) 的 **请求类型**
 *
 * @分类 [公共接口↗](https://yapi.pro/project/11787/interface/api/cat_112884)
 * @标签 `公共接口`
 * @请求头 `POST /common/upload/upload`
 * @更新时间 `2023-04-13 23:03:12`
 */
export interface CommonUploadReq {}

/**
 * 接口 [文件上传↗](https://yapi.pro/project/11787/interface/api/459200) 的 **返回类型**
 *
 * @分类 [公共接口↗](https://yapi.pro/project/11787/interface/api/cat_112884)
 * @标签 `公共接口`
 * @请求头 `POST /common/upload/upload`
 * @更新时间 `2023-04-13 23:03:12`
 */
export type CommonUploadRes = {
  /**
   * 文件名称
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
