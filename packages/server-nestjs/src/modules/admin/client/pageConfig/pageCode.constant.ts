/// 页面权限枚举
export enum PageRuleEnum {
  /** 游客 */
  GUEST = 0,
  /** 登录 */
  LOGIN = 1,
  /** 会员 */
  MEMBER = 2,
  /** 高级会员 */
  VIP = 3,
}

/// 页面状态枚举
export enum PageStatusEnum {
  /** 禁用 */
  DISABLED = 0,
  /** 启用 */
  ENABLED = 1,
  /** 开发中 */
  DEVELOPING = 2,
  /** 维护中 */
  MAINTENANCE = 3,
}
