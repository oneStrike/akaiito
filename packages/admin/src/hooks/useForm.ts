import type { EsFormOptions } from '@/components/es-form/types'
import { getDataDictionaryItemsApi } from '@/apis/dictionary'
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
    const dictData = await getDataDictionaryItemsApi({
      dictionaryCode: codes.join(','),
    })
    dict.forEach((item) => {
      const dictItem = dictData[item.code]
      if (dictItem) {
        const formItem = getItem(item.field)[0]
        if (formItem) {
          formItem.componentProps!.options = dictItem.map((item: any) => ({
            label: item.name,
            value: item.code,
          }))
        }
      }
    })
  }

  // 获取表单项中所有的数据字典项并合并成一个对象
  const getDictItem: UseFormTool['getDictItem'] = () => {
    const dictItem: IterateObject = {}
    // 过滤出所有的字典项
    const dictField = formOptions.value.filter((item) => {
      return (
        item.componentProps?.options?.length &&
        dataDictField.findIndex((item) => item.field === item?.field) !== -1
      )
    })
    // 遍历字典项
    dictField.forEach((item) => {
      if (!dictItem[item.field]) {
        dictItem[item.field] = {}
      }
      item.componentProps?.options?.forEach((option) => {
        if (typeof option.value !== 'boolean') {
          dictItem[item.field][option.value] = option.label
        }
      })
    })
    return dictItem
  }

  // 禁止选择之后的时间
  const disableFutureDate: UseFormTool['disableFutureDate'] = (date) => {
    return date && date.getTime() > Date.now()
  }
  // 禁止选择之前的时间
  const disablePastDate: UseFormTool['disablePastDate'] = (date) => {
    return date && date.getTime() < Date.now()
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
