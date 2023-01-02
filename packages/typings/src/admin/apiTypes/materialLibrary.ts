/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
type FileData = File

/**
 * 接口 [获取素材库分组↗](https://yapi.pro/project/11787/interface/api/459374) 的 **请求类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `GET /admin/materialLibrary/getMaterialGroup`
 * @更新时间 `2023-01-02 22:30:49`
 */
export interface AdminGetMaterialGroupReq {}

/**
 * 接口 [获取素材库分组↗](https://yapi.pro/project/11787/interface/api/459374) 的 **返回类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `GET /admin/materialLibrary/getMaterialGroup`
 * @更新时间 `2023-01-02 22:30:49`
 */
export interface AdminGetMaterialGroupRes {
  list: {
    /**
     * 主键id
     */
    id: number
    /**
     * 分组名称
     */
    groupName: string
    /**
     * 排序
     */
    sort: number
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
}

/**
 * 接口 [创建素材库分组↗](https://yapi.pro/project/11787/interface/api/459376) 的 **请求类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `POST /admin/materialLibrary/createMaterialGroup`
 * @更新时间 `2023-01-02 22:30:49`
 */
export interface AdminCreateMaterialGroupReq {
  /**
   * 素材库分组名称
   */
  groupName: string
}

/**
 * 接口 [创建素材库分组↗](https://yapi.pro/project/11787/interface/api/459376) 的 **返回类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `POST /admin/materialLibrary/createMaterialGroup`
 * @更新时间 `2023-01-02 22:30:49`
 */
export type AdminCreateMaterialGroupRes = number

/**
 * 接口 [删除素材库分组↗](https://yapi.pro/project/11787/interface/api/459380) 的 **请求类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `POST /admin/materialLibrary/deleteMaterialGroup`
 * @更新时间 `2023-01-02 22:30:49`
 */
export interface AdminDeleteMaterialGroupReq {
  /**
   * 分组id
   */
  id: number
}

/**
 * 接口 [删除素材库分组↗](https://yapi.pro/project/11787/interface/api/459380) 的 **返回类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `POST /admin/materialLibrary/deleteMaterialGroup`
 * @更新时间 `2023-01-02 22:30:49`
 */
export type AdminDeleteMaterialGroupRes = number

/**
 * 接口 [添加素材↗](https://yapi.pro/project/11787/interface/api/459382) 的 **请求类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `POST /admin/materialLibrary/createMaterial`
 * @更新时间 `2023-01-02 22:30:49`
 */
export interface AdminCreateMaterialReq {
  /**
   * 分组id
   */
  groupId: number
  /**
   * 素材名称
   */
  material: {
    /**
     * 素材路径
     */
    path: string
    /**
     * 素材名称
     */
    materialName: string
    /**
     * 素材类型，url，image，video
     */
    materialType: string
  }[]
}

/**
 * 接口 [添加素材↗](https://yapi.pro/project/11787/interface/api/459382) 的 **返回类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `POST /admin/materialLibrary/createMaterial`
 * @更新时间 `2023-01-02 22:30:49`
 */
export type AdminCreateMaterialRes = number[]

/**
 * 接口 [获取素材列表↗](https://yapi.pro/project/11787/interface/api/459384) 的 **请求类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `GET /admin/materialLibrary/getMaterial`
 * @更新时间 `2023-01-02 22:30:49`
 */
export interface AdminGetMaterialReq {
  /**
   * 分组id
   */
  groupId?: string
  /**
   * 素材类型,iamge,video,url
   */
  materialType?: string
  /**
   * 素材名称
   */
  materialName?: string
  /**
   * 单页数量
   */
  pageSize?: string
  /**
   * 页码
   */
  pageIndex?: string
  /**
   * 排序
   */
  sort?: string
  /**
   * 排序字段,asc正序，desc倒序
   */
  sortField?: string
}

/**
 * 接口 [获取素材列表↗](https://yapi.pro/project/11787/interface/api/459384) 的 **返回类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `GET /admin/materialLibrary/getMaterial`
 * @更新时间 `2023-01-02 22:30:49`
 */
export interface AdminGetMaterialRes {
  list: {
    /**
     * 主键id
     */
    id: number
    /**
     * 素材路径
     */
    path: string
    /**
     * 分组id
     */
    groupId: number
    /**
     * 素材名称
     */
    materialName: string
    /**
     * 素材类型
     */
    materialType: string
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
}

/**
 * 接口 [删除素材↗](https://yapi.pro/project/11787/interface/api/459386) 的 **请求类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `POST /admin/materialLibrary/deleteMaterial`
 * @更新时间 `2023-01-02 22:30:49`
 */
export interface AdminDeleteMaterialReq {
  /**
   * 素材id
   */
  id: number
}

/**
 * 接口 [删除素材↗](https://yapi.pro/project/11787/interface/api/459386) 的 **返回类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `POST /admin/materialLibrary/deleteMaterial`
 * @更新时间 `2023-01-02 22:30:49`
 */
export type AdminDeleteMaterialRes = string

/**
 * 接口 [修改素材库分组名称↗](https://yapi.pro/project/11787/interface/api/459388) 的 **请求类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `POST /admin/materialLibrary/updateMaterialGroup`
 * @更新时间 `2023-01-02 22:30:49`
 */
export interface AdminUpdateMaterialGroupReq {
  /**
   * 主键 id
   */
  id: number
  /**
   * 分组新名称
   */
  groupName: string
}

/**
 * 接口 [修改素材库分组名称↗](https://yapi.pro/project/11787/interface/api/459388) 的 **返回类型**
 *
 * @分类 [管理端/素材库↗](https://yapi.pro/project/11787/interface/api/cat_112860)
 * @标签 `管理端/素材库`
 * @请求头 `POST /admin/materialLibrary/updateMaterialGroup`
 * @更新时间 `2023-01-02 22:30:49`
 */
export type AdminUpdateMaterialGroupRes = number

/* prettier-ignore-end */
