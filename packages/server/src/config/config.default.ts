import { MidwayConfig } from '@midwayjs/core'

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1697211500619_4243',
  koa: {
    port: 7001
  },
  jwt: {
    secret: 'akaiito',
    signOptions: { expiresIn: 1000 * 60 * 60 },
    verifyOptions: { complete: true },
    whiteList: ['/admin/user/login', '/open/captcha/getCaptcha']
  },
  validate: {
    validationOptions: {
      stripUnknown: true // 全局生效
    }
  }
} as MidwayConfig
