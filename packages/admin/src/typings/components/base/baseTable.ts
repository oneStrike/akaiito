import type { TableProps } from 'ant-design-vue'
import type { BaseFromFilterOptions } from '@/typings/components/base/baseForm'

export interface ListParams {
  pageIndex?: number
  pageSize?: number
  sort?: 'asc' | 'desc' | ''
  sortField?: string
}

export type BaseTableColumns = TableProps['columns'] & {
  slot?: string
}

export interface BaseTableRibbon {
  label: string
  value?: any
  type: 'button' | 'menu'
  options?: BaseFromFilterOptions[]
}
