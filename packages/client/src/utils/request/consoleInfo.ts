import type { IterateObject } from '@/types/global'

export const consoleInfo = (
  url: string,
  params: AnyObject | string,
  res: any,
  header: IterateObject,
) => {
  console.log(
    `%c 🚀 =============================================================================================================`,
    `color: #42b983`,
  )
  console.log(` 🚀 请求地址：`, url)
  console.log(` 🚀 携带参数：`, params)
  console.log(` 🚀 响应结果：`, res)
  console.log(` 🚀 Token：`, header)
  console.log(
    `%c 🚀 *************************************************************************************************************`,
    `color: #42b983`,
  )
}
