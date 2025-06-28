/**
 *  接口 [分页查询字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090616)
 *  @标签 字典管理/分页查询字典
 *  @方式 GET
 *  @地址 /api/admin/dictionary/dictionary-page
 *  @更新时间 2025-06-28 20:37:04
 */

export interface DictionaryPageRequest {
  /* 单页大小，最大500，默认15 */
  pageSize?: number

  /* 当前页码 */
  pageIndex?: number

  /* 排序字段，json格式 */
  orderBy?: string

  /* 开始时间 */
  startDate?: string

  /* 结束时间 */
  endDate?: string

  /* 字典名称（模糊查询） */
  name?: string

  /* 字典编码（模糊查询） */
  code?: string

  /* 状态筛选 */
  isEnabled?: boolean
}

export interface DictionaryPageResponse {
  /* 当前页码 */
  pageIndex: number

  /* 每页条数 */
  pageSize: number

  /* 总条数 */
  total: number
  list: {
    /* 字典ID */
    id: number

    /* 字典名称 */
    name: string

    /* 字典编码 */
    code: string

    /* 字典封面 */
    cover?: string | null

    /* 状态 true启用 false禁用 */
    isEnabled: boolean

    /* 备注信息 */
    remark?: string | null

    /* 创建时间 */
    createdAt: string

    /* 更新时间 */
    updatedAt: string

    /** 任意合法数值 */
    [property: string]: any
  }[]
  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [获取字典详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090617)
 *  @标签 字典管理/获取字典详情
 *  @方式 GET
 *  @地址 /api/admin/dictionary/dictionary-detail
 *  @更新时间 2025-06-28 20:37:04
 */

export interface DictionaryDetailRequest {
  /* 主键id */
  id: number
}

/*  */
export type DictionaryDetailResponse = {
  /* 字典ID */
  id: number

  /* 字典名称 */
  name: string

  /* 字典编码 */
  code: string

  /* 字典封面 */
  cover?: string | null

  /* 状态 true启用 false禁用 */
  isEnabled: boolean

  /* 备注信息 */
  remark?: string | null

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [创建字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090618)
 *  @标签 字典管理/创建字典
 *  @方式 POST
 *  @地址 /api/admin/dictionary/create-dictionary
 *  @更新时间 2025-06-28 20:37:04
 */

export interface CreateDictionaryRequest {
  /* 字典名称 */
  name: string

  /* 字典编码 */
  code: string

  /* 字典封面 */
  cover?: string | null

  /* 状态 true启用 false禁用 */
  isEnabled?: boolean | null

  /* 备注信息 */
  remark?: string | null
}

/*  */
export type CreateDictionaryResponse = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [更新字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090619)
 *  @标签 字典管理/更新字典
 *  @方式 POST
 *  @地址 /api/admin/dictionary/update-dictionary
 *  @更新时间 2025-06-28 20:37:04
 */

export interface UpdateDictionaryRequest {
  /* 字典ID */
  id: number

  /* 字典名称 */
  name: string

  /* 字典编码 */
  code: string

  /* 字典封面 */
  cover?: string | null

  /* 状态 true启用 false禁用 */
  isEnabled: boolean

  /* 备注信息 */
  remark?: string | null

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string
}

/*  */
export type UpdateDictionaryResponse = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [删除字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090620)
 *  @标签 字典管理/删除字典
 *  @方式 POST
 *  @地址 /api/admin/dictionary/delete-dictionary
 *  @更新时间 2025-06-28 20:37:04
 */

export interface DeleteDictionaryRequest {
  /* 主键id */
  ids: number[]
}

/*  */
export type DeleteDictionaryResponse = {
  /* 主键id */
  ids: number[]

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [批量启用禁用字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090621)
 *  @标签 字典管理/批量启用禁用字典
 *  @方式 POST
 *  @地址 /api/admin/dictionary/batch-update-dictionary-status
 *  @更新时间 2025-06-28 20:37:04
 */

export interface BatchUpdateDictionaryStatusRequest {
  /* 批量操作的 ID 数组 */
  ids: number[]

  /* 启用或者禁用 */
  isEnabled: boolean
}

/*  */
export type BatchUpdateDictionaryStatusResponse = {
  /* 操作成功的数据数量 */
  count: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [获取字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090622)
 *  @标签 字典管理/获取字典项
 *  @方式 GET
 *  @地址 /api/admin/dictionary/dictionary-items
 *  @更新时间 2025-06-28 20:37:04
 */

export interface DictionaryItemsRequest {
  /* 字典编码 */
  dictionaryCode: string

  /* 字典项名称（模糊查询） */
  name?: string

  /* 字典项编码（模糊查询） */
  code?: string

  /* 状态筛选 */
  isEnabled?: boolean
}

/*  */
export type DictionaryItemsResponse = {
  /* 字典项ID */
  id: number

  /* 字典编码 */
  dictionaryCode: string

  /* 字典项名称 */
  name: string

  /* 字典项编码 */
  code: string

  /* 排序 */
  order?: number | null

  /* 字典项封面 */
  cover?: string | null

  /* 状态 true启用 false禁用 */
  isEnabled: boolean

  /* 备注信息 */
  remark?: string | null

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string

  /** 任意合法数值 */
  [property: string]: any
}[]

/**
 *  接口 [创建字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090623)
 *  @标签 字典管理/创建字典项
 *  @方式 POST
 *  @地址 /api/admin/dictionary/create-dictionary-item
 *  @更新时间 2025-06-28 20:37:04
 */

export interface CreateDictionaryItemRequest {
  /* 字典编码 */
  dictionaryCode: string

  /* 字典项名称 */
  name: string

  /* 字典项编码 */
  code: string

  /* 排序 */
  order?: number | null

  /* 字典项封面 */
  cover?: string | null

  /* 状态 true启用 false禁用 */
  isEnabled?: boolean | null

  /* 备注信息 */
  remark?: string | null
}

/*  */
export type CreateDictionaryItemResponse = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [更新字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090624)
 *  @标签 字典管理/更新字典项
 *  @方式 POST
 *  @地址 /api/admin/dictionary/update-dictionary-item
 *  @更新时间 2025-06-28 20:37:04
 */

export interface UpdateDictionaryItemRequest {
  /* 字典编码 */
  dictionaryCode: string

  /* 字典项名称 */
  name: string

  /* 字典项编码 */
  code: string

  /* 排序 */
  order?: number | null

  /* 字典项封面 */
  cover?: string | null

  /* 状态 true启用 false禁用 */
  isEnabled?: boolean | null

  /* 备注信息 */
  remark?: string | null

  /* 字典项ID */
  id: number
}

/*  */
export type UpdateDictionaryItemResponse = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [删除字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090625)
 *  @标签 字典管理/删除字典项
 *  @方式 POST
 *  @地址 /api/admin/dictionary/delete-dictionary-item
 *  @更新时间 2025-06-28 20:37:04
 */

export interface DeleteDictionaryItemRequest {
  /* 主键id */
  ids: number[]
}

/*  */
export type DeleteDictionaryItemResponse = {
  /* 操作成功的数据数量 */
  count: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [启用禁用字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090626)
 *  @标签 字典管理/启用禁用字典项
 *  @方式 POST
 *  @地址 /api/admin/dictionary/update-dictionary-item-status
 *  @更新时间 2025-06-28 20:37:04
 */

export interface UpdateDictionaryItemStatusRequest {
  /* 批量操作的 ID 数组 */
  ids: number[]

  /* 启用或者禁用 */
  isEnabled: boolean
}

/*  */
export type UpdateDictionaryItemStatusResponse = {
  /* 操作成功的数据数量 */
  count: number

  /** 任意合法数值 */
  [property: string]: any
}
