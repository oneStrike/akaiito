/**
 *  接口 [创建通知消息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090642)
 *  @标签 客户端通知模块/创建通知消息
 *  @方式 POST
 *  @地址 /api/admin/notice/create-notice
 *  @更新时间 2025-07-03 19:41:52
 */

export interface CreateNoticeRequest {
  /* 通知标题 */
  title: string

  /* 通知内容详情 */
  content: string

  /* 通知类型 */
  noticeType: number

  /* 优先级 */
  priorityLevel: number

  /* 发布开始时间 */
  publishStartTime?: string | null

  /* 发布结束时间 */
  publishEndTime?: string | null

  /* 关联页面代码 */
  pageCode?: string | null

  /* 通知弹窗背景图片URL */
  popupBackgroundImage?: string | null

  /* 启用的平台 */
  enablePlatform: number

  /* 是否置顶 */
  isPinned?: boolean | null

  /* 是否弹窗显示 */
  showAsPopup?: boolean | null

  /* 排序权重（数值越大越靠前） */
  order?: number | null

  /* 通知所关联的客户端页面信息 */
  clientPage: {
    /* 主键id */
    id: number

    /* 页面编码（唯一标识） */
    pageCode: string

    /* 页面路径（URL路径） */
    pagePath: string

    /* 页面名称 */
    pageName: string
  }
}

/*  */
export type CreateNoticeResponse = {
  /* 主键id */
  id: number
}

/**
 *  接口 [分页查询通知列表](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090643)
 *  @标签 客户端通知模块/分页查询通知列表
 *  @方式 GET
 *  @地址 /api/admin/notice/notice-page
 *  @更新时间 2025-07-03 19:41:52
 */

export interface NoticePageRequest {
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
  noticeType?: number

  /* 优先级 */
  priorityLevel?: number

  /* 是否发布 */
  isPublished?: boolean

  /* 是否置顶 */
  isPinned?: boolean

  /* 是否弹窗显示 */
  showAsPopup?: boolean
}

export interface NoticePageResponse {
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
    noticeType: number

    /* 优先级 */
    priorityLevel: number

    /* 发布开始时间 */
    publishStartTime?: string | null

    /* 发布结束时间 */
    publishEndTime?: string | null

    /* 关联页面代码 */
    pageCode?: string | null

    /* 通知弹窗背景图片URL */
    popupBackgroundImage?: string | null

    /* 是否发布 */
    isPublished: boolean

    /* 启用的平台 */
    enablePlatform: number

    /* 是否置顶 */
    isPinned?: boolean | null

    /* 是否弹窗显示 */
    showAsPopup?: boolean | null

    /* 排序权重（数值越大越靠前） */
    order?: number | null

    /* 阅读次数 */
    readCount?: number | null

    /* 创建时间 */
    createdAt: string

    /* 更新时间 */
    updatedAt: string

    /* 通知所关联的客户端页面信息 */
    clientPage: {
      /* 主键id */
      id: number

      /* 页面编码（唯一标识） */
      pageCode: string

      /* 页面路径（URL路径） */
      pagePath: string

      /* 页面名称 */
      pageName: string
    }
  }[]
}

/**
 *  接口 [根据ID查询通知详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090644)
 *  @标签 客户端通知模块/根据ID查询通知详情
 *  @方式 GET
 *  @地址 /api/admin/notice/notice-detail
 *  @更新时间 2025-07-03 19:41:52
 */

export interface NoticeDetailRequest {
  /* 主键id */
  id: number
}

/*  */
export type NoticeDetailResponse = {
  /* 通知ID */
  id: number

  /* 通知标题 */
  title: string

  /* 通知内容详情 */
  content: string

  /* 通知类型 */
  noticeType: number

  /* 优先级 */
  priorityLevel: number

  /* 发布开始时间 */
  publishStartTime?: string | null

  /* 发布结束时间 */
  publishEndTime?: string | null

  /* 关联页面代码 */
  pageCode?: string | null

  /* 通知弹窗背景图片URL */
  popupBackgroundImage?: string | null

  /* 是否发布 */
  isPublished: boolean

  /* 启用的平台 */
  enablePlatform: number

  /* 是否置顶 */
  isPinned?: boolean | null

  /* 是否弹窗显示 */
  showAsPopup?: boolean | null

  /* 排序权重（数值越大越靠前） */
  order?: number | null

  /* 阅读次数 */
  readCount?: number | null

  /* 创建时间 */
  createdAt: string

  /* 更新时间 */
  updatedAt: string

  /* 通知所关联的客户端页面信息 */
  clientPage: {
    /* 主键id */
    id: number

    /* 页面编码（唯一标识） */
    pageCode: string

    /* 页面路径（URL路径） */
    pagePath: string

    /* 页面名称 */
    pageName: string
  }
}

/**
 *  接口 [更新通知消息](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090645)
 *  @标签 客户端通知模块/更新通知消息
 *  @方式 POST
 *  @地址 /api/admin/notice/update-notice
 *  @更新时间 2025-07-03 19:41:52
 */

export interface UpdateNoticeRequest {
  /* 通知标题 */
  title?: string

  /* 通知内容详情 */
  content?: string

  /* 通知类型 */
  noticeType?: number

  /* 优先级 */
  priorityLevel?: number

  /* 发布开始时间 */
  publishStartTime?: string | null

  /* 发布结束时间 */
  publishEndTime?: string | null

  /* 关联页面代码 */
  pageCode?: string | null

  /* 通知弹窗背景图片URL */
  popupBackgroundImage?: string | null

  /* 启用的平台 */
  enablePlatform?: number

  /* 是否置顶 */
  isPinned?: boolean | null

  /* 是否弹窗显示 */
  showAsPopup?: boolean | null

  /* 排序权重（数值越大越靠前） */
  order?: number | null

  /* 通知所关联的客户端页面信息 */
  clientPage?: {
    /* 主键id */
    id: number

    /* 页面编码（唯一标识） */
    pageCode: string

    /* 页面路径（URL路径） */
    pagePath: string

    /* 页面名称 */
    pageName: string
  }

  /* 主键id */
  id: number
}

/*  */
export type UpdateNoticeResponse = {
  /* 主键id */
  id: number
}

/**
 *  接口 [批量更新通知状态](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090646)
 *  @标签 客户端通知模块/批量更新通知状态
 *  @方式 POST
 *  @地址 /api/admin/notice/batch-update-notice-status
 *  @更新时间 2025-07-03 19:41:52
 */

export interface BatchUpdateNoticeStatusRequest {
  /* 是否发布 */
  isPublished: boolean

  /* 通知ID列表 */
  ids: number[]
}

/*  */
export type BatchUpdateNoticeStatusResponse = {
  /* 操作成功的数据数量 */
  count: number
}

/**
 *  接口 [批量删除通知](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-315090647)
 *  @标签 客户端通知模块/批量删除通知
 *  @方式 POST
 *  @地址 /api/admin/notice/batch-delete-notice
 *  @更新时间 2025-07-03 19:41:52
 */

export interface BatchDeleteNoticeRequest {
  /* 主键id */
  ids: number[]
}

/*  */
export type BatchDeleteNoticeResponse = {
  /* 操作成功的数据数量 */
  count: number
}
