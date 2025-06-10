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

  type TableItem = ResolvedReturnType<typeof itemsApi>[number]

  const esTableRef = ref()
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
  const { requestData, request, reset, loading, params } = useRequest(
    itemsApi,
    {
      init: false,
    },
  )

  watch(showModal, (val) => {
    val && request({ dictionaryCode: props.record?.code })
  })

  async function handlerToolbar(val: string) {
    if (val === 'add') {
      formModalShow.value = true
      return
    }
    const ids = selectionItems.value?.map((item) => item.id)
    if (ids) {
      switch (val) {
        case 'delete':
          useConfirm('delete', () => deleteItemApi({ ids }), request)
          break
        case 'enable':
          useConfirm(
            'enable',
            () => updateItemStatusApi({ ids, status: 1 }),
            request,
          )
          break
        case 'disable':
          useConfirm(
            'disable',
            () => updateItemStatusApi({ ids, status: 0 }),
            request,
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
      request({ dictionaryCode: props.record?.code })
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
    class="p-1"
    @closed="emits('closed')"
    @handler="((showModal = false), emits('closed'))"
    @full-screen="computedTableHeight"
  >
    <div v-loading="loading" class="h-full">
      <es-table
        v-if="requestData"
        ref="esTableRef"
        v-model:params="params"
        v-model:selected="selectionItems"
        :filter="filter()"
        :toolbar="toolbar"
        :columns="tableColumns"
        :data="requestData"
        :selection="true"
        :total="requestData?.length"
        @toolbar-handler="handlerToolbar"
        @reset="reset"
        @query="request"
      >
        <template #name="{ row }">
          <span>{{ row.name }}</span>
        </template>
        <template #status="{ row }">
          <es-switch
            :request="updateItemStatusApi"
            :row="row"
            ids
            @success="request"
          />
        </template>
        <template #action="{ row }">
          <el-button type="primary" link @click="edit(row)">编辑</el-button>
          <es-pop-confirm
            v-model:loading="loading"
            :request="deleteItemApi"
            :row="row"
            ids
            @success="request"
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
