import dayjs from 'dayjs'
import type { IterateObject } from '@typings/index'

export function formatter(row: IterateObject | string) {
  return dayjs(typeof row === 'string' ? row : row.createdAt).format(
    'YYYY-MM-DD HH:mm:ss',
  )
}
