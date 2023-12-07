import { utils as AkaiitoUtils } from '@akaiito/utils/dist/index'
import * as sysUtils from './system'
import * as _ from 'lodash'
import { encryption } from './encryption'

export const utils = {
  ...AkaiitoUtils,
  sysUtils,
  _,
  encryption
}
