/**
 * 解析查询字符串，将其转换为对象
 * @param str 查询字符串
 * @returns 解析后的对象
 */
export function parseQuery(str: string) {
  // 将查询字符串按照 '?' 进行分割
  const query = str.split('?')

  // 如果只有一个元素，说明没有查询字符串，直接返回空字符串
  if (query.length === 1)
    return ''

  let queryStr = ''

  // 如果分割后的数组长度大于2，说明有多个查询参数
  if (query.length > 2) {
    // 遍历数组
    query.forEach((item, index) => {
      // 将非第一个元素拼接到 queryStr 中，并添加 '&'
      index !== 0 && (queryStr += `${item}&`)
    })

    // 去除最后一个多余的 '&'
    queryStr = queryStr.slice(0, queryStr.length - 1)
  }
  else {
    // 如果只有两个元素，说明只有一个查询参数，直接将其赋值给 queryStr
    queryStr = query[1]
  }

  // 创建一个空对象，用于存储解析后的查询参数
  const queryObj: Record<string, any> = {}

  // 将查询参数字符串按照 '&' 进行分割
  queryStr.split('&').forEach((item) => {
    // 将每个查询参数按照 '=' 进行分割，并将其存储到 queryObj 中
    const parseStr = item.split('=')
    queryObj[parseStr[0]] = parseStr[1]
  })

  // 返回解析后的对象
  return queryObj
}
