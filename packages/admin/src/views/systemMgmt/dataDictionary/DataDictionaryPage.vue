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
} from '@/views/systemMgmt/dataDictionary/Shared'
import { useConfirm, useMessage } from '@/hooks/useFeedback'
import { PromptsEnum } from '@/enum/prompts'
import { useRequest } from '@/hooks/useRequest'
import type { ResolveListItem } from '@akaiito/typings/src'
import BasicSwitch from '@/components/basic/BasicSwitch.vue'
import BasicPopConfirm from '@/components/basic/BasicPopConfirm.vue'
import RecordDetails from '@/views/systemMgmt/dataDictionary/RecordDetails.vue'

const toolbarOptions = toolbar

const { pageRequest, requestData, resetPageRequest, loading } =
  useRequest(getDataDictionaryApi)
pageRequest()

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
      useConfirm(
        'delete',
        () => deleteDataDictionaryApi({ ids }),
        resetPageRequest
      )
      break
    case 'enable':
      useConfirm(
        'enable',
        () => updateDataDictionaryStatusApi({ ids, status: 1 }),
        resetPageRequest
      )
      break
    case 'disable':
      useConfirm(
        'disable',
        () => updateDataDictionaryStatusApi({ ids, status: 0 }),
        resetPageRequest
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
  resetPageRequest()
}

const edit = (val: TableItem) => {
  currentRow.value = val
  formModalShow.value = true
}

const selectionItems = ref<TableItem[] | null>(null)
</script>

<template>
  <div class="main-page" v-loading="loading">
    <basic-toolbar
      :toolbar="toolbarOptions"
      :filter="filter()"
      :selection="!selectionItems?.length"
      @handler="handlerToolbar"
      @query="resetPageRequest"
    />
    <basic-table
      v-if="requestData"
      :columns="tableColumns"
      :data="requestData.list"
      :selection="true"
      v-model:selection-items="selectionItems"
    >
      <template #name="{ row }">
        <el-button
          link
          type="primary"
          @click="(detailModalShow = true), (currentRow = row)"
          >{{ row.name }}</el-button
        >
      </template>
      <template #status="{ row }">
        <basic-switch :request="updateDataDictionaryStatusApi" :row="row" ids />
      </template>
      <template #action="{ row }">
        <el-button type="primary" link @click="edit(row)">编辑</el-button>
        <basic-pop-confirm
          :request="deleteDataDictionaryApi"
          :row="row"
          ids
          v-model:loading="loading"
          @success="resetPageRequest()"
        />
      </template>
    </basic-table>

    <form-modal
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
