<script setup lang="ts">
  import * as requestLogApi from '@/apis/request-log.ts'
  import {
    filter,
    tableColumns,
  } from '@/views/system-manage/request-log/login-log/shared'

  defineOptions({
    name: 'LoginLogs',
  })

  const params = reactive({
    requestPath: '/api/admin/user/login',
  })
</script>

<template>
  <div class="main-page">
    <es-table
      :params="params"
      :filter="filter"
      :columns="tableColumns"
      :request-api="requestLogApi.pageApi"
    >
      <template #responseCode="{ row }">
        <el-text v-if="row.responseCode === 200" class="mx-1" type="success">
          成功
        </el-text>
        <el-text v-else class="mx-1" type="danger">
          {{ row.responseMessage }}
        </el-text>
      </template>
    </es-table>
  </div>
</template>

<style scoped></style>
