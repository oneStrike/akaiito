import { getAssetsFile } from '@/utils/getAssetsFile'
import { formatter } from '@/utils/table'
import { auyUtils } from '@auy/utils'
import dayjs from 'dayjs'

export const utils = {
  getAssetsFile,
  dayjs,
  formatter,
  ...auyUtils,
}
