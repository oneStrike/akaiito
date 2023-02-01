/**
 * 解析url参数
 * @param str url
 */
export default (str: string) => {
  const query = str.split('?')
  if (query.length === 1) return ''
  let queryStr = ''
  if (query.length > 2) {
    query.forEach((item, index) => {
      index !== 0 && (queryStr += item + '&')
    })
    queryStr = queryStr.slice(0, queryStr.length - 1)
  } else {
    queryStr = query[1]
  }
  const queryObj: Record<string, any> = {}
  queryStr.split('&').forEach((item) => {
    const parseStr = item.split('=')
    queryObj[parseStr[0]] = parseStr[1]
  })
  return queryObj
}
