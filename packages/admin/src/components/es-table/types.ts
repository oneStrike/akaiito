import type { EsToolbarProps, Toolbar } from '@/components/es-toolbar/types'
import type { TableColumnInstance } from 'element-plus'

export type EsTableColumn = (Partial<TableColumnInstance> & {
  prop: string
  slotName?: string
  defaultValue?: string
})[]

export interface EsTableProps<T = IterateObject> {
  data: T[]
  columns: EsTableColumn
  index?: boolean
  pageSize?: number
  pageIndex?: number
  total?: number
  selection?: boolean
  selectionItems?: T[] | null
  defaultValue?: string

  Toolbar?: EsToolbarProps['toolbar']
  filter?: EsToolbarProps['filter']
}
