<script setup lang="ts">
  import * as requestLogApi from '@/apis/request-log.ts'
  import { filter, tableColumns } from './shared'

  defineOptions({ name: 'OperationLogs' })
</script>

<template>
  <div class="main-page">
    <EsTable
      :filter="filter"
      :columns="tableColumns"
      :request-api="requestLogApi.pageApi"
    >
      <template #responseCode="{ row }">
        <el-text
          class="mx-1"
          :type="row.responseCode === 200 ? 'success' : 'danger'"
        >
          {{ row.responseCode }}
        </el-text>
      </template>
    </EsTable>
  </div>
</template>

<style scoped></style>
