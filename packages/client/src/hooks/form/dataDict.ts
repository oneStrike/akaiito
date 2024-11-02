import type { IterateObject } from '@/types/global'
import { getMultipleDataDictItemApi } from '@/apis/common'

export async function dataDict(
  codes: string | string[],
  returnType?: 'object' | 'array',
): Promise<
  IterateObject<
    {
      text: string
      value: string
    }[]
  >
> {
  if (Array.isArray(codes)) {
    codes = codes.join(',')
  }
  const dataDict: IterateObject = {}
  const data = await getMultipleDataDictItemApi({ codeList: codes })
  data.forEach((item: IterateObject) => {
    if (!dataDict[item.dictCode]) {
      dataDict[item.dictCode] = returnType === 'object' ? {} : []
    }
    if (returnType === 'object') {
      dataDict[item.dictCode][item.dictItemCode] = item.dictItemName
    } else {
      dataDict[item.dictCode].push({
        text: item.dictItemName,
        value: item.dictItemCode,
      })
    }
  })
  return dataDict
}
