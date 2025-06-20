import type { EsFormOptions } from '@/components/es-form/types.ts'
import type { EsTableColumn } from '@/components/es-table/types.ts'
import { utils } from '@/utils'

export function formOptionsToTableColumn<T extends EsFormOptions>(
  formOptions: T[],
  omitFields: T['field'][] = [],
): EsTableColumn {
  const columns: EsTableColumn = []
  utils
    .deepCopy(formOptions)
    .filter((item) => !omitFields.includes(item.field))
    .forEach((item) => {
      const column: EsTableColumn[number] = {
        label: item.props?.label ?? '',
        prop: item.field,
        align: 'center',
      }
      if (item.component === 'Date' || item.component === 'DateTime') {
        column.type = 'date'
      }
      if (item.component === 'Upload') {
        column.type = 'image'
      }
      if (item.componentProps?.options) {
        column.formatter = (row, column, cellValue) => {
          return item.componentProps?.options?.find(
            (item) => item.value === cellValue,
          )?.label
        }
      }
      columns.push(column)
    })
  columns.push({
    label: '操作',
    prop: 'action',
    align: 'center',
  })
  return columns
}
