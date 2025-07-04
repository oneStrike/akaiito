/**
 *  接口 [创建页面配置](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090648)
 *  @标签 客户端页面配置模块/创建页面配置
 *  @方式 POST
 *  @地址 /api/admin/client-page/create-client-page
 *  @更新时间 2025-07-04 15:34:40
 */

export interface CreateClientPageRequest {
  /* 主键id */
  id: number

  /* 页面编码（唯一标识） */
  pageCode: string

  /* 页面路径（URL路径） */
  pagePath: string

  /* 页面名称 */
  pageName: string

  /* 页面标题（用于SEO） */
  pageTitle?: string | null

  /* 页面权限级别 */
  accessLevel: number

  /* 页面状态 */
  pageStatus: number

  /* 页面描述信息 */
  description?: string | null
}

/*  */
export type CreateClientPageResponse = {
  /* 主键id */
  id: number
}

/**
 *  接口 [分页查询页面配置列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090649)
 *  @标签 客户端页面配置模块/分页查询页面配置列表
 *  @方式 GET
 *  @地址 /api/admin/client-page/client-page-page
 *  @更新时间 2025-07-04 15:34:40
 */

export interface ClientPagePageRequest {
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
  accessLevel?: number

  /* 页面状态 */
  pageStatus?: number
}

export interface ClientPagePageResponse {
  /* 当前页码 */
  pageIndex: number

  /* 每页条数 */
  pageSize: number

  /* 总条数 */
  total: number
  list: {
    /* 主键id */
    id: number

    /* 页面编码（唯一标识） */
    pageCode: string

    /* 页面路径（URL路径） */
    pagePath: string

    /* 页面名称 */
    pageName: string

    /* 页面标题（用于SEO） */
    pageTitle?: string | null

    /* 页面权限级别 */
    accessLevel: number

    /* 页面状态 */
    pageStatus: number

    /* 访问次数统计 */
    viewCount: number

    /* 创建时间 */
    createdAt: string

    /* 更新时间 */
    updatedAt: string
  }[]
}

/**
 *  接口 [根据ID查询页面配置详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090650)
 *  @标签 客户端页面配置模块/根据ID查询页面配置详情
 *  @方式 GET
 *  @地址 /api/admin/client-page/client-page-detail-by-id
 *  @更新时间 2025-07-04 15:34:40
 */

export interface ClientPageDetailByIdRequest {
  /*  */
  id: number
}

/*  */
export type ClientPageDetailByIdResponse = {
  /* 主键id */
  id: number

  /* 页面编码（唯一标识） */
  pageCode: string

  /* 页面路径（URL路径） */
  pagePath: string

  /* 页面名称 */
  pageName: string

  /* 页面标题（用于SEO） */
  pageTitle?: string | null

  /* 页面权限级别 */
  accessLevel: number

  /* 页面状态 */
  pageStatus: number

  /* 页面描述信息 */
  description?: string | null

  /* 访问次数统计 */
  viewCount: number

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string
}

/**
 *  接口 [根据页面编码查询页面配置详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090651)
 *  @标签 客户端页面配置模块/根据页面编码查询页面配置详情
 *  @方式 GET
 *  @地址 /api/admin/client-page/client-page-detail-by-code
 *  @更新时间 2025-07-04 15:34:40
 */

export interface ClientPageDetailByCodeRequest {
  /*  */
  pageCode: string
}

/*  */
export type ClientPageDetailByCodeResponse = {
  /* 主键id */
  id: number

  /* 页面编码（唯一标识） */
  pageCode: string

  /* 页面路径（URL路径） */
  pagePath: string

  /* 页面名称 */
  pageName: string

  /* 页面标题（用于SEO） */
  pageTitle?: string | null

  /* 页面权限级别 */
  accessLevel: number

  /* 页面状态 */
  pageStatus: number

  /* 页面描述信息 */
  description?: string | null

  /* 访问次数统计 */
  viewCount: number

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string
}

/**
 *  接口 [更新页面配置](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090652)
 *  @标签 客户端页面配置模块/更新页面配置
 *  @方式 POST
 *  @地址 /api/admin/client-page/update-client-page
 *  @更新时间 2025-07-04 15:34:40
 */

export interface UpdateClientPageRequest {
  /* 页面ID */
  id: number

  /* 页面编码（唯一标识） */
  pageCode?: string

  /* 页面路径（URL路径） */
  pagePath?: string

  /* 页面名称 */
  pageName?: string

  /* 页面标题（用于SEO） */
  pageTitle?: string | null

  /* 页面权限级别 */
  accessLevel?: number

  /* 页面状态 */
  pageStatus?: number

  /* 页面描述信息 */
  description?: string | null
}

/*  */
export type UpdateClientPageResponse = {
  /* 主键id */
  id: number
}

/**
 *  接口 [批量软删除页面配置](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090653)
 *  @标签 客户端页面配置模块/批量软删除页面配置
 *  @方式 POST
 *  @地址 /api/admin/client-page/batch-delete-client-page
 *  @更新时间 2025-07-04 15:34:40
 */

export interface BatchDeleteClientPageRequest {
  /* 主键id */
  ids: number[]
}

/*  */
export type BatchDeleteClientPageResponse = {
  /* 操作成功的数据数量 */
  count: number
}
