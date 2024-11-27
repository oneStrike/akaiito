import type { EsTableColumn } from '@/components/es-table/types'
import type { ToolbarFilter } from '@/components/es-toolbar/types'

export const tableColumns: EsTableColumn = [
  {
    label: '手机号',
    prop: 'userMobile',
    align: 'center',
  },
  {
    label: '登录者',
    prop: 'username',
    align: 'center',
  },
  {
    label: '登录IP',
    prop: 'targetIp',
    align: 'center',
  },
  {
    label: '登录地址',
    prop: 'ipMappingAddress',
    align: 'center',
  },
  {
    label: '登录结果',
    prop: 'responseCode',
    align: 'center',
    slotName: 'responseCode',
  },
  {
    label: '登录时间',
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
