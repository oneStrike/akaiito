import { formatDate } from '@/formatDate'
import { downloadBlob } from './downloadBlob'
import { fillFormOptions } from './fillFormOptions'
import { getProjectConfig } from './getProjectConfig'
import { getJson, isJson } from './isJson'
import { isValueInStringEnum } from './isValueInStringEnum'
import { parseQuery } from './parseQuery'
import { validate } from './validate'

export const AkaiitoUtils = {
  parseQuery,
  isJson,
  getJson,
  validate,
  isValueInStringEnum,
  downloadBlob,
  fillFormOptions,
  getProjectConfig,
  formatDate,
}
