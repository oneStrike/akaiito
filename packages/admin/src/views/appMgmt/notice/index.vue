<script setup lang="ts">
import { createAppNoticeApi, deleteAppNoticeApi, getAppNoticeListApi, updateAppNoticeApi } from '@/apis/AppNotice'
import { getAppPagesApi } from '@/apis/appPageConfig'
import { PromptsEnum } from '@/enum/prompts'
import { useMessage } from '@/hooks/useFeedback'
import { useFormTool } from '@/hooks/useForm'
import { useRequest } from '@/hooks/useRequest'
import { filter, formOptions, tableColumns, toolbar } from '@/views/appMgmt/notice/shared'

defineOptions({
  name: 'NoticePage',
})
type TableItem = ResolveListItem<typeof requestData.value> & { content: string; backgroundImage: string }

const modalFrom = reactive({
  show: false,
  loading: false,
})
const formScheme = useFormTool(formOptions)
getAppPagesApi({ pageSize: '500' }).then((res) => {
  formScheme.specificItem('pageCode', (item) => {
    item.componentProps!.options = res.list.map((item) => ({
      label: item.pageName,
      value: item.pageCode,
    }))
    return item
  })
})

const currentRow = ref<TableItem | null>(null)

const { loading, reset, request, requestData, params } = useRequest(getAppNoticeListApi)

const openFormModal = (row?: TableItem) => {
  if (row) {
    currentRow.value = row
  }
  modalFrom.show = true
}
const submitForm = async (value: TableItem) => {
  modalFrom.loading = true
  if (value.pageCode) {
    const pages = formScheme.getItem('pageCode')[0].componentProps!.options
    value.pageName = pages.find((item) => item.value === value.pageCode)!.label
  }
  if (currentRow.value?.id) {
    value.id = currentRow.value.id
    await updateAppNoticeApi(value)
  } else {
    await createAppNoticeApi(value)
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
    <es-table
      v-model:params="params"
      :filter="filter"
      :toolbar="toolbar"
      :columns="tableColumns"
      :data="requestData?.list ?? []"
      :total="requestData?.total"
      @reset="reset"
      @query="request"
      @toolbar-handler="openFormModal()"
    >
      <template #enableApplet="{ row }">
        <es-switch :row="row" field="enableApplet" :request="updateAppNoticeApi" />
      </template>
      <template #enableWeb="{ row }">
        <es-switch :row="row" field="enableWeb" :request="updateAppNoticeApi" />
      </template>
      <template #enableApp="{ row }">
        <es-switch :row="row" field="enableApp" :request="updateAppNoticeApi" />
      </template>

      <template #status="{ row }">
        <el-text v-if="row.status === 0" type="info">禁用</el-text>
        <el-text v-if="row.status === 1" type="primary">正常</el-text>
        <el-text v-if="row.status === 2" type="warning">开发</el-text>
        <el-text v-if="row.status === 3" type="danger">维护</el-text>
      </template>
      <template #action="{ row }">
        <el-button type="primary" link @click="openFormModal(row)"> 编辑</el-button>
        <es-pop-confirm v-model:loading="loading" :request="deleteAppNoticeApi" :row="row" @success="reset()" />
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
