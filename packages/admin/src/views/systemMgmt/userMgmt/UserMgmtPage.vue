<script setup lang="ts">
import { useRequest } from '@/hooks/useRequest'
import {
  tableColumns,
  filter,
  toolbar,
  pwdFormOptions
} from '@/views/systemMgmt/userMgmt/Shared'
import {
  deleteAdminUserApi,
  getUserPageApi,
  updateAdminUserInfoApi,
  updateAdminUserPasswordApi
} from '@/apis/user'
import BasicSwitch from '@/components/basic/BasicSwitch.vue'
import BasicPopConfirm from '@/components/basic/BasicPopConfirm.vue'
import type { ResolveListItem } from '@akaiito/typings/src'
import { useMessage } from '@/hooks/useFeedback'
import { useUserStore } from '@/stores/modules/user'
type TableItem = ResolveListItem<typeof requestData.value>
const {
  pageRequest,
  resetPageRequest,
  sortChange,
  requestData,
  loading,
  requestParams
} = useRequest(getUserPageApi)
pageRequest()

const userStore = useUserStore()
const formLoading = ref(false)
const pwdModal = ref(false)
const pwdValue = ref()
const currentRow = ref<TableItem>()

//修改密码
const changePwd = async (val) => {
  formLoading.value = true
  val.id = currentRow.value.id
  await updateAdminUserPasswordApi(val)
  formLoading.value = false
  useMessage.success({
    message: '修改成功!'
  })
  pwdModal.value = false
  currentRow.value = null
  if (val.id === userStore.userInfo.id) {
    userStore.signOut()
  }
}
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

        <el-button
          type="primary"
          link
          @click="(currentRow = row), (pwdModal = true)"
          >修改密码</el-button
        >

        <basic-pop-confirm
          :request="deleteAdminUserApi"
          :row="row"
          v-model:loading="loading"
          @success="resetPageRequest()"
        />
      </template>
    </basic-table>

    <modal-form
      v-model="pwdValue"
      v-model:modal="pwdModal"
      title="修改密码"
      :options="pwdFormOptions"
      :loading="formLoading"
      @submit="changePwd"
      @closed="currentRow = null"
    />
  </div>
</template>

<style scoped></style>
