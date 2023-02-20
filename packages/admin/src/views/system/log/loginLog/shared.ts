import type { BaseFormOptions } from '@/typings/components/base/baseForm'
import { BaseFormEnum } from '@/enum/baseFormEnum'
import type { TableProps } from 'ant-design-vue'

export const search: BaseFormOptions[] = reactive([
  {
    field: 'userId',
    component: BaseFormEnum.SELECT,
    bind: {
      label: '用户',
      width: 180
    },
    componentProps: {
      options: [],
      bind: {
        placeholder: '用户'
      }
    }
  },
  {
    field: 'receipt',
    component: BaseFormEnum.SELECT,
    fillAll: true,
    bind: {
      label: '状态',
      width: 160
    },
    componentProps: {
      options: [
        { label: '成功', value: 1 },
        { label: '失败', value: 0 }
      ],
      bind: {
        placeholder: '操作状态'
      }
    }
  },
  {
    field: 'dateTime',
    component: BaseFormEnum.DATE,
    bind: {
      label: '登录时间'
    },
    componentProps: {
      bind: {
        showTime: true
      }
    }
  }
])

export const columns: TableProps['columns'] = [
  {
    dataIndex: 'userAccount',
    title: '账号',
    customRender: ({ text, record }) =>
      text ? text : JSON.parse(record.params)?.account
  },
  {
    dataIndex: 'username',
    title: '昵称',
    customRender: ({ text }) => text || '-'
  },
  {
    dataIndex: 'createdAt',
    title: '登录时间',
    sorter: true,
    sortDirections: ['ascend']
  },
  {
    dataIndex: 'ip',
    title: 'ip'
  },
  {
    dataIndex: 'ipAddress',
    title: '登录地址'
  },
  {
    dataIndex: 'receipt',
    title: '结果',
    customRender: ({ text }) => (text === 1 ? '成功' : '失败')
  },
  {
    dataIndex: 'receiptDesc',
    title: '回执原因'
  }
]
