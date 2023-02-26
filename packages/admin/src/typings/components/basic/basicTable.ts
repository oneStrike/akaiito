import type { DataTableBaseColumn } from 'naive-ui'

export type BasicTableColumn = DataTableBaseColumn & {
  renderType?: string
  sortBy?: ('descend' | 'ascend')[]
}
