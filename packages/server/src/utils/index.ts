import { utils as AkaiitoUtils } from '@akaiito/utils/dist/index'

import * as dayjs from 'dayjs'
import * as _ from 'lodash'
import { encryption } from './encryption'
import * as sysUtils from './system'

export const utils = {
  ...AkaiitoUtils,
  dayjs,
  sysUtils,
  _,
  encryption,
}
