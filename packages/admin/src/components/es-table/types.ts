import type { ColumnType } from 'ant-design-vue/es/table'

export type EsTableColumn = ColumnType[]

export interface EsTableProps {
  api: AsyncFn
  columns: EsTableColumn
}
