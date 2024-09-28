import type { MidwayConfig } from '@midwayjs/core'
import { utils } from '@/utils'
import { jwtConfig } from './modules/jwt'
import { staticFileConfig } from './modules/staticFile'
import { uploadConfig } from './modules/upload'

export default {
  keys: '67893242123139_4623',
  koa: {
    port: 7001,
  },
  jwt: jwtConfig,
  validate: {
    validationOptions: {
      stripUnknown: true, // 全局生效
      noDefaults: false,
    },
  },
  busboy: uploadConfig,
  staticFile: staticFileConfig,
  projectConfig: utils.getProjectConfig(),
} as MidwayConfig
