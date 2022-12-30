import * as os from 'os'
import checkDiskSpace from 'check-disk-space'
import { IDisk, IMemory } from '../types/utils'
import { deal } from './common.util'
import { Context } from '@midwayjs/koa'
import * as _ from 'lodash'
import * as ipdb from 'ipip-ipdb'
import * as path from 'path'
/**
 * 获取内存信息
 */
export const memory = function (): IMemory {
  const totalMemory = os.totalmem()
  const freeMemory = os.freemem()
  const memoryTotal = deal(totalMemory)
  const memoryFree = deal(freeMemory)
  const memoryUsed = deal(totalMemory - freeMemory)
  return { memoryTotal, memoryFree, memoryUsed }
}

/**
 * 获取磁盘信息
 */
export const disk = async function (): Promise<IDisk> {
  const { diskPath, free, size } = await checkDiskSpace(__dirname)
  return {
    diskPath,
    diskFree: deal(free),
    diskTotal: size ? deal(size) : '未知',
    diskUsed: size ? deal(size - free) : '未知'
  }
}

// 获得请求IP
export const getReqIP = (ctx: Context) => {
  const req: any = ctx.req
  return (
    req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
    req.connection.remoteAddress || // 判断 connection 的远程 IP
    req.socket.remoteAddress || // 判断后端的 socket 的 IP
    req.connection.socket.remoteAddress
  ).replace('::ffff:', '')
}

// 根据IP获得请求地址
export const getIpAddr = async (ctx: Context, ip?: string | string[]) => {
  try {
    if (!ip) {
      ip = await getReqIP(ctx)
    }
    const bst = new ipdb.BaseStation(path.join(__dirname, '/ipipfree.ipdb'))
    const result = bst.findInfo(ip, 'CN')
    const addArr: any = []
    if (result) {
      addArr.push(result.countryName)
      addArr.push(result.regionName)
      addArr.push(result.cityName)
      return _.uniq(addArr).join('')
    }
  } catch (err) {
    return '无法获取地址信息'
  }
}

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
