/**
 * 判断一个字符串是否为有效的 JSON 格式
 * @param str 要判断的字符串
 * @returns 如果字符串为有效的 JSON 格式，则返回解析后的对象，否则返回 false
 */
// 判断字符串是否为合法的 JSON 格式
export function isJson(str: string) {
  try {
    // 尝试解析字符串为 JSON
    const res = JSON.parse(str)
    // 判断解析结果是否为对象且不为 null
    if (typeof res === 'object' && res) {
      return res
    }
    return false
  } catch (e) {
    // 解析失败，返回 false
    return false
  }
}

/**
 * 将给定的字符串转换为JSON对象，如果无法转换则返回原始字符串
 *
 * 此函数的存在是因为在处理数据时，我们可能会接收到字符串形式的JSON对象
 * 但是，如果字符串不是有效的JSON格式，直接使用JSON.parse会抛出异常
 * 因此，此函数提供了一种安全的转换方式，确保在任何情况下都能得到合理的处理结果
 *
 * @param str 待转换的字符串
 * @returns 如果字符串是有效的JSON格式，则返回对应的JSON对象；否则返回原始字符串
 */
export function getJson(str: string) {
  // 尝试判断字符串是否为有效的JSON格式
  const parseValue = isJson(str)
  // 根据判断结果，返回相应的值
  return parseValue === false ? str : parseValue
}
