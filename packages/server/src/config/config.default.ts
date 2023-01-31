import { MidwayConfig } from '@midwayjs/core'
import { join } from 'path'
const rootPath = join(__dirname, '../../')
export default {
  keys: '1661312321096_4541',
  koa: {
    port: 7001
  },
  midwayLogger: {
    default: {
      dir: rootPath + '/logs'
    }
  },
  validate: {
    validationOptions: {
      allowUnknown: true,
      stripUnknown: true
    }
  },
  cors: {
    credentials: true
  }
} as MidwayConfig
