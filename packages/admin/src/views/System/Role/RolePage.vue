<script setup lang="ts">
import {
  createUserApi,
  deleteUserApi,
  updateUserInfoApi,
  statusSwitchApi,
  userListApi
} from '@/api/user/user'
import { search, column, form, pwdForm } from '@/views/System/Role/shared'
import { Hint } from '@/utils/hint'
import { useMessage } from '@/hooks/useMessage'
import { useUserStore } from '@/stores'
import type { TUserInfo } from '~@/user/user'
import { findFormItem } from '@/utils'
import config from '@/config'

const userStore = useUserStore()
const dialogVisible = ref(false)
const userForm = ref<TUserInfo | any>({})

const switchStatus = async ({ row }: any) => {
  if (!row.id) return
  row.loading = true
  await statusSwitchApi({ id: row.id, status: row.status })
  useMessage('success', Hint.UPD_SUC)
  row.loading = false
}

const tableRef = ref()
const deleteUser = async (val: any) => {
  await deleteUserApi({ id: val.id as number })
  useMessage('success', Hint.DEL_SUC)
  await tableRef.value.resetTable()
}

const handlerDialog = async (val: any) => {
  if (Array.isArray(val.avatar)) val.avatar = val.avatar[0].path
  if (userForm.value.id) {
    //编辑用户
    await updateUserInfoApi(val)
    useMessage('success', Hint.UPD_SUC)
  } else {
    //添加新用户
    await createUserApi(val)
    useMessage('success', Hint.ADD_SUC)
  }
  dialogVisible.value = false
  userForm.value = {}
  await tableRef.value.resetTable()
}

const showDialog = (val?: any) => {
  if (val) {
    userForm.value = JSON.parse(JSON.stringify(val))
    userForm.value.avatar = config.FILE_PATH + userForm.value.avatar
    if (findFormItem(form, 'password')) {
      form.pop()
      form.pop()
    }
  } else {
    if (!findFormItem(form, 'password')) {
      form.push(...pwdForm)
    }
  }

  dialogVisible.value = true
}
</script>

<template>
  <div class="container">
    <basic-table
      ref="tableRef"
      :searchOptions="search"
      :requestApi="userListApi"
      :column-options="column"
    >
      <template #searchHeader>
        <el-button @click="showDialog()" type="primary">新增</el-button>
      </template>
      <template #status="{ row, scope }">
        <el-switch
          v-model="row.status"
          :disabled="userStore.userInfo.id === row.id"
          :active-value="1"
          :inactive-value="0"
          :loading="!!row.loading"
          @change="() => switchStatus(scope)"
        />
      </template>
      <template #action="{ scope, row }">
        <el-button
          :disabled="userStore.userInfo.id === row.id"
          @click="showDialog(scope.row)"
          size="small"
          type="primary"
          plain
          >编辑</el-button
        >
        <el-popconfirm
          width="200"
          @confirm="deleteUser(scope.row)"
          :title="`确定删除${row.username}？`"
        >
          <template #reference>
            <el-button
              :disabled="userStore.userInfo.id === row.id"
              size="small"
              type="danger"
              plain
            >
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </basic-table>

    <el-dialog
      v-if="dialogVisible"
      v-model="dialogVisible"
      :title="userForm.username ? '编辑' : '新增'"
      width="50%"
      top="8vh"
      :before-close="() => ((dialogVisible = false), (userForm = {}))"
    >
      <basic-form
        v-model="userForm"
        @submit="handlerDialog"
        :options="form"
        :remove-auto-fill-input="true"
      >
        <template #upload>
          <el-avatar
            :src="$FILE_PATH + userForm.avatar"
            size="large"
          ></el-avatar>
        </template>
      </basic-form>
    </el-dialog>
  </div>
</template>

<style scoped></style>
