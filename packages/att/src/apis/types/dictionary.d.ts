/**
 *  接口 [获取数据字典分页列表](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135340416)
 *  @标签 数据字典/获取数据字典分页列表
 *  @方式 GET
 *  @地址 /admin/dictionary/getDataDictionary
 *  @更新时间 2024-09-18 00:01:32
 */

export interface GetDataDictionaryTypesReq {
  /* 单页数量 */
  pageSize?: string

  /* 页码 */
  pageIndex?: string

  /* 排序 */
  orderBy?: string

  /* 数据字典名称 */
  name?: string

  /* 数据字典code */
  code?: string

  /* 状态，1启用、0禁用 */
  status?: string
}

export interface GetDataDictionaryTypesRes {
  list: {
    /* 主键id */
    id: number

    /* 名称 */
    name: string

    /* 编码 */
    code: string

    /* 备注信息 */
    remark: string | null

    /* 状态，1==>正常 0==>禁用 */
    status: number

    /* 创建时间 */
    createdAt: string

    /* 更新时间 */
    updatedAt: string
  }[]
  /* 页码 */
  pageIndex: number

  /* 单页大小 */
  pageSize: number

  /* 总条数 */
  total: number
}

/**
 *  接口 [获取数据字典子项](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135340593)
 *  @标签 数据字典/获取数据字典子项
 *  @方式 GET
 *  @地址 /admin/dictionary/getDataDictionaryItems
 *  @更新时间 2024-12-03 00:21:50
 */

export interface GetDataDictionaryItemsTypesReq {
  /* 页码 */
  pageIndex?: string

  /* 单页数量 */
  pageSize?: string

  /* 排序json */
  orderBy?: string

  /* 名称 */
  name?: string

  /* 编码 */
  code?: string

  /* 状态，1启用、0禁用 */
  status?: string

  /* 字典父项code */
  dictionaryCode?: string
}

export interface GetDataDictionaryItemsTypesRes {
  list: {
    /* 主键id */
    id: number

    /* 子项名称 */
    name: string

    /* 子项编码 */
    code: string

    /* 状态，1==>正常 0==>禁用 */
    status: number

    /* 排序 */
    order: number

    /* 子项备注 */
    remark: string | null

    /* 父项相关信息 */
    dictionary: {
      /* 父项主键id */
      id: number

      /* 父项名称 */
      name: string

      /* 父项code */
      code: string
    }

    /* 创建时间 */
    createdAt: string

    /* 更新时间 */
    updatedAt: string
  }[]
  /* 页码 */
  pageIndex: number

  /* 单页大小 */
  pageSize: number

  /* 总条数 */
  total: number
}

/**
 *  接口 [创建数据字典](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135340982)
 *  @标签 数据字典/创建数据字典
 *  @方式 POST
 *  @地址 /admin/dictionary/createDataDictionary
 *  @更新时间 2024-09-18 00:09:20
 */

export interface CreateDataDictionaryTypesReq {
  /* 名称 */
  name: string

  /* 编码 */
  code: string

  /* 备注信息 */
  remark: string | null
}

/* 主键id */
export type CreateDataDictionaryTypesRes = number

/**
 *  接口 [创建数据字典子项](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135341394)
 *  @标签 数据字典/创建数据字典子项
 *  @方式 POST
 *  @地址 /admin/dictionary/createDataDictionaryItems
 *  @更新时间 2024-12-03 00:22:35
 */

export interface CreateDataDictionaryItemsTypesReq {
  /* 父项code */
  dictionaryCode: string

  /* 子项名称 */
  name: string

  /* 子项编码 */
  code: string

  /* 子项备注 */
  remark: string | null
}

/* 主键id */
export type CreateDataDictionaryItemsTypesRes = number

/**
 *  接口 [删除数据字典](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135691283)
 *  @标签 数据字典/删除数据字典
 *  @方式 POST
 *  @地址 /admin/dictionary/deleteDataDictionary
 *  @更新时间 2024-11-24 14:12:57
 */

export interface DeleteDataDictionaryTypesReq {
  /* 主键ids */
  ids: number[]
}

/* 主键id */
export type DeleteDataDictionaryTypesRes = number

/**
 *  接口 [删除数据字典子项](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135691296)
 *  @标签 数据字典/删除数据字典子项
 *  @方式 POST
 *  @地址 /admin/dictionary/deleteDataDictionaryItems
 *  @更新时间 2024-11-24 14:13:07
 */

export interface DeleteDataDictionaryItemsTypesReq {
  /* 主键ids */
  ids: number[]
}

/* 主键id */
export type DeleteDataDictionaryItemsTypesRes = number

/**
 *  接口 [更新数据字典](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135691324)
 *  @标签 数据字典/更新数据字典
 *  @方式 POST
 *  @地址 /admin/dictionary/updateDataDictionary
 *  @更新时间 2024-09-18 00:12:47
 */

export interface UpdateDataDictionaryTypesReq {
  /* 主键id */
  id: number

  /* 名称 */
  name: string

  /* 编码 */
  code: string

  /* 备注信息 */
  remark: string | null
}

/* 主键id */
export type UpdateDataDictionaryTypesRes = number

/**
 *  接口 [更新数据字典子项](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135691385)
 *  @标签 数据字典/更新数据字典子项
 *  @方式 POST
 *  @地址 /admin/dictionary/updateDataDictionaryItems
 *  @更新时间 2024-12-03 00:23:29
 */

export interface UpdateDataDictionaryItemsTypesReq {
  /* 父项code */
  dictionaryCode: string

  /* 主键id */
  id: number

  /* 子项名称 */
  name: string

  /* 子项编码 */
  code: string

  /* 子项备注 */
  remark: string | null
}

export interface UpdateDataDictionaryItemsTypesRes {
  /* 主键id */
  id: number
}

/**
 *  接口 [更新数据字典状态](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135691434)
 *  @标签 数据字典/更新数据字典状态
 *  @方式 POST
 *  @地址 /admin/dictionary/updateDataDictionaryStatus
 *  @更新时间 2024-11-24 14:23:39
 */

export interface UpdateDataDictionaryStatusTypesReq {
  /* 主键ids */
  ids: number[]
  /* 状态，1启用0禁用 */
  status: number
}

/* 主键id */
export type UpdateDataDictionaryStatusTypesRes = number

/**
 *  接口 [更新数据字典子项状态](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135691450)
 *  @标签 数据字典/更新数据字典子项状态
 *  @方式 POST
 *  @地址 /admin/dictionary/updateDataDictionaryItemsStatus
 *  @更新时间 2024-11-24 14:24:53
 */

export interface UpdateDataDictionaryItemsStatusTypesReq {
  /* 主键ids */
  ids: number[]
  /* 状态，1启用，0禁用 */
  status: number
}

/* 主键id */
export type UpdateDataDictionaryItemsStatusTypesRes = number

/**
 *  接口 [调整数据字典子项排序](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-135691501)
 *  @标签 数据字典/调整数据字典子项排序
 *  @方式 POST
 *  @地址 /admin/dictionary/updateDataDictionaryItemsOrder
 *  @更新时间 2023-12-21 23:17:44
 */

export interface UpdateDataDictionaryItemsOrderTypesReq {
  /* 目标id */
  targetId: number

  /* 目标现有排序 */
  targetOrder: number

  /* 更新源id */
  originId: number

  /* 更新源现有排序 */
  originOrder: number
}

/* 主键id */
export type UpdateDataDictionaryItemsOrderTypesRes = number
