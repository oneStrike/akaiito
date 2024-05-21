import { MidwayConfig } from '@midwayjs/core'
import { uploadConfig } from './modules/upload'
import { jwtConfig } from './modules/jwt'
import { staticFileConfig } from './modules/staticFile'
import { utils } from '@/utils/index'

export default {
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
  staticFile: staticFileConfig,
  basicConfig: utils.getPublicConfig()
} as MidwayConfig
