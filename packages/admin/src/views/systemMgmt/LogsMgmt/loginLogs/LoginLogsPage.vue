<script setup lang="ts">
import { useRequest } from '@/hooks/useRequest'
import { getRequestLogApi } from '@/apis/system'
import { tableColumns } from '@/views/systemMgmt/LogsMgmt/loginLogs/Shared'
import type { ResolveListItem } from '@akaiito/typings/src'

type TableItem = ResolveListItem<typeof requestData.value>

const {
  pageRequest,
  resetPageRequest,
  sortChange,
  requestData,
  loading,
  requestParams
} = useRequest(getRequestLogApi)
requestParams.value.path = '/admin/user/login'
pageRequest()
</script>

<template>
  <div class="main-page" v-loading="loading">
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
