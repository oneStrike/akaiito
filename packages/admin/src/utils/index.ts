import { formatTime } from '@/utils/table'
import { akaiitoUtils } from '@akaiito/utils'
import dayjs from 'dayjs'

export const utils = {
  dayjs,
  formatTime,
  ...akaiitoUtils,
}
