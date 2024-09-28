// @ts-expect-error ignore
import _ from 'lodash'
import { downloadBlob } from './downloadBlob'
import { fillFormOptions } from './fillFormOptions'
import { getProjectConfig } from './getProjectConfig'
import { isJson } from './isJson'
import { isValueInStringEnum } from './isValueInStringEnum'
import { parseQuery } from './parseQuery'
import { validate } from './validate'

export const auyUtils = {
  parseQuery,
  isJson,
  validate,
  isValueInStringEnum,
  downloadBlob,
  fillFormOptions,
  getProjectConfig,
  _,
}
