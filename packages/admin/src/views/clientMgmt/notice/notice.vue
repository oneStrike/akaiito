<script setup lang="ts">
import {
  createClientNotificationApi,
  deleteClientNotificationApi,
  getClientNotificationListApi,
  updateClientNotificationApi,
} from '@/apis/clientNotification'
import { PromptsEnum } from '@/enum/prompts'
import { useMessage } from '@/hooks/useFeedback'
import { useRequest } from '@/hooks/useRequest'
import { formOptions, tableColumns } from '@/views/clientMgmt/notice/shared'
import { filter, toolbar } from '@/views/clientMgmt/pageConfig/shared'

defineOptions({
  name: 'NoticePage',
})
type TableItem = ResolveListItem<typeof requestData.value> & { content: string; backgroundImage: string }

const modalFrom = reactive({
  show: false,
  loading: false,
})

const currentRow = ref<TableItem | null>(null)

const { loading, reset, requestData, params } = useRequest(getClientNotificationListApi, {
  type: 'page',
})

const openFormModal = (row?: TableItem) => {
  if (row) {
    currentRow.value = row
  }
  modalFrom.show = true
}
const submitForm = async (value: TableItem) => {
  modalFrom.loading = true
  if (currentRow.value?.id) {
    value.id = currentRow.value.id
    await updateClientNotificationApi(value)
  } else {
    await createClientNotificationApi(value)
  }
  useMessage.success(currentRow.value?.id ? PromptsEnum.UPDATED : PromptsEnum.CREATED)
  currentRow.value = null
  modalFrom.loading = false
  modalFrom.show = false
  await reset()
}
</script>

<template>
  <div v-loading="loading" class="main-page">
    <es-toolbar :toolbar="toolbar" :filter="filter" @query="reset" @reset="reset" @handler="openFormModal()" />
    <es-table
      v-model:page-index="params.pageIndex"
      v-model:page-size="params.pageSize"
      :columns="tableColumns"
      :data="requestData?.list ?? []"
      :total="requestData?.total"
    >
      <template #enableApplet="{ row }">
        <es-switch :row="row" field="enableApplet" :request="updateClientNotificationApi" />
      </template>
      <template #enableWeb="{ row }">
        <es-switch :row="row" field="enableWeb" :request="updateClientNotificationApi" />
      </template>
      <template #enableApp="{ row }">
        <es-switch :row="row" field="enableApp" :request="updateClientNotificationApi" />
      </template>

      <template #status="{ row }">
        <el-text v-if="row.status === 0" type="info">禁用</el-text>
        <el-text v-if="row.status === 1" type="primary">正常</el-text>
        <el-text v-if="row.status === 2" type="warning">开发</el-text>
        <el-text v-if="row.status === 3" type="danger">维护</el-text>
      </template>
      <template #action="{ row }">
        <el-button type="primary" link @click="openFormModal(row)"> 编辑</el-button>
        <es-pop-confirm
          v-model:loading="loading"
          :request="deleteClientNotificationApi"
          :row="row"
          @success="reset()"
        />
      </template>
    </es-table>

    <es-modal-form
      v-model:show="modalFrom.show"
      v-model:loading="modalFrom.loading"
      :default-value="currentRow"
      :title="currentRow ? '编辑' : '添加'"
      :options="formOptions"
      @submit="submitForm"
    />
  </div>
</template>

<style scoped lang="scss"></style>
