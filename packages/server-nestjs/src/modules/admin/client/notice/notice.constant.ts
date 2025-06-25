/// 通知类型枚举
export enum NoticeTypeEnum {
  /** 系统通知 */
  SYSTEM = 0,
  /** 活动公告 */
  ACTIVITY = 1,
  /** 维护通知 */
  MAINTENANCE = 2,
  /** 更新公告 */
  UPDATE = 3,
}

/// 通知优先级枚举
export enum NoticePriorityEnum {
  /** 低优先级 */
  LOW = 0,
  /** 中等优先级 */
  MEDIUM = 1,
  /** 高优先级 */
  HIGH = 2,
  /** 紧急 */
  URGENT = 3,
}

// 启用的平台
export enum EnablePlatformEnum {
  /** H5 */
  H5 = 1,
  /** APP */
  APP = 2,
  /** 小程序 */
  MINI_PROGRAM = 4,
}
