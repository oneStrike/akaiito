<script setup lang="ts">
  import type { CategoryDetailResponse } from '@/apis/types/category'
  import {
    batchUpdateCategoryStatusApi,
    categoryPageApi,
    createCategoryApi,
    deleteBatchApi,
    updateCategoryApi,
  } from '@/apis/category'
  import {
    filter,
    formOptions,
    tableColumns,
    toolbar,
  } from '@/views/content-manage/classify-manage/shared'

  type Record = CategoryDetailResponse

  const tableRef = useTemplateRef('tableRef')
  const formTool = useFormTool(formOptions)
  const currentRow = ref<Record | null>(null)
  const formModal = reactive({
    show: false,
    loading: false,
  })

  const openEditForm = (row: Record) => {
    currentRow.value = row
    formModal.show = true
  }

  async function submitForm(val: Record) {
    formModal.loading = true
    if (currentRow.value?.id) {
      val.id = currentRow.value.id
      await updateCategoryApi(val)
    } else {
      await createCategoryApi(val)
    }
    formModal.show = false
    formModal.loading = false
    useMessage.success({
      message: currentRow.value?.id ? '修改成功!' : '新增成功！',
    })
    currentRow.value = null
    tableRef.value?.refresh()
  }

  function toolbarHandler() {
    formModal.show = true
  }
</script>

<template>
  <div class="main-page pb-6">
    <EsTable
      ref="tableRef"
      :filter="filter"
      :toolbar="toolbar"
      :columns="tableColumns"
      :request-api="categoryPageApi"
      @toolbar-handler="toolbarHandler"
    >
      <template #isEnabled="{ row }">
        <es-switch
          :request="batchUpdateCategoryStatusApi"
          ids
          :row="row"
          @success="tableRef?.refresh()"
        />
      </template>

      <template #action="{ row }">
        <el-button type="primary" link @click="openEditForm(row)">
          编辑
        </el-button>
        <EsPopConfirm
          :request="deleteBatchApi"
          ids
          :row="row"
          :disabled="row.isEnabled"
          @success="tableRef?.reset()"
        />
      </template>
    </EsTable>

    <EsModalForm
      v-model:show="formModal.show"
      v-model:loading="formModal.loading"
      :title="currentRow?.id ? '修改分类' : '新增分类'"
      :options="formTool.options"
      :default-value="currentRow"
      :width="600"
      @submit="submitForm"
      @closed="currentRow = null"
    />
  </div>
</template>

<style scoped></style>
