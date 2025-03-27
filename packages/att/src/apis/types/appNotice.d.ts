/**
 *  接口 [获取客户端通知公告](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234287265)
 *  @标签 通知公告/获取客户端通知公告
 *  @方式 GET
 *  @地址 /admin/appNotice/getAppNoticeList
 *  @更新时间 2024-11-27 22:55:28
 */

export interface GetAppNoticeListTypesReq {
  /* 是否发布  1是  0否 */
  status: string

  /* 是否在小程序平台启用  1是  0否 */
  enableApplet: string

  /* 是否在H5平台启用  1是  0否 */
  enableWeb: string

  /* 是否APP平台启用  1是  0否 */
  enableApp: string
}

export interface GetAppNoticeListTypesRes {
  list: {
    /* 主键id */
    id: number

    /* 标题 */
    title: string

    /* 开始时间 */
    startTime: string | null

    /* 结束时间 */
    endTime: string | null

    /* 是否发布  1发布 0取消发布 */
    isPublish: boolean

    /* 是否在小程序平台启用  1启用 0禁用 */
    enableApplet: boolean

    /* 是否在H5平台启用  1启用 0禁用 */
    enableWeb: boolean

    /* 是否在APP平台启用  1启用 0禁用 */
    enableApp: boolean

    /* 跳转的页面编码 */
    pageCode: string

    /* 跳转的页面名字 */
    pageName: string

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
 *  接口 [通知公告详情](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234289150)
 *  @标签 通知公告/通知公告详情
 *  @方式 GET
 *  @地址 /admin/appNotice/getAppNoticeDetail
 *  @更新时间 2024-11-27 23:47:55
 */

export interface GetAppNoticeDetailTypesReq {
  /* 主键id */
  id?: number
}

/*  */
export type GetAppNoticeDetailTypesRes = any

/**
 *  接口 [创建通知公告](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234287295)
 *  @标签 通知公告/创建通知公告
 *  @方式 POST
 *  @地址 /admin/appNotice/createAppNotice
 *  @更新时间 2024-11-27 22:46:03
 */

export interface CreateAppNoticeTypesReq {
  /* 标题 */
  title: string

  /* 通知内容 */
  content: string

  /* 开始时间 */
  startTime: string | null

  /* 结束时间 */
  endTime: string | null

  /* 弹窗的背景图片 */
  backgroundImage: string

  /* 是否发布  1发布 0取消发布 */
  isPublish: boolean

  /* 是否在小程序平台启用  1启用 0禁用 */
  enableApplet: boolean

  /* 是否在H5平台启用  1启用 0禁用 */
  enableWeb: boolean

  /* 是否在APP平台启用  1启用 0禁用 */
  enableApp: boolean

  /* 跳转的页面编码 */
  pageCode: string

  /* 跳转的页面名字 */
  pageName: string
}

/*  */
export type CreateAppNoticeTypesRes = any

/**
 *  接口 [删除通知公告](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234289337)
 *  @标签 通知公告/删除通知公告
 *  @方式 POST
 *  @地址 /admin/appNotice/deleteAppNotice
 *  @更新时间 2024-11-27 22:46:11
 */

export interface DeleteAppNoticeTypesReq {
  /* 主键id */
  id: number
}

/* 主键id */
export type DeleteAppNoticeTypesRes = number

/**
 *  接口 [编辑通知公告](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234289369)
 *  @标签 通知公告/编辑通知公告
 *  @方式 POST
 *  @地址 /admin/appNotice/updateAppNotice
 *  @更新时间 2024-11-27 22:46:18
 */

export interface UpdateAppNoticeTypesReq {
  /* 主键id */
  id: number

  /* 标题 */
  title: string

  /* 通知内容 */
  content: string

  /* 开始时间 */
  startTime: string | null

  /* 结束时间 */
  endTime: string | null

  /* 弹窗的背景图片 */
  backgroundImage: string

  /* 是否发布  1发布 0取消发布 */
  isPublish: boolean

  /* 是否在小程序平台启用  1启用 0禁用 */
  enableApplet: boolean

  /* 是否在H5平台启用  1启用 0禁用 */
  enableWeb: boolean

  /* 是否在APP平台启用  1启用 0禁用 */
  enableApp: boolean

  /* 跳转的页面编码 */
  pageCode: string

  /* 跳转的页面名字 */
  pageName: string
}

export interface UpdateAppNoticeTypesRes {
  /* 主键id */
  id: number
}

/**
 *  接口 [调整客户端通知消息发布状态](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-238543615)
 *  @标签 通知公告/调整客户端通知消息发布状态
 *  @方式 POST
 *  @地址 /admin/appNotice/publishAppNotice
 *  @更新时间 2024-11-28 08:55:41
 */

export interface PublishAppNoticeTypesReq {
  /* 主键id */
  id: number

  /* 发布状态，1发布，0不发布 */
  publish: number
}

export interface PublishAppNoticeTypesRes {
  /* 主键id */
  id: string
}
