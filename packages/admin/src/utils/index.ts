import { getAssetsFile } from '@/utils/getAssetsFile'
import { formatTime } from '@/utils/table'
import { akaiitoUtils } from '@akaiito/utils'
import dayjs from 'dayjs'

export const utils = {
  getAssetsFile,
  dayjs,
  formatTime,
  ...akaiitoUtils,
}
