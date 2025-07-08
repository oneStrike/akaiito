/**
 * 漫画模块常量定义
 */

/// 漫画发布状态枚举
export enum ComicPublishStatusEnum {
  /** 草稿 */
  DRAFT = 0,
  /** 已发布 */
  PUBLISHED = 1,
  /** 已下架 */
  UNPUBLISHED = 2,
  /** 审核中 */
  REVIEWING = 3,
  /** 审核失败 */
  REVIEW_FAILED = 4,
}

/// 漫画连载状态枚举
export enum ComicSerialStatusEnum {
  /** 连载中 */
  SERIALIZING = 0,
  /** 已完结 */
  COMPLETED = 1,
  /** 暂停连载 */
  PAUSED = 2,
  /** 已停更 */
  DISCONTINUED = 3,
}

/// 漫画阅读规则枚举
export enum ComicReadRuleEnum {
  /** 免费阅读 */
  FREE = 0,
  /** 登录阅读 */
  PAID = 1,
  /** VIP阅读 */
  VIP = 2,
  /** 积分阅读 */
  POINTS = 3,
}

/// 漫画下载权限枚举
export enum ComicDownloadPermissionEnum {
  /** 禁止下载 */
  FORBIDDEN = 0,
  /** 允许下载 */
  ALLOWED = 1,
  /** VIP可下载 */
  VIP_ONLY = 2,
}

/// 漫画评论权限枚举
export enum ComicCommentPermissionEnum {
  /** 禁止评论 */
  FORBIDDEN = 0,
  /** 允许评论 */
  ALLOWED = 1,
  /** 登录后评论 */
  LOGIN_REQUIRED = 2,
  /** VIP可评论 */
  VIP_ONLY = 3,
}
