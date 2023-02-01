import dayjs from 'dayjs'

export function userDateField(obj: { [x: string]: string | number | [] }) {
  if (!obj.dateTime || !Array.isArray(obj.dateTime)) return obj

  const newObj = JSON.parse(JSON.stringify(obj))
  const [start, end] = newObj.dateTime
  newObj.startDate = dayjs(start).format('YYYY-MM-DD HH:mm:ss')
  newObj.endDate = dayjs(end).format('YYYY-MM-DD HH:mm:ss')
  return newObj
}
