/**
 *  接口 [创建漫画](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836321)
 *  @标签 漫画管理模块/创建漫画
 *  @方式 POST
 *  @地址 /api/admin/work/comic/create-comic
 *  @更新时间 2025-07-12 00:16:35
 */

export interface CreateComicRequest {
  /* 漫画名称 */
  name: string

  /* 漫画别名（支持多别名，用逗号分隔） */
  alias?: string | null

  /* 漫画封面URL */
  cover: string

  /* 虚拟热度热度权重（影响热度计算） */
  popularityWeight?: number | null

  /* 语言代码 */
  language: string

  /* 地区代码 */
  region: string

  /* 年龄分级 */
  ageRating: string

  /* 发布日期 */
  publishAt?: string | null

  /* 最后更新时间 */
  lastUpdated?: string

  /* 漫画简介 */
  description: string

  /* 出版社 */
  publisher?: string | null

  /* 原始来源 */
  originalSource?: string | null

  /* 连载状态 */
  serialStatus: number

  /* 是否允许下载 */
  canDownload: boolean

  /* 是否允许评论 */
  canComment: boolean

  /* 阅读规则 */
  readRule: number

  /* 购买金额（分为单位） */
  purchaseAmount?: number | null

  /* 评分（1-10分，保留1位小数） */
  rating?: number | null

  /* SEO标题 */
  seoTitle?: string | null

  /* SEO描述 */
  seoDescription?: string | null

  /* SEO关键词 */
  seoKeywords?: string | null

  /* 推荐权重（影响推荐排序） */
  recommendWeight?: number | null

  /* 版权信息 */
  copyright?: string | null

  /* 免责声明 */
  disclaimer?: string | null

  /* 管理员备注 */
  remark?: string | null

  /* 关联的作者ID列表 */
  authorIds: number[]

  /* 关联的分类ID列表 */
  categoryIds: number[]
}

/*  */
export type CreateComicResponse = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [分页查询漫画列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-316377092)
 *  @标签 漫画管理模块/分页查询漫画列表
 *  @方式 GET
 *  @地址 /api/admin/work/comic/comic-page
 *  @更新时间 2025-07-12 00:16:35
 */

export interface ComicPageRequest {
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

  /* 漫画名称（模糊搜索） */
  name?: string

  /* 语言代码 */
  language?: string

  /* 地区代码 */
  region?: string

  /* 年龄分级 */
  ageRating?: string

  /* 发布状态 */
  isPublished?: boolean

  /* 连载状态 */
  serialStatus?: number

  /* 阅读规则 */
  readRule?: number

  /* 是否推荐 */
  isRecommended?: boolean

  /* 是否热门 */
  isHot?: boolean

  /* 是否新作 */
  isNew?: boolean

  /* 作者名称 */
  author?: string

  /* 出版社（模糊搜索） */
  publisher?: string
}

export interface ComicPageResponse {
  /* 当前页码 */
  pageIndex: number

  /* 每页条数 */
  pageSize: number

