/**
 * 作者模块常量定义
 */

/// 作者身份角色枚举（位运算）
export enum AuthorRoleEnum {
  /** 作家 */
  WRITER = 1,
  /** 插画家 */
  ILLUSTRATOR = 2,
  /** 漫画家 */
  CARTOONIST = 4,
  /** 模特 */
  MODEL = 8,
}

/// 作者性别枚举
export enum AuthorGenderEnum {
  /** 未知 */
  UNKNOWN = 0,
  /** 男性 */
  MALE = 1,
  /** 女性 */
  FEMALE = 2,
  /** 其他 */
  OTHER = 3,
}
