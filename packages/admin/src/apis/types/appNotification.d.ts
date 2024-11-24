/**
 *  接口 [获取客户端通知公告](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234287265)
 *  @标签 通知公告/获取客户端通知公告
 *  @方式 GET
 *  @地址 /admin/appNotification/getAppNotificationList
 *  @更新时间 2024-11-24 12:54:13
 */

export interface GetAppNotificationListTypesReq {
  /* 是否发布  1是  0否 */
  status: string

  /* 是否在小程序平台启用  1是  0否 */
  enableApplet: string

  /* 是否在H5平台启用  1是  0否 */
  enableWeb: string

  /* 是否APP平台启用  1是  0否 */
  enableApp: string
}

export interface GetAppNotificationListTypesRes {
  list: {
    /* 主键id */
    id: number

    /* 标题 */
    title: string

    /* 开始时间 */
    startTime: string | null

    /* 结束时间 */
    endTime: string | null

    /* 是否在小程序平台启用  1启用 0禁用 */
    enableApplet: number

    /* 是否在H5平台启用  1启用 0禁用 */
    enableWeb: number

    /* 是否在APP平台启用  1启用 0禁用 */
    enableApp: number

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
 *  @地址 /admin/appNotification/getAppNotificationDetail
 *  @更新时间 2024-11-24 12:54:26
 */

export interface GetAppNotificationDetailTypesReq {
  /* 主键id */
  id?: string
}

/*  */
export type GetAppNotificationDetailTypesRes = any

/**
 *  接口 [创建通知公告](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234287295)
 *  @标签 通知公告/创建通知公告
 *  @方式 POST
 *  @地址 /admin/appNotification/createAppNotification
 *  @更新时间 2024-11-24 12:54:36
 */

export interface CreateAppNotificationTypesReq {
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

  /* 是否在小程序平台启用  1启用 0禁用 */
  enableApplet: number

  /* 是否在H5平台启用  1启用 0禁用 */
  enableWeb: number

  /* 是否在APP平台启用  1启用 0禁用 */
  enableApp: number

  /* 跳转的页面编码 */
  pageCode: string

  /* 跳转的页面名字 */
  pageName: string
}

/*  */
export type CreateAppNotificationTypesRes = any

/**
 *  接口 [删除通知公告](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234289337)
 *  @标签 通知公告/删除通知公告
 *  @方式 POST
 *  @地址 /admin/appNotification/deleteAppNotification
 *  @更新时间 2024-11-24 12:54:47
 */

export interface DeleteAppNotificationTypesReq {
  /* 主键id */
  id: number
}

/* 主键id */
export type DeleteAppNotificationTypesRes = number

/**
 *  接口 [编辑通知公告](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-234289369)
 *  @标签 通知公告/编辑通知公告
 *  @方式 POST
 *  @地址 /admin/appNotification/updateAppNotification
 *  @更新时间 2024-11-24 12:54:59
 */

export interface UpdateAppNotificationTypesReq {
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

  /* 是否在小程序平台启用  1启用 0禁用 */
  enableApplet: number

  /* 是否在H5平台启用  1启用 0禁用 */
  enableWeb: number

  /* 是否在APP平台启用  1启用 0禁用 */
  enableApp: number

  /* 跳转的页面编码 */
  pageCode: string

  /* 跳转的页面名字 */
  pageName: string
}

export interface UpdateAppNotificationTypesRes {
  /* 主键id */
  id: number
}
