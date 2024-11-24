export function getDateDiff(timeStr: string): string {
  // 验证日期字符串是否为空或无效
  if (!timeStr || !Date.parse(timeStr)) {
    return '无效日期'
  }

  const targetTime = timeStr.replace(/-/g, '/')
  const timePublish = new Date(targetTime)
  const timeNow = new Date()
  const diffValue = timeNow.getTime() - timePublish.getTime()

  const minute = 1000 * 60
  const hour = minute * 60
  const day = hour * 24
  const month = day * 30
  const year = month * 12

  let result = null
  if (diffValue < 0) {
    result = '刚刚'
  } else if (diffValue >= year) {
    result = `${Math.floor(diffValue / year)}年前`
  } else if (diffValue >= month) {
    result = `${Math.floor(diffValue / month)}月前`
  } else if (diffValue >= 7 * day) {
    result = `${Math.floor(diffValue / (7 * day))}周前`
  } else if (diffValue >= day) {
    result = `${Math.floor(diffValue / day)}天前`
  } else if (diffValue >= hour) {
    result = `${Math.floor(diffValue / hour)}小时前`
  } else if (diffValue >= minute) {
    result = `${Math.floor(diffValue / minute)}分钟前`
  } else {
    result = '刚刚'
  }
  return result
}
