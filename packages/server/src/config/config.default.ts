import type { MidwayConfig } from '@midwayjs/core'
import { staticFileConfig } from './modules/staticFile'
import { uploadConfig } from './modules/upload'
import { jwtConfig } from '@/config/modules/jwt'

export default {
  keys: '67893242123139_4623',
  koa: {
    port: 7001,
  },
  jwt: jwtConfig,
  cacheManager: {
    clients: {
      default: {
        store: 'memory',
      },
    },
  },
  validate: {
    validationOptions: {
      stripUnknown: true, // 全局生效
      noDefaults: false,
    },
  },
  passport: {
    session: false,
  },
  security: {
    csrf: {
      enable: false,
    },
    hsts: {
      enable: true,
      includeSubdomains: true,
    },
    nosniff: {
      enable: true,
    },
  },
  busboy: uploadConfig,
  staticFile: staticFileConfig,
} as MidwayConfig
