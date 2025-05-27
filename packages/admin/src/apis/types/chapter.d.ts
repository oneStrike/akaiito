/**
 *  接口 [获取章节详情](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-242072801)
 *  @标签 漫画/章节/获取章节详情
 *  @方式 GET
 *  @地址 /admin/comic/chapter/getChapter
 *  @更新时间 2025-05-10 19:01:03
 */

export interface GetChapterTypesReq {
  /* 主键id */
  id?: number
}

export interface GetChapterTypesRes {
  /* 主键id */
  id: number

  /* 章节标题 */
  title: string

  /* 是否发布 */
  isPublish?: boolean

  /* 关联的漫画id */
  comicId?: number

  /* 关联的小说 */
  novelId?: number

  /* 排序 */
  order?: number

  /* 查看规则 0 公开  1登录 2会员 3购买 */
  viewRule: number

  /* 购买需要消耗的金额 */
  purchaseAmount?: number

  /* 备注 */
  remark?: string

  /* 创建时间 */
  createdAt: string

  /*  更新时间 */
  updatedAt: string
}

/**
 *  接口 [获取章节分页数据](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-294162257)
 *  @标签 漫画/章节/获取章节分页数据
 *  @方式 GET
 *  @地址 /admin/comic/chapter/getChapterPage
 *  @更新时间 2025-05-10 19:00:48
 */

export interface GetChapterPageTypesReq {
  /* 漫画id */
  comicId?: number
}

