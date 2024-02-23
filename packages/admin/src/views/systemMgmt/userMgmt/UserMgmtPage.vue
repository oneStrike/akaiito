<script setup lang="ts">
import { useRequest } from '@/hooks/useRequest'
import {
  tableColumns,
  filter,
  toolbar,
  pwdFormOptions,
  formOptions
} from '@/views/systemMgmt/userMgmt/Shared'
import {
  deleteAdminUserApi,
  getUserPageApi,
  updateAdminUserInfoApi,
  updateAdminUserPasswordApi
} from '@/apis/user'
import type { UpdateAdminUserPasswordTypings } from '@/apis/user.d'
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
const formModal = ref(false)
const currentRow = ref<TableItem>()

//更新用户信息
const updateUserInfo = async (val) => {
  formLoading.value = true
  if (Array.isArray(val.avatar)) {
    val.avatar = val.avatar[0].filePath
  }
  await updateAdminUserInfoApi(val)
  formLoading.value = false
  useMessage.success('修改成功!')
  formModal.value = false
  await resetPageRequest()
}

//修改密码
const changePwd = async (val: UpdateAdminUserPasswordTypings['Request']) => {
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
        <el-button
          type="primary"
          link
          @click="(currentRow = row), (formModal = true)"
          >编辑</el-button
        >

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
      v-model:modal="formModal"
      :title="currentRow?.id ? '修改用户' : '添加用户'"
      :options="formOptions"
      :loading="formLoading"
      :default-value="currentRow"
      @submit="updateUserInfo"
      @closed="currentRow = null"
    />

    <modal-form
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
