/**
 *  接口 [分页查询字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080008)
 *  @标签 字典管理/分页查询字典
 *  @方式 GET
 *  @地址 /api/admin/dictionary/dictionary-page
 *  @更新时间 2025-06-23 21:14:46
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
  }[]
}

/**
 *  接口 [获取字典详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080009)
 *  @标签 字典管理/获取字典详情
 *  @方式 GET
 *  @地址 /api/admin/dictionary/dictionary-detail
 *  @更新时间 2025-06-23 21:14:46
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
}

/**
 *  接口 [创建字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080010)
 *  @标签 字典管理/创建字典
 *  @方式 POST
 *  @地址 /api/admin/dictionary/dictionary-create
 *  @更新时间 2025-06-23 21:14:46
 */

export interface DictionaryCreateRequest {
  /* 字典名称 */
  name: string

  /* 字典编码 */
  code: string

  /* 字典封面 */
  cover?: string | null

  /* 状态 true启用 false禁用 */
  isEnabled?: boolean

  /* 备注信息 */
  remark?: string | null
}

/*  */
export type DictionaryCreateResponse = {
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

/**
 *  接口 [更新字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080011)
 *  @标签 字典管理/更新字典
 *  @方式 POST
 *  @地址 /api/admin/dictionary/dictionary-update
 *  @更新时间 2025-06-23 21:14:46
 */

export interface DictionaryUpdateRequest {
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
export type DictionaryUpdateResponse = {
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

/**
 *  接口 [删除字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080012)
 *  @标签 字典管理/删除字典
 *  @方式 POST
 *  @地址 /api/admin/dictionary/dictionary-delete
 *  @更新时间 2025-06-23 21:14:46
 */

export interface DictionaryDeleteRequest {
  /* 主键id */
  ids: number[]
}

/*  */
export type DictionaryDeleteResponse = {
  /* 主键id */
  ids: number[]
}

/**
 *  接口 [启用禁用字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080013)
 *  @标签 字典管理/启用禁用字典
 *  @方式 POST
 *  @地址 /api/admin/dictionary/dictionary-update-enable-status
 *  @更新时间 2025-06-23 21:14:46
 */

export interface DictionaryUpdateEnableStatusRequest {
  /* 主键id */
  ids: number[]

  /* 状态 true启用 false禁用 */
  isEnabled: boolean
}

/*  */
export type DictionaryUpdateEnableStatusResponse = {
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

/**
 *  接口 [获取字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080014)
 *  @标签 字典管理/获取字典项
 *  @方式 GET
 *  @地址 /api/admin/dictionary/dictionary-items
 *  @更新时间 2025-06-23 21:14:46
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
  order?: number

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
}[]

/**
 *  接口 [创建字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080015)
 *  @标签 字典管理/创建字典项
 *  @方式 POST
 *  @地址 /api/admin/dictionary/dictionary-create-item
 *  @更新时间 2025-06-23 21:14:46
 */

export interface DictionaryCreateItemRequest {
  /* 字典编码 */
  dictionaryCode: string

  /* 字典项名称 */
  name: string

  /* 字典项编码 */
  code: string

  /* 排序 */
  order?: number

  /* 字典项封面 */
  cover?: string | null

  /* 状态 true启用 false禁用 */
  isEnabled?: boolean

  /* 备注信息 */
  remark?: string | null
}

/*  */
export type DictionaryCreateItemResponse = {
  /* 字典项ID */
  id: number

  /* 字典编码 */
  dictionaryCode: string

  /* 字典项名称 */
  name: string

  /* 字典项编码 */
  code: string

  /* 排序 */
  order?: number

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
}

/**
 *  接口 [更新字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080016)
 *  @标签 字典管理/更新字典项
 *  @方式 POST
 *  @地址 /api/admin/dictionary/dictionary-update-item
 *  @更新时间 2025-06-23 21:14:46
 */

export interface DictionaryUpdateItemRequest {
  /* 字典编码 */
  dictionaryCode: string

  /* 字典项名称 */
  name: string

  /* 字典项编码 */
  code: string

  /* 排序 */
  order?: number

  /* 字典项封面 */
  cover?: string | null

  /* 状态 true启用 false禁用 */
  isEnabled?: boolean

  /* 备注信息 */
  remark?: string | null

  /* 字典项ID */
  id: number
}

/*  */
export type DictionaryUpdateItemResponse = {
  /* 字典项ID */
  id: number

  /* 字典编码 */
  dictionaryCode: string

  /* 字典项名称 */
  name: string

  /* 字典项编码 */
  code: string

  /* 排序 */
  order?: number

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
}

/**
 *  接口 [删除字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080017)
 *  @标签 字典管理/删除字典项
 *  @方式 POST
 *  @地址 /api/admin/dictionary/dictionary-delete-item
 *  @更新时间 2025-06-23 21:14:46
 */

export interface DictionaryDeleteItemRequest {
  /* 主键id */
  ids: number[]
}

/*  */
export type DictionaryDeleteItemResponse = {
  /* 字典项ID */
  id: number

  /* 字典编码 */
  dictionaryCode: string

  /* 字典项名称 */
  name: string

  /* 字典项编码 */
  code: string

  /* 排序 */
  order?: number

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
}

/**
 *  接口 [启用禁用字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080018)
 *  @标签 字典管理/启用禁用字典项
 *  @方式 POST
 *  @地址 /api/admin/dictionary/dictionary-update-item-status
 *  @更新时间 2025-06-23 21:14:46
 */

export interface DictionaryUpdateItemStatusRequest {
  /* 主键id */
  ids: number[]

  /* 状态 true启用 false禁用 */
  isEnabled: boolean
}

/*  */
export type DictionaryUpdateItemStatusResponse = {
  /* 字典项ID */
  id: number

  /* 字典编码 */
  dictionaryCode: string

  /* 字典项名称 */
  name: string

  /* 字典项编码 */
  code: string

  /* 排序 */
  order?: number

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
}
