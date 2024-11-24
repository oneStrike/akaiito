/**
 *  接口 [作者分页列表](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-215698093)
 *  @标签 内容管理/作者管理/作者分页列表
 *  @方式 GET
 *  @地址 /admin/contentMgmt/author/getAuthorPage
 *  @更新时间 2024-09-16 22:23:08
 */

export interface GetAuthorPageTypesReq {
  /*  */
  pageIndex?: string

  /*  */
  pageSize?: string

  /* 作者姓名 */
  name?: string

  /* 作者内容类型 1==>小说 2==>漫画 3==>图片 4==>视频 */
  contentType?: string

  /* 状态 1：正常 0：禁用 */
  status?: string
}

export interface GetAuthorPageTypesRes {
  list: {
    /* 主键id */
    id: number

    /* 状态，1==>正常 0==>禁用 */
    status: number

    /* 作者姓名 */
    name: string

    /* 作者头像 */
    avatar: string

    /* 作者简介 */
    description: string

    /* 作者三方主页 */
    website?: string

    /* coser身份 1是0否 */
    coser: number

    /* 小说家身份 1是0否 */
    novelist: number

    /* 漫画家身份 1是0否 */
    mangaArtist: number

    /* 插画师身份 1是0否 */
    illustrator: number

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
 *  接口 [创建作者](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-214490409)
 *  @标签 内容管理/作者管理/创建作者
 *  @方式 POST
 *  @地址 /admin/contentMgmt/author/createAuthor
 *  @更新时间 2024-09-18 00:33:57
 */

export interface CreateAuthorTypesReq {
  /* 作者姓名 */
  name: string

  /* 作者头像 */
  avatar: string

  /* 作者简介 */
  description: string

  /* 作者三方主页 */
  website?: string

  /* coser身份 1是0否 */
  coser: number

  /* 小说家身份 1是0否 */
  novelist: number

  /* 漫画家身份 1是0否 */
  mangaArtist: number

  /* 插画师身份 1是0否 */
  illustrator: number
}

/* 主键id */
export type CreateAuthorTypesRes = number

/**
 *  接口 [更新作者信息](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-214498981)
 *  @标签 内容管理/作者管理/更新作者信息
 *  @方式 POST
 *  @地址 /admin/contentMgmt/author/updateAuthor
 *  @更新时间 2024-09-17 23:13:32
 */

export interface UpdateAuthorTypesReq {
  /* 主键id */
  id: number

  /* 作者姓名 */
  name: string

  /* 作者头像 */
  avatar: string

  /* 作者简介 */
  description: string

  /* 作者三方主页 */
  website?: string

  /* coser身份 1是0否 */
  coser: number

  /* 小说家身份 1是0否 */
  novelist: number

  /* 漫画家身份 1是0否 */
  mangaArtist: number

  /* 插画师身份 1是0否 */
  illustrator: number
}

export interface UpdateAuthorTypesRes {
  /* 作者姓名 */
  name: string

  /* 作者头像 */
  avatar: string

  /* 作者描述 */
  description: string

  /* 作者内容类型 1==>小说 2==>漫画 3==>图片 4==>视频 */
  contentType: number

  /* 作者外部主页 */
  website: string
}

/**
 *  接口 [删除作者](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-215740463)
 *  @标签 内容管理/作者管理/删除作者
 *  @方式 POST
 *  @地址 /admin/contentMgmt/author/deleteAuthor
 *  @更新时间 2024-09-16 22:23:28
 */

export interface DeleteAuthorTypesReq {}

/* 删除后的主键id */
export type DeleteAuthorTypesRes = number

/**
 *  接口 [更新作者状态](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-215740509)
 *  @标签 内容管理/作者管理/更新作者状态
 *  @方式 POST
 *  @地址 /admin/contentMgmt/author/updateAuthorStatus
 *  @更新时间 2024-09-16 22:23:34
 */

export interface UpdateAuthorStatusTypesReq {}

/* 主键id */
export type UpdateAuthorStatusTypesRes = number
