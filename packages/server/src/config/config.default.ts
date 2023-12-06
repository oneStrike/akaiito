import { MidwayConfig } from '@midwayjs/core'

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1697211500619_4243',
  koa: {
    port: 7001
  },
  jwt: {
    secret: 'akaiito',
    signOptions: { expiresIn: 1000 * 60 * 60 * 2 },
    verifyOptions: { complete: true }
  }
} as MidwayConfig
