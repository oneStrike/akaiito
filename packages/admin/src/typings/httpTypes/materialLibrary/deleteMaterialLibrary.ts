/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File

/**
 * 接口 [删除素材库分组↗](https://yapi.pro/project/4729/interface/api/427733) 的 **请求类型**
 *
 * @分类 [素材库↗](https://yapi.pro/project/4729/interface/api/cat_105156)
 * @标签 `素材库`
 * @请求头 `POST /admin/materialLibrary/deleteMaterialLibrary`
 * @更新时间 `2022-12-21 08:21:30`
 */
export interface MaterialLibraryDeleteMaterialLibraryRequest {
  /**
   * 主键id
   */
  id: number
}

/**
 * 接口 [删除素材库分组↗](https://yapi.pro/project/4729/interface/api/427733) 的 **返回类型**
 *
 * @分类 [素材库↗](https://yapi.pro/project/4729/interface/api/cat_105156)
 * @标签 `素材库`
 * @请求头 `POST /admin/materialLibrary/deleteMaterialLibrary`
 * @更新时间 `2022-12-21 08:21:30`
 */
export interface MaterialLibraryDeleteMaterialLibraryResponse {
  /**
   * 返回状态码
   */
  code: number
  /**
   * 状态描述
   */
  status: string
  /**
   * 主键id
   */
  id: string
}

/* prettier-ignore-end */
