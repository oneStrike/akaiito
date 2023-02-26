<script setup lang="ts">
import { column } from '@/views/systemManage/loginLog/shared'
import { loginLogApi } from '@/api/user'
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
    ></basic-table>
  </n-card>
</template>
