import { downloadBlob } from './downloadBlob'
import { fillFormOptions } from './fillFormOptions'
import { getProjectConfig } from './getProjectConfig'
import { isJson, parseJson } from './isJson'
import { isValueInStringEnum } from './isValueInStringEnum'
import { parseQuery } from './parseQuery'
import { validate } from './validate'

export const akaiitoUtils = {
  parseQuery,
  isJson,
  parseJson,
  validate,
  isValueInStringEnum,
  downloadBlob,
  fillFormOptions,
  getProjectConfig,
}
