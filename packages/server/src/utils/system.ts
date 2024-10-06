// 获得请求IP
import IP2Region from 'ip2region'
import type { Context } from '@midwayjs/koa'

export function getReqIP(ctx: Context) {
  const req: any = ctx.req
  return (
    req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
    req.connection.remoteAddress || // 判断 connection 的远程 IP
    req.socket.remoteAddress || // 判断后端的 socket 的 IP
    req.connection.socket.remoteAddress
  ).replace('::ffff:', '')
}

// 根据IP获得请求地址
export function getIpAddr(ip?: string | string[]): string | string[] {
  const ipdb = new IP2Region()
  if (typeof ip === 'string') {
    const { country, province, city } = ipdb.search(ip)
    return country ? country + province + city : city
  }
  const address = []

  ip.forEach((item) => {
    const { country, province, city } = ipdb.search(item)
    address.push(country ? country + province + city : city)
  })
  return address
}
