<script setup lang="ts">
import { useRequest } from '@/hooks/useRequest'
import {
  tableColumns,
  filter,
  toolbar
} from '@/views/systemMgmt/userMgmt/Shared'
import { getUserPageApi, updateAdminUserInfoApi } from '@/apis/user'
import BasicSwitch from '@/components/basic/BasicSwitch.vue'
import { deleteDataDictionaryApi } from '@/apis/dictionary'
import BasicPopConfirm from '@/components/basic/BasicPopConfirm.vue'

const {
  pageRequest,
  resetPageRequest,
  sortChange,
  requestData,
  loading,
  requestParams
} = useRequest(getUserPageApi)
pageRequest()
</script>

<template>
  <div class="main-page" v-loading="loading">
    <basic-toolbar
      :toolbar="toolbar"
      :filter="filter"
      @query="resetPageRequest"
    />
    <basic-table
      v-model:page-index="requestParams.pageIndex"
      v-model:page-size="requestParams.pageSize"
      :columns="tableColumns"
      :data="requestData?.list ?? []"
      :total="requestData?.total"
      @sort-change="sortChange"
    >
      <template #username="{ row }">
        <div class="flex-center">
          <el-avatar :src="row.avatar" class="mr-4" />
          <span>{{ row.username }}</span>
        </div>
      </template>

      <template #isRoot="{ row }">
        <el-text v-if="row.isRoot === 1" type="primary">超级管理员</el-text>
        <el-text v-else>普通管理员</el-text>
      </template>

      <template #status="{ row }">
        <basic-switch :request="updateAdminUserInfoApi" :row="row" />
      </template>
      <template #action="{ row }">
        <el-button type="primary" link @click="edit(row)">编辑</el-button>
        <basic-pop-confirm
          :request="deleteUs"
          :row="row"
          ids
          v-model:loading="loading"
          @success="resetPageRequest()"
        />
      </template>
    </basic-table>
  </div>
</template>

<style scoped></style>
