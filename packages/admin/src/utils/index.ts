import { getAssetsFile } from '@/utils/getAssetsFile'
import { formatTime } from '@/utils/table'
import { auyUtils } from '@auy/utils'
import dayjs from 'dayjs'

export const utils = {
  getAssetsFile,
  dayjs,
  formatTime,
  ...auyUtils,
}
