<script setup lang="ts">
import { getRequestLogsApi } from '@/apis/logs'
import { useRequest } from '@/hooks/useRequest'
import { filter, tableColumns } from './shared'

const {
  requestPage,
  resetPage,
  sortChange,
  requestData,
  loading,
  requestParams,
} = useRequest(getRequestLogsApi)
requestPage()
</script>

<template>
  <div v-loading="loading" class="main-page">
    <es-toolbar :filter="filter" @query="resetPage" />
    <es-table
      v-model:page-index="requestParams.pageIndex"
      v-model:page-size="requestParams.pageSize"
      :columns="tableColumns"
      :data="requestData?.list ?? []"
      :total="requestData?.total"
      @sort-change="sortChange"
    >
      <template #statusCode="{ row }">
        <el-text v-if="row.statusCode === 200" class="mx-1" type="success">
          操作成功
        </el-text>
        <el-text v-else class="mx-1" type="danger">
          {{ row.statusDesc }}
        </el-text>
      </template>
    </es-table>
  </div>
</template>

<style scoped></style>
