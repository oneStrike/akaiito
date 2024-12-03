<script setup lang="ts">
import { createAppPageApi, deleteAppPageApi, getAppPagesApi, updateAppPageApi } from '@/apis/appPageConfig'
import { PromptsEnum } from '@/enum/prompts'
import { filter, formOptions, tableColumns, toolbar } from '@/views/appMgmt/pageMgmt/shared'

defineOptions({
  name: 'PageMgmt',
})
type TableItem = ResolveListItem<typeof requestData.value>

const modalFrom = reactive({
  show: false,
  loading: false,
})

const currentRow = ref<TableItem | null>(null)

const { loading, reset, requestData, params } = useRequest(getAppPagesApi)

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
    await updateAppPageApi(value)
  } else {
    await createAppPageApi(value)
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
      <template #pageRule="{ row }">
        <el-text v-if="row.pageRule === 1" type="info">普通</el-text>
        <el-text v-if="row.pageRule === 2" type="primary">登录</el-text>
        <el-text v-if="row.pageRule === 3" type="danger">会员</el-text>
      </template>

      <template #status="{ row }">
        <el-text v-if="row.status === 0" type="info">禁用</el-text>
        <el-text v-if="row.status === 1" type="primary">正常</el-text>
        <el-text v-if="row.status === 2" type="warning">开发</el-text>
        <el-text v-if="row.status === 3" type="danger">维护</el-text>
      </template>
      <template #action="{ row }">
        <el-button type="primary" link @click="openFormModal(row)"> 编辑</el-button>
        <es-pop-confirm v-model:loading="loading" :request="deleteAppPageApi" :row="row" @success="reset()" />
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
