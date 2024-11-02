import { filePath } from '@/utils/filePath'

/**
 * 判断给定的字符串是否为有效的JSON字符串
 *
 * 此函数尝试解析一个字符串并确定它是否是一个有效的JSON对象如果给定的字符串是一个有效的JSON字符串，
 * 则返回true；否则返回false如果输入不是字符串类型，也返回false
 *
 * @param str 要检查的字符串，可以是任何类型的数据
 * @returns 如果字符串是有效的JSON格式，则返回true；否则返回false
 */
export const isJSON = (str: any) => {
  // 检查输入是否为字符串类型
  if (typeof str == 'string') {
    try {
      // 尝试解析字符串为JSON对象
      const obj = JSON.parse(str)
      // 检查解析结果是否为非空对象
      return !!(typeof obj == 'object' && obj)
      // eslint-disable-next-line unused-imports/no-unused-vars
    } catch (e) {
      // 如果解析失败，返回false
      return false
    }
  }
  // 如果输入不是字符串，返回false
  return false
}
/**
 * 处理背景图片
 * @param name 图片名称
 * @param style 背景图样式
 * @returns {string} url背景图样式
 */
export const backgroundImage = function (
  name: string,
  style = 'no-repeat center center/ cover',
) {
  return `url("${filePath(`${name}`)}") ${style}`
}
