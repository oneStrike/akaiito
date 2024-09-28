import { auyUtils } from '@auy/utils'

import * as dayjs from 'dayjs'
import { encryption } from './encryption'
import * as sysUtils from './system'

export const utils = {
  ...auyUtils,
  dayjs,
  sysUtils,
  encryption,
}
