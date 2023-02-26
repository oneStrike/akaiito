import type { BasicTableColumn } from '@/typings/components/basic/basicTable'

export const column: BasicTableColumn[] = [
  {
    key: 'userAccount',
    title: '账号',
    render: (rowData) =>
      rowData.userAccount
        ? rowData.userAccount
        : JSON.parse(rowData.params as string)?.account
  },
  {
    key: 'username',
    title: '昵称',
    render: (rowData) => {
      return rowData.username || '-'
    }
  },
  {
    key: 'createdAt',
    title: '登录时间',
    sorter: true
  },
  {
    key: 'ip',
    title: 'ip'
  },
  {
    key: 'ipAddress',
    title: '登录地址'
  },
  {
    key: 'receipt',
    title: '结果',
    render: (rowData) => (rowData.receipt === 1 ? '成功' : '失败')
  },
  {
    key: 'receiptDesc',
    title: '回执原因'
  }
]
