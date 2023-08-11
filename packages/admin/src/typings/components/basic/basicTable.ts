import type { DataTableColumns, DataTableRowKey } from 'naive-ui'

export type BasicTableColumn<T> = DataTableColumns<T> & {
  renderType?: string
  sortBy?: ('descend' | 'ascend')[]
}

export interface BasicTableInst {
  refresh: () => Promise<void>
  resetSelect: () => void
  selectKeys: DataTableRowKey[]
  selectRows: Record<string | symbol, any>[] | undefined[]
}
