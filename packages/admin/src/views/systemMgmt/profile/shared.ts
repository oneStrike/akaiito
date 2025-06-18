import type { EsFormOptions } from '@/components/es-form/types.ts'
import type { EsTableColumn } from '@/components/es-table/types.ts'

/**
 * 登录日志表格配置
 */
export const loginLogsColumns: EsTableColumn = [
  {
    label: '登录者',
    prop: 'username',
    align: 'center',
  },
  {
    label: '登录IP',
    prop: 'ipAddress',
    align: 'center',
  },
  {
    label: '登录地址',
    prop: 'ipLocation',
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
    type: 'date',
  },
]

/**
 * 登录日志筛选配置
 */
export const loginLogsFilter: EsFormOptions[] = [
  {
    field: 'dateTimePicker',
    component: 'DateTime',
    props: {
      span: 2,
    },
    componentProps: {
      placeholder: '操作时间',
    },
  },
  {
    field: 'responseCode',
    component: 'Select',
    props: {
      span: 5,
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
]
