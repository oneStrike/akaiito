import type { EsFormOptions } from '@/components/es-form/types'
import { utils } from '@/utils'

export function formOptionsToFilterOptions<T extends EsFormOptions>(
  formOptions: T[],
  selectFields: Record<Extract<T['field'], string>, number>,
): T[] {
  const filter: T[] = []

  utils
    .deepCopy(formOptions)
    .filter((item): item is T => Object.hasOwn(selectFields, item.field))
    .forEach((item) => {
      item.componentProps = item.componentProps ?? {}
      item.componentProps.placeholder = item.props?.label
      if (item.component === 'Radio') {
        item.component = 'Select'
      }
      item.props = {
        ...item.props,
        label: '',
        span: selectFields[item.field as Extract<T['field'], string>],
      }
      filter.push(item)
    })

  return filter
}
