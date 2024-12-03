<script setup lang="ts">
import { getRequestLogsApi } from '@/apis/logs'
import { filter, tableColumns } from './shared'

defineOptions({ name: 'OperationLogs' })
const { reset, sortChange, requestData, loading, params } = useRequest(getRequestLogsApi)
</script>

<template>
  <div v-loading="loading" class="main-page">
    <es-table
      v-model:params="params"
      :filter="filter"
      :columns="tableColumns"
      :data="requestData?.list ?? []"
      :total="requestData?.total"
      @sort-change="sortChange"
    >
      <template #responseCode="{ row }">
        <el-text v-if="row.responseCode === 200" class="mx-1" type="success"> 操作成功</el-text>
        <el-text v-else class="mx-1" type="danger">
          {{ row.responseDesc }}
        </el-text>
      </template>
    </es-table>
  </div>
</template>

<style scoped></style>
