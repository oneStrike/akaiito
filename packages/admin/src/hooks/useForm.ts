import type { EsFormOptions } from '@/components/es-form/es-form.vue'

export const useFormTool = {
  getItem(formOptions: EsFormOptions[], filed: string | string[]) {
    filed = typeof filed === 'string' ? [filed] : filed
    return formOptions.filter((item) => filed.includes(item.field))
  },

  specificItem(
    formOptions: EsFormOptions[],
    filed: string | string[],
    cb: (item: EsFormOptions) => EsFormOptions
  ) {
    filed = typeof filed === 'string' ? [filed] : filed
    return formOptions.map((item) => {
      if (filed.includes(item.field)) {
        item = cb(item)
      }
      return item
    })
  },

  hideItem(formOptions: EsFormOptions[], filed: string | string[]) {
    return this.specificItem(formOptions, filed, (item) => {
      item.show = false
      return item
    })
  },

  showItem(formOptions: EsFormOptions[], filed: string | string[]) {
    return this.specificItem(formOptions, filed, (item) => {
      item.show = true
      return item
    })
  }
}
