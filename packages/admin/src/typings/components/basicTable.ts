import type {
  ButtonProps,
  PopoverProps,
  TableColumnInstance,
  TableInstance
} from 'element-plus'

export interface TableOperateBtn {
  label: string
  key?: string | number
  tipsField?: string
  btn?: Partial<ButtonProps>
  popConfirm?: Partial<PopoverProps>
}
export type TableColumn = (TableColumnInstance['$props'] & {
  scoped?: string //插槽名
  operateBtn?: TableOperateBtn[]
})[]
export type BasicTable = Omit<TableInstance['$props'], 'data'>
export interface IBasicTable extends TableInstance {
  options: BasicTable
  columnOptions: TableColumn
  showSearch?: boolean
  requestApi: (params: any) => Promise<any>
}

export interface TableInstanceRef {
  resetTable: () => Promise<void>
  getSelectionRowsAndIds: <T = Record<string, any>>() => {
    rows: T[]
    ids: number[]
  }
}

export interface ListParams {
  pageSize: number
  pageIndex: number
  sort: 'asc' | 'desc' | ''
  sortField: string
}
