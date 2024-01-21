import type { ToolbarFilter } from '@/components/basic/BasicToolbar.vue'
import type { BasicTableColumn } from '@/components/basic/BasicTable.vue'
import { utils } from '@/utils'

export const tableColumns: BasicTableColumn = [
  {
    label: '手机号',
    prop: 'mobile',
    align: 'center'
  },
  {
    label: '登录者',
    prop: 'username',
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

export const filter: ToolbarFilter = [
  {
    field: 'dateTimePicker',
    component: 'DateTime',
    componentProps: {
      placeholder: '操作时间'
    }
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
          value: 1
        },
        {
          label: '失败',
          value: 0
        }
      ]
    }
  },
  {
    field: 'mobile',
    component: 'Input',
    componentProps: {
      placeholder: '手机号',
      clearable: true
    }
  }
]
