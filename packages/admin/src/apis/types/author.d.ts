/**
 *  接口 [作者分页列表](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-215698093)
 *  @标签 内容管理/作者管理/作者分页列表
 *  @方式 GET
 *  @地址 /admin/contentMgmt/author/getAuthorPage
 *  @更新时间 2025-05-08 22:15:20
 */

export interface GetAuthorPageTypesReq {
  /*  */
  pageIndex?: number

  /*  */
  pageSize?: number

  /* 作者姓名 */
  name?: string

  /* 作者内容类型 1==>小说 2==>漫画 3==>图片 4==>视频 */
  roles?: string

  /* 启用状态 */
  status?: boolean
}

export interface GetAuthorPageTypesRes {
  list: {
    /* 主键id */
    id: number

    /* 启用状态 */
    status: boolean

    /* 作者姓名 */
    name: string

    /* 作者头像 */
    avatar: string | null

    /* 包含的角色 */
    roles: {}

    /* 国籍数据字典nationality */
    nationality?: string | null

    /* 性别 0未知1男2女 */
    gender?: number

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
 *  接口 [获取作者详情](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-295420478)
 *  @标签 内容管理/作者管理/获取作者详情
 *  @方式 GET
 *  @地址 /admin/contentMgmt/author/getAuthorDetail
 *  @更新时间 2025-05-13 22:06:30
 */

export interface GetAuthorDetailTypesReq {
  /* 主键id */
  id?: number
}

export interface GetAuthorDetailTypesRes {
  /* 主键id */
  id: number

  /* 启用状态 */
  status: boolean

  /* 作者姓名 */
  name: string

  /* 作者头像 */
  avatar: string | null

  /* 作者简介 */
  description: string

  /* 包含的角色 */
  roles: {}

  /* 国籍数据字典nationality */
  nationality?: string | null

  /* 社交媒体链接，json数组格式 */
  socialLinks?: string | null

  /* 性别 0未知1男2女 */
  gender?: number

  /* 备注信息 */
  remark?: string

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string
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
  avatar: string | null

  /* 作者简介 */
  description: string

  /* 包含的角色 */
  roles: {}

  /* 国籍数据字典nationality */
  nationality?: string | null

  /* 社交媒体链接，json数组格式 */
  socialLinks?: string | null

  /* 性别 0未知1男2女 */
  gender?: number

  /* 备注信息 */
  remark?: string
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
  avatar: string | null

  /* 作者简介 */
  description: string

  /* 包含的角色 */
  roles: {}

  /* 国籍数据字典nationality */
  nationality?: string | null

  /* 社交媒体链接，json数组格式 */
  socialLinks?: string | null

  /* 性别 0未知1男2女 */
  gender?: number

  /* 备注信息 */
  remark?: string
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
