/**
 * 检查给定的值是否在字符串枚举中存在
 * @param value 要检查的值
 * @param enumObject 枚举对象
 * @returns 如果值存在于枚举中，则返回true；否则返回false
 */
export const isValueInStringEnum = <T extends Record<keyof T, string>>(
  value: any,
  enumObject: T extends Record<keyof T, string> ? T : never
): value is T[keyof T] => {
  return Object.values(enumObject).includes(value)
}
