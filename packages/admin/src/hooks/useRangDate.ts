import dayjs from 'dayjs'

interface RangDate {
  startDate: string
  endDate: string
}

export const useFormatDate = (ts: number[]): RangDate | undefined => {
  if (!ts) return
  return {
    startDate: dayjs(ts[0]).format('YYYY-MM-DD HH:mm:ss'),
    endDate: dayjs(ts[1]).format('YYYY-MM-DD HH:mm:ss')
  }
}

export const useTimestampDate = (rang: RangDate): number[] => {
  return [dayjs(rang.startDate).valueOf(), dayjs(rang.endDate).valueOf()]
}

export const useDisablePreviousDate = (ts: number) => {
  return ts > Date.now()
}
