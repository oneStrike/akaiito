/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File

/**
 * 接口 [修改diy页面↗](https://yapi.pro/project/4729/interface/api/434463) 的 **请求类型**
 *
 * @分类 [diy页面↗](https://yapi.pro/project/4729/interface/api/cat_106721)
 * @标签 `diy页面`
 * @请求头 `POST /admin/diy/modifyDiy`
 * @更新时间 `2022-12-21 08:21:30`
 */
export interface DiyModifyDiyRequest {
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
 * 接口 [修改diy页面↗](https://yapi.pro/project/4729/interface/api/434463) 的 **返回类型**
 *
 * @分类 [diy页面↗](https://yapi.pro/project/4729/interface/api/cat_106721)
 * @标签 `diy页面`
 * @请求头 `POST /admin/diy/modifyDiy`
 * @更新时间 `2022-12-21 08:21:30`
 */
export type DiyModifyDiyResponse = number

/* prettier-ignore-end */
