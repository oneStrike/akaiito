<script setup lang="ts">
import {
  tableColumns,
  filter,
  formOptions,
  toolbar
} from '@/views/systemMgmt/dataDictionary/Shared'

import type { IterateObject, ResolveListItem } from '@typings/index'
import type { EsModalProps } from '@/components/es-modal/es-modal.vue'
import { useRequest } from '@/hooks/useRequest'
import {
  createDataDictionaryItemsApi,
  deleteDataDictionaryItemsApi,
  getDataDictionaryItemsApi,
  updateDataDictionaryItemsApi,
  updateDataDictionaryItemsStatusApi
} from '@/apis/dictionary'
import { useConfirm, useMessage } from '@/hooks/useFeedback'
import { PromptsEnum } from '@/enum/prompts'

export interface RecordDetails extends EsModalProps {
  record: IterateObject
}
type TableItem = ResolveListItem<typeof requestData.value>

const esTableRef = ref()
const esToolbarRef = ref()
const props = withDefaults(defineProps<RecordDetails>(), {})
const emits = defineEmits<{
  (event: 'update:modelValue'): void
  (event: 'closed'): void
}>()
const formLoading = ref(false)
const formModalShow = ref(false)
const show = useVModel(props, 'modelValue', emits)
const toolbarOptions = toolbar
const filterOptions = filter().map((item) => {
  if (item.props) {
    item.props.class = 'w-44'
  } else {
    item.props = { class: 'w-44' }
  }
  return item
})

const currentRow = ref<TableItem | null>(null)
const selectionItems = ref<TableItem[] | null>(null)
const dictionaryId = computed(() => ({ dictionaryId: props.record?.id }))
const { requestData, resetPage, loading, requestParams } = useRequest(
  getDataDictionaryItemsApi
)

const handlerToolbar = async (val: string) => {
  const ids = selectionItems.value?.map((item) => item.id)
  switch (val) {
    case 'add':
      formModalShow.value = true
      break
    case 'delete':
      useConfirm(
        'delete',
        () => deleteDataDictionaryItemsApi({ ids }),
        () => resetPage(dictionaryId.value)
      )
      break
    case 'enable':
      useConfirm(
        'enable',
        () => updateDataDictionaryItemsStatusApi({ ids, status: 1 }),
        () => resetPage(dictionaryId.value)
      )
      break
    case 'disable':
      useConfirm(
        'disable',
        () => updateDataDictionaryItemsStatusApi({ ids, status: 0 }),
        () => resetPage(dictionaryId.value)
      )
      break
  }
}

watch(
  show,
  (val) => {
    if (val) {
      resetPage(dictionaryId.value)
    } else {
      esToolbarRef.value?.resetFilter()
    }
  },
  { deep: true, immediate: true }
)

const addDictionary = async (value: any) => {
  formLoading.value = true
  try {
    if (currentRow.value) {
      await updateDataDictionaryItemsApi({ ...value, id: currentRow.value.id })
      useMessage.success(PromptsEnum.UPDATED)
    } else {
      value.dictionaryId = props.record.id
      await createDataDictionaryItemsApi(value)
      useMessage.success(PromptsEnum.CREATED)
    }
    formModalShow.value = false
    currentRow.value = null
    resetPage(dictionaryId.value)
  } catch (e) {
    console.log('🚀 ~ file:e method:addDictionary line:102 -----', e)
  }
  formLoading.value = false
}

const edit = (val: TableItem) => {
  currentRow.value = val
  formModalShow.value = true
}

const computedTableHeight = () => {
  esTableRef.value?.computedTableHeight()
}
</script>

<template>
  <es-modal
    v-model="show"
    v-bind="props"
    @closed="emits('closed')"
    @full-screen="computedTableHeight"
  >
    <div v-loading="loading" class="h-full">
      <es-toolbar
        ref="esToolbarRef"
        :toolbar="toolbarOptions"
        :filter="filterOptions"
        :selection="!selectionItems?.length"
        @handler="handlerToolbar"
        @query="(val) => resetPage({ ...val, ...dictionaryId })"
      />

      <es-table
        v-if="requestData"
        ref="esTableRef"
        v-model:page-index="requestParams.pageIndex"
        v-model:page-size="requestParams.pageSize"
        :columns="tableColumns"
        :data="requestData.list"
        :selection="true"
        :total="requestData?.total"
        v-model:selection-items="selectionItems"
      >
        <template #name="{ row }">
          <span>{{ row.name }}</span>
        </template>
        <template #status="{ row }">
          <es-switch
            :request="updateDataDictionaryItemsStatusApi"
            :row="row"
            ids
          />
        </template>
        <template #action="{ row }">
          <el-button type="primary" link @click="edit(row)">编辑</el-button>
          <es-pop-confirm
            :request="deleteDataDictionaryItemsApi"
            :row="row"
            ids
            v-model:loading="loading"
            @success="resetPage(dictionaryId)"
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
    </div>
  </es-modal>
</template>

<style scoped></style>
