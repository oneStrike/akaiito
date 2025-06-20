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

/// 通知发布状态枚举
export enum NoticeStatusEnum {
  /** 未发布 */
  UNPUBLISHED = 0,
  /** 已发布 */
  PUBLISHED = 1,
  /** 已下线 */
  OFFLINE = 2,
}
