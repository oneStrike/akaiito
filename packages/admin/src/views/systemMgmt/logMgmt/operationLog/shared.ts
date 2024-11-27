import type { EsTableColumn } from '@/components/es-table/types'
import type { ToolbarFilter } from '@/components/es-toolbar/types'
import { utils } from '@/utils'

export const tableColumns: EsTableColumn = [
  {
    label: '手机号',
    prop: 'userMobile',
    align: 'center',
    defaultValue: '-',
  },
  {
    label: '操作者',
    prop: 'username',
    align: 'center',
    defaultValue: '-',
  },

  {
    label: '请求信息',
    prop: 'apiSummary',
    align: 'center',
  },
  {
    label: '请求方式',
    prop: 'requestMethod',
    align: 'center',
  },

  {
    label: '操作IP',
    prop: 'targetIp',
    align: 'center',
  },
  {
    label: '操作IP地址',
    prop: 'ipMappingAddress',
    align: 'center',
  },

  {
    label: '操作结果',
    prop: 'responseCode',
    align: 'center',
    slotName: 'responseCode',
  },
  {
    label: '操作时间',
    prop: 'createdAt',
    align: 'center',
    sortable: 'custom',
    sortOrders: ['ascending', 'descending'],
    sortBy: 'createdAt',
  },
]

export const filter: ToolbarFilter = [
  {
    field: 'dateTimePicker',
    component: 'DateTime',
    props: {
      span: 3,
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
      placeholder: '操作结果',
      options: [
        {
          label: '200',
          value: 200,
        },
        {
          label: '401',
          value: 401,
        },
        {
          label: '403',
          value: 403,
        },
        {
          label: '404',
          value: 404,
        },
        {
          label: '413',
          value: 413,
        },
        {
          label: '500',
          value: 500,
        },
      ],
    },
  },
  {
    field: 'requestMethod',
    component: 'Select',
    props: {
      span: 6,
    },
    componentProps: {
      placeholder: '请求方式',
      options: [
        {
          label: 'POST',
          value: 'POST',
        },
        {
          label: 'GET',
          value: 'GET',
        },
      ],
    },
  },
  {
    field: 'userMobile',
    component: 'Input',
    props: {
      span: 6,
    },
    componentProps: {
      placeholder: '手机号',
      clearable: true,
      maxlength: 11,
    },
  },
]
