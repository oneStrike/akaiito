/**
 *  接口 [创建漫画版本](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319288534)
 *  @标签 漫画版本管理模块/创建漫画版本
 *  @方式 POST
 *  @地址 /api/admin/work/comic-version/create-comic-version
 *  @更新时间 2025-07-12 00:16:35
 */

export interface CreateComicVersionRequest {
  /* 关联的原始漫画ID */
  comicId: number

  /* 版本名称（如：英语版、日语版、XX汉化组等） */
  versionName: string

  /* 语言代码（如：zh-CN, en-US, ja-JP） */
  language: string

  /* 翻译组/汉化组名称 */
  translatorGroup?: string | null

  /* 版本描述 */
  description?: string | null

  /* 是否为推荐版本 */
  isRecommended: boolean

  /* 发布时间 */
  publishAt?: string | null

  /* 最后更新时间 */
  lastUpdated?: string | null

  /* 查看规则（0=所有人, 1=登录用户, 2=会员, 3=积分购买） */
  readRule: number

  /* 购买需要消耗的金额（分为单位） */
  purchaseAmount: number

  /* 版权信息 */
  copyright?: string | null

  /* 免责声明 */
  disclaimer?: string | null

  /* 备注（内部使用） */
  remark?: string | null
}

/*  */
export type CreateComicVersionResponse = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [分页查询漫画版本列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319288535)
 *  @标签 漫画版本管理模块/分页查询漫画版本列表
 *  @方式 GET
 *  @地址 /api/admin/work/comic-version/comic-version-page
 *  @更新时间 2025-07-12 00:16:35
 */

export interface ComicVersionPageRequest {
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

  /* 漫画ID（精确匹配） */
  comicId: number

  /* 语言代码（如：zh-CN, en-US, ja-JP） */
  language?: string

  /* 翻译组名称（模糊搜索） */
  translatorGroup?: string

  /* 是否为推荐版本 */
  isRecommended?: boolean

  /* 是否启用 */
  isEnabled?: boolean

  /* 发布状态 */
  isPublished?: boolean

  /* 查看规则（0=所有人, 1=登录用户, 2=会员, 3=积分购买） */
  readRule?: number

  /* 版本名称（模糊搜索） */
  versionName?: string
}

export interface ComicVersionPageResponse {
  /* 当前页码 */
  pageIndex: number

  /* 每页条数 */
  pageSize: number

