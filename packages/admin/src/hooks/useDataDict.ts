import { dictionaryItemsApi } from '@/apis/dictionary.ts'

export const useDataDict = {
  fillRow: async <T extends Record<string, any>>(
    data: T,
    dictMap: Partial<Record<keyof T, string>>,
  ) => {
    const codes: string[] = []
    // 收集所有需要查询的字典编码
    for (const fieldKey in dictMap) {
      const code = dictMap[fieldKey]
      if (code) {
        codes.push(code)
      }
    }

    // 查询字典数据
    const dictData = await dictionaryItemsApi({
      dictionaryCode: codes.join(','),
    })

    // 将字典数据填充回 data 对象
    for (const fieldKey in dictMap) {
      const dictKey = dictMap[fieldKey] // 获取字段对应的字典 key
      if (dictKey) {
        const target = dictData.find((item) => item.code === data[dictKey])
        // @ts-expect-error ignore
        data[fieldKey] = target?.name // 将字典项赋值给 data 的对应字段
      }
    }
    return data
  },
}
