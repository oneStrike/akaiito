/**
 * 漫画版本模块常量定义
 */

/// 版本查看规则枚举
export enum VersionReadRuleEnum {
  /** 所有人 */
  PUBLIC = 0,
  /** 登录用户 */
  LOGIN = 1,
  /** 会员 */
  VIP = 2,
  /** 积分购买 */
  PURCHASE = 3,
}
