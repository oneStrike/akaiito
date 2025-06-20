/**
 *  接口 [创建通知消息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-310928720)
 *  @标签 客户端通知模块/创建通知消息
 *  @方式 POST
 *  @地址 /api/admin/notice/create
 *  @更新时间 2025-06-20 21:27:53
 */

export interface CreateTypesReq {
  /* 通知标题 */
  title: string

  /* 通知内容详情 */
  content: string

  /* 通知类型 */
  type: number

  /* 优先级 */
  priority: number

  /* 发布开始时间 */
  startTime?: string

  /* 发布结束时间 */
  endTime?: string

  /* 关联页面代码 */
  pageCode?: string | null

  /* 通知弹窗背景图片URL */
  backgroundImage?: string | null

  /* 发布状态 */
  status: number

  /* 是否启用小程序 */
  enableApplet: boolean

  /* 是否启用H5 */
  enableWeb: boolean

  /* 是否启用APP */
  enableApp: boolean

  /* 是否置顶 */
  isTop?: boolean

  /* 是否弹窗显示 */
  isPopup?: boolean

  /* 排序权重（数值越大越靠前） */
  sortOrder?: number
}

/*  */
export type CreateTypesRes = {
  /* 主键id */
  id: number
}

/**
 *  接口 [分页查询通知列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-310928721)
 *  @标签 客户端通知模块/分页查询通知列表
 *  @方式 GET
 *  @地址 /api/admin/notice/page
 *  @更新时间 2025-06-20 21:27:53
 */

export interface PageTypesReq {
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

  /* 通知标题 */
  title?: string

  /* 通知类型 */
  type?: number

  /* 优先级 */
  priority?: number

  /* 发布状态 */
  status?: number

  /* 是否置顶 */
  isTop?: boolean
}

export interface PageTypesRes {
  /* 当前页码 */
  pageIndex: number

  /* 每页条数 */
  pageSize: number

  /* 总条数 */
  total: number
  list: {
    /* 通知ID */
    id: number

    /* 通知标题 */
    title: string

    /* 通知类型 */
    type: number

    /* 优先级 */
    priority: number

    /* 发布开始时间 */
    startTime?: string

    /* 发布结束时间 */
    endTime?: string

    /* 关联页面代码 */
    pageCode?: string | null

    /* 通知弹窗背景图片URL */
    backgroundImage?: string | null

    /* 发布状态 */
    status: number

    /* 是否启用小程序 */
    enableApplet: boolean

    /* 是否启用H5 */
    enableWeb: boolean

    /* 是否启用APP */
    enableApp: boolean

    /* 是否置顶 */
    isTop?: boolean

    /* 是否弹窗显示 */
    isPopup?: boolean

    /* 排序权重（数值越大越靠前） */
    sortOrder?: number

    /* 阅读次数 */
    viewCount?: number

    /* 创建时间 */
    createdAt: string

    /* 更新时间 */
    updatedAt: string
  }[]
}

/**
 *  接口 [根据ID查询通知详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-310928722)
 *  @标签 客户端通知模块/根据ID查询通知详情
 *  @方式 GET
 *  @地址 /api/admin/notice/detail
 *  @更新时间 2025-06-20 21:27:53
 */

/*  */
export type DetailTypesRes = {
  /* 通知ID */
  id: number

  /* 通知标题 */
  title: string

  /* 通知内容详情 */
  content: string

  /* 通知类型 */
  type: number

  /* 优先级 */
  priority: number

  /* 发布开始时间 */
  startTime?: string

  /* 发布结束时间 */
  endTime?: string

  /* 关联页面代码 */
  pageCode?: string | null

  /* 通知弹窗背景图片URL */
  backgroundImage?: string | null

  /* 发布状态 */
  status: number

  /* 是否启用小程序 */
  enableApplet: boolean

  /* 是否启用H5 */
  enableWeb: boolean

  /* 是否启用APP */
  enableApp: boolean

  /* 是否置顶 */
  isTop?: boolean

  /* 是否弹窗显示 */
  isPopup?: boolean

  /* 排序权重（数值越大越靠前） */
  sortOrder?: number

  /* 阅读次数 */
  viewCount?: number

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string
}

/**
 *  接口 [更新通知消息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-310928723)
 *  @标签 客户端通知模块/更新通知消息
 *  @方式 POST
 *  @地址 /api/admin/notice/update
 *  @更新时间 2025-06-20 21:27:53
 */

export interface UpdateTypesReq {
  /* 通知ID */
  id: number

  /* 通知标题 */
  title: string

  /* 通知内容详情 */
  content: string

  /* 通知类型 */
  type: number

  /* 优先级 */
  priority: number

  /* 发布开始时间 */
  startTime?: string

  /* 发布结束时间 */
  endTime?: string

  /* 关联页面代码 */
  pageCode?: string | null

  /* 通知弹窗背景图片URL */
  backgroundImage?: string | null

  /* 发布状态 */
  status: number

  /* 是否启用小程序 */
  enableApplet: boolean

  /* 是否启用H5 */
  enableWeb: boolean

  /* 是否启用APP */
  enableApp: boolean

  /* 是否置顶 */
  isTop?: boolean

  /* 是否弹窗显示 */
  isPopup?: boolean

  /* 排序权重（数值越大越靠前） */
  sortOrder?: number
}

/*  */
export type UpdateTypesRes = {
  /* 主键id */
  id: number
}

/**
 *  接口 [更新通知状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-310928724)
 *  @标签 客户端通知模块/更新通知状态
 *  @方式 POST
 *  @地址 /api/admin/notice/updateStatus
 *  @更新时间 2025-06-20 21:27:53
 */

export interface UpdateStatusTypesReq {
  /* 发布状态 */
  status: number

  /* 通知ID列表 */
  ids: number[]
}

/*  */
export type UpdateStatusTypesRes = {
  /* 主键id */
  ids: number[]
}

/**
 *  接口 [批量删除通知](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-310928725)
 *  @标签 客户端通知模块/批量删除通知
 *  @方式 POST
 *  @地址 /api/admin/notice/batchDelete
 *  @更新时间 2025-06-20 21:27:53
 */

export interface BatchDeleteTypesReq {
  /* 主键id */
  ids: number[]
}

/*  */
export type BatchDeleteTypesRes = {
  /* 主键id */
  ids: number[]
}
