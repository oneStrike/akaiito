import type { EsTableColumn } from '@/components/es-table/types'
import { utils } from '@/utils'

export const tableColumns: EsTableColumn = [
  {
    title: '用户名',
    dataIndex: 'username',
    align: 'center',
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    align: 'center',
  },
  {
    title: '角色',
    dataIndex: 'isRoot',
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    type: 'dateTime',
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
  },
]
