import type {
  BaseForm,
  BaseFromFilterOptions
} from '@/typings/components/base/baseForm'
import dayjs, { Dayjs } from 'dayjs'

//填充选择框的数据
const useFillOptions = (
  target: BaseForm['options'],
  field: string,
  value: BaseFromFilterOptions[]
) => {
  target.forEach((item) => {
    if (item.field === field) {
      item.componentProps.options = value
    }
  })
}

const disabledNowDate = (current: Dayjs) => {
  return current && current > dayjs().endOf('day')
}
const disabledBeforeDate = (current: Dayjs) => {
  return current && current < dayjs().endOf('day').subtract(1, 'day')
}
const useDisabledDate = (type: 'now' | 'before') => {
  switch (type) {
    case 'now':
      return disabledNowDate
    case 'before':
      return disabledBeforeDate
  }
}
const range = (start: number, end: number) => {
  const result = []
  for (let i = start; i < end; i++) {
    result.push(i)
  }
  return result
}
const useDisabledTime = (type: 'now' | 'before') => {
  if (type === 'now') {
    return () => ({
      disabledHours: () => range(0, 24).splice(dayjs().hour() + 1),
      disabledMinutes: () => range(0, 60).splice(dayjs().minute() + 1),
      disabledSeconds: () => [0, 60]
    })
  }
  return () => ({
    disabledHours: () => range(0, 24).splice(dayjs().hour() + 1, 24),
    disabledMinutes: () => range(0, 60).splice(dayjs().minute() + 1, 60),
    disabledSeconds: () => [0, 60]
  })
}

export { useFillOptions, useDisabledDate, useDisabledTime }
