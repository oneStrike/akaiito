<script setup lang="ts">
import { search, column, batchBtn, form } from '@/views/Operate/Privacy/shared'
import { Hint } from '@/utils/hint'
import { useMessage } from '@/hooks/useMessage'
import { useUserStore } from '@/stores'
import {
  deletePrivacyApi,
  getPrivacyPageApi,
  addPrivacyApi,
  getPrivacyDetailApi,
  switchPrivacyStatusApi
} from '@/api/privacy'
import type {
  AdminAddPrivacyReq,
  AdminGetPrivacyDetailRes,
  AdminGetPrivacyPageRes
} from '~@/apiTypes/privacy'
import ModalHtml from '@/components/Shared/ModalHtml.vue'
import type { TableInstanceRef } from '@/typings/components/basicTable'
import { useConfirmDialog } from '@vueuse/core'
import { useConfirm } from '@/hooks/useConfirm'

const userStore = useUserStore()
const showFormDialog = ref(false)
const tableRef = ref<TableInstanceRef>()
//打开表单弹窗
const currentPrivacy = ref<AdminGetPrivacyDetailRes | Record<string, any>>({})

const openDialog = (val?: AdminGetPrivacyDetailRes) => {
  if (val) currentPrivacy.value = val
  showFormDialog.value = true
}

//启用或者禁用
const switchStatus = async (
  row: AdminGetPrivacyDetailRes & { loading: boolean }
) => {
  try {
    row.loading = true
    await switchPrivacyStatusApi({
      ids: [row.id],
      status: row.status === 1 ? 0 : 1
    })
    useMessage('success', Hint.OPT_SUC)
    row.loading = false
    return await tableRef.value?.resetTable()
  } catch (e) {
    row.loading = false
    return false
  }
}

//添加或编辑
const addPrivacy = async (val: AdminAddPrivacyReq) => {
  val.status = 1
  await addPrivacyApi(val)
  await tableRef.value?.resetTable()
  useMessage('success', Hint.ADD_SUC)
  closeDialog()
}

//编辑
const editPrivacy = async (val: AdminGetPrivacyDetailRes) => {
  currentPrivacy.value = await getPrivacyDetailApi({ id: val.id.toString() })
  showFormDialog.value = true
}

const deletePrivacy = async (val: AdminGetPrivacyDetailRes) => {
  await deletePrivacyApi({ id: val.id })
  useMessage('success', Hint.DEL_SUC)
  await tableRef.value?.resetTable()
}

//处理批量操作
const handlerBatch = (val: number) => {
  const { ids } = tableRef.value!.getSelectionRowsAndIds()

  let tips = ''
  switch (val) {
    case 1:
      tips = '确认批量禁用吗？'
      break
    case 2:
      tips = '确认批量启用吗？'
      break
    case 3:
      tips = '确认批量删除吗？'
      break
  }
  useConfirm({
    title: '提示',
    content: tips,
    confirm: async () => {
      switch (val) {
        case 1:
        case 2:
          tips = '确认批量启用吗？'
          await switchPrivacyStatusApi({ ids, status: val === 1 ? 0 : 1 })
          useMessage('success', Hint.OPT_SUC)
          break
        case 3:
          tips = '确认批量删除吗？'
          await deletePrivacyApi({ ids })
          break
      }
      tableRef.value?.resetTable()
    }
  })
}

//展示详情
const showDetailDialog = ref(false)
const showPrivacyDetail = async (
  val: AdminGetPrivacyPageRes['list'][number]
) => {
  currentPrivacy.value = await getPrivacyDetailApi({ id: val.id.toString() })
  showDetailDialog.value = true
}

const closeDialog = () => {
  currentPrivacy.value = {}
  showDetailDialog.value = false
  showFormDialog.value = false
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
      @handlerLink="showPrivacyDetail"
    >
      <template #searchHeader>
        <el-button @click="openDialog()" type="primary">新增</el-button>
      </template>

      <template #status="{ row, scope }">
        <el-switch
          v-model="row.status"
          :active-value="1"
          :inactive-value="0"
          :loading="!!row.loading"
          :before-change="() => switchStatus(scope.row)"
        />
      </template>
    </basic-table>

    <el-dialog
      v-if="showFormDialog"
      v-model="showFormDialog"
      :title="currentPrivacy.id ? '编辑' : '新增'"
      width="60%"
      top="8vh"
      style="height: 85vh; overflow-y: auto"
      :before-close="() => ((showFormDialog = false), (currentPrivacy = {}))"
    >
      <basic-form v-model="currentPrivacy" :options="form" @submit="addPrivacy">
      </basic-form>
    </el-dialog>

    <modal-html
      :content="currentPrivacy.content"
      :visible="showDetailDialog"
      @closed="closeDialog"
    ></modal-html>
  </div>
</template>

<style scoped></style>
