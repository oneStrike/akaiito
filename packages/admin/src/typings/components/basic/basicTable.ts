import type { DataTableBaseColumn, SwitchProps } from 'naive-ui'

export type BasicTableColumn = DataTableBaseColumn & {
  renderType?: string
  sortBy?: ('descend' | 'ascend')[]
}

export interface BasicTableInst {
  reset: () => Promise<void>
}
