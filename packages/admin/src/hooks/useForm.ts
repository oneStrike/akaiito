import type { EsFormOptions } from '@/components/es-form/types'
import { dictionaryItemsApi } from '@/apis/dictionary.ts'
import { utils } from '@/utils'

export interface UseFormTool {
  getItem: (filed: string | string[]) => EsFormOptions[]
  options: EsFormOptions[]
  specificItem: (
    filed: string | string[],
    cb: (item: EsFormOptions) => void,
  ) => EsFormOptions[]
  toggleDisplay: (filed: string | string[], status: boolean) => void
  fillDict: (dict: { field: string; code: string }[]) => Promise<void>
  getDictItem: () => Record<string, any>
  disablePastDate: (date: Date) => boolean
  disableFutureDate: (date: Date) => boolean
}

export function useFormTool(schema?: EsFormOptions[]): UseFormTool {
  const formOptions = ref<EsFormOptions[]>(schema ? utils.deepCopy(schema) : [])
  const dataDictField: IterateObject[] = []

  // 获取表单中的某一项
  const getItem: UseFormTool['getItem'] = (filed) => {
    filed = typeof filed === 'string' ? [filed] : filed
    return formOptions.value.filter((item) => filed.includes(item.field))
  }

  // 循环表单以填充表单中的某一项
  const specificItem: UseFormTool['specificItem'] = (filed, cb) => {
    filed = typeof filed === 'string' ? [filed] : filed
    return formOptions.value.map((item) => {
      if (filed.includes(item.field)) {
        cb(item)
      }
      return item
    })
  }

  // 展示或者隐藏表单中的某一项
  const toggleDisplay: UseFormTool['toggleDisplay'] = (filed, status) => {
    specificItem(filed, (item) => {
      item.show = status
      return item
    })
  }

  // 填充表单的数据字典
  const fillDict: UseFormTool['fillDict'] = async (dict) => {
    dataDictField.push(...dict)
    const codes = dict.map((item) => item.code)
    const dictData = await dictionaryItemsApi({
      dictionaryCode: codes.join(','),
    })
    const dictDataObj: IterateObject = {}

    // 修复：将dictData按dictionaryCode分组
    dictData.forEach((item) => {
      if (!dictDataObj[item.dictionaryCode]) {
        dictDataObj[item.dictionaryCode] = []
      }
      dictDataObj[item.dictionaryCode].push(item)
    })

    // 使用Map存储已处理的选项，避免重复处理
    const processedOptions = new Map<
      string,
      { label: string; value: string }[]
    >()

    dict.forEach((item) => {
      const dictItem = dictDataObj[item.code]
      if (dictItem) {
        const formItem = getItem(item.field)[0]
        if (formItem) {
          // 缓存已处理的选项
          if (!processedOptions.has(item.code)) {
            processedOptions.set(
              item.code,
              dictItem.map((dictItem: any) => ({
                label: dictItem.name,
                value: dictItem.code,
              })),
            )
          }
          formItem.componentProps!.options = processedOptions.get(item.code)
        }
      }
    })
  }

  // 添加缓存对象
  let dictItemCache = new Map<string, Record<string, string>>()

  // 获取表单项中所有的数据字典项并合并成一个对象
  const getDictItem: UseFormTool['getDictItem'] = () => {
    // 如果缓存中已有数据且数据字典项数量未变，直接返回缓存
    if (dictItemCache.size === dataDictField.length) {
      return Object.fromEntries(dictItemCache)
    }

    // 清空缓存
    dictItemCache.clear()

    // 预先获取所有表单项，避免重复查询
    const formItems = new Map(
      dataDictField.map((item) => [item.field, getItem(item.field)[0]]),
    )

    // 创建字段到字典代码的映射
    const fieldToDictCodeMap = new Map(
      dataDictField.map((item) => [item.field, item.code]),
    )

    // 处理数据字典项
    // 使用Set和Array.from保证唯一性和性能
    const uniqueOptions = Array.from(
      new Set(dataDictField.map((item) => item.field)),
    )
      .map((field) => ({ field, code: fieldToDictCodeMap.get(field)! }))
      .filter(({ code }) => code)
      .reduce((acc, { field, code }) => {
        const formItem = formItems.get(field)
        const options = formItem?.componentProps?.options

        if (!Array.isArray(options)) return acc

        const dictMap = new Map<string | number, string>()

        // 使用for循环替代for...of，性能更好
        for (let i = 0; i < options.length; i++) {
          const option = options[i]
          if (typeof option.value !== 'boolean') {
            dictMap.set(option.value, option.label)
          }
        }

        if (dictMap.size > 0) {
          acc.set(code, Object.fromEntries(dictMap))
        }

        return acc
      }, new Map<string, Record<string, string>>())

    // 批量更新缓存
    dictItemCache = uniqueOptions

    return Object.fromEntries(dictItemCache)
  }

  // 禁止选择之后的时间
  const disableFutureDate: UseFormTool['disableFutureDate'] = (date) => {
    return date && date.getTime() >= Date.now()
  }
  // 禁止选择之前的时间
  const disablePastDate: UseFormTool['disablePastDate'] = (date) => {
    return date && date.getTime() <= Date.now()
  }

  return {
    getItem,
    fillDict,
    options: formOptions.value,
    getDictItem,
    specificItem,
    toggleDisplay,
    disablePastDate,
    disableFutureDate,
  } as const
}
