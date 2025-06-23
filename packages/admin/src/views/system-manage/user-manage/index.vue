<script setup lang="ts">
  import type { UserInfoByIdResponse } from '@/apis/types/user'
  import * as userAPi from '@/apis/user'
  import { useUserStore } from '@/stores/modules/user'
  import {
    filter,
    formOptions,
    pwdFormOptions,
    tableColumns,
    toolbar,
  } from '@/views/system-manage/user-manage/shared'

  defineOptions({
    name: 'UserMgmt',
  })

  type TableItem = UserInfoByIdResponse

  const tableRef = useTemplateRef('tableRef')
  const userStore = useUserStore()
  const pwdModal = ref(false)
  const formModal = ref(false)
  const currentRow = ref<TableItem | null>(null)

  const formTool = useFormTool(formOptions)

  function openUpdateUserInfoModal(row: TableItem) {
    formTool.toggleDisplay(['password', 'confirmPassword'], false)
    currentRow.value = row
    formModal.value = true
  }

  // 更新用户信息
  async function updateOrAddUserInfo(val: any) {
    if (Array.isArray(val.avatar)) {
      val.avatar = val.avatar[0].filePath
    }
    const api = currentRow.value
      ? userAPi.userUpdateInfoApi
      : userAPi.userRegisterApi
    await api(val)
    useMessage.success(currentRow.value ? '修改成功!' : '添加成功!')
    formModal.value = false
    tableRef.value?.reset()
    if (val.id === userStore.userInfo?.id && tableRef.value?.tableData) {
      const target = tableRef.value?.tableData.filter(
        (item) => item.id === userStore.userInfo?.id,
      )[0]
      userStore.setUserInfo(target)
    }
  }

  // 修改密码
  async function changePwd(val: any) {
    if (currentRow.value) {
      val.id = currentRow.value.id
      // await updateAdminUserPasswordApi(val)
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
    formTool.toggleDisplay(['password', 'confirmPassword'], true)
    currentRow.value = null
    formModal.value = true
  }

  async function switchStatus(val: any) {
    await userAPi.userUpdateInfoApi(val)
    tableRef.value?.refresh()
  }
</script>

<template>
  <div class="main-page">
    <EsTable
      ref="tableRef"
      :toolbar="toolbar"
      :filter="filter"
      :columns="tableColumns"
      :request-api="userAPi.userPageApi"
      @toolbar-handler="handlerToolbar"
    >
      <template #username="{ row }">
        <div class="w-full flex items-center justify-center">
          <el-avatar v-if="row.avatar" :src="row.avatar" class="mr-4" />
          <span>{{ row.username }}</span>
        </div>
      </template>

      <template #isRoot="{ row }">
        <el-text v-if="row.isRoot" type="primary">超级管理员</el-text>
        <el-text v-else>普通管理员</el-text>
      </template>

      <template #status="{ row }">
        <EsSwitch
          :request="switchStatus"
          :row="row"
          field="status"
          :disabled="row.id === userStore.userInfo?.id"
        />
      </template>
      <template #action="{ row }">
        <el-button type="primary" link @click="openUpdateUserInfoModal(row)">
          编辑
        </el-button>

        <el-button
          type="primary"
          link
          @click="((currentRow = row), (pwdModal = true))"
        >
          修改密码
        </el-button>

        <EsPopConfirm
          :row="row"
          :request="userAPi.userDeleteApi"
          :disabled="row.id === userStore.userInfo?.id"
          @success="tableRef?.refresh()"
        />
      </template>
    </EsTable>

    <EsModalForm
      v-model:show="formModal"
      :title="currentRow?.id ? '修改用户' : '添加用户'"
      :options="formTool.options"
      :default-value="currentRow"
      @submit="updateOrAddUserInfo"
      @closed="currentRow = null"
    />

    <EsModalForm
      v-model:show="pwdModal"
      title="修改密码"
      :options="pwdFormOptions"
      @submit="changePwd"
      @closed="currentRow = null"
    />
  </div>
</template>

<style scoped></style>