  /* 总条数 */
  total: number
  list: {
    /* 漫画ID */
    id: number

    /* 漫画名称 */
    name: string

    /* 漫画别名（支持多别名，用逗号分隔） */
    alias?: string | null

    /* 漫画封面URL */
    cover: string

    /* 漫画分类 */
    comicCategories: {
      /* 分类ID */
      id: number

      /* 分类名称 */
      name: string

      /** 任意合法数值 */
      [property: string]: any
    }[]

    /* 漫画作者 */
    comicAuthors: {
      /* 作者ID */
      id: number

      /* 作者名称 */
      name: string

      /* 是否为主要作者 */
      isPrimary: boolean

      /* 排序 */
      sortOrder: number
    }[]

    /* 热度值（用于排序） */
    popularity: number

    /* 虚拟热度热度权重（影响热度计算） */
    popularityWeight?: number | null

    /* 语言代码 */
    language: string

    /* 地区代码 */
    region: string

    /* 年龄分级 */
    ageRating: string

    /* 发布状态 */
    isPublished: boolean

    /* 发布日期 */
    publishAt?: string | null

    /* 最后更新时间 */
    lastUpdated?: string

    /* 漫画简介 */
    description: string

    /* 出版社 */
    publisher?: string | null

    /* 原始来源 */
    originalSource?: string | null

    /* 连载状态 */
    serialStatus: number

    /* 是否允许下载 */
    canDownload: boolean

    /* 是否允许评论 */
    canComment: boolean

    /* 阅读规则 */
    readRule: number

    /* 购买金额（分为单位） */
    purchaseAmount?: number | null

    /* 总章节数 */
    totalChapters: number

    /* 总阅读次数 */
    totalViews: number

    /* 收藏数 */
    favoriteCount: number

    /* 评论总数 */
    commentCount: number

    /* 点赞总数 */
    likeCount: number

    /* 评分（1-10分，保留1位小数） */
    rating?: number | null

    /* 评分人数 */
    ratingCount: number

    /* SEO标题 */
    seoTitle?: string | null

    /* SEO描述 */
    seoDescription?: string | null

    /* SEO关键词 */
    seoKeywords?: string | null

    /* 推荐权重（影响推荐排序） */
    recommendWeight?: number | null

    /* 是否推荐 */
    isRecommended: boolean

    /* 是否热门 */
    isHot: boolean

    /* 是否新作 */
    isNew: boolean

    /* 版权信息 */
    copyright?: string | null

    /* 免责声明 */
    disclaimer?: string | null

    /* 管理员备注 */
    remark?: string | null

    /* 软删除时间 */
    deletedAt?: string | null

    /* 创建时间 */
    createdAt: string

    /* 更新时间 */
    updatedAt: string
  }[]
  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [获取漫画详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836322)
 *  @标签 漫画管理模块/获取漫画详情
 *  @方式 GET
 *  @地址 /api/admin/work/comic/comic-detail
 *  @更新时间 2025-07-12 00:16:35
 */

export interface ComicDetailRequest {
  /* 主键id */
  id: number
}

/*  */
export type ComicDetailResponse = {
  /* 漫画ID */
  id: number

  /* 漫画名称 */
  name: string

  /* 漫画别名（支持多别名，用逗号分隔） */
  alias?: string | null

  /* 漫画封面URL */
  cover: string

  /* 漫画分类 */
  comicCategories: {
    /* 分类ID */
    id: number

    /* 分类名称 */
    name: string
  }[]

  /* 漫画作者 */
  comicAuthors: {
    /* 作者ID */
    id: number

    /* 作者名称 */
    name: string

    /* 是否为主要作者 */
    isPrimary: boolean

    /* 排序 */
    sortOrder: number
  }[]

  /* 热度值（用于排序） */
  popularity: number

  /* 虚拟热度热度权重（影响热度计算） */
  popularityWeight?: number | null

  /* 语言代码 */
  language: string

  /* 地区代码 */
  region: string

  /* 年龄分级 */
  ageRating: string

  /* 发布状态 */
  isPublished: boolean

  /* 发布日期 */
  publishAt?: string | null

  /* 最后更新时间 */
  lastUpdated?: string

  /* 漫画简介 */
  description: string

  /* 出版社 */
  publisher?: string | null

  /* 原始来源 */
  originalSource?: string | null

  /* 连载状态 */
  serialStatus: number

  /* 是否允许下载 */
  canDownload: boolean

  /* 是否允许评论 */
  canComment: boolean

  /* 阅读规则 */
  readRule: number

  /* 购买金额（分为单位） */
  purchaseAmount?: number | null

  /* 总章节数 */
  totalChapters: number

  /* 总阅读次数 */
  totalViews: number

  /* 收藏数 */
  favoriteCount: number

  /* 评论总数 */
  commentCount: number

  /* 点赞总数 */
  likeCount: number

  /* 评分（1-10分，保留1位小数） */
  rating?: number | null

  /* 评分人数 */
  ratingCount: number

  /* SEO标题 */
  seoTitle?: string | null

  /* SEO描述 */
  seoDescription?: string | null

  /* SEO关键词 */
  seoKeywords?: string | null

  /* 推荐权重（影响推荐排序） */
  recommendWeight?: number | null

  /* 是否推荐 */
  isRecommended: boolean

  /* 是否热门 */
  isHot: boolean

  /* 是否新作 */
  isNew: boolean

  /* 版权信息 */
  copyright?: string | null

  /* 免责声明 */
  disclaimer?: string | null

  /* 管理员备注 */
  remark?: string | null

  /* 软删除时间 */
  deletedAt?: string | null

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [更新漫画信息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836323)
 *  @标签 漫画管理模块/更新漫画信息
 *  @方式 POST
 *  @地址 /api/admin/work/comic/update-comic
 *  @更新时间 2025-07-12 00:16:35
 */

export interface UpdateComicRequest {
  /* 漫画名称 */
  name?: string

  /* 漫画别名（支持多别名，用逗号分隔） */
  alias?: string | null

  /* 漫画封面URL */
  cover?: string

  /* 热度值（用于排序） */
  popularity?: number

  /* 虚拟热度热度权重（影响热度计算） */
  popularityWeight?: number | null

  /* 语言代码 */
  language?: string

  /* 地区代码 */
  region?: string

  /* 年龄分级 */
  ageRating?: string

  /* 发布状态 */
  isPublished?: boolean

  /* 发布日期 */
  publishAt?: string | null

  /* 最后更新时间 */
  lastUpdated?: string

  /* 漫画简介 */
  description?: string

  /* 出版社 */
  publisher?: string | null

  /* 原始来源 */
  originalSource?: string | null

  /* 连载状态 */
  serialStatus?: number

  /* 是否允许下载 */
  canDownload?: boolean

  /* 是否允许评论 */
  canComment?: boolean

  /* 阅读规则 */
  readRule?: number

  /* 购买金额（分为单位） */
  purchaseAmount?: number | null

  /* 总章节数 */
  totalChapters?: number

  /* 评分（1-10分，保留1位小数） */
  rating?: number | null

  /* SEO标题 */
  seoTitle?: string | null

  /* SEO描述 */
  seoDescription?: string | null

  /* SEO关键词 */
  seoKeywords?: string | null

  /* 推荐权重（影响推荐排序） */
  recommendWeight?: number | null

  /* 是否推荐 */
  isRecommended?: boolean

  /* 是否热门 */
  isHot?: boolean

  /* 是否新作 */
  isNew?: boolean

  /* 版权信息 */
  copyright?: string | null

  /* 免责声明 */
  disclaimer?: string | null

  /* 管理员备注 */
  remark?: string | null

  /* 主键id */
  id: number

  /* 关联的作者ID列表（可选，传入则更新关联关系） */
  authorIds?: array | null

  /* 关联的分类ID列表（可选，传入则更新关联关系） */
  categoryIds?: array | null
}

/*  */
export type UpdateComicResponse = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [批量更新漫画发布状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836324)
 *  @标签 漫画管理模块/批量更新漫画发布状态
 *  @方式 POST
 *  @地址 /api/admin/work/comic/batch-update-comic-status
 *  @更新时间 2025-07-12 00:16:35
 */

export interface BatchUpdateComicStatusRequest {
  /* 发布状态 */
  isPublished: boolean

  /* 漫画ID列表 */
  ids: number[]
}

/*  */
export type BatchUpdateComicStatusResponse = {
  /* 操作成功的数据数量 */
  count: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [批量更新漫画推荐状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836325)
 *  @标签 漫画管理模块/批量更新漫画推荐状态
 *  @方式 POST
 *  @地址 /api/admin/work/comic/batch-update-comic-recommended
 *  @更新时间 2025-07-12 00:16:35
 */

export interface BatchUpdateComicRecommendedRequest {
  /* 是否推荐 */
  isRecommended: boolean

  /* 漫画ID列表 */
  ids: number[]
}

/*  */
export type BatchUpdateComicRecommendedResponse = {
  /* 操作成功的数据数量 */
  count: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [批量更新漫画热门状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836326)
 *  @标签 漫画管理模块/批量更新漫画热门状态
 *  @方式 POST
 *  @地址 /api/admin/work/comic/batch-update-comic-hot
 *  @更新时间 2025-07-12 00:16:35
 */

export interface BatchUpdateComicHotRequest {
  /* 是否热门 */
  isHot: boolean

  /* 漫画ID列表 */
  ids: number[]
}

/*  */
export type BatchUpdateComicHotResponse = {
  /* 操作成功的数据数量 */
  count: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [批量更新漫画新作状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836327)
 *  @标签 漫画管理模块/批量更新漫画新作状态
 *  @方式 POST
 *  @地址 /api/admin/work/comic/batch-update-comic-new
 *  @更新时间 2025-07-12 00:16:35
 */

export interface BatchUpdateComicNewRequest {
  /* 是否新作 */
  isNew: boolean

  /* 漫画ID列表 */
  ids: number[]
}

/*  */
export type BatchUpdateComicNewResponse = {
  /* 操作成功的数据数量 */
  count: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [软删除漫画](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836328)
 *  @标签 漫画管理模块/软删除漫画
 *  @方式 POST
 *  @地址 /api/admin/work/comic/delete-comic
 *  @更新时间 2025-07-12 00:16:35
 */

export interface DeleteComicRequest {
  /* 主键id */
  id: number
}

/*  */
export type DeleteComicResponse = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}
