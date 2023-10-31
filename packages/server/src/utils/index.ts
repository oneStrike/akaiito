import { utils as AkaiitoUtils } from '@akaiito/utils/src'
import * as sysUtils from './system'
// eslint-disable-next-line node/no-extraneous-import
import * as _ from 'lodash'

export const utils = {
  ...AkaiitoUtils,
  sysUtils,
  _
}
