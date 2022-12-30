import type { TableColumnInstance, TableInstance } from 'element-plus'

export type TTableColumn = (TableColumnInstance['$props'] & {
  scoped?: string
})[]
export type TBasicTable = Omit<TableInstance['$props'], 'data'>
export interface IBasicTable extends TableInstance {
  options: TBasicTable
  columnOptions: TTableColumn
  showSearch?: boolean
  requestApi: (params: any) => Promise<any>
}
