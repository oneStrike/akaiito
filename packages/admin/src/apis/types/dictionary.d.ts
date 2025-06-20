/**
 *  接口 [分页查询字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-306432894)
 *  @标签 字典管理/分页查询字典
 *  @方式 GET
 *  @地址 /api/admin/dictionary/page
 *  @更新时间 2025-06-20 22:09:10
 */

export interface PageTypesReq {
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

export interface PageTypesRes {
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
 *  接口 [获取字典详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-306695290)
 *  @标签 字典管理/获取字典详情
 *  @方式 GET
 *  @地址 /api/admin/dictionary/detail
 *  @更新时间 2025-06-20 22:09:10
 */

export interface DetailTypesReq {
  /* 主键id */
  id: number
}

/*  */
export type DetailTypesRes = {
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
 *  接口 [创建字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-306432782)
 *  @标签 字典管理/创建字典
 *  @方式 POST
 *  @地址 /api/admin/dictionary/create
 *  @更新时间 2025-06-20 22:09:10
 */

export interface CreateTypesReq {
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
export type CreateTypesRes = {
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
 *  接口 [更新字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-307008018)
 *  @标签 字典管理/更新字典
 *  @方式 POST
 *  @地址 /api/admin/dictionary/update
 *  @更新时间 2025-06-20 22:09:10
 */

export interface UpdateTypesReq {
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
export type UpdateTypesRes = {
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
 *  接口 [删除字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-307008324)
 *  @标签 字典管理/删除字典
 *  @方式 POST
 *  @地址 /api/admin/dictionary/delete
 *  @更新时间 2025-06-20 22:09:10
 */

export interface DeleteTypesReq {
  /* 主键id */
  ids: number[]
}

/*  */
export type DeleteTypesRes = {
  /* 主键id */
  ids: number[]
}

/**
 *  接口 [启用禁用字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-307032726)
 *  @标签 字典管理/启用禁用字典
 *  @方式 POST
 *  @地址 /api/admin/dictionary/updateEnableStatus
 *  @更新时间 2025-06-20 22:09:10
 */

export interface UpdateEnableStatusTypesReq {
  /* 主键id */
  ids: number[]

  /* 状态 true启用 false禁用 */
  isEnabled: boolean
}

/*  */
export type UpdateEnableStatusTypesRes = {
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
 *  接口 [获取字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-307018281)
 *  @标签 字典管理/获取字典项
 *  @方式 GET
 *  @地址 /api/admin/dictionary/items
 *  @更新时间 2025-06-20 22:09:10
 */

export interface ItemsTypesReq {
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
export type ItemsTypesRes = {
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
 *  接口 [创建字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-307018937)
 *  @标签 字典管理/创建字典项
 *  @方式 POST
 *  @地址 /api/admin/dictionary/createItem
 *  @更新时间 2025-06-20 22:09:10
 */

export interface CreateItemTypesReq {
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
export type CreateItemTypesRes = {
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
 *  接口 [更新字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-307020817)
 *  @标签 字典管理/更新字典项
 *  @方式 POST
 *  @地址 /api/admin/dictionary/updateItem
 *  @更新时间 2025-06-20 22:09:10
 */

export interface UpdateItemTypesReq {
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
export type UpdateItemTypesRes = {
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
 *  接口 [删除字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-307020818)
 *  @标签 字典管理/删除字典项
 *  @方式 POST
 *  @地址 /api/admin/dictionary/deleteItem
 *  @更新时间 2025-06-20 22:09:10
 */

export interface DeleteItemTypesReq {
  /* 主键id */
  ids: number[]
}

/*  */
export type DeleteItemTypesRes = {
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
 *  接口 [启用禁用字典项](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-307032727)
 *  @标签 字典管理/启用禁用字典项
 *  @方式 POST
 *  @地址 /api/admin/dictionary/updateItemStatus
 *  @更新时间 2025-06-20 22:09:10
 */

export interface UpdateItemStatusTypesReq {
  /* 主键id */
  ids: number[]

  /* 状态 true启用 false禁用 */
  isEnabled: boolean
}

/*  */
export type UpdateItemStatusTypesRes = {
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
