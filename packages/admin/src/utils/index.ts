import { akaiitoUtils } from '@akaiito/utils'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc' // 引入 utc 插件

// 启用插件
dayjs.extend(utc)

export const utils = {
  dayjs,
  ...akaiitoUtils,
}
