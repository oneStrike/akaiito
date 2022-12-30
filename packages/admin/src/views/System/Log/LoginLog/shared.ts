import type { ISearchProps } from '@/typings/components/basicSearch'
import type { TTableColumn } from '@/typings/components/basicTable'
export const search: ISearchProps['options'] = reactive([
  {
    field: 'receipt',
    component: 'Select',
    fillAll: true,
    bind: {
      label: '状态'
    },
    componentProps: {
      options: [
        { label: '成功', value: 1 },
        { label: '失败', value: 0 }
      ],
      bind: {
        placeholder: '请选择操作状态'
      }
    }
  },
  {
    field: 'username',
    component: 'Select',
    bind: {
      label: '用户'
    },
    componentProps: {
      options: [],
      bind: {
        placeholder: '请选择用户'
      }
    }
  },
  {
    field: 'isRoot',
    component: 'Select',
    fillAll: true,
    bind: {
      label: '角色'
    },
    componentProps: {
      options: [
        { label: '超管', value: 1 },
        { label: '普通', value: 0 }
      ],
      bind: {
        placeholder: '请选择账号角色'
      }
    }
  },
  {
    field: 'dateTime',
    component: 'DateTime',
    bind: {
      label: '登录时间'
    },
    componentProps: {
      bind: {
        placeholder: '请选择登录时间'
      }
    }
  }
])

export const column: TTableColumn = [
  {
    prop: 'userAccount',
    label: '账号账号',
    formatter: (row, column, cellValue) =>
      cellValue ? cellValue : JSON.parse(row.params).account
  },
  {
    prop: 'username',
    label: '昵称',
    formatter: (row, column, cellValue) => cellValue || '-'
  },
  {
    prop: 'createdAt',
    label: '登录时间'
  },
  {
    prop: 'ip',
    label: 'ip'
  },
  {
    prop: 'ipAddress',
    label: '登录地址'
  },
  {
    prop: 'receipt',
    label: '结果',
    formatter: (row, column, cellValue) => (cellValue === 1 ? '成功' : '失败')
  },
  {
    prop: 'receiptDesc',
    label: '回执原因'
  }
]
