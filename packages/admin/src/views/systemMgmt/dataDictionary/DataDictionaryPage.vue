<script setup lang="ts">
import {
  createDataDictionaryApi,
  deleteDataDictionaryApi,
  getDataDictionaryApi,
  updateDataDictionaryStatusApi
} from '@/apis/dictionary'
import {
  tableColumns,
  toolbar,
  filter,
  formOptions
} from '@/views/systemMgmt/dataDictionary/Shared'
import { useMessage } from '@/hooks/useFeedback'
import { PromptsEnum } from '@/core/prompts'
import { useRequest } from '@/hooks/useRequest'
import { type ResolveListItem } from '@akaiito/typings/src'
import BasicSwitch from '@/components/basic/BasicSwitch.vue'
import BasicPopConfirm from '@/components/basic/BasicPopConfirm.vue'

const { pageRequest, requestData, resetPageRequest, loading } =
  useRequest(getDataDictionaryApi)
pageRequest()

type TableItem = ResolveListItem<typeof requestData.value>

const formModalShow = ref(false)
const currentRow = ref<TableItem | null>(null)

const handlerToolbar = (val: string) => {
  switch (val) {
    case 'add':
      formModalShow.value = true
      break
  }
}

const addDictionary = async (value: any) => {
  await createDataDictionaryApi(value)
  formModalShow.value = false
  useMessage.success(PromptsEnum.CREATED)
  resetPageRequest()
}

const edit = (val: TableItem) => {
  currentRow.value = val
  formModalShow.value = true
}
</script>

<template>
  <div class="main-page">
    <basic-toolbar
      :toolbar="toolbar"
      :filter="filter"
      @handler="handlerToolbar"
      @query="resetPageRequest"
    />
    <basic-table
      v-if="requestData"
      :columns="tableColumns"
      :data="requestData.list"
      v-loading="loading"
    >
      <template #name="{ row }">
        <el-button link type="primary">{{ row.name }}</el-button>
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
      :title="currentRow ? '添加' : '编辑'"
      :options="formOptions"
      @submit="addDictionary"
    />
  </div>
</template>

<style scoped></style>
