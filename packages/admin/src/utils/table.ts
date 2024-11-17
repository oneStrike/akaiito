import dayjs from 'dayjs'

export function formatTime(row: IterateObject | string) {
  return dayjs(typeof row === 'string' ? row : row.createdAt).format('YYYY-MM-DD HH:mm:ss')
}
