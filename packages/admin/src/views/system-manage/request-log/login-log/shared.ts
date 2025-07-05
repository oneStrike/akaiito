import type { EsTableColumn } from '@/components/es-table/types.ts'
import type { ToolbarFilter } from '@/components/es-toolbar/types'

export const tableColumns: EsTableColumn = [
  {
    label: '登录账号',
    prop: 'username',
    align: 'center',
    formatter: (row: any) => {
      if (row.username) {
        return row.username
      }
      if (!row.requestParams) {
        return '-'
      }
      const { body } = JSON.parse(row.requestParams)
      return body.username
    },
  },
  {
    label: '登录IP',
    prop: 'ipAddress',
    align: 'center',
  },
  {
    label: 'IP地址',
    prop: 'ipLocation',
    align: 'center',
  },
  {
    label: '登录结果',
    prop: 'responseCode',
    align: 'center',
  },
  {
    label: '登录时间',
    prop: 'createdAt',
    align: 'center',
    sortable: 'custom',
    sortOrders: ['ascending', 'descending'],
    sortBy: 'createdAt',
    columnType: 'date',
  },
]

export const filter: ToolbarFilter = [
  {
    field: 'dateTimePicker',
    component: 'DateTime',
    props: {
      span: 4,
    },
    componentProps: {
      placeholder: '操作时间',
    },
  },
  {
    field: 'responseCode',
    component: 'Select',
    props: {
      span: 6,
    },
    componentProps: {
      placeholder: '登录结果',
      clearable: true,
      options: [
        {
          label: '成功',
          value: 200,
        },
        {
          label: '失败',
          value: 400,
        },
      ],
    },
  },
  {
    field: 'username',
    component: 'Input',
    props: {
      span: 6,
    },
    componentProps: {
      placeholder: '登录账号',
      clearable: true,
    },
  },
]
