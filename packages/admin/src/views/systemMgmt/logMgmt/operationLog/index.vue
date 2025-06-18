<script setup lang="ts">
  import * as requestLogApi from '@/apis/request-log.ts'
  import { filter, tableColumns } from './shared'

  defineOptions({ name: 'OperationLogs' })
</script>

<template>
  <div class="main-page">
    <es-table
      :filter="filter"
      :columns="tableColumns"
      :request-api="requestLogApi.pageApi"
    >
      <template #responseCode="{ row }">
        <el-text v-if="row.responseCode === 200" class="mx-1" type="success">
          操作成功
        </el-text>
        <el-text v-else class="mx-1" type="danger">
          {{ row.responseDesc }}
        </el-text>
      </template>
    </es-table>
  </div>
</template>

<style scoped></style>
