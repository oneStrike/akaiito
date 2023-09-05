/**
 * 判断一个字符串是否为有效的 JSON 格式
 * @param str 要判断的字符串
 * @returns 如果字符串为有效的 JSON 格式，则返回解析后的对象，否则返回 false
 */
export const isJson = (str: string) => {
  try {
    const res = JSON.parse(str)
    if (typeof res === 'object' && res) {
      return res
    }
  } catch (e) {
    return false
  }
}
