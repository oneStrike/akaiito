<script setup lang="ts">
import {
  createAdminUserApi,
  deleteAdminUserApi,
  getUserPageApi,
  updateAdminUserInfoApi,
  updateAdminUserPasswordApi,
} from '@/apis/user'
import { useMessage } from '@/hooks/useFeedback'
import { useFormTool } from '@/hooks/useForm'
import { useRequest } from '@/hooks/useRequest'
import { useUserStore } from '@/stores/modules/user'
import { filter, formOptions, pwdFormOptions, tableColumns, toolbar } from '@/views/systemMgmt/userMgmt/shared'

defineOptions({
  name: 'UserMgmt',
})

type TableItem = ResolveListItem<typeof requestData.value>

const { reset, sortChange, requestData, loading, params } = useRequest(getUserPageApi)

const userStore = useUserStore()
const pwdModal = ref(false)
const formModal = ref(false)
const currentRow = ref<TableItem | null>()

const formScheme = useFormTool(formOptions)

function openUpdateUserInfoModal(row: TableItem) {
  formScheme.toggleDisplay(['password', 'confirmPassword'], false)
  currentRow.value = row
  formModal.value = true
}

// 更新用户信息
async function updateOrAddUserInfo(val: any) {
  if (Array.isArray(val.avatar)) {
    val.avatar = val.avatar[0].filePath
  }
  const api = currentRow.value ? updateAdminUserInfoApi : createAdminUserApi
  await api(val)
  useMessage.success(currentRow.value ? '修改成功!' : '添加成功!')
  formModal.value = false
  await reset()
  if (val.id === userStore.userInfo?.id && requestData.value) {
    const target = requestData.value.list.filter((item) => item.id === userStore.userInfo?.id)[0]
    userStore.setUserInfo(target)
  }
}

// 修改密码
async function changePwd(val: any) {
  if (currentRow.value) {
    val.id = currentRow.value.id
    await updateAdminUserPasswordApi(val)
    useMessage.success({
      message: '修改成功!',
    })
    pwdModal.value = false
    currentRow.value = null
    if (val.id === userStore.userInfo?.id) {
      userStore.signOut()
    }
  }
}

function handlerToolbar() {
  formScheme.toggleDisplay(['password', 'confirmPassword'], true)
  currentRow.value = null
  formModal.value = true
}

async function switchStatus(val: any) {
  await updateAdminUserInfoApi(val)
  await reset()
}
</script>

<template>
  <div v-loading="loading" class="main-page">
    <es-toolbar :toolbar="toolbar" :filter="filter" @query="reset" @reset="reset" @handler="handlerToolbar" />
    <es-table
      v-model:page-index="params.pageIndex"
      v-model:page-size="params.pageSize"
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
        <el-text v-if="row.isRoot === 1" type="primary"> 超级管理员</el-text>
        <el-text v-else> 普通管理员</el-text>
      </template>

      <template #status="{ row }">
        <es-switch :request="switchStatus" :row="row" />
      </template>
      <template #action="{ row }">
        <el-button type="primary" link @click="openUpdateUserInfoModal(row)"> 编辑</el-button>

        <el-button type="primary" link @click="(currentRow = row), (pwdModal = true)"> 修改密码</el-button>

        <es-pop-confirm v-model:loading="loading" :request="deleteAdminUserApi" :row="row" @success="reset()" />
      </template>
    </es-table>

    <es-modal-form
      v-model:modal="formModal"
      :title="currentRow?.id ? '修改用户' : '添加用户'"
      :options="formScheme.formOptions"
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
