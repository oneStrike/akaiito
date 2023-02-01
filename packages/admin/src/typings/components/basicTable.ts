import type { TableColumnInstance, TableInstance } from 'element-plus'

export type TableColumn = (TableColumnInstance['$props'] & {
  scoped?: string
})[]
export type BasicTable = Omit<TableInstance['$props'], 'data'>
export interface IBasicTable extends TableInstance {
  options: BasicTable
  columnOptions: TableColumn
  showSearch?: boolean
  requestApi: (params: any) => Promise<any>
}
