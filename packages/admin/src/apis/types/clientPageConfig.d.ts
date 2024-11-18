/**
 *  接口 [获取页面分页](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234293697)
 *  @标签 客户端页面/获取页面分页
 *  @方式 GET
 *  @地址 /admin/clientPageConfig/getClientPages
 *  @更新时间 2024-11-17 00:23:40
 */

export interface GetClientPagesTypesReq {
  /* 单页数量 */
  pageSize?: string

  /* 页码 */
  pageIndex?: string

  /* 客户端页面名字 */
  pageName?: string

  /* 客户端页面规则 */
  pageRule?: string

  /* 客户端页面状态 */
  pageStatus?: string
}

export interface GetClientPagesTypesRes {
  /*  */
  list: array | null

  /* 页码 */
  pageIndex: number

  /* 单页大小 */
  pageSize: number

  /* 总条数 */
  total: number
}

/**
 *  接口 [创建客户端页面](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234293718)
 *  @标签 客户端页面/创建客户端页面
 *  @方式 POST
 *  @地址 /admin/clientPageConfig/createClientPage
 *  @更新时间 2024-11-16 00:55:52
 */

export interface CreateClientPageTypesReq {
  /* 页面名称 */
  pageName: string

  /* 页面编码 */
  pageCode: string

  /* 页面地址 */
  pagePath: string

  /* 页面鉴权 1普通2登录3会员 */
  pageRule: number

  /* 页面状态 0禁用 1启用 2开发 3维护 */
  status: number

  /* 页面描述信息 */
  description: string
}

export interface CreateClientPageTypesRes {
  /* 主键id */
  id: number
}

/**
 *  接口 [编辑客户端页面](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234293782)
 *  @标签 客户端页面/编辑客户端页面
 *  @方式 POST
 *  @地址 /admin/clientPageConfig/updateClientPage
 *  @更新时间 2024-11-16 00:58:15
 */

export interface UpdateClientPageTypesReq {
  /* 主键id */
  id: number

  /* 页面名称 */
  pageName: string

  /* 页面编码 */
  pageCode: string

  /* 页面地址 */
  pagePath: string

  /* 页面鉴权 1普通2登录3会员 */
  pageRule: number

  /* 页面状态 0禁用 1启用 2开发 3维护 */
  status: number

  /* 页面描述信息 */
  description: string
}

export interface UpdateClientPageTypesRes {
  /* 主键id */
  id: number
}

/**
 *  接口 [删除客户端页面](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234293840)
 *  @标签 客户端页面/删除客户端页面
 *  @方式 POST
 *  @地址 /admin/clientPageConfig/deleteClientPage
 *  @更新时间 2024-11-16 01:00:51
 */

export interface DeleteClientPageTypesReq {
  /* 主键id */
  id: number
}

export interface DeleteClientPageTypesRes {
  /* 主键id */
  id: number
}

/**
 *  接口 [获取页面详情](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234424463)
 *  @标签 客户端页面/获取页面详情
 *  @方式 GET
 *  @地址 /admin/clientPageConfig/getClientPageDetail
 *  @更新时间 2024-11-17 01:46:26
 */

export interface GetClientPageDetailTypesReq {
  /* 主键id */
  id?: string
}

export interface GetClientPageDetailTypesRes {
  /* 主键id */
  id: number

  /* 页面名称 */
  pageName: string

  /* 页面编码 */
  pageCode: string

  /* 页面地址 */
  pagePath: string

  /* 页面鉴权 1普通2登录3会员 */
  pageRule: number

  /* 页面状态 0禁用 1启用 2开发 3维护 */
  status: number

  /* 页面描述信息 */
  description: string

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string
}
