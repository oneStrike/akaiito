<script setup lang="ts">
import {
  createDataDictionaryItemsApi,
  deleteDataDictionaryItemsApi,
  getDataDictionaryItemsApi,
  updateDataDictionaryItemsApi,
  updateDataDictionaryItemsStatusApi,
} from '@/apis/dictionary'

import { PromptsEnum } from '@/enum/prompts'
import { useConfirm, useMessage } from '@/hooks/useFeedback'
import { useRequest } from '@/hooks/useRequest'
import {
  filter,
  formOptions,
  tableColumns,
  toolbar,
} from '@/views/systemMgmt/dataDictionary/shared'
import type { EsModalProps } from '@/components/es-modal/es-modal.vue'
import type { IterateObject, ResolveListItem } from '@typings/index'

export interface RecordDetails extends EsModalProps {
  record: IterateObject | null
}

type TableItem = ResolveListItem<typeof requestData.value>

const props = withDefaults(defineProps<RecordDetails>(), {})
const emits = defineEmits<{
  (event: 'update:modelValue', data: boolean): void
  (event: 'closed'): void
}>()
const esTableRef = ref()
const esToolbarRef = ref()
const formLoading = ref(false)
const formModalShow = ref(false)
const showModal = defineModel('modelValue', {
  type: Boolean,
  default: false,
})
const toolbarOptions = toolbar
const filterOptions = filter().map(item => {
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

const { requestData, reset, loading, params } = useRequest(
  getDataDictionaryItemsApi,
  {
    init: false,
  },
)

async function handlerToolbar(val: string) {
  if (val === 'add') {
    formModalShow.value = true
    return
  }
  const ids = selectionItems.value?.map(item => item.id)
  if (ids) {
    switch (val) {
      case 'delete':
        useConfirm(
          'delete',
          () => deleteDataDictionaryItemsApi({ ids }),
          () => reset(dictionaryId.value),
        )
        break
      case 'enable':
        useConfirm(
          'enable',
          () => updateDataDictionaryItemsStatusApi({ ids, status: 1 }),
          () => reset(dictionaryId.value),
        )
        break
      case 'disable':
        useConfirm(
          'disable',
          () => updateDataDictionaryItemsStatusApi({ ids, status: 0 }),
          () => reset(dictionaryId.value),
        )
        break
    }
  }
}

watch(
  () => showModal,
  ({ value }) => {
    console.log(value)
    if (value) {
      reset(dictionaryId.value)
    } else {
      esToolbarRef.value?.resetFilter()
    }
  },
  { deep: true, immediate: true },
)

async function addDictionary(value: any) {
  formLoading.value = true
  try {
    if (currentRow.value) {
      await updateDataDictionaryItemsApi({ ...value, id: currentRow.value.id })
      useMessage.success(PromptsEnum.UPDATED)
    } else {
      value.dictionaryId = props.record?.id
      await createDataDictionaryItemsApi(value)
      useMessage.success(PromptsEnum.CREATED)
    }
    formModalShow.value = false
    currentRow.value = null
    reset(dictionaryId.value)
  } catch (e) {
    console.log('🚀 ~ file:e method:addDictionary line:102 -----', e)
  }
  formLoading.value = false
}

function edit(val: TableItem) {
  currentRow.value = val
  formModalShow.value = true
}

function computedTableHeight() {
  esTableRef.value?.computedTableHeight()
}
</script>

<template>
  <es-modal
    v-bind="props"
    v-model="showModal"
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
        @query="val => reset({ ...val, ...dictionaryId })"
      />

      <es-table
        v-if="requestData"
        ref="esTableRef"
        v-model:page-index="params.pageIndex"
        v-model:page-size="params.pageSize"
        v-model:selection-items="selectionItems"
        :columns="tableColumns"
        :data="requestData.list"
        :selection="true"
        :total="requestData?.total"
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
          <el-button type="primary" link @click="edit(row)"> 编辑</el-button>
          <es-pop-confirm
            v-model:loading="loading"
            :request="deleteDataDictionaryItemsApi"
            :row="row"
            ids
            @success="reset(dictionaryId)"
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
