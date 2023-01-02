import type { IFormItem } from '@/typings/components/basicForm'

export const findFormItem = <T extends IFormItem[]>(
  form: T,
  field: T[number]['field']
): IFormItem => {
  return form.find((item) => item.field === field)!
}

export const formatFormItem = (
  val: any[],
  label: string,
  value: string
): any[] => {
  return val.map((item) => {
    item.label = item[label]
    item.value = item[value]
    return item
  })
}

//解析上传地址
export const formatUploadFile = (
  val: Record<string, any>,
  field: string,
  isOrigin = false
) => {
  if (Array.isArray(val[field])) {
    if (isOrigin) {
      const temp: any[] = []
      val[field].forEach((item: any) => {
        temp.push(item.response.data)
      })
      val[field] = temp
    } else {
      val[field] = val[field][0].response.data[0].path
    }
  }
  return val
}
