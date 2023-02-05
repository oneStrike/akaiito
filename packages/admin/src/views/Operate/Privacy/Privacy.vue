<script setup lang="ts">
import { search, column, batchBtn, form } from '@/views/Operate/Privacy/shared'
import { Hint } from '@/utils/hint'
import { useMessage } from '@/hooks/useMessage'
import { useUserStore } from '@/stores'
import type { UserInfo } from '@/typings/user/user'
import { findFormItem } from '@/utils'
import config from '@/config'
import {
  deletePrivacyApi,
  switchStatusApi,
  getPrivacyPageApi
} from '@/api/privacy'

const userStore = useUserStore()
const dialogVisible = ref(false)
const userForm = ref<UserInfo | any>({})

const switchStatus = () => {
  console.log('🚀 ~ file:Privacy method:switchStatus line:20 -----', 1)
}
const addPrivacy = () => {
  dialogVisible.value = true
}
const deletePrivacy = () => {
  console.log('🚀 ~ file:Privacy method:deletePrivacy line:26 -----', 1)
}

//处理批量操作
const handlerBatch = () => {
  console.log('🚀 ~ file:Privacy method:handlerBatch line:31 -----', 1)
}
</script>

<template>
  <div class="container">
    <basic-table
      ref="tableRef"
      :searchOptions="search"
      :batchBtn="batchBtn"
      :requestApi="getPrivacyPageApi"
      :column-options="column"
      type="selection"
      @batch="handlerBatch"
    >
      <template #searchHeader>
        <el-button @click="addPrivacy" type="primary">新增</el-button>
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
          size="small"
          type="primary"
          plain
          >编辑</el-button
        >
        <el-popconfirm
          width="200"
          @confirm="deletePrivacy(scope.row)"
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
      width="60%"
      top="8vh"
      style="height: 85vh; overflow-y: auto"
      :before-close="() => ((dialogVisible = false), (userForm = {}))"
    >
      <basic-form
        v-model="userForm"
        :options="form"
        :remove-auto-fill-input="true"
        @submit="addPrivacy"
      >
      </basic-form>
    </el-dialog>
  </div>
</template>

<style scoped></style>
