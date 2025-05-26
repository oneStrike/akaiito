import type { TableColumnInstance } from 'element-plus'
import type { EsToolbarProps } from '@/components/es-toolbar/types'

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
  drag?: boolean
  selection?: boolean
  defaultValue?: string

  toolbar?: EsToolbarProps['toolbar']
  filter?: EsToolbarProps['filter']
}

export interface dragEndEvent {
  targetId: number
  targetOrder: number
  originId: number
  originOrder: number
}
