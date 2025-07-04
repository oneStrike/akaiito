/**
 *  接口 [创建作者](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836367)
 *  @标签 作者管理模块/创建作者
 *  @方式 POST
 *  @地址 /api/admin/work/author/create-author
 *  @更新时间 2025-07-04 16:24:21
 */

export interface CreateAuthorRequest {
  /* 作者姓名 */
  name: string

  /* 作者头像URL */
  avatar?: string | null

  /* 作者描述 */
  description?: string | null

  /* 作者身份角色（位运算：1=作家, 2=插画家, 4=漫画家, 8=模特） */
  roles?: number | null

  /* 国籍 */
  nationality?: string | null

  /* 性别（0: 未知, 1: 男性, 2: 女性, 3: 其他） */
  gender: number

  /* 社交媒体链接（JSON格式存储多个平台链接） */
  socialLinks?: string | null

  /* 管理员备注 */
  remark?: string | null
}

/*  */
export type CreateAuthorResponse = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [分页查询作者列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836368)
 *  @标签 作者管理模块/分页查询作者列表
 *  @方式 GET
 *  @地址 /api/admin/work/author/author-page
 *  @更新时间 2025-07-04 16:24:21
 */

export interface AuthorPageRequest {
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

  /* 作者姓名（模糊搜索） */
  name?: string

  /* 启用状态（true: 启用, false: 禁用） */
  isEnabled?: boolean

  /* 作者身份角色（位运算：1=作家, 2=插画家, 4=漫画家, 8=模特） */
  roles?: number

  /* 国籍 */
  nationality?: string

  /* 性别（0: 未知, 1: 男性, 2: 女性, 3: 其他） */
  gender?: number

  /* 是否为推荐作者（用于前台推荐展示） */
  featured?: boolean
}

export interface AuthorPageResponse {
  /* 当前页码 */
  pageIndex: number

  /* 每页条数 */
  pageSize: number

  /* 总条数 */
  total: number
  list: {
    /* 作者ID */
    id: number

    /* 作者姓名 */
    name: string

    /* 作者头像URL */
    avatar?: string | null

    /* 启用状态（true: 启用, false: 禁用） */
    isEnabled: boolean

    /* 作者身份角色（位运算：1=作家, 2=插画家, 4=漫画家, 8=模特） */
    roles?: number | null

    /* 性别（0: 未知, 1: 男性, 2: 女性, 3: 其他） */
    gender: number

    /* 创建时间 */
    createdAt: string

    /* 更新时间 */
    updatedAt: string

    /* 作品数量（冗余字段，用于提升查询性能） */
    worksCount: number

    /* 粉丝数量（冗余字段，用于前台展示） */
    followersCount: number

    /* 是否为推荐作者（用于前台推荐展示） */
    featured: boolean

    /** 任意合法数值 */
    [property: string]: any
  }[]
  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [获取作者详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836369)
 *  @标签 作者管理模块/获取作者详情
 *  @方式 GET
 *  @地址 /api/admin/work/author/author-detail
 *  @更新时间 2025-07-04 16:24:21
 */

export interface AuthorDetailRequest {
  /* 主键id */
  id: number
}

/*  */
export type AuthorDetailResponse = {
  /* 作者ID */
  id: number

  /* 作者姓名 */
  name: string

  /* 作者头像URL */
  avatar?: string | null

  /* 作者描述 */
  description?: string | null

  /* 启用状态（true: 启用, false: 禁用） */
  isEnabled: boolean

  /* 作者身份角色（位运算：1=作家, 2=插画家, 4=漫画家, 8=模特） */
  roles?: number | null

  /* 国籍 */
  nationality?: string | null

  /* 性别（0: 未知, 1: 男性, 2: 女性, 3: 其他） */
  gender: number

  /* 社交媒体链接（JSON格式存储多个平台链接） */
  socialLinks?: string | null

  /* 管理员备注 */
  remark?: string | null

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string

  /* 作品数量（冗余字段，用于提升查询性能） */
  worksCount: number

  /* 粉丝数量（冗余字段，用于前台展示） */
  followersCount: number

  /* 是否为推荐作者（用于前台推荐展示） */
  featured: boolean

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [更新作者信息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836370)
 *  @标签 作者管理模块/更新作者信息
 *  @方式 POST
 *  @地址 /api/admin/work/author/update-author
 *  @更新时间 2025-07-04 16:24:21
 */

export interface UpdateAuthorRequest {
  /* 作者姓名 */
  name?: string

  /* 作者头像URL */
  avatar?: string | null

  /* 作者描述 */
  description?: string | null

  /* 启用状态（true: 启用, false: 禁用） */
  isEnabled?: boolean

  /* 作者身份角色（位运算：1=作家, 2=插画家, 4=漫画家, 8=模特） */
  roles?: number | null

  /* 国籍 */
  nationality?: string | null

  /* 性别（0: 未知, 1: 男性, 2: 女性, 3: 其他） */
  gender?: number

  /* 社交媒体链接（JSON格式存储多个平台链接） */
  socialLinks?: string | null

  /* 管理员备注 */
  remark?: string | null

  /* 是否为推荐作者（用于前台推荐展示） */
  featured?: boolean

  /* 主键id */
  id: number
}

/*  */
export type UpdateAuthorResponse = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [批量更新作者状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836371)
 *  @标签 作者管理模块/批量更新作者状态
 *  @方式 POST
 *  @地址 /api/admin/work/author/batch-update-author-status
 *  @更新时间 2025-07-04 16:24:21
 */

export interface BatchUpdateAuthorStatusRequest {
  /* 批量操作的 ID 数组 */
  ids: number[]

  /* 启用或者禁用 */
  isEnabled: boolean
}

/*  */
export type BatchUpdateAuthorStatusResponse = {
  /* 操作成功的数据数量 */
  count: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [批量更新作者推荐状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836372)
 *  @标签 作者管理模块/批量更新作者推荐状态
 *  @方式 POST
 *  @地址 /api/admin/work/author/batch-update-author-featured
 *  @更新时间 2025-07-04 16:24:21
 */

export interface BatchUpdateAuthorFeaturedRequest {
  /* 是否为推荐作者（用于前台推荐展示） */
  featured: boolean

  /* 作者ID列表 */
  ids: number[]
}

/*  */
export type BatchUpdateAuthorFeaturedResponse = {
  /* 操作成功的数据数量 */
  count: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [软删除作者](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836373)
 *  @标签 作者管理模块/软删除作者
 *  @方式 POST
 *  @地址 /api/admin/work/author/delete-author
 *  @更新时间 2025-07-04 16:24:21
 */

export interface DeleteAuthorRequest {
  /* 主键id */
  id: number
}

/*  */
export type DeleteAuthorResponse = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}
