import { EnumLike } from './types'

/**
 * 检测枚举是否为数字枚举
 * @param enumObject 枚举对象
 * @returns 是否为数字枚举
 */
export function isNumberEnum(enumObject: EnumLike): boolean {
  const values = Object.values(enumObject)

  // 空对象不是有效的数字枚举
  if (values.length === 0) {
    return false
  }

  // 过滤出数字值，确保所有值都是数字类型
  const numberValues = values.filter((value) => typeof value === 'number')

  // 对于数字枚举，数字值的数量应该等于总值数量的一半（因为TypeScript数字枚举会生成双向映射）
  // 或者所有值都是数字（对于手动定义的枚举对象）
  return (
    numberValues.length > 0 &&
    (numberValues.length === values.length ||
      numberValues.length * 2 === values.length)
  )
}
