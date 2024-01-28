import { utils as AkaiitoUtils } from '@akaiito/utils/dist/index'
import * as sysUtils from './system'
import * as _ from 'lodash'
import { encryption } from './encryption'
// eslint-disable-next-line node/no-extraneous-import
import * as dayjs from 'dayjs'

export const utils = {
  ...AkaiitoUtils,
  dayjs,
  sysUtils,
  _,
  encryption
}
