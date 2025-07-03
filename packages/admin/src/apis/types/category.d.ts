/**
 *  接口 [创建分类](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090654)
 *  @标签 分类管理模块/创建分类
 *  @方式 POST
 *  @地址 /api/admin/work/category/create-category
 *  @更新时间 2025-07-03 10:55:39
 */

export interface CreateCategoryRequest {
  /* 分类名称 */
  name: string

  /* 分类图标URL */
  icon?: string | null

  /* 排序值 */
  order?: number | null

  /* 是否启用 */
  isEnabled?: boolean | null

  /* 应用类型 */
  contentTypes: number
}

/*  */
export type CreateCategoryResponse = {
  /* 主键id */
  id: number
}

/**
 *  接口 [分页查询分类列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090655)
 *  @标签 分类管理模块/分页查询分类列表
 *  @方式 GET
 *  @地址 /api/admin/work/category/category-page
 *  @更新时间 2025-07-03 10:55:39
 */

export interface CategoryPageRequest {
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

  /* 分类名称 */
  name?: string

  /* 是否启用 */
  isEnabled?: boolean

  /* 应用类型 */
  contentTypes?: number
}

export interface CategoryPageResponse {
  /* 当前页码 */
  pageIndex: number

  /* 每页条数 */
  pageSize: number

  /* 总条数 */
  total: number
  list: {
    /* 分类ID */
    id: number

    /* 分类名称 */
    name: string

    /* 分类图标URL */
    icon?: string | null

    /* 人气值 */
    popularity?: number | null

    /* 辅助人气值 */
    popularityWeight?: number | null

    /* 排序值 */
    order?: number | null

    /* 小说数量 */
    novelCount?: number | null

    /* 漫画数量 */
    comicCount?: number | null

    /* 图片数量 */
    imageSetCount?: number | null

    /* 插画数量 */
    illustrationCount?: number | null

    /* 是否启用 */
    isEnabled?: boolean | null

    /* 应用类型 */
    contentTypes: number

    /* 创建时间 */
    createdAt?: string | null

    /* 更新时间 */
    updatedAt?: string | null
  }[]
}

/**
 *  接口 [获取分类详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090656)
 *  @标签 分类管理模块/获取分类详情
 *  @方式 GET
 *  @地址 /api/admin/work/category/category-detail
 *  @更新时间 2025-07-03 10:55:39
 */

export interface CategoryDetailRequest {
  /* 主键id */
  id: number
}

/*  */
export type CategoryDetailResponse = {
  /* 分类ID */
  id: number

  /* 分类名称 */
  name: string

  /* 分类图标URL */
  icon?: string | null

  /* 人气值 */
  popularity?: number | null

  /* 辅助人气值 */
  popularityWeight?: number | null

  /* 排序值 */
  order?: number | null

  /* 小说数量 */
  novelCount?: number | null

  /* 漫画数量 */
  comicCount?: number | null

  /* 图片数量 */
  imageSetCount?: number | null

  /* 插画数量 */
  illustrationCount?: number | null

  /* 是否启用 */
  isEnabled?: boolean | null

  /* 应用类型 */
  contentTypes: number

  /* 创建时间 */
  createdAt?: string | null

  /* 更新时间 */
  updatedAt?: string | null
}

/**
 *  接口 [更新分类信息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315212859)
 *  @标签 分类管理模块/更新分类信息
 *  @方式 POST
 *  @地址 /api/admin/work/category/update-category
 *  @更新时间 2025-07-03 10:55:39
 */

export interface UpdateCategoryRequest {
  /* 分类名称 */
  name?: string

  /* 分类图标URL */
  icon?: string | null

  /* 人气值 */
  popularity?: number | null

  /* 辅助人气值 */
  popularityWeight?: number | null

  /* 排序值 */
  order?: number | null

  /* 是否启用 */
  isEnabled?: boolean | null

  /* 应用类型 */
  contentTypes?: number

  /* 主键id */
  id: number
}

/*  */
export type UpdateCategoryResponse = {
  /* 主键id */
  id: number
}

/**
 *  接口 [批量更新分类状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090658)
 *  @标签 分类管理模块/批量更新分类状态
 *  @方式 POST
 *  @地址 /api/admin/work/category/batch-update-category-status
 *  @更新时间 2025-07-03 10:55:39
 */

export interface BatchUpdateCategoryStatusRequest {
  /* 批量操作的 ID 数组 */
  ids: number[]

  /* 启用或者禁用 */
  isEnabled: boolean
}

/*  */
export type BatchUpdateCategoryStatusResponse = {
  /* 操作成功的数据数量 */
  count: number
}

/**
 *  接口 [批量删除分类](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090659)
 *  @标签 分类管理模块/批量删除分类
 *  @方式 POST
 *  @地址 /api/admin/work/category/delete-batch
 *  @更新时间 2025-07-03 10:55:39
 */

/*  */
export type DeleteBatchResponse = {
  /* 操作成功的数据数量 */
  count: number
}

/**
 *  接口 [分类拖拽排序](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090660)
 *  @标签 分类管理模块/分类拖拽排序
 *  @方式 POST
 *  @地址 /api/admin/work/category/category-order
 *  @更新时间 2025-07-03 10:55:39
 */

export interface CategoryOrderRequest {
  /* 拖拽的目标id */
  targetId: number

  /* 当前拖拽数据的id */
  dragId: number
}

/*  */
export type CategoryOrderResponse = {
  /* 拖拽的目标id */
  targetId: number

  /* 当前拖拽数据的id */
  dragId: number
}
