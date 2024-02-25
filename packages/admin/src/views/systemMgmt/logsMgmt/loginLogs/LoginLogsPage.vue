<script setup lang="ts">
import { useRequest } from '@/hooks/useRequest'
import {
  tableColumns,
  filter
} from '@/views/systemMgmt/logsMgmt/loginLogs/Shared'
import { getRequestLogsApi } from '@/apis/logs'

const {
  requestPage,
  resetPage,
  sortChange,
  requestData,
  loading,
  requestParams
} = useRequest(getRequestLogsApi, {
  path: '/admin/user/login'
})
requestPage()
</script>

<template>
  <div class="main-page" v-loading="loading">
    <basic-toolbar :filter="filter" @query="resetPage" />
    <basic-table
      v-model:page-index="requestParams.pageIndex"
      v-model:page-size="requestParams.pageSize"
      :columns="tableColumns"
      :data="requestData?.list ?? []"
      :total="requestData?.total"
      @sort-change="sortChange"
    >
    </basic-table>
  </div>
</template>

<style scoped></style>
