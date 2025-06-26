/**
 * 检测枚举是否为数字枚举
 * @param enumObject 枚举对象
 * @returns 是否为数字枚举
 */
export function isNumberEnum(
  enumObject: Record<string, string | number>,
): boolean {
  const values = Object.values(enumObject)
  return values.some((value) => typeof value === 'number')
}
