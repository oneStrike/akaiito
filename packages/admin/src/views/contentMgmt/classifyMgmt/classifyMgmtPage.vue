<script setup lang="ts">
import type { GetCategoryPageTypesRes } from '@/apis/types/category'
import type { IterateObject } from '@auy/types'
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
import { utils } from '@/utils'
import { filter, formOptions, tableColumns, toolbar } from '@/views/contentMgmt/classifyMgmt/shared'

type Record = GetCategoryPageTypesRes['list'][number] & { contentModel: string }

const formScheme = useFormTool(formOptions)
const currentRow = ref<Record | null>(null)
const formModal = ref(false)
const { requestData, params, sortChange, reset, request, loading } = useRequest(getCategoryPageApi)

async function switchStatus(val: any) {
  await updateCategoryStatusApi(val)
  await reset()
}

const openEditForm = (row: Record) => {
  const { novelModel, mangaModel, imageModel } = row
  const contentModel = []
  if (novelModel) {
    contentModel.push(1)
  }
  if (mangaModel) {
    contentModel.push(2)
  }
  if (imageModel) {
    contentModel.push(3)
  }
  row.contentModel = contentModel.join(',')
  currentRow.value = row
  formModal.value = true
}

const formatModelType = (contentModel: string) => {
  return {
    novelModel: contentModel.includes('1') ? 1 : 0,
    mangaModel: contentModel.includes('2') ? 1 : 0,
    imageModel: contentModel.includes('3') ? 1 : 0,
  }
}

async function submitForm(val: Record) {
  val = Object.assign(val, formatModelType(val.contentModel))
  if (currentRow.value?.id) {
    val.id = currentRow.value.id
    await updateCategoryApi(val)
  } else {
    await createCategoryApi(val)
  }
  formModal.value = false
  useMessage.success({
    message: currentRow.value?.id ? '修改成功!' : '新增成功！',
  })
  currentRow.value = null
  request()
}

const filterCategory = (val: IterateObject) => {
  const cloneQuery = utils._.cloneDeep(val)
  delete cloneQuery.contentModel
  if (val.contentModel.includes(1)) {
    cloneQuery.novelModel = 1
  } else {
    cloneQuery.novelModel = ''
  }
  if (val.contentModel.includes(2)) {
    cloneQuery.mangaModel = 1
  } else {
    cloneQuery.mangaModel = ''
  }
  if (val.contentModel.includes(3)) {
    cloneQuery.imageModel = 1
  } else {
    cloneQuery.imageModel = ''
  }
  request(cloneQuery)
}
</script>

<template>
  <div v-loading="loading" class="main-page pb-6">
    <es-toolbar
      :toolbar="toolbar"
      :filter="filter"
      @reset="reset"
      @query="filterCategory"
      @handler="formModal = true"
    />
    <es-table
      v-model:page-index="params.pageIndex"
      v-model:page-size="params.pageSize"
      :columns="tableColumns"
      :data="requestData?.list ?? []"
      :total="requestData?.total"
      @sort-change="sortChange"
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
      v-model:modal="formModal"
      :width="700"
      :title="currentRow?.id ? '修改分类' : '新增分类'"
      :options="formScheme.formOptions"
      :default-value="currentRow || { type: 1, isFree: 1 }"
      @submit="submitForm"
      @closed="currentRow = null"
    />
  </div>
</template>

<style scoped></style>
