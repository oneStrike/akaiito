<script setup lang="ts">
import {
  createDataDictionaryApi,
  deleteDataDictionaryApi,
  getDataDictionaryApi,
  updateDataDictionaryApi,
  updateDataDictionaryStatusApi
} from '@/apis/dictionary'
import {
  tableColumns,
  toolbar,
  filter,
  formOptions
} from '@/views/systemMgmt/dataDictionary/shared'
import { useConfirm, useMessage } from '@/hooks/useFeedback'
import { PromptsEnum } from '@/enum/prompts'
import { useRequest } from '@/hooks/useRequest'
import type { ResolveListItem } from '@akaiito/typings/src'
import RecordDetails from '@/views/systemMgmt/dataDictionary/recordDetails.vue'

const toolbarOptions = toolbar

const { requestPage, requestData, resetPage, loading, requestParams } =
  useRequest(getDataDictionaryApi)
requestPage()
type TableItem = ResolveListItem<typeof requestData.value>

const formLoading = ref(false)
const formModalShow = ref(false)
const detailModalShow = ref(false)
const currentRow = ref<TableItem | null>(null)

const handlerToolbar = async (val: string) => {
  const ids = selectionItems.value?.map((item) => item.id)
  switch (val) {
    case 'add':
      formModalShow.value = true
      break
    case 'delete':
      useConfirm('delete', () => deleteDataDictionaryApi({ ids }), resetPage)
      break
    case 'enable':
      useConfirm(
        'enable',
        () => updateDataDictionaryStatusApi({ ids, status: 1 }),
        resetPage
      )
      break
    case 'disable':
      useConfirm(
        'disable',
        () => updateDataDictionaryStatusApi({ ids, status: 0 }),
        resetPage
      )
      break
  }
}

const addDictionary = async (value: any) => {
  formLoading.value = true
  if (currentRow.value) {
    await updateDataDictionaryApi({ ...value, id: currentRow.value.id })
    useMessage.success(PromptsEnum.UPDATED)
  } else {
    await createDataDictionaryApi(value)
    useMessage.success(PromptsEnum.CREATED)
  }
  formModalShow.value = false
  formLoading.value = false
  currentRow.value = null
  resetPage()
}

const edit = (val: TableItem) => {
  currentRow.value = val
  formModalShow.value = true
}

const selectionItems = ref<TableItem[] | null>(null)
</script>

<template>
  <div class="main-page" v-loading="loading">
    <es-toolbar
      :toolbar="toolbarOptions"
      :filter="filter()"
      :selection="!selectionItems?.length"
      @handler="handlerToolbar"
      @query="resetPage"
    />
    <es-table
      v-if="requestData"
      v-model:page-index="requestParams.pageIndex"
      v-model:page-size="requestParams.pageSize"
      :columns="tableColumns"
      :data="requestData.list"
      :selection="true"
      :total="requestData?.total"
      v-model:selection-items="selectionItems"
    >
      <template #name="{ row }">
        <el-link
          type="primary"
          @click="(detailModalShow = true), (currentRow = row)"
          >{{ row.name }}
        </el-link>
      </template>
      <template #status="{ row }">
        <es-switch :request="updateDataDictionaryStatusApi" :row="row" ids />
      </template>
      <template #action="{ row }">
        <el-button type="primary" link @click="edit(row)">编辑</el-button>
        <es-pop-confirm
          :request="deleteDataDictionaryApi"
          :row="row"
          ids
          v-model:loading="loading"
          @success="resetPage()"
        />
      </template>
    </es-table>

    <es-modal-form
      v-model:modal="formModalShow"
      :default-value="currentRow"
      :title="currentRow ? '添加' : '编辑'"
      :options="formOptions"
      :loading="formLoading"
      @submit="addDictionary"
      @closed="currentRow = null"
    />

    <record-details
      v-model="detailModalShow"
      :record="currentRow"
      :title="currentRow?.name"
      :height="630"
      :max-height="630"
      :width="1200"
      @closed="currentRow = null"
    />
  </div>
</template>

<style scoped></style>
