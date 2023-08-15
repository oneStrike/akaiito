import * as randomString from 'randomstring'
import { ServiceVersionEnum } from '../shared/enum/service-version.enum'

/**
 * 字节数单位转换
 * @param mem 字节数
 */
export const deal = (mem: number) => {
  let G = 0,
    M = 0,
    KB = 0
  mem > 1 << 30 && (G = parseFloat((mem / (1 << 30)).toFixed(2)))
  mem > 1 << 20 &&
    mem < 1 << 30 &&
    (M = parseFloat((mem / (1 << 20)).toFixed(2)))
  mem > 1 << 10 &&
    mem > 1 << 20 &&
    (KB = parseFloat((mem / (1 << 10)).toFixed(2)))
  return G > 0 ? G + 'G' : M > 0 ? M + 'M' : KB > 0 ? KB + 'KB' : mem + 'B'
}

/**
 * 随机数
 * @param length
 * @param charset
 */
export const getRandom = (length = 15, charset = 'alphabetic') => {
  return randomString.generate({
    length,
    charset
  })
}

/**
 * 获取路由类型,管理端还是客户端
 * @param path 请求地址
 */
export const serviceVersionType = (path: string): ServiceVersionEnum => {
  const prefix = path.split('/')[1]
  switch (prefix) {
    case 'admin':
      return ServiceVersionEnum.ADMIN
    case 'client':
      return ServiceVersionEnum.CLIENT
    case 'open':
      return ServiceVersionEnum.OPEN
    case 'common':
      return ServiceVersionEnum.COMMON
  }
}
