import { MidwayConfig } from '@midwayjs/core'
import basicConfig from '@akaiito/basic-config'
import * as path from 'node:path'

const allowFileType = []
const mimeTypeWhiteList = {}
for (const allowFileTypeKey in basicConfig.allowFileType) {
  basicConfig.allowFileType[allowFileTypeKey].forEach((item: string) => {
    const ext = '.' + item
    allowFileType.push(ext)
    if (item === 'jpg' || item === 'jpeg') {
      mimeTypeWhiteList[ext] = ['image/jpg', 'image/jpeg']
    } else {
      mimeTypeWhiteList[ext] = allowFileTypeKey + '/' + item
    }
  })
}
const resources = path.join(__dirname, '../../public')

export default {
  basicConfig,
  keys: '6789324123139_4623',
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
      stripUnknown: true, // 全局生效
      noDefaults: false
    }
  },
  upload: {
    mode: 'file',
    fileSize: '10mb',
    whitelist: allowFileType,
    mimeTypeWhiteList,
    tmpdir: resources,
    cleanTimeout: 0,
    match: /\/common\/upload/
  },
  staticFile: {
    dirs: {
      default: {
        prefix: '/public',
        dir: resources
      }
    }
  }
} as MidwayConfig
