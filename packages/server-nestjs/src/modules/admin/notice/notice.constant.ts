/**
 * 通知模块常量定义
 * 包含通知类型、状态、优先级等枚举常量
 */

/**
 * 通知类型枚举
 */
export enum NoticeTypeEnum {
  /** 系统通知 */
  SYSTEM = 1,
  /** 活动公告 */
  ACTIVITY = 2,
  /** 维护通知 */
  MAINTENANCE = 3,
  /** 更新公告 */
  UPDATE = 4,
}

/**
 * 通知类型描述映射
 */
export const NoticeTypeMap = {
  [NoticeTypeEnum.SYSTEM]: '系统通知',
  [NoticeTypeEnum.ACTIVITY]: '活动公告',
  [NoticeTypeEnum.MAINTENANCE]: '维护通知',
  [NoticeTypeEnum.UPDATE]: '更新公告',
} as const

/**
 * 通知优先级枚举
 */
export enum NoticePriorityEnum {
  /** 低优先级 */
  LOW = 1,
  /** 中等优先级 */
  MEDIUM = 2,
  /** 高优先级 */
  HIGH = 3,
  /** 紧急 */
  URGENT = 4,
}

/**
 * 通知优先级描述映射
 */
export const NoticePriorityMap = {
  [NoticePriorityEnum.LOW]: '低',
  [NoticePriorityEnum.MEDIUM]: '中',
  [NoticePriorityEnum.HIGH]: '高',
  [NoticePriorityEnum.URGENT]: '紧急',
} as const

/**
 * 通知状态枚举
 */
export enum NoticeStatusEnum {
  /** 未发布 */
  UNPUBLISHED = 0,
  /** 已发布 */
  PUBLISHED = 1,
  /** 已下线 */
  OFFLINE = 2,
}

/**
 * 通知状态描述映射
 */
export const NoticeStatusMap = {
  [NoticeStatusEnum.UNPUBLISHED]: '未发布',
  [NoticeStatusEnum.PUBLISHED]: '已发布',
  [NoticeStatusEnum.OFFLINE]: '已下线',
} as const

/**
 * 平台类型枚举
 */
export enum PlatformEnum {
  /** 小程序 */
  APPLET = 'applet',
  /** H5网页 */
  WEB = 'web',
  /** 移动应用 */
  APP = 'app',
}

/**
 * 平台类型描述映射
 */
export const PlatformMap = {
  [PlatformEnum.APPLET]: '小程序',
  [PlatformEnum.WEB]: 'H5网页',
  [PlatformEnum.APP]: '移动应用',
} as const
