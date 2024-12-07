import { deepCopy } from '@/deepCopy'
import { downloadBlob } from './downloadBlob'
import { fillFormOptions } from './fillFormOptions'
import { getProjectConfig } from './getProjectConfig'
import { isJson, parseJson } from './isJson'
import { isValueInStringEnum } from './isValueInStringEnum'
import { parseQuery } from './parseQuery'
import { regexp } from './regexp'

export const akaiitoUtils = {
  parseQuery,
  isJson,
  parseJson,
  regexp,
  isValueInStringEnum,
  downloadBlob,
  fillFormOptions,
  getProjectConfig,
  deepCopy,
}
