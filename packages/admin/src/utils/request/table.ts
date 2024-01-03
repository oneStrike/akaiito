import dayjs from 'dayjs'
import type { IterateObject } from '@typings/index'

export const formatter = (row: IterateObject) => {
  return dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss')
}