export interface GetChapterPageTypesRes {
  list: {
    /* 主键id */
    id: number

    /* 章节标题 */
    title: string

    /* 是否发布 */
    isPublish?: boolean

    /* 关联的漫画id */
    comicId?: number

    /* 关联的小说 */
    novelId?: number

    /* 排序 */
    order?: number

    /* 查看规则 0 公开  1登录 2会员 3购买 */
    viewRule: number

    /* 购买需要消耗的金额 */
    purchaseAmount?: number

    /* 备注 */
    remark?: string

    /* 创建时间 */
    createdAt: string

    /*  更新时间 */
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
 *  接口 [添加作品章节](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-242070794)
 *  @标签 漫画/章节/添加作品章节
 *  @方式 POST
 *  @地址 /admin/comic/chapter/createChapter
 *  @更新时间 2025-05-10 01:06:35
 */

export interface CreateChapterTypesReq {
  /* 章节标题 */
  title: string

  /* 关联的漫画id */
  comicId?: number

  /* 关联的小说 */
  novelId?: number

  /* 排序 */
  order?: number

  /* 查看规则 0 公开  1登录 2会员 3购买 */
  viewRule: number

  /* 购买需要消耗的金额 */
  purchaseAmount?: number

  /* 备注 */
  remark?: string
}

export interface CreateChapterTypesRes {
  /* 主键id */
  id: number
}

/**
 *  接口 [更新章节](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-242073428)
 *  @标签 漫画/章节/更新章节
 *  @方式 POST
 *  @地址 /admin/comic/chapter/updateChapter
 *  @更新时间 2025-05-10 01:06:42
 */

export interface UpdateChapterTypesReq {
  /* 主键id */
  id: number

  /* 章节标题 */
  title: string

  /* 关联的漫画id */
  comicId?: number

  /* 关联的小说 */
  novelId?: number

  /* 排序 */
  order?: number

  /* 查看规则 0 公开  1登录 2会员 3购买 */
  viewRule: number

  /* 购买需要消耗的金额 */
  purchaseAmount?: number

  /* 备注 */
  remark?: string
}

export interface UpdateChapterTypesRes {
  /* 主键id */
  id: string
}

/**
 *  接口 [更新作品发布状态](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-242074231)
 *  @标签 漫画/章节/更新作品发布状态
 *  @方式 POST
 *  @地址 /admin/comic/chapter/updateChapterPublish
 *  @更新时间 2025-05-10 01:06:49
 */

export interface UpdateChapterPublishTypesReq {
  /* 主键id */
  id: number

  /* 是否发布 */
  isPublish?: boolean

  /* 排序 */
  order?: number

  /* 备注 */
  remark?: string
}

export interface UpdateChapterPublishTypesRes {
  /* 主键id */
  id: number
}

/**
 *  接口 [删除章节](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-242074973)
 *  @标签 漫画/章节/删除章节
 *  @方式 POST
 *  @地址 /admin/comic/chapter/deleteChapter
 *  @更新时间 2025-05-10 01:06:55
 */

export interface DeleteChapterTypesReq {
  /* 主键id */
  id: number
}

export interface DeleteChapterTypesRes {
  /* 主键id */
  id: number
}

/**
 *  接口 [调整章节排序](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-242075018)
 *  @标签 漫画/章节/调整章节排序
 *  @方式 POST
 *  @地址 /admin/comic/chapter/updateChapterOrder
 *  @更新时间 2025-05-10 01:07:03
 */

export interface UpdateChapterOrderTypesReq {
  /* 目标id */
  targetId: number

  /* 目标现有排序 */
  targetOrder: number

  /* 更新源id */
  originId: number

  /* 更新源现有排序 */
  originOrder: number
}

export interface UpdateChapterOrderTypesRes {
  /* 主键id */
  id: number
}

/**
 *  接口 [获取漫画内容分页](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-243053782)
 *  @标签 内容/获取漫画内容分页
 *  @方式 GET
 *  @地址 /admin/comic/chapter/getComicChapterContent
 *  @更新时间 2025-05-25 22:19:25
 */

export interface GetComicChapterContentTypesReq {
  /* 章节id */
  id?: number

  /* 漫画id */
  comicId?: number
}

/*  */
export type GetComicChapterContentTypesRes = {
  /* 主键id */
  id: number

  /* 图片链接 */
  url: string
}[]

/**
 *  接口 [创建漫画内容](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-243052051)
 *  @标签 内容/创建漫画内容
 *  @方式 POST
 *  @地址 /admin/comic/chapter/createComicChapterContent
 *  @更新时间 2025-05-25 22:38:45
 */

export interface CreateComicChapterContentTypesReq {
  /* 图片链接 */
  url: string
}

export interface CreateComicChapterContentTypesRes {
  /* 主键id */
  id: number
}

/**
 *  接口 [删除漫画内容](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-243052599)
 *  @标签 内容/删除漫画内容
 *  @方式 POST
 *  @地址 /admin/comic/chapter/deleteComicChapterContent
 *  @更新时间 2025-05-27 22:06:04
 */

export interface DeleteComicChapterContentTypesReq {
  /* 章节id */
  chapterId: number

  /* 内容id */
  ids: number[]
}

export interface DeleteComicChapterContentTypesRes {
  /* 主键id */
  id: number

  /* 章节id */
  chapterId: number
}

/**
 *  接口 [漫画内容排序](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-243053439)
 *  @标签 内容/漫画内容排序
 *  @方式 POST
 *  @地址 /admin/comic/chapter/updateComicChapterContentOrder
 *  @更新时间 2025-05-25 22:33:40
 */

export interface UpdateComicChapterContentOrderTypesReq {
  /* 章节id */
  id: number

  /* 原内容id */
  originId: number

  /*  */
  targetId: number
}

export interface UpdateComicChapterContentOrderTypesRes {
  /* 主键id */
  id: string
}

/**
 *  接口 [清空章节内容](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-243396531)
 *  @标签 内容/清空章节内容
 *  @方式 POST
 *  @地址 /admin/comic/chapter/clearComicChapterContent
 *  @更新时间 2025-05-25 23:25:42
 */

export interface ClearComicChapterContentTypesReq {
  /* 章节的主键id */
  id: number
}

export interface ClearComicChapterContentTypesRes {
  /* 章节id */
  id: string
}
