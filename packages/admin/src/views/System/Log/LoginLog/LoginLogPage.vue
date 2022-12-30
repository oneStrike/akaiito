<script setup lang="ts">
import { loginLogApi, userListApi } from '@/api/user/user'
import type { LogLoginLogResponse } from '@/typings/httpTypes/log/loginLog'
import type { UserUserListResponse } from '@/typings/httpTypes/user/userList'
import { findFormItem, formatFormItem } from '@/utils'
import { search, column } from '@/views/System/Log/LoginLog/shared'

const searchValue = ref()
const userList = ref<UserUserListResponse['list']>()
const logList = ref<LogLoginLogResponse>()
const getUserList = async () => {
  userList.value = (await userListApi({ pageSize: 99 })).list
  const usernameOptions = findFormItem(search, 'username')
  if (usernameOptions) {
    usernameOptions['componentProps']['options'] = formatFormItem(
      userList.value,
      'username',
      'username'
    )
  }
}
getUserList()
</script>

<template>
  <div class="container">
    <basic-table
      v-model:model-value="logList"
      v-model:filters="searchValue"
      :searchOptions="search"
      :requestApi="loginLogApi"
      :column-options="column"
    ></basic-table>
  </div>
</template>

<style scoped></style>
