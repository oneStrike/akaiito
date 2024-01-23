<script setup lang="ts">
import { useRequest } from '@/hooks/useRequest'
import {
  tableColumns,
  filter
} from '@/views/systemMgmt/LogsMgmt/loginLogs/Shared'
import type { ResolveListItem } from '@akaiito/typings/src'
import { getRequestLogsApi } from '@/apis/logs'

type TableItem = ResolveListItem<typeof requestData.value>

const {
  pageRequest,
  resetPageRequest,
  sortChange,
  requestData,
  loading,
  requestParams
} = useRequest(getRequestLogsApi, {
  path: '/admin/user/login'
})
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
    </basic-table>
  </div>
</template>

<style scoped></style>
