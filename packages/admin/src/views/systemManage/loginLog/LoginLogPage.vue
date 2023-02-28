<script setup lang="ts">
import { loginLogApi, userListApi } from '@/api/user'
import type { BasicFormOptions } from '@/typings/components/basic/basicForm'
import type { BasicTableColumn } from '@/typings/components/basic/basicTable'
import { useTag } from '@/hook/useTsx'
import { useDisablePreviousDate } from '@/hook/useRangDate'

const filterOptions = ref<BasicFormOptions[]>([
  {
    component: 'Select',
    bind: {
      label: '用户名',
      path: 'username',
      width: 200
    },
    componentProps: {
      bind: {
        placeholder: '用户名'
      },
      options: []
    }
  },
  {
    component: 'Select',
    bind: {
      label: '状态',
      path: 'receipt',
      width: 140
    },
    componentProps: {
      bind: {
        placeholder: '状态'
      },
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
    component: 'Date',
    bind: {
      label: '登录时间',
      path: 'createdAt',
      width: 440
    },
    componentProps: {
      bind: {
        placeholder: '登录时间',
        type: 'datetimerange',
        isDateDisabled: useDisablePreviousDate
      }
    }
  }
])
const formatColumnFilter = async () => {
  const { list } = await userListApi({ pageSize: '99' })
  filterOptions.value[0].componentProps.options = list.map((item) => ({
    label: item.username,
    value: item.username
  }))
}
formatColumnFilter()

const column: BasicTableColumn[] = [
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
      return rowData.username ? (rowData.username as string) : '-'
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
    render: (rowData) => {
      const text = rowData.receipt === 1 ? '成功' : '失败'
      const type = rowData.receipt === 1 ? 'success' : 'error'
      return useTag(text, { type, size: 'small' })
    }
  },
  {
    key: 'receiptDesc',
    title: '回执原因'
  }
]
</script>
<template>
  <n-card class="main_block">
    <basic-table
      :columns="column"
      :request-api="loginLogApi"
      :list-params="{
        sort: 'desc',
        sortField: 'createdAt'
      }"
      :filter-options="filterOptions"
    ></basic-table>
  </n-card>
</template>
