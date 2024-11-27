import type { EsToolbarProps } from '@/components/es-toolbar/types'
import type { TableColumnInstance } from 'element-plus'

export type EsTableColumn = (Partial<TableColumnInstance> & {
  prop: string
  slotName?: string
  defaultValue?: string
})[]

export interface EsTableProps<T = IterateObject> {
  data: T[]
  columns: EsTableColumn
  tableIndex?: boolean
  total?: number
  selection?: boolean
  defaultValue?: string

  toolbar?: EsToolbarProps['toolbar']
  filter?: EsToolbarProps['filter']
}
