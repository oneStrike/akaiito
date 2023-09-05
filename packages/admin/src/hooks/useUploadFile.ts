import { utils } from '@/utils/index'

/**
 * 根据传入的files参数获取路径
 * files参数可以是字符串、数组或者json对象
 * 如果files为字符串，则直接返回该字符串
 * 如果files为数组，则返回数组中每个元素的path属性拼接而成的字符串
 * 如果files为json对象，则返回该对象的path属性拼接而成的字符串
 * 如果files为其他类型或者不传入参数，则返回空字符串
 * @param files - 文件参数
 * @returns 路径字符串
 */
const getPath = (files: any): string | undefined => {
  if (!files) {
    return '' // 如果files为空，则返回空字符串
  }

  if (typeof files === 'string') {
    return files // 如果files为字符串，则直接返回该字符串
  }

  if (Array.isArray(files)) {
    return files.map((item: any) => item.path).join(',') // 如果files为数组，则返回数组中每个元素的path属性拼接而成的字符串
  }

  const possible = utils.isJson(files) // 判断files是否为json对象

  if (possible) {
    return possible.map((item: any) => item.path).join(',') // 如果files为json对象，则返回该对象的path属性拼接而成的字符串
  }
}

/**
 * 包含getPath方法的uesUploadFile对象
 */
export const uesUploadFile = {
  getPath
}
