import dayjs from 'dayjs'

export function formatDate(row: IterateObject | string) {
  return dayjs(typeof row === 'string' ? row : row.createdAt).format('YYYY-MM-DD HH:mm:ss')
}
