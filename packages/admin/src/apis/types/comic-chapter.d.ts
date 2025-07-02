/**
 *  接口 [创建漫画章节](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-316377105)
 *  @标签 漫画章节管理模块/创建漫画章节
 *  @方式 POST
 *  @地址 /api/admin/work/comic-chapter/create-comic-chapter
 *  @更新时间 2025-07-02 23:25:13
 */

export interface CreateComicChapterRequest {
  /* 章节标题 */
  title: string

  /* 章节副标题或描述 */
  subtitle?: string | null

  /* 发布状态（true: 已发布, false: 未发布） */
  isPublished: boolean

  /* 关联的漫画ID */
  comicId: number

  /* 章节序号（用于排序） */
  chapterNumber: number

  /* 排序权重（用于精确控制显示顺序） */
  sortOrder: number

  /* 查看规则（0: 公开, 1: 登录, 2: 会员, 3: 购买） */
  readRule: number

  /* 购买需要消耗的金额（分为单位） */
  purchaseAmount: number

  /* 漫画内容（JSON格式存储图片URL数组） */
  contents: string

  /* 是否为试读章节 */
  isPreview: boolean

  /* 发布时间 */
  publishAt?: string | null

  /* 章节缩略图 */
  thumbnail?: string | null

  /* 管理员备注 */
  remark?: string | null
}

/*  */
export type CreateComicChapterResponse = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [分页查询漫画章节列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-316377106)
 *  @标签 漫画章节管理模块/分页查询漫画章节列表
 *  @方式 GET
 *  @地址 /api/admin/work/comic-chapter/comic-chapter-page
 *  @更新时间 2025-07-02 23:25:13
 */

export interface ComicChapterPageRequest {
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

  /* 章节标题（模糊搜索） */
  title?: string

  /* 发布状态（true: 已发布, false: 未发布） */
  isPublished?: boolean

  /* 漫画ID（精确匹配） */
  comicId?: number

  /* 查看规则（0: 公开, 1: 登录, 2: 会员, 3: 购买） */
  readRule?: number

  /* 是否为试读章节 */
  isPreview?: boolean
}

export interface ComicChapterPageResponse {
  /* 当前页码 */
  pageIndex: number

  /* 每页条数 */
  pageSize: number

