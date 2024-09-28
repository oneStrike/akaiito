import type { EsTableColumn } from '@/components/es-table/es-table.vue'
import type { ToolbarFilter } from '@/components/es-toolbar/es-toolbar.vue'
import { utils } from '@/utils'

export const tableColumns: EsTableColumn = [
  {
    label: '手机号',
    prop: 'mobile',
    align: 'center',
  },
  {
    label: '登录者',
    prop: 'username',
    align: 'center',
  },
  {
    label: '登录IP',
    prop: 'ip',
    align: 'center',
  },
  {
    label: '登录地址',
    prop: 'ipAddress',
    align: 'center',
  },
  {
    label: '登录结果',
    prop: 'statusCode',
    align: 'center',
    slotName: 'statusCode',
  },
  {
    label: '登录时间',
    prop: 'createdAt',
    align: 'center',
    formatter: utils.formatter,
    sortable: 'custom',
    sortOrders: ['ascending', 'descending'],
    sortBy: 'createdAt',
  },
]

export const filter: ToolbarFilter = [
  {
    field: 'dateTimePicker',
    component: 'DateTime',
    componentProps: {
      placeholder: '操作时间',
    },
  },
  {
    field: 'status',
    component: 'Select',
    componentProps: {
      placeholder: '登录结果',
      clearable: true,
      options: [
        {
          label: '成功',
          value: 1,
        },
        {
          label: '失败',
          value: 0,
        },
      ],
    },
  },
  {
    field: 'mobile',
    component: 'Input',
    componentProps: {
      placeholder: '手机号',
      clearable: true,
      maxlength: 11,
    },
  },
]
