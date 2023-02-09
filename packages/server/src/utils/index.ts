import { Inject, Provide, Scope, ScopeEnum } from '@midwayjs/core'
import { encryption } from './encryption.util'
import * as _ from 'lodash'
import * as commonUtil from './common.util'
import * as systemUtil from './system.util'
import * as fsUtil from './fs.util'
import dayjs = require('dayjs')
import * as fs from 'fs-extra'
@Provide()
@Scope(ScopeEnum.Singleton)
export default class Utils {
  @Inject()
  baseDir: any

  lodash = _

  dayjs = dayjs

  commonUtil = commonUtil

  systemUtil = systemUtil

  fsUtil: typeof fsUtil = fsUtil
  fs: typeof fs = fs

  encryption: typeof encryption = encryption
}
