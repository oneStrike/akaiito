/**
 *  接口 [获取章节列表](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-242072801)
 *  @标签 漫画/章节/获取章节列表
 *  @方式 GET
 *  @地址 /admin/comic/chapter/getChapter
 *  @更新时间 2025-05-07 17:30:30
 */

export interface GetChapterTypesReq {
  /* 漫画id */
  comicId?: number
}

export interface GetChapterTypesRes {
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
 *  @地址 /admin/chapter/createChapter
 *  @更新时间 2024-12-08 16:14:29
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
}

export interface CreateChapterTypesRes {
  /* 主键id */
  id: number
}

/**
 *  接口 [更新章节](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-242073428)
 *  @标签 漫画/章节/更新章节
 *  @方式 POST
 *  @地址 /admin/chapter/updateChapter
 *  @更新时间 2024-12-08 16:40:25
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
}

export interface UpdateChapterTypesRes {
  /* 主键id */
  id: string
}

/**
 *  接口 [更新作品发布状态](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-242074231)
 *  @标签 漫画/章节/更新作品发布状态
 *  @方式 POST
 *  @地址 /admin/chapter/updateChapterPublish
 *  @更新时间 2024-12-08 16:52:45
 */

export interface UpdateChapterPublishTypesReq {
  /* 主键id */
  id: number

  /* 是否发布 */
  isPublish?: boolean

  /* 排序 */
  order?: number
}

export interface UpdateChapterPublishTypesRes {
  /* 主键id */
  id: number
}

/**
 *  接口 [删除章节](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-242074973)
 *  @标签 漫画/章节/删除章节
 *  @方式 POST
 *  @地址 /admin/chapter/deleteChapter
 *  @更新时间 2024-12-08 17:03:50
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
 *  @地址 /admin/chapter/updateChapterOrder
 *  @更新时间 2024-12-08 17:05:45
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
