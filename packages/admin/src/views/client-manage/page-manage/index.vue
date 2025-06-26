<script setup lang="ts">
  import type { ClientPageDetailByIdResponse } from '@/apis/types/client-page'
  import * as clientPageApi from '@/apis/client-page'
  import { PromptsEnum } from '@/enum/prompts'
  import {
    filter,
    formOptions,
    tableColumns,
    toolbar,
  } from '@/views/client-manage/page-manage/shared'

  defineOptions({
    name: 'PageMgmt',
  })

  const modalFrom = reactive({
    show: false,
    loading: false,
  })

  const tableRef = useTemplateRef('tableRef')
  const currentRow = ref<ClientPageDetailByIdResponse | null>(null)

  const openFormModal = (row?: ClientPageDetailByIdResponse) => {
    if (row) {
      currentRow.value = row
    }
    modalFrom.show = true
  }
  const submitForm = async (value: ClientPageDetailByIdResponse) => {
    modalFrom.loading = true
    if (currentRow.value?.id) {
      value.id = currentRow.value.id
      await clientPageApi.updateClientPageApi(value)
    } else {
      await clientPageApi.createClientPageApi(value)
    }
    useMessage.success(
      currentRow.value?.id ? PromptsEnum.UPDATED : PromptsEnum.CREATED,
    )
    currentRow.value = null
    modalFrom.loading = false
    modalFrom.show = false
    tableRef.value?.reset()
  }
</script>

<template>
  <div class="main-page">
    <EsTable
      ref="tableRef"
      :columns="tableColumns"
      :toolbar="toolbar"
      :filter="filter"
      :request-api="clientPageApi.clientPagePageApi"
      @toolbar-handler="openFormModal()"
    >
      <template #pageStatus="{ row }">
        <el-text v-if="row.pageStatus === 0" type="info">禁用</el-text>
        <el-text v-if="row.pageStatus === 1" type="primary">正常</el-text>
        <el-text v-if="row.pageStatus === 2" type="warning">开发中</el-text>
        <el-text v-if="row.pageStatus === 3" type="danger">维护中</el-text>
      </template>
      <template #action="{ row }">
        <el-button type="primary" link @click="openFormModal(row)">
          编辑
        </el-button>
        <EsPopConfirm
          :request="clientPageApi.batchDeleteClientPageApi"
          :row="row"
          ids
          @success="tableRef?.reset()"
        />
      </template>
    </EsTable>

    <EsModalForm
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
