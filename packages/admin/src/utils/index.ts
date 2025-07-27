import { akaiitoUtils } from '@akaiito/utils'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc' // 引入 utc 插件
import * as _ from 'lodash-es'

// 启用插件
dayjs.extend(utc)

export const utils = {
  _,
  dayjs,
  ...akaiitoUtils,
}
