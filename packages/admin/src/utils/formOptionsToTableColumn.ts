import type { EsFormOptions } from '@/components/es-form/types.ts'
import type { EsTableColumn } from '@/components/es-table/types.ts'
import { utils } from '@/utils'

export function formOptionsToTableColumn(
  formOptions: EsFormOptions[],
  omitFields: string[] = [],
  customConfig?: IterateObject<EsTableColumn[number]>,
): EsTableColumn {
  const columns: EsTableColumn = []
  utils
    .deepCopy(formOptions)
    .filter((item) => !omitFields.includes(item.field))
    .forEach((item) => {
      const column = {
        label: item.props?.label ?? '',
        prop: item.field,
        align: 'center',
      } as EsTableColumn[number]
      if (item.component === 'Date' || item.component === 'DateTime') {
        column.columnType = 'date'
      }
      if (item.component === 'Upload') {
        column.columnType = 'image'
      }
      if (item.componentProps?.options) {
        column.formatter = (row, column, cellValue, index) => {
          return (
            item.componentProps?.options?.find(
              (item) => item.value === cellValue,
            )?.label ?? '-'
          )
        }
      }
      if (customConfig && customConfig[item.field]) {
        Object.assign(column, customConfig[item.field])
      }
      columns.push(column)
    })
  if (!omitFields.includes('createdAt')) {
    columns.push({
      label: '创建时间',
      prop: 'createdAt',
      align: 'center',
      sortable: 'custom',
      sortOrders: ['ascending', 'descending'],
      sortBy: 'createdAt',
      columnType: 'date',
      ...(customConfig?.createdAt ?? {}),
    } as EsTableColumn[number])
  }
  columns.push({
    label: '操作',
    prop: 'action',
    align: 'center',
    width: 150,
    ...(customConfig?.action ?? {}),
  } as EsTableColumn[number])
  return columns
}
