import type { BasicFormOptions } from '@/components/basic/BasicForm.vue'

export const useFormTool = {
  getItem(formOptions: BasicFormOptions[], filed: string | string[]) {
    filed = typeof filed === 'string' ? [filed] : filed
    return formOptions.filter((item) => filed.includes(item.field))
  },

  specificItem(
    formOptions: BasicFormOptions[],
    filed: string | string[],
    cb: (item: BasicFormOptions) => BasicFormOptions
  ) {
    filed = typeof filed === 'string' ? [filed] : filed
    return formOptions.map((item) => {
      if (filed.includes(item.field)) {
        item = cb(item)
      }
      return item
    })
  },

  hideItem(formOptions: BasicFormOptions[], filed: string | string[]) {
    return this.specificItem(formOptions, filed, (item) => {
      item.show = false
      return item
    })
  },

  showItem(formOptions: BasicFormOptions[], filed: string | string[]) {
    return this.specificItem(formOptions, filed, (item) => {
      item.show = true
      return item
    })
  }
}
