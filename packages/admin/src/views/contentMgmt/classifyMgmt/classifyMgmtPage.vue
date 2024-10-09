<script setup lang="ts">
import { filter, toolbar } from '@/views/contentMgmt/classifyMgmt/shared'
import { tableColumns } from '@/views/contentMgmt/authorsMgmt/shared'
import { useRequest } from '@/hooks/useRequest'
import { getCategoryListApi } from '@/apis/category'

const { requestData, params, sortChange, reset } = useRequest(getCategoryListApi)
</script>

<template>
  <div class="main-page pb-6">
    <es-toolbar :toolbar="toolbar" :filter="filter" />
    <es-table
      v-model:page-index="params.pageIndex"
      v-model:page-size="params.pageSize"
      :columns="tableColumns"
      :data="requestData?.list ?? []"
      :total="requestData?.total"
      @sort-change="sortChange"
    ></es-table>
  </div>
</template>

<style scoped></style>
