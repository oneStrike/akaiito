<script setup lang="ts">
import { loginLogApi, userListApi } from '@/api/user'
import { columns, search } from '@/views/System/Log/LoginLog/shared'
import { useFillOptions } from '@/hooks/useForm'
import type { BaseFromFilterOptions } from '@/typings/components/base/baseForm'

const getUserList = async () => {
  const userList = await userListApi({ pageSize: '100' })
  const selectUserList: BaseFromFilterOptions[] = []
  userList.list.forEach((item) => {
    selectUserList.push({
      label: item.username,
      value: item.id
    })
  })
  useFillOptions(search, 'userId', selectUserList)
}
getUserList()
</script>

<template>
  <base-table
    :columns="columns"
    :request-api="loginLogApi"
    :filter-options="search"
    :list-params="{ sort: 'desc', sortField: 'createdAt' }"
    align="center"
  />
</template>

<style scoped></style>
