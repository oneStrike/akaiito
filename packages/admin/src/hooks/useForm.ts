import { ref } from 'vue'
import type { EsFormOptions } from '@/components/es-form/es-form.vue'

export function useFormTool(options: EsFormOptions[]): {
  getItem: (filed: string | string[]) => EsFormOptions[]
  formOptions: EsFormOptions[]
  specificItem: (
    filed: string | string[],
    cb: (item: EsFormOptions) => EsFormOptions,
  ) => EsFormOptions[]
  toggleDisplay: (filed: string | string[], status: boolean) => void
} {
  const formOptions = ref(options)

  const getItem = (filed: string | string[]): EsFormOptions[] => {
    filed = typeof filed === 'string' ? [filed] : filed
    return formOptions.value.filter((item) => filed.includes(item.field))
  }

  const specificItem = (
    filed: string | string[],
    cb: (item: EsFormOptions) => EsFormOptions,
  ): EsFormOptions[] => {
    filed = typeof filed === 'string' ? [filed] : filed
    return formOptions.value.map((item) => {
      if (filed.includes(item.field)) {
        item = cb(item)
      }
      return item
    })
  }

  const toggleDisplay = (filed: string | string[], status: boolean): void => {
    specificItem(filed, (item) => {
      item.show = status
      return item
    })
  }

  return {
    getItem,
    formOptions: formOptions.value,
    specificItem,
    toggleDisplay,
  } as const
}