  /* 总条数 */
  total: number
  list: {
    /* 章节ID */
    id: number

    /* 章节标题 */
    title: string

    /* 章节副标题或描述 */
    subtitle?: string | null

    /* 发布状态（true: 已发布, false: 未发布） */
    isPublished: boolean

    /* 关联的漫画ID */
    comicId: number

    /* 章节序号（用于排序） */
    chapterNumber: number

    /* 排序权重（用于精确控制显示顺序） */
    sortOrder: number

    /* 查看规则（0: 公开, 1: 登录, 2: 会员, 3: 购买） */
    readRule: number

    /* 购买需要消耗的金额（分为单位） */
    purchaseAmount: number

    /* 是否为试读章节 */
    isPreview: boolean

    /* 发布时间 */
    publishAt?: string | null

    /* 章节缩略图 */
    thumbnail?: string | null

    /* 阅读次数 */
    viewCount: number

    /* 点赞数 */
    likeCount: number

    /* 评论数 */
    commentCount: number

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
 *  接口 [获取漫画章节详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-316377107)
 *  @标签 漫画章节管理模块/获取漫画章节详情
 *  @方式 GET
 *  @地址 /api/admin/work/comic-chapter/comic-chapter-detail
 *  @更新时间 2025-07-02 23:25:13
 */

export interface ComicChapterDetailRequest {
  /* 主键id */
  id: number
}

/*  */
export type ComicChapterDetailResponse = {
  /* 章节ID */
  id: number

  /* 章节标题 */
  title: string

  /* 章节副标题或描述 */
  subtitle?: string | null

  /* 发布状态（true: 已发布, false: 未发布） */
  isPublished: boolean

  /* 关联的漫画ID */
  comicId: number

  /* 章节序号（用于排序） */
  chapterNumber: number

  /* 排序权重（用于精确控制显示顺序） */
  sortOrder: number

  /* 查看规则（0: 公开, 1: 登录, 2: 会员, 3: 购买） */
  readRule: number

  /* 购买需要消耗的金额（分为单位） */
  purchaseAmount: number

  /* 漫画内容（JSON格式存储图片URL数组） */
  contents: string

  /* 是否为试读章节 */
  isPreview: boolean

  /* 发布时间 */
  publishAt?: string | null

  /* 章节缩略图 */
  thumbnail?: string | null

  /* 阅读次数 */
  viewCount: number

  /* 点赞数 */
  likeCount: number

  /* 评论数 */
  commentCount: number

  /* 管理员备注 */
  remark?: string | null

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [更新漫画章节信息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-316377108)
 *  @标签 漫画章节管理模块/更新漫画章节信息
 *  @方式 POST
 *  @地址 /api/admin/work/comic-chapter/update-comic-chapter
 *  @更新时间 2025-07-02 23:25:13
 */

export interface UpdateComicChapterRequest {
  /* 章节标题 */
  title?: string

  /* 章节副标题或描述 */
  subtitle?: string | null

  /* 发布状态（true: 已发布, false: 未发布） */
  isPublished?: boolean

  /* 关联的漫画ID */
  comicId?: number

  /* 章节序号（用于排序） */
  chapterNumber?: number

  /* 排序权重（用于精确控制显示顺序） */
  sortOrder?: number

  /* 查看规则（0: 公开, 1: 登录, 2: 会员, 3: 购买） */
  readRule?: number

  /* 购买需要消耗的金额（分为单位） */
  purchaseAmount?: number

  /* 漫画内容（JSON格式存储图片URL数组） */
  contents?: string

  /* 是否为试读章节 */
  isPreview?: boolean

  /* 发布时间 */
  publishAt?: string | null

  /* 章节缩略图 */
  thumbnail?: string | null

  /* 管理员备注 */
  remark?: string | null

  /* 主键id */
  id: number
}

/*  */
export type UpdateComicChapterResponse = {
  /* 主键id */
  id: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [批量更新章节发布状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-316377109)
 *  @标签 漫画章节管理模块/批量更新章节发布状态
 *  @方式 POST
 *  @地址 /api/admin/work/comic-chapter/batch-update-chapter-publish-status
 *  @更新时间 2025-07-02 23:25:13
 */

export interface BatchUpdateChapterPublishStatusRequest {
  /* 章节ID列表 */
  ids: number[]

  /* 发布状态（true: 发布, false: 取消发布） */
  isPublished: boolean
}

/*  */
export type BatchUpdateChapterPublishStatusResponse = {
  /* 操作成功的数据数量 */
  count: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [批量软删除章节](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-316377112)
 *  @标签 漫画章节管理模块/批量软删除章节
 *  @方式 POST
 *  @地址 /api/admin/work/comic-chapter/batch-delete-comic-chapter
 *  @更新时间 2025-07-02 23:25:13
 */

export interface BatchDeleteComicChapterRequest {
  /* 批量操作的 ID 数组 */
  ids: number[]

  /* 启用或者禁用 */
  isEnabled: boolean
}

/*  */
export type BatchDeleteComicChapterResponse = {
  /* 操作成功的数据数量 */
  count: number

  /** 任意合法数值 */
  [property: string]: any
}

/**
 *  接口 [获取指定漫画的章节列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-316377114)
 *  @标签 漫画章节管理模块/获取指定漫画的章节列表
 *  @方式 GET
 *  @地址 /api/admin/work/comic-chapter/chapters-by-comic
 *  @更新时间 2025-07-02 23:25:13
 */

/*  */
export type ChaptersByComicResponse = any
