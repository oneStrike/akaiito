/**
 *  接口 [获取内容分类分页](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-215788540)
 *  @标签 分类管理/获取内容分类分页
 *  @方式 GET
 *  @地址 /admin/contentMgmt/category/getCategoryPage
 *  @更新时间 2024-12-03 20:24:50
 */

export interface GetCategoryPageTypesReq {
  /* 分类名称 */
  name?: string

  /* 状态 1：正常 0：禁用 */
  status?: number

  /* 内容类型 1==>小说 2==>漫画 3==>图片 */
  contentModel?: number

  /* 单页数量 */
  pageSize?: number

  /* 页码 */
  pageIndex?: number
}

export interface GetCategoryPageTypesRes {
  list: {
    /* 主键id */
    id: number

    /* 分类名称 */
    name: string

    /* 分类图标 */
    icon: string

    /* 分类热度 */
    hot: number

    /* 辅助分类热度 */
    auxiliaryHot: number

    /* 分类下属小说数量 */
    novelCount: number

    /* 分类下属漫画数量 */
    comicCount: number

    /* 分类下属图片数量 */
    imageCount: number

    /* 排序 */
    sort: number

    /* 状态 1：正常 0：禁用 */
    status: number

    /* 分类是否适用于小说 1：适用 0：不适用 */
    novelApplicable: number

    /* 分类是否适用于漫画 1：适用 0：不适用 */
    comicApplicable: number

    /* 分类是否适用于图片 1：适用 0：不适用 */
    photosApplicable: number

    /* 分类是否适用于插画 1：适用 0：不适用 */
    illustratorApplicable: number

    /* 更新时间 */
    updatedAt: string

    /* 创建时间 */
    createdAt: string
  }[]
  /* 页码 */
  pageIndex: number

  /* 单页大小 */
  pageSize: number

  /* 总条数 */
  total: number
}

/**
 *  接口 [创建内容分类](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-220368708)
 *  @标签 分类管理/创建内容分类
 *  @方式 POST
 *  @地址 /admin/contentMgmt/category/createCategory
 *  @更新时间 2024-10-07 10:44:25
 */

export interface CreateCategoryTypesReq {
  /* 分类名称 */
  name: string

  /* 分类图标 */
  icon: string

  /* 辅助分类热度 */
  auxiliaryHot: number

  /* 状态 1：正常 0：禁用 */
  status: number

  /* 分类是否适用于小说 1：适用 0：不适用 */
  novelApplicable: number

  /* 分类是否适用于漫画 1：适用 0：不适用 */
  comicApplicable: number

  /* 分类是否适用于图片 1：适用 0：不适用 */
  photosApplicable: number

  /* 分类是否适用于插画 1：适用 0：不适用 */
  illustratorApplicable: number
}

/* 主键id */
export type CreateCategoryTypesRes = number

/**
 *  接口 [更新分类接口](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-220372206)
 *  @标签 分类管理/更新分类接口
 *  @方式 POST
 *  @地址 /admin/contentMgmt/category/updateCategory
 *  @更新时间 2024-10-07 11:30:01
 */

export interface UpdateCategoryTypesReq {
  /* 主键id */
  id: number

  /* 分类名称 */
  name: string

  /* 分类图标 */
  icon: string

  /* 辅助分类热度 */
  auxiliaryHot: number

  /* 状态 1：正常 0：禁用 */
  status: number

  /* 分类是否适用于小说 1：适用 0：不适用 */
  novelApplicable: number

  /* 分类是否适用于漫画 1：适用 0：不适用 */
  comicApplicable: number

  /* 分类是否适用于图片 1：适用 0：不适用 */
  photosApplicable: number

  /* 分类是否适用于插画 1：适用 0：不适用 */
  illustratorApplicable: number
}

/* 主键id */
export type UpdateCategoryTypesRes = number

/**
 *  接口 [更新分类状态](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-220372569)
 *  @标签 分类管理/更新分类状态
 *  @方式 POST
 *  @地址 /admin/contentMgmt/category/updateCategoryStatus
 *  @更新时间 2024-10-07 11:41:35
 */

export interface UpdateCategoryStatusTypesReq {
  /* 主键id */
  id: number

  /* 分类图标 */
  icon: string

  /* 状态 1：正常 0：禁用 */
  status: number

  /* 分类是否适用于小说 1：适用 0：不适用 */
  novelApplicable: number

  /* 分类是否适用于漫画 1：适用 0：不适用 */
  comicApplicable: number

  /* 分类是否适用于图片 1：适用 0：不适用 */
  photosApplicable: number

  /* 分类是否适用于插画 1：适用 0：不适用 */
  illustratorApplicable: number
}

/* 主键id */
export type UpdateCategoryStatusTypesRes = number

/**
 *  接口 [删除分类](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-220372611)
 *  @标签 分类管理/删除分类
 *  @方式 POST
 *  @地址 /admin/contentMgmt/category/deleteCategory
 *  @更新时间 2024-10-07 11:43:30
 */

export interface DeleteCategoryTypesReq {
  /* 主键id */
  id: number
}

/* 主键id */
export type DeleteCategoryTypesRes = number
