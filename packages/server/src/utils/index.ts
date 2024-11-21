import { AkaiitoUtils } from '@akaiito/utils'

import * as dayjs from 'dayjs'
import { encryption } from './encryption'
import * as sysUtils from './system'

export const utils = {
  ...AkaiitoUtils,
  dayjs,
  sysUtils,
  encryption,
}
