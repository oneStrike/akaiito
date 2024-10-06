import { getAssetsFile } from '@/utils/getAssetsFile'
import { formatter } from '@/utils/table'
import { utils as commonUtils } from '@akaiito/utils/src'
import dayjs from 'dayjs'
import _ from 'lodash'

export const utils = {
  ...commonUtils,
  getAssetsFile,
  dayjs,
  formatter,
  _,
}
