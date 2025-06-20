/**
 *  接口 [创建页面配置](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-311249079)
 *  @标签 客户端页面配置模块/创建页面配置
 *  @方式 POST
 *  @地址 /api/admin/page-config/create
 *  @更新时间 2025-06-20 21:27:53
 */

export interface CreateTypesReq {
  /* 页面编码（唯一标识） */
  pageCode: string

  /* 页面路径（URL路径） */
  pagePath: string

  /* 页面名称 */
  pageName: string

  /* 页面标题（用于SEO） */
  pageTitle?: string | null

  /* 页面权限级别 */
  pageRule: number

  /* 页面状态 */
  status: number

  /* 页面描述信息 */
  description?: string | null

  /* 排序权重（数值越大越靠前） */
  sortOrder?: number
}

/*  */
export type CreateTypesRes = {
  /* 主键id */
  id: number
}

/**
 *  接口 [分页查询页面配置列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-311249080)
 *  @标签 客户端页面配置模块/分页查询页面配置列表
 *  @方式 GET
 *  @地址 /api/admin/page-config/page
 *  @更新时间 2025-06-20 21:27:53
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

  /* 页面编码（唯一标识） */
  pageCode?: string

  /* 页面名称 */
  pageName?: string

  /* 页面权限级别 */
  pageRule?: number

  /* 页面状态 */
  status?: number
}

export interface PageTypesRes {
  /* 当前页码 */
  pageIndex: number

  /* 每页条数 */
  pageSize: number

  /* 总条数 */
  total: number
  list: {
    /* 页面编码（唯一标识） */
    pageCode: string

    /* 页面路径（URL路径） */
    pagePath: string

    /* 页面名称 */
    pageName: string

    /* 页面标题（用于SEO） */
    pageTitle?: string | null

    /* 页面权限级别 */
    pageRule: number

    /* 页面状态 */
    status: number

    /* 排序权重（数值越大越靠前） */
    sortOrder?: number

    /* 主键id */
    id: number

    /* 访问次数统计 */
    viewCount: number

    /* 创建时间 */
    createdAt: string

    /* 更新时间 */
    updatedAt: string
  }[]
}

/**
 *  接口 [根据ID查询页面配置详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-311784125)
 *  @标签 客户端页面配置模块/根据ID查询页面配置详情
 *  @方式 GET
 *  @地址 /api/admin/page-config/detailById
 *  @更新时间 2025-06-20 21:28:00
 */

export interface DetailByIdTypesReq {
  /*  */
  id: number
}

/*  */
export type DetailByIdTypesRes = {
  /* 页面编码（唯一标识） */
  pageCode: string

  /* 页面路径（URL路径） */
  pagePath: string

  /* 页面名称 */
  pageName: string

  /* 页面标题（用于SEO） */
  pageTitle?: string | null

  /* 页面权限级别 */
  pageRule: number

  /* 页面状态 */
  status: number

  /* 页面描述信息 */
  description?: string | null

  /* 排序权重（数值越大越靠前） */
  sortOrder?: number

  /* 主键id */
  id: number

  /* 访问次数统计 */
  viewCount: number

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string
}

/**
 *  接口 [根据页面编码查询页面配置详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-311784126)
 *  @标签 客户端页面配置模块/根据页面编码查询页面配置详情
 *  @方式 GET
 *  @地址 /api/admin/page-config/detailByCode
 *  @更新时间 2025-06-20 21:28:00
 */

export interface DetailByCodeTypesReq {
  /*  */
  pageCode: string
}

/*  */
export type DetailByCodeTypesRes = {
  /* 页面编码（唯一标识） */
  pageCode: string

  /* 页面路径（URL路径） */
  pagePath: string

  /* 页面名称 */
  pageName: string

  /* 页面标题（用于SEO） */
  pageTitle?: string | null

  /* 页面权限级别 */
  pageRule: number

  /* 页面状态 */
  status: number

  /* 页面描述信息 */
  description?: string | null

  /* 排序权重（数值越大越靠前） */
  sortOrder?: number

  /* 主键id */
  id: number

  /* 访问次数统计 */
  viewCount: number

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string
}

/**
 *  接口 [批量更新页面配置状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-311784127)
 *  @标签 客户端页面配置模块/批量更新页面配置状态
 *  @方式 POST
 *  @地址 /api/admin/page-config/batchUpdateStatus
 *  @更新时间 2025-06-20 21:28:00
 */

/*  */
export type BatchUpdateStatusTypesRes = {}

/**
 *  接口 [增加页面访问次数](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-311784128)
 *  @标签 客户端页面配置模块/增加页面访问次数
 *  @方式 POST
 *  @地址 /api/admin/page-config/incrementView
 *  @更新时间 2025-06-20 21:28:00
 */

export interface IncrementViewTypesReq {
  /* 页面编码 */
  pageCode: string
}

/*  */
export type IncrementViewTypesRes = {}

/**
 *  接口 [批量软删除页面配置](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-311784129)
 *  @标签 客户端页面配置模块/批量软删除页面配置
 *  @方式 POST
 *  @地址 /api/admin/page-config/batchDelete
 *  @更新时间 2025-06-20 21:28:00
 */

export interface BatchDeleteTypesReq {
  /* 主键id */
  ids: number[]
}

/*  */
export type BatchDeleteTypesRes = {}
