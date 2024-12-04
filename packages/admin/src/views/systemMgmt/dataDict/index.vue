<script setup lang="ts">
import {
  createDataDictionaryApi,
  deleteDataDictionaryApi,
  getDataDictionaryApi,
  updateDataDictionaryApi,
  updateDataDictionaryStatusApi,
} from '@/apis/dictionary'
import { PromptsEnum } from '@/enum/prompts'
import RecordDetails from '@/views/systemMgmt/dataDict/record.vue'
import { filter, formOptions, tableColumns, toolbar } from '@/views/systemMgmt/dataDict/shared'

defineOptions({
  name: 'DataDict',
})

const { requestData, reset, request, loading, params } = useRequest(getDataDictionaryApi)
type TableItem = ResolveListItem<typeof requestData.value>

const detailModalShow = ref(false)
const currentRow = ref<TableItem | null>(null)
const selectionItems = ref<TableItem[] | null>(null)
const formModal = reactive({
  show: false,
  loading: false,
})

async function handlerToolbar(val: string) {
  if (val === 'add') {
    formModal.show = true
    return
  }
  const ids = selectionItems.value?.map((item) => item.id)
  if (Array.isArray(ids)) {
    switch (val) {
      case 'delete':
        useConfirm('delete', () => deleteDataDictionaryApi({ ids }), request)
        break
      case 'enable':
        useConfirm('enable', () => updateDataDictionaryStatusApi({ ids, status: 1 }), request)
        break
      case 'disable':
        useConfirm('disable', () => updateDataDictionaryStatusApi({ ids, status: 0 }), request)
        break
    }
  }
}

async function addDictionary(value: any) {
  formModal.loading = true
  if (currentRow.value) {
    await updateDataDictionaryApi({ ...value, id: currentRow.value.id })
    useMessage.success(PromptsEnum.UPDATED)
  } else {
    await createDataDictionaryApi(value)
    useMessage.success(PromptsEnum.CREATED)
  }
  formModal.show = false
  formModal.loading = false
  currentRow.value = null
  reset()
}

function edit(val: TableItem) {
  currentRow.value = val
  formModal.show = true
}

function showDetail(row: TableItem) {
  detailModalShow.value = true
  currentRow.value = row
}
</script>

<template>
  <div v-loading="loading" class="main-page">
    <es-table
      v-if="requestData"
      v-model:params="params"
      v-model:selected="selectionItems"
      :filter="filter()"
      :toolbar="toolbar"
      :columns="tableColumns"
      :data="requestData.list"
      :selection="true"
      :total="requestData?.total"
      @reset="reset"
      @query="request"
      @toolbar-handler="handlerToolbar"
    >
      <template #name="{ row }">
        <el-link type="primary" @click="showDetail(row)">
          {{ row.name }}
        </el-link>
      </template>
      <template #status="{ row }">
        <es-switch :request="updateDataDictionaryStatusApi" :row="row" ids @success="request" />
      </template>
      <template #action="{ row }">
        <el-button type="primary" link @click="edit(row)"> 编辑</el-button>
        <es-pop-confirm
          v-model:loading="loading"
          :request="deleteDataDictionaryApi"
          :row="row"
          ids
          @success="request()"
        />
      </template>
    </es-table>

    <es-modal-form
      v-model:show="formModal.show"
      :default-value="currentRow"
      :title="currentRow ? '添加' : '编辑'"
      :options="formOptions"
      :loading="formModal.loading"
      @submit="addDictionary"
      @closed="currentRow = null"
    />

    <RecordDetails
      v-if="detailModalShow"
      v-model="detailModalShow"
      :record="currentRow"
      :title="currentRow?.name"
      :width="1200"
      @closed="currentRow = null"
    />
  </div>
</template>

<style scoped></style>
