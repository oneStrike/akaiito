/**
 * 判断一个字符串是否为有效的 JSON 格式
 * @param str 要判断的字符串
 * @returns 如果字符串为有效的 JSON 格式，则返回解析后的对象，否则返回 false
 */
// 判断字符串是否为合法的 JSON 格式
export const isJson = (str: string) => {
	try {
		// 尝试解析字符串为 JSON
		const res = JSON.parse(str)
		// 判断解析结果是否为对象且不为 null
		if (typeof res === 'object' && res) {
			return res
		}
	} catch (e) {
		// 解析失败，返回 false
		return false
	}
}
