import { MidwayConfig } from '@midwayjs/core'
import basicConfig from '@akaiito/basic-config'
import { uploadConfig } from './modules/upload'
import { jwtConfig } from './modules/jwt'
import { staticFileConfig } from './modules/staticFile'

export default {
  basicConfig,
  keys: '67893242123139_4623',
  koa: {
    port: 7001
  },
  jwt: jwtConfig,
  validate: {
    validationOptions: {
      stripUnknown: true, // 全局生效
      noDefaults: false
    }
  },
  upload: uploadConfig,
  staticFile: staticFileConfig
} as MidwayConfig
