import type { IterateObject } from '@auy/types'
import dayjs from 'dayjs'

export function formatter(row: IterateObject | string) {
  return dayjs(typeof row === 'string' ? row : row.createdAt).format(
    'YYYY-MM-DD HH:mm:ss',
  )
}
