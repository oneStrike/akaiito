import { formatDate } from '../utils/formatDate'

/**
 * 根据给定的选项查找数据。
 * @param context - 上下文对象。
 * @param options - 选项对象。
 * @param timeSerialize - 是否序列化时间的布尔值。
 * @returns 返回一个解析为结果的 Promise。
 */
export const find = async <T>(
  context: any,
  options: any,
  timeSerialize: boolean
): Promise<T> => {
  // 删除在上下文字段中不存在的 orderBy 键
  if (options.orderBy) {
    const fields = Object.keys(context.fields)
    for (const orderByKey in options.orderBy) {
      if (!fields.includes(orderByKey)) {
        delete options.orderBy[orderByKey]
      }
    }
  }

  if (!options.orderBy) delete options.orderBy
  // 根据选项查找数据
  const result = await context.findMany(options)
  // 如果 timeSerialize 为 true，则序列化时间
  if (timeSerialize) {
    for (const item of result) {
      for (const itemKey in item) {
        if (item[itemKey] instanceof Date) {
          item[itemKey] = formatDate(item[itemKey])
        }
      }
    }
  }

  return result
}

export const findOne = async <T>(
  context: any,
  options: any,
  timeSerialize: boolean
): Promise<T> => {
  // 根据选项查找数据
  const result = await context.findUnique(options)
  if (timeSerialize) {
    for (const resultKey in result) {
      const item = result[resultKey]
      if (item instanceof Date && timeSerialize) {
        result[resultKey] = formatDate(item)
      }
    }
  }

  return result
}