  /* 总条数 */
  total: number
  list: {
    /* 版本ID */
    id: number

    /* 关联的原始漫画ID */
    comicId: number

    /* 版本名称（如：英语版、日语版、XX汉化组等） */
    versionName: string

    /* 语言代码（如：zh-CN, en-US, ja-JP） */
    language: string

    /* 翻译组/汉化组名称 */
    translatorGroup?: string | null

    /* 是否为推荐版本 */
    isRecommended: boolean

    /* 是否启用 */
    isEnabled: boolean

    /* 发布状态 */
    isPublished: boolean

    /* 发布时间 */
    publishAt?: string | null

    /* 最后更新时间 */
    lastUpdated?: string | null

    /* 总阅读次数 */
    totalViews: number

    /* 收藏数 */
    favoriteCount: number

    /* 点赞数 */
    likeCount: number

    /* 评分（1-10分，保留一位小数） */
    rating?: number | null

    /* 评分人数 */
    ratingCount: number

    /* 查看规则（0=所有人, 1=登录用户, 2=会员, 3=积分购买） */
    readRule: number

    /* 购买需要消耗的金额（分为单位） */
    purchaseAmount: number

    /* 版权信息 */
    copyright?: string | null

    /* 排序权重（用于版本列表排序） */
    sortOrder: number

    /* 创建时间 */
    createdAt: string

    /* 更新时间 */
    updatedAt: string

    /** 任意合法数值 */
    [property: string]: any
  }[]
  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [获取漫画版本详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319288536)
 *  @标签 漫画版本管理模块/获取漫画版本详情
 *  @方式 GET
 *  @地址 /api/admin/work/comic-version/comic-version-detail
 *  @更新时间 2025-07-12 00:16:35
 */

export interface ComicVersionDetailRequest {
  /* 主键id */
  id: number
}

/*  */
export type ComicVersionDetailResponse = {
  /* 版本ID */
  id: number

  /* 关联的原始漫画ID */
  comicId: number

  /* 版本名称（如：英语版、日语版、XX汉化组等） */
  versionName: string

  /* 语言代码（如：zh-CN, en-US, ja-JP） */
  language: string

  /* 翻译组/汉化组名称 */
  translatorGroup?: string | null

  /* 版本描述 */
  description?: string | null

  /* 是否为推荐版本 */
  isRecommended: boolean

  /* 是否启用 */
  isEnabled: boolean

  /* 发布状态 */
  isPublished: boolean

  /* 发布时间 */
  publishAt?: string | null

  /* 最后更新时间 */
  lastUpdated?: string | null

  /* 总阅读次数 */
  totalViews: number

  /* 收藏数 */
  favoriteCount: number

  /* 点赞数 */
  likeCount: number

  /* 评分（1-10分，保留一位小数） */
  rating?: number | null

  /* 评分人数 */
  ratingCount: number

  /* 查看规则（0=所有人, 1=登录用户, 2=会员, 3=积分购买） */
  readRule: number

  /* 购买需要消耗的金额（分为单位） */
  purchaseAmount: number

  /* 版权信息 */
  copyright?: string | null

  /* 免责声明 */
  disclaimer?: string | null

  /* 备注（内部使用） */
  remark?: string | null

  /* 排序权重（用于版本列表排序） */
  sortOrder: number

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [更新漫画版本信息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319288537)
 *  @标签 漫画版本管理模块/更新漫画版本信息
 *  @方式 POST
 *  @地址 /api/admin/work/comic-version/update-comic-version
 *  @更新时间 2025-07-12 00:16:35
 */

export interface UpdateComicVersionRequest {
  /* 版本名称（如：英语版、日语版、XX汉化组等） */
  versionName?: string

  /* 语言代码（如：zh-CN, en-US, ja-JP） */
  language?: string

  /* 翻译组/汉化组名称 */
  translatorGroup?: string | null

  /* 版本描述 */
  description?: string | null

  /* 是否为推荐版本 */
  isRecommended?: boolean

  /* 是否启用 */
  isEnabled?: boolean

  /* 发布状态 */
  isPublished?: boolean

  /* 发布时间 */
  publishAt?: string | null

  /* 最后更新时间 */
  lastUpdated?: string | null

  /* 查看规则（0=所有人, 1=登录用户, 2=会员, 3=积分购买） */
  readRule?: number

  /* 购买需要消耗的金额（分为单位） */
  purchaseAmount?: number

  /* 版权信息 */
  copyright?: string | null

  /* 免责声明 */
  disclaimer?: string | null

  /* 备注（内部使用） */
  remark?: string | null

  /* 排序权重（用于版本列表排序） */
  sortOrder?: number

  /* 主键id */
  id: number
}

/*  */
export type UpdateComicVersionResponse = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [批量更新版本发布状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319288538)
 *  @标签 漫画版本管理模块/批量更新版本发布状态
 *  @方式 POST
 *  @地址 /api/admin/work/comic-version/batch-update-version-publish-status
 *  @更新时间 2025-07-12 00:16:35
 */

export interface BatchUpdateVersionPublishStatusRequest {
  /* 批量操作的 ID 数组 */
  ids: number[]

  /* 启用或者禁用 */
  isEnabled: boolean

  /* 发布状态 */
  isPublished: boolean
}

/*  */
export type BatchUpdateVersionPublishStatusResponse = {
  /* 操作成功的数据数量 */
  count: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [批量更新版本推荐状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319288539)
 *  @标签 漫画版本管理模块/批量更新版本推荐状态
 *  @方式 POST
 *  @地址 /api/admin/work/comic-version/batch-update-version-recommended-status
 *  @更新时间 2025-07-12 00:16:35
 */

export interface BatchUpdateVersionRecommendedStatusRequest {
  /* 批量操作的 ID 数组 */
  ids: number[]

  /* 启用或者禁用 */
  isEnabled: boolean

  /* 推荐状态 */
  isRecommended: boolean
}

/*  */
export type BatchUpdateVersionRecommendedStatusResponse = {
  /* 操作成功的数据数量 */
  count: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [批量更新版本启用状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319288540)
 *  @标签 漫画版本管理模块/批量更新版本启用状态
 *  @方式 POST
 *  @地址 /api/admin/work/comic-version/batch-update-version-enabled-status
 *  @更新时间 2025-07-12 00:16:35
 */

export interface BatchUpdateVersionEnabledStatusRequest {
  /* 批量操作的 ID 数组 */
  ids: number[]

  /* 启用或者禁用 */
  isEnabled: boolean
}

/*  */
export type BatchUpdateVersionEnabledStatusResponse = {
  /* 操作成功的数据数量 */
  count: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [软删除版本](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-319288543)
 *  @标签 漫画版本管理模块/软删除版本
 *  @方式 POST
 *  @地址 /api/admin/work/comic-version/delete-comic-version
 *  @更新时间 2025-07-12 00:16:35
 */

export interface DeleteComicVersionRequest {
  /* 主键id */
  id: number
}

/*  */
export type DeleteComicVersionResponse = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}
