import type { EsFormOptions } from '@/components/es-form/types'
import { getDataDictionaryItemsApi } from '@/apis/dictionary'

export interface UseFormTool {
  getItem: (filed: string | string[]) => EsFormOptions[]
  options: EsFormOptions[]
  specificItem: (filed: string | string[], cb: (item: EsFormOptions) => void) => EsFormOptions[]
  toggleDisplay: (filed: string | string[], status: boolean) => void
  fillDict: (dict: { field: string; code: string }[]) => Promise<void>
}

export function useFormTool(schema: EsFormOptions[]): UseFormTool {
  const formOptions = ref<EsFormOptions[]>(JSON.parse(JSON.stringify(schema)))

  const getItem: UseFormTool['getItem'] = (filed) => {
    filed = typeof filed === 'string' ? [filed] : filed
    return formOptions.value.filter((item) => filed.includes(item.field))
  }

  const specificItem: UseFormTool['specificItem'] = (filed, cb) => {
    filed = typeof filed === 'string' ? [filed] : filed
    return formOptions.value.map((item) => {
      if (filed.includes(item.field)) {
        item = cb(item)
      }
      return item
    })
  }

  const toggleDisplay: UseFormTool['toggleDisplay'] = (filed, status) => {
    specificItem(filed, (item) => {
      item.show = status
      return item
    })
  }

  const fillDict: UseFormTool['fillDict'] = async (dict) => {
    for (let i = 0; i < dict.length; i++) {
      const item = getItem(dict[i].field)[0]
      const dictData = await getDataDictionaryItemsApi({ dictionaryCode: dict[i].code })
      item.componentProps!.options = dictData.list.map((item) => ({
        label: item.name,
        value: item.code,
      }))
    }
  }

  return {
    getItem,
    fillDict,
    options: formOptions.value,
    specificItem,
    toggleDisplay,
  } as const
}
