/**
 * 漫画章节模块常量定义
 */

/// 章节查看规则枚举
export enum ChapterReadRuleEnum {
  /** 公开 */
  PUBLIC = 0,
  /** 登录 */
  LOGIN = 1,
  /** 会员 */
  VIP = 2,
  /** 购买 */
  PURCHASE = 3,
}

/// 章节发布状态枚举
export enum ChapterPublishStatusEnum {
  /** 未发布 */
  UNPUBLISHED = 0,
  /** 已发布 */
  PUBLISHED = 1,
}

/// 章节类型枚举
export enum ChapterTypeEnum {
  /** 正常章节 */
  NORMAL = 0,
  /** 试读章节 */
  PREVIEW = 1,
}