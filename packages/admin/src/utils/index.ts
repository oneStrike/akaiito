import { utils as commonUtils } from '@akaiito/utils/src'
import _ from 'lodash'
import { getAssetsFile } from '@/utils/getAssetsFile'
import { formatter } from '@/utils/request/table'

export const utils = {
  ...commonUtils,
  getAssetsFile,
  formatter,
  _
}
