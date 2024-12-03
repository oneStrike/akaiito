<script setup lang="ts">
import type { GetCategoryPageTypesRes } from '@/apis/types/category'
import {
  createCategoryApi,
  deleteCategoryApi,
  getCategoryPageApi,
  updateCategoryApi,
  updateCategoryStatusApi,
} from '@/apis/category'
import { useMessage } from '@/hooks/useFeedback'
import { useFormTool } from '@/hooks/useForm'
import { useRequest } from '@/hooks/useRequest'
import { filter, formOptions, tableColumns, toolbar } from '@/views/contentMgmt/classifyMgmt/shared'

type Record = GetCategoryPageTypesRes['list'][number] & { contentModel: string }

const formTool = useFormTool(formOptions)
const currentRow = ref<Record | null>(null)
const formModal = reactive({
  show: false,
  loading: false,
})
const { requestData, params, sortChange, reset, request, loading } = useRequest(getCategoryPageApi)

async function switchStatus(val: any) {
  await updateCategoryStatusApi(val)
  await request()
}

const openEditForm = (row: Record) => {
  const { novelApplicable, comicApplicable, illustratorApplicable, photosApplicable } = row
  const contentModel = []
  if (novelApplicable) {
    contentModel.push(1)
  }
  if (comicApplicable) {
    contentModel.push(2)
  }
  if (illustratorApplicable) {
    contentModel.push(3)
  }
  if (photosApplicable) {
    contentModel.push(4)
  }
  row.contentModel = contentModel.join(',')
  currentRow.value = row
  formModal.show = true
}

const formatModelType = (contentModel: string, d: number | string = 0) => {
  return {
    novelApplicable: contentModel.includes('1') ? 1 : d,
    comicApplicable: contentModel.includes('2') ? 1 : d,
    illustratorApplicable: contentModel.includes('3') ? 1 : d,
    photoApplicable: contentModel.includes('4') ? 1 : d,
  }
}

async function submitForm(val: Record) {
  formModal.loading = true
  val = Object.assign(val, formatModelType(val.contentModel))
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
  request()
}

const filterCategory = (val: IterateObject) => {
  request(Object.assign(JSON.parse(JSON.stringify(val)), formatModelType(val.contentModel?.join(',') ?? '', '')))
}

function toolbarHandler() {
  formModal.show = true
}
</script>

<template>
  <div v-loading="loading" class="main-page pb-6">
    <es-table
      v-model:params="params"
      :filter="filter"
      :toolbar="toolbar"
      :columns="tableColumns"
      :data="requestData?.list ?? []"
      :total="requestData?.total"
      @sort-change="sortChange"
      @toolbar-handler="toolbarHandler"
      @reset="reset"
      @query="request"
    >
      <template #status="{ row }">
        <es-switch :request="switchStatus" :row="row" />
      </template>

      <template #action="{ row }">
        <el-button type="primary" link @click="openEditForm(row)">编辑</el-button>
        <es-pop-confirm v-model:loading="loading" :request="deleteCategoryApi" :row="row" @success="reset()" />
      </template>
    </es-table>

    <es-modal-form
      v-model:show="formModal.show"
      v-model:loading="formModal.loading"
      :title="currentRow?.id ? '修改分类' : '新增分类'"
      :options="formTool.options"
      :default-value="currentRow"
      @submit="submitForm"
      @closed="currentRow = null"
    />
  </div>
</template>

<style scoped></style>
