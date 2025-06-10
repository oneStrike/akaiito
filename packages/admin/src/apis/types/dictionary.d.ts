/**
 *  接口 [创建字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-306432782)
 *  @标签 字典管理/创建字典
 *  @方式 POST
 *  @地址 /api/admin/dictionary/create
 *  @更新时间 2025-06-10 00:29:31
 */

export interface CreateTypesReq {
  /* 字典名称 */
  name: string

  /* 字典编码 */
  code: string

  /* 字典封面 */
  cover?: string | null

  /* 状态 true启用 false禁用 */
  status?: boolean

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
  status: boolean

  /* 备注信息 */
  remark?: string | null

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string
}

/**
 *  接口 [分页查询字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-306432894)
 *  @标签 字典管理/分页查询字典
 *  @方式 GET
 *  @地址 /api/admin/dictionary/page
 *  @更新时间 2025-06-10 00:29:40
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
  status?: boolean
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
    status: boolean

    /* 备注信息 */
    remark?: string | null

    /* 创建时间 */
    createdAt: string

    /* 更新时间 */
    updatedAt: string
  }[]
}
