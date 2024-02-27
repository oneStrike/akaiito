<script setup lang="ts">
import { useRequest } from '@/hooks/useRequest'
import {
  tableColumns,
  filter
} from '@/views/systemMgmt/logsMgmt/loginLogs/Shared'
import { getRequestLogsApi } from '@/apis/logs'

const {
  requestPage,
  resetRequest,
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
    <es-toolbar :filter="filter" @query="resetRequest" />
    <es-table
      v-model:page-index="requestParams.pageIndex"
      v-model:page-size="requestParams.pageSize"
      :columns="tableColumns"
      :data="requestData?.list ?? []"
      :total="requestData?.total"
      @sort-change="sortChange"
    >
      <template #statusCode="{ row }">
        <el-text class="mx-1" type="success" v-if="row.statusCode === 200"
          >登录成功</el-text
        >
        <el-text class="mx-1" type="danger" v-else>{{
          row.statusDesc
        }}</el-text>
      </template>
    </es-table>
  </div>
</template>

<style scoped></style>
