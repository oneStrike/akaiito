/**
 *  接口 [漫画分页数据](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-239558086)
 *  @标签 /漫画分页数据
 *  @方式 GET
 *  @地址 /admin/comic/getComicPage
 *  @更新时间 2024-12-01 13:21:10
 */

export interface GetComicPageTypesReq {
  /* 漫画名称 */
  name?: string

  /* 作者id */
  authorId?: number

  /* 分类id，多id利用 , 分割 */
  categoryId?: string

  /* 是否完结 1完结 0连载 */
  isFinished?: number

  /* 是否发布 1发布 0下架 */
  isPublish?: number
}

export interface GetComicPageTypesRes {
  list: {
    /* 主键id */
    id: number

    /* 漫画名称 */
    name: string

    /* 漫画封面 */
    cover: string

    /* 热度 */
    popularity: number

    /* 辅助热度 */
    virtualPopularity?: number

    /* 作者信息 */
    author: {
      /* 作者id */
      id: number

      /* 作者名字 */
      name: string
    }

    /* 内容年龄分级 */
    ageRating: string

    /* 分类 */
    categories: {
      /* 分类名称 */
      name: string

      /* 分类主键id */
      id: number
    }[]

    /* 是否发布 1：发布 0：不发布 */
    isPublish: number

    /* 最后更新时间 */
    lastUpdated: string | null

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
 *  接口 [获取漫画详情](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-239560818)
 *  @标签 /获取漫画详情
 *  @方式 GET
 *  @地址 /admin/comic/getComicDetail
 *  @更新时间 2024-12-01 01:37:45
 */

export interface GetComicDetailTypesReq {
  /* 主键id */
  id: number
}

export interface GetComicDetailTypesRes {
  /* 主键id */
  id: number

  /* 漫画名称 */
  name: string

  /* 漫画别名 */
  alias: string

  /* 漫画封面 */
  cover: string

  /* 热度 */
  popularity: number

  /* 辅助热度 */
  virtualPopularity?: number

  /* 作者信息 */
  author: {
    /* 作者id */
    id: number

    /* 作者名字 */
    name: string
  }

  /* 区域 */
  region: string

  /* 语言，数据字典language */
  language: string

  /* 内容年龄分级 */
  ageRating: string

  /* 分类 */
  categories: {
    /* 分类名称 */
    name: string

    /* 分类主键id */
    id: number
  }[]

  /* 是否发布 1：发布 0：不发布 */
  isPublish: number

  /* 作品发布日期 */
  publishAt: string

  /* 最后更新时间 */
  lastUpdated: string | null

  /* 作品描述 */
  description: string

  /* 出版社 */
  publisher: string

  /* 章节数量 */
  chapterCount: number

  /* 是否完结，1完结0连载 */
  isFinished: number

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string
}

/**
 *  接口 [创建漫画](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-239514784)
 *  @标签 /创建漫画
 *  @方式 POST
 *  @地址 /admin/comic/createComic
 *  @更新时间 2024-12-02 13:38:21
 */

export interface CreateComicTypesReq {
  /* 作者主键id */
  authorId: number

  /*  */
  categoryIds: number[]
  /* 漫画名称 */
  name: string

  /* 漫画别名 */
  alias: string

  /* 漫画封面 */
  cover: string

  /* 辅助热度 */
  virtualPopularity?: number

  /* 区域 */
  region: string

  /* 语言，数据字典language */
  language: string

  /* 内容年龄分级 */
  ageRating: string

  /* 是否发布 1：发布 0：不发布 */
  isPublish: number

  /* 作品发布日期 */
  publishAt: string

  /* 作品描述 */
  description: string

  /* 出版社 */
  publisher: string

  /* 是否完结，1完结0连载 */
  isFinished: number
}

export interface CreateComicTypesRes {
  /* 主键id */
  id: number
}

/**
 *  接口 [更新漫画](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-239783870)
 *  @标签 /更新漫画
 *  @方式 POST
 *  @地址 /admin/comic/updateComic
 *  @更新时间 2024-12-02 13:38:21
 */

export interface UpdateComicTypesReq {
  /* 作者id */
  authorId: number

  /* 分类主键 */
  categoryIds: number[]
  /* 主键id */
  id: number

  /* 漫画名称 */
  name: string

  /* 漫画别名 */
  alias: string

  /* 漫画封面 */
  cover: string

  /* 辅助热度 */
  virtualPopularity?: number

  /* 区域 */
  region: string

  /* 语言，数据字典language */
  language: string

  /* 内容年龄分级 */
  ageRating: string

  /* 作品发布日期 */
  publishAt: string

  /* 作品描述 */
  description: string

  /* 出版社 */
  publisher: string

  /* 是否完结，1完结0连载 */
  isFinished: number
}

/*  */
export type UpdateComicTypesRes = any

/**
 *  接口 [上架或下架](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-240038799)
 *  @标签 /上架或下架
 *  @方式 POST
 *  @地址 /admin/comic/updateComicPublish
 *  @更新时间 2024-12-02 19:17:04
 */

export interface UpdateComicPublishTypesReq {
  /* 主键id */
  id: number

  /* 内容年龄分级 */
  ageRating: string

  /* 是否发布 1：发布 0：不发布 */
  isPublish: number
}

export interface UpdateComicPublishTypesRes {
  /* 主键id */
  id: number
}

/**
 *  接口 [删除漫画](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-240039189)
 *  @标签 /删除漫画
 *  @方式 POST
 *  @地址 /admin/comic/deleteComic
 *  @更新时间 2024-12-02 19:18:36
 */

export interface DeleteComicTypesReq {
  /* 主键id */
  id: number
}

export interface DeleteComicTypesRes {
  /* 主键id */
  id: number
}
