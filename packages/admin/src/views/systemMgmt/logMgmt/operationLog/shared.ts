import type { EsTableColumn } from '@/components/es-table/types'

export const tableColumns: EsTableColumn = [
  {
    title: '手机号',
    dataIndex: 'userMobile',
    align: 'center',
  },
  {
    title: '操作者',
    dataIndex: 'username',
    align: 'center',
  },

  {
    title: '请求信息',
    dataIndex: 'apiSummary',
    align: 'center',
  },
  {
    title: '请求方式',
    dataIndex: 'requestMethod',
    align: 'center',
  },

  {
    title: '操作IP',
    dataIndex: 'targetIp',
    align: 'center',
  },
  {
    title: '操作IP地址',
    dataIndex: 'ipMappingAddress',
    align: 'center',
  },

  {
    title: '操作结果',
    dataIndex: 'responseCode',
    align: 'center',
    slotName: 'responseCode',
  },
  {
    title: '操作时间',
    dataIndex: 'createdAt',
    align: 'center',
    type: 'dateTime',
  },
]
