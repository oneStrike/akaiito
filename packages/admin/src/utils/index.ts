import { utils as commonUtils } from '@akaiito/utils/src'
import _ from 'lodash'
import dayjs from 'dayjs'
import { getAssetsFile } from '@/utils/getAssetsFile'
import { formatter } from '@/utils/table'

export const utils = {
  ...commonUtils,
  getAssetsFile,
  dayjs,
  formatter,
  _
}
