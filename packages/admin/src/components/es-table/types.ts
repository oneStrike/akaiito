import type { ColumnType } from 'ant-design-vue/es/table'

declare module 'ant-design-vue/es/table' {
  export interface ColumnType {
    type?: 'dateTime'
    slotName?: string
  }
}

export type EsTableColumn = ColumnType[]

export interface EsTableProps {
  api: AsyncFn
  columns: EsTableColumn
  pageIndex?: number
  pageSize?: number
  defaultParams?: IterateObject
}
