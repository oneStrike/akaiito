<script setup lang="ts">
import { useRequest } from '@/hooks/useRequest'
import {
  filter,
  toolbar,
  formOptions,
  tableColumns,
  pwdFormOptions
} from '@/views/systemMgmt/userMgmt/Shared'
import {
  createAdminUserApi,
  deleteAdminUserApi,
  getUserPageApi,
  updateAdminUserInfoApi,
  updateAdminUserPasswordApi
} from '@/apis/user'
import type { UpdateAdminUserPasswordTypings } from '@/apis/user.d'
import type { ResolveListItem } from '@akaiito/typings/src'
import { useMessage } from '@/hooks/useFeedback'
import { useUserStore } from '@/stores/modules/user'
import { useFormTool } from '@/hooks/useForm'

type TableItem = ResolveListItem<typeof requestData.value>

const {
  requestPage,
  resetPage,
  sortChange,
  requestData,
  loading,
  requestParams,
  resetRequest
} = useRequest(getUserPageApi)
requestPage()

const userStore = useUserStore()
const pwdModal = ref(false)
const formModal = ref(false)
const currentRow = ref<TableItem>()

const openUpdateUserInfoModal = (row: TableItem) => {
  useFormTool.hideItem(formOptions, ['password', 'confirmPassword'])
  currentRow.value = row
  formModal.value = true
}

//更新用户信息
const updateOrAddUserInfo = async (val) => {
  if (Array.isArray(val.avatar)) {
    val.avatar = val.avatar[0].filePath
  }
  const api = currentRow.value ? updateAdminUserInfoApi : createAdminUserApi
  await api(val)
  useMessage.success(currentRow.value ? '修改成功!' : '添加成功!')
  formModal.value = false
  await resetPage()
  if (val.id === userStore.userInfo.id) {
    console.log(
      '🚀 ~ file:UserMgmtPage method:updateOrAddUserInfo line:58 -----',
      requestData.value.list.filter(
        (item) => item.id === userStore.userInfo.id
      )[0]
    )
    setTimeout(() => {
      userStore.setUserInfo(
        requestData.value.list.filter(
          (item) => item.id === userStore.userInfo.id
        )[0]
      )
    }, 2022)
  }
}

//修改密码
const changePwd = async (val: UpdateAdminUserPasswordTypings['Request']) => {
  val.id = currentRow.value.id
  await updateAdminUserPasswordApi(val)
  useMessage.success({
    message: '修改成功!'
  })
  pwdModal.value = false
  currentRow.value = null
  if (val.id === userStore.userInfo.id) {
    userStore.signOut()
  }
}

const handlerToolbar = () => {
  useFormTool.showItem(formOptions, ['password', 'confirmPassword'])
  currentRow.value = null
  formModal.value = true
}

const switchStatus = async (val) => {
  await updateAdminUserInfoApi(val)
  await resetPage()
}
</script>

<template>
  <div class="main-page" v-loading="loading">
    <es-toolbar
      :toolbar="toolbar"
      :filter="filter"
      @query="resetRequest"
      @handler="handlerToolbar"
    />
    <es-table
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
        <es-switch :request="switchStatus" :row="row" />
      </template>
      <template #action="{ row }">
        <el-button type="primary" link @click="openUpdateUserInfoModal(row)"
          >编辑</el-button
        >

        <el-button
          type="primary"
          link
          @click="(currentRow = row), (pwdModal = true)"
          >修改密码</el-button
        >

        <es-pop-confirm
          :request="deleteAdminUserApi"
          :row="row"
          v-model:loading="loading"
          @success="resetPage()"
        />
      </template>
    </es-table>

    <es-modal-form
      v-model:modal="formModal"
      :title="currentRow?.id ? '修改用户' : '添加用户'"
      :options="formOptions"
      :default-value="currentRow"
      @submit="updateOrAddUserInfo"
      @closed="currentRow = null"
    />

    <es-modal-form
      v-model:modal="pwdModal"
      title="修改密码"
      :options="pwdFormOptions"
      @submit="changePwd"
      @closed="currentRow = null"
    />
  </div>
</template>

<style scoped></style>
