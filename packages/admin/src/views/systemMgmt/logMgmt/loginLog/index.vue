<script setup lang="ts">
import { getRequestLogsApi } from '@/apis/logs'
import { useRequest } from '@/hooks/useRequest'
import { filter, tableColumns } from '@/views/systemMgmt/logMgmt/loginLog/shared'

defineOptions({
  name: 'LoginLogs',
})

const { loading, reset, request, requestData, sortChange, params } = useRequest(getRequestLogsApi, {
  defaultParams: {
    apiPath: '/admin/user/login',
  },
})
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
      @query="request"
      @reset="reset"
    >
      <template #responseCode="{ row }">
        <el-text v-if="row.responseCode === 200" class="mx-1" type="success"> 登录成功</el-text>
        <el-text v-else class="mx-1" type="danger">
          {{ row.responseDesc }}
        </el-text>
      </template>
    </es-table>
  </div>
</template>

<style scoped></style>
