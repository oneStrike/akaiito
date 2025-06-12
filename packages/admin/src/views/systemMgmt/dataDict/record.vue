<script setup lang="ts">
  import type { EsModalProps } from '@/components/es-modal/types'
  import {
    createItemApi,
    deleteItemApi,
    itemsApi,
    updateItemApi,
    updateItemStatusApi,
  } from '@/apis/dictionary'
  import { PromptsEnum } from '@/enum/prompts'
  import {
    filter,
    formOptions,
    tableColumns,
    toolbar,
  } from '@/views/systemMgmt/dataDict/shared'

  defineOptions({
    name: 'RecordDetails',
  })

  const props = withDefaults(defineProps<RecordDetails>(), {})

  const emits = defineEmits<{
    (event: 'closed'): void
  }>()

  export interface RecordDetails extends EsModalProps {
    record: IterateObject | null
  }

  type TableItem = ResolvedReturnType<typeof itemsApi>['list'][number]

  const tableRef = useTemplateRef('tableRef')
  const formLoading = ref(false)
  const formModalShow = ref(false)
  const showModal = defineModel('modelValue', {
    type: Boolean,
    default: false,
    set(val) {
      if (!val) {
        formModalShow.value = false
      }
    },
  })
  const currentRow = ref<TableItem | null>(null)
  const selectionItems = ref<TableItem[] | null>(null)

  async function handlerToolbar(val: string) {
    if (val === 'add') {
      formModalShow.value = true
      return
    }
    const ids = selectionItems.value?.map((item) => item.id)
    if (ids) {
      switch (val) {
        case 'delete':
          useConfirm(
            'delete',
            () => deleteItemApi({ ids }),
            tableRef.value?.refresh,
          )
          break
        case 'enable':
          useConfirm(
            'enable',
            () => updateItemStatusApi({ ids, isEnabled: true }),
            tableRef.value?.refresh,
          )
          break
        case 'disable':
          useConfirm(
            'disable',
            () => updateItemStatusApi({ ids, isEnabled: false }),
            tableRef.value?.refresh,
          )
          break
      }
    }
  }

  async function addDictionary(value: any) {
    formLoading.value = true
    try {
      if (currentRow.value) {
        await updateItemApi({ ...value, id: currentRow.value.id })
        useMessage.success(PromptsEnum.UPDATED)
      } else {
        value.dictionaryCode = props.record?.code
        await createItemApi(value)
        useMessage.success(PromptsEnum.CREATED)
      }
      formModalShow.value = false
      currentRow.value = null
      tableRef.value?.refresh({ dictionaryCode: props.record?.code })
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
    tableRef.value?.computedTableHeight()
  }
</script>

<template>
  <es-modal
    v-bind="props"
    v-model="showModal"
    class="p-1"
    @closed="emits('closed')"
    @handler="((showModal = false), emits('closed'))"
    @full-screen="computedTableHeight"
  >
    <div class="h-full">
      <es-table
        ref="tableRef"
        v-model:selected="selectionItems"
        :filter="filter()"
        :toolbar="toolbar"
        :columns="tableColumns"
        :selection="true"
        :request-api="itemsApi"
        @toolbar-handler="handlerToolbar"
      >
        <template #name="{ row }">
          <span>{{ row.name }}</span>
        </template>
        <template #isEnabled="{ row }">
          <es-switch
            :request="updateItemStatusApi"
            :row="row"
            ids
            @success="tableRef?.refresh()"
          />
        </template>
        <template #action="{ row }">
          <el-button type="primary" link @click="edit(row)">编辑</el-button>
          <es-pop-confirm
            :request="deleteItemApi"
            :row="row"
            ids
            @success="tableRef?.refresh()"
          />
        </template>
      </es-table>

      <es-modal-form
        v-model:show="formModalShow"
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
