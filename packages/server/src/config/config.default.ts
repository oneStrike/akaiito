import type { MidwayConfig } from '@midwayjs/core'
import { utils } from '@/utils'
import { staticFileConfig } from './modules/staticFile'
import { uploadConfig } from './modules/upload'

export default {
  keys: '67893242123139_4623',
  koa: {
    port: 7001,
  },
  jwt: {
    secret: 'akaiito',
    sign: {
      expiresIn: '2h',
      algorithm: 'ES256',
    },
    verify: {
      complete: true,
    },
    whiteList: [
      '/open/captcha/getCaptcha',
      '/admin/user/login',
      '/app/user/createAppUser',
      '/app/user/login',
    ],
  },
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
  projectConfig: utils.getProjectConfig(),
} as MidwayConfig
