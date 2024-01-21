<script setup lang="ts">
import { useRequest } from '@/hooks/useRequest'
import {
  tableColumns,
  filter
} from '@/views/systemMgmt/LogsMgmt/operationLogs/Shared'
import { getRequestLogsApi } from '@/apis/logs'

const {
  pageRequest,
  resetPageRequest,
  sortChange,
  requestData,
  loading,
  requestParams
} = useRequest(getRequestLogsApi)
pageRequest()
</script>

<template>
  <div class="main-page" v-loading="loading">
    <basic-toolbar :filter="filter" @query="resetPageRequest" />
    <basic-table
      v-model:page-index="requestParams.pageIndex"
      v-model:page-size="requestParams.pageSize"
      :columns="tableColumns"
      :data="requestData?.list ?? []"
      :total="requestData?.total"
      @sort-change="sortChange"
    >
      <template #statusCode="{ row }">
        <el-text class="mx-1" type="success" v-if="row.statusCode === 200"
          >操作成功</el-text
        >
        <el-text class="mx-1" type="danger" v-else>{{
          row.statusDesc
        }}</el-text>
      </template>
    </basic-table>
  </div>
</template>

<style scoped></style>
