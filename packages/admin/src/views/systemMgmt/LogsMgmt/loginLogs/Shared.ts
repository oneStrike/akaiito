import type { ToolbarFilter } from '@/components/basic/BasicToolbar.vue'
import type { BasicTableColumn } from '@/components/basic/BasicTable.vue'
import { utils } from '@/utils'

export const tableColumns: BasicTableColumn = [
  {
    label: '账号',
    prop: 'code',
    align: 'center'
  },
  {
    label: '登录者',
    prop: 'code',
    align: 'center'
  },
  {
    label: '登录IP',
    prop: 'ip',
    align: 'center'
  },
  {
    label: '登录地址',
    prop: 'ipAddress',
    align: 'center'
  },
  {
    label: '登录结果',
    prop: 'ipAddress',
    align: 'center',
    formatter: (row) => {
      if (row.statusCode === 200) {
        return '登录成功'
      } else {
        return row.statusDesc
      }
    }
  },
  {
    label: '登录时间',
    prop: 'createdAt',
    align: 'center',
    formatter: utils.formatter,
    sortable: 'custom',
    sortOrders: ['ascending', 'descending'],
    sortBy: 'createdAt'
  }
]

export const filter: () => ToolbarFilter = () => [
  {
    field: 'name',
    component: 'Input',
    componentProps: {
      placeholder: '登陆者',
      clearable: true
    }
  },
  {
    field: 'code',
    component: 'Input',
    componentProps: {
      placeholder: '编码',
      clearable: true
    }
  },
  {
    field: 'status',
    component: 'Select',
    componentProps: {
      placeholder: '状态',
      clearable: true,
      options: [
        {
          label: '启用',
          value: 1
        },
        {
          label: '禁用',
          value: 0
        }
      ]
    }
  }
]
